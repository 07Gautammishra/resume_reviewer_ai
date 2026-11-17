import { useNavigate } from "react-router-dom";
import { FileText, Sparkles, Loader2 } from "lucide-react";
import { PageHeader } from "@/components/layout/PageHeader";
import { Card, CardTitle, CardDescription, CardHeader } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Skeleton } from "@/components/ui/Skeleton";
import { EmptyState } from "@/components/ui/EmptyState";
import { UploadDropzone } from "@/components/resume/UploadDropzone";
import { ResumeRow } from "@/components/resume/ResumeRow";
import { useResumesList, useCreateSampleResume } from "@/hooks/useResumes";

export default function Resumes() {
  const nav = useNavigate();
  const { data: resumes, isLoading } = useResumesList();
  const createSample = useCreateSampleResume();

  function handleUploaded(resume) {
    nav(`/resumes/${resume._id}`, { state: { autoAnalyze: true } });
  }

  async function handleLoadSample() {
    try {
      const res = await createSample.mutateAsync();
      if (res?.resume?._id) {
        nav(`/resumes/${res.resume._id}`, { state: { autoAnalyze: true } });
      }
    } catch {
      // Error handled by hook toast
    }
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Your Resumes"
        description="Upload a new one or pick up where you left off."
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        <div className="lg:col-span-5">
          <Card>
            <CardHeader>
              <div>
                <CardTitle className="text-base">Upload a resume</CardTitle>
                <CardDescription className="mt-1">
                  PDF only. We extract the text and create version V1.
                </CardDescription>
              </div>
            </CardHeader>
            <UploadDropzone onUploaded={handleUploaded} />
          </Card>
        </div>

        <div className="lg:col-span-7 space-y-3">
          {isLoading && (
            <>
              <Skeleton className="h-[88px] rounded-2xl" />
              <Skeleton className="h-[88px] rounded-2xl" />
              <Skeleton className="h-[88px] rounded-2xl" />
            </>
          )}

          {!isLoading && resumes?.length === 0 && (
            <EmptyState
              icon={FileText}
              title="No resumes yet"
              description="Drop your first PDF on the left to get started — we'll parse it, score it, and suggest stronger bullets."
              action={
                <Button
                  variant="outline"
                  size="md"
                  disabled={createSample.isPending}
                  onClick={handleLoadSample}
                >
                  {createSample.isPending ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Loading Demo...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4 mr-2 text-[var(--accent)]" />
                      Explore with Demo Resume
                    </>
                  )}
                </Button>
              }
            />
          )}

          {!isLoading &&
            resumes?.map((r) => <ResumeRow key={r._id} resume={r} />)}
        </div>
      </div>
    </div>
  );
}
