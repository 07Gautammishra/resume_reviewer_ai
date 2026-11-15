import { ENV } from "../config/ENV.js";
import ApiError from "../utils/ApiError.js";

/**
 * Google OAuth 2.0 Helpers
 */
export const getGoogleAuthUrl = (state = "") => {
  if (!ENV.googleClientId) {
    throw ApiError.badRequest("Google OAuth is not configured on this server");
  }

  const rootUrl = "https://accounts.google.com/o/oauth2/v2/auth";
  const params = new URLSearchParams({
    client_id: ENV.googleClientId,
    redirect_uri: ENV.googleCallbackUrl,
    response_type: "code",
    scope: "openid email profile",
    access_type: "offline",
    prompt: "select_account",
  });

  if (state) {
    params.set("state", state);
  }

  return `${rootUrl}?${params.toString()}`;
};

export const getGoogleUserFromCode = async (code) => {
  if (!ENV.googleClientId || !ENV.googleClientSecret) {
    throw ApiError.badRequest("Google OAuth is not configured on this server");
  }

  // 1. Exchange code for tokens
  const tokenResponse = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      code,
      client_id: ENV.googleClientId,
      client_secret: ENV.googleClientSecret,
      redirect_uri: ENV.googleCallbackUrl,
      grant_type: "authorization_code",
    }),
  });

  if (!tokenResponse.ok) {
    const errorText = await tokenResponse.text();
    console.error("Google token exchange error:", errorText);
    throw ApiError.badRequest("Failed to exchange code with Google");
  }

  const { access_token } = await tokenResponse.json();

  // 2. Fetch user profile from Google UserInfo endpoint
  const userResponse = await fetch("https://www.googleapis.com/oauth2/v3/userinfo", {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });

  if (!userResponse.ok) {
    throw ApiError.badRequest("Failed to fetch user profile from Google");
  }

  const profile = await userResponse.json();

  return {
    providerId: profile.sub,
    email: profile.email?.toLowerCase(),
    name: profile.name || profile.given_name || "User",
    avatar: profile.picture || "",
  };
};

/**
 * GitHub OAuth 2.0 Helpers
 */
export const getGitHubAuthUrl = (state = "") => {
  if (!ENV.githubClientId) {
    throw ApiError.badRequest("GitHub OAuth is not configured on this server");
  }

  const rootUrl = "https://github.com/login/oauth/authorize";
  const params = new URLSearchParams({
    client_id: ENV.githubClientId,
    redirect_uri: ENV.githubCallbackUrl,
    scope: "read:user user:email",
  });

  if (state) {
    params.set("state", state);
  }

  return `${rootUrl}?${params.toString()}`;
};

export const getGitHubUserFromCode = async (code) => {
  if (!ENV.githubClientId || !ENV.githubClientSecret) {
    throw ApiError.badRequest("GitHub OAuth is not configured on this server");
  }

  // 1. Exchange code for access token
  const tokenResponse = await fetch("https://github.com/login/oauth/access_token", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      client_id: ENV.githubClientId,
      client_secret: ENV.githubClientSecret,
      code,
      redirect_uri: ENV.githubCallbackUrl,
    }),
  });

  if (!tokenResponse.ok) {
    const errorText = await tokenResponse.text();
    console.error("GitHub token exchange error:", errorText);
    throw ApiError.badRequest("Failed to exchange code with GitHub");
  }

  const tokenData = await tokenResponse.json();
  if (tokenData.error) {
    console.error("GitHub OAuth error:", tokenData);
    throw ApiError.badRequest(tokenData.error_description || "GitHub authentication failed");
  }

  const accessToken = tokenData.access_token;

  // 2. Fetch user profile
  const userResponse = await fetch("https://api.github.com/user", {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "User-Agent": "ScanMyCv-Application",
      Accept: "application/vnd.github.v3+json",
    },
  });

  if (!userResponse.ok) {
    throw ApiError.badRequest("Failed to fetch user profile from GitHub");
  }

  const profile = await userResponse.json();

  // 3. GitHub users frequently have private emails; fetch verified emails
  let email = profile.email;
  if (!email) {
    try {
      const emailsResponse = await fetch("https://api.github.com/user/emails", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "User-Agent": "ScanMyCv-Application",
          Accept: "application/vnd.github.v3+json",
        },
      });

      if (emailsResponse.ok) {
        const emails = await emailsResponse.json();
        // Pick primary verified email, or first verified email, or first available email
        const primary = emails.find((e) => e.primary && e.verified) || emails.find((e) => e.verified) || emails[0];
        if (primary) {
          email = primary.email;
        }
      }
    } catch (e) {
      console.warn("Could not fetch user emails from GitHub:", e.message);
    }
  }

  if (!email) {
    throw ApiError.badRequest("Could not retrieve a valid email address from your GitHub account");
  }

  return {
    providerId: String(profile.id),
    email: email.toLowerCase(),
    name: profile.name || profile.login || "User",
    avatar: profile.avatar_url || "",
  };
};
