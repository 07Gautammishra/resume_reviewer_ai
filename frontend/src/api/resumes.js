
import { apiClient } from "./client";


export const resumesApi = {
  list: () => apiClient.get("/resumes").then((r) => r.data),

  get: (id) => apiClient.get(`/resumes/${id}`).then((r) => r.data),


  getVersion: (id, versionId) =>
    apiClient.get(`/resumes/${id}/versions/${versionId}`).then((r) => r.data),
  
  upload: (file, title) => {
    const fd = new FormData();
    fd.append("file", file);
    if (title) fd.append("title", title);
    return apiClient
      .post("/resumes", fd, { headers: { "Content-Type": "multipart/form-data" } })
      .then((r) => r.data);
  },

  createSample: async () => {
    try {
      return await apiClient.post("/resumes/sample").then((r) => r.data);
    } catch (err) {
      // Graceful fallback: If backend endpoint /sample is not yet live (404),
      // generate standard sample PDF client-side using jsPDF and upload via standard /resumes endpoint.
      if (err?.status === 404) {
        const { generateSamplePdf } = await import("./generateSamplePdf");
        const blob = generateSamplePdf();
        const file = new File(
          [blob],
          "Alex_Mercer_Senior_Full_Stack_Engineer_Demo.pdf",
          { type: "application/pdf" }
        );

        return await resumesApi.upload(
          file,
          "Alex Mercer - Senior Full Stack Engineer (Demo)"
        );
      }
      throw err;
    }
  },
  
  remove: (id) => apiClient.delete(`/resumes/${id}`).then((r) => r.data),
  
  analyze: (id, body = {}) =>
    apiClient.post(`/resumes/${id}/analyze`, body).then((r) => r.data),
  
  analyses: (id) => apiClient.get(`/resumes/${id}/analyses`).then((r) => r.data),
  
  analysisForVersion: (id, versionId) =>
    apiClient.get(`/resumes/${id}/versions/${versionId}/analysis`).then((r) => r.data),
  
  rewrite: (id, body) =>
    apiClient.post(`/resumes/${id}/rewrite`, body).then((r) => r.data),
  
  diff: (id, from, to, mode = "words") =>
    apiClient.get(`/resumes/${id}/diff`, { params: { from, to, mode } }).then((r) => r.data),
  
};
