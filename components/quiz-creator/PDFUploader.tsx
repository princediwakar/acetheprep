import { useState, useCallback, memo, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Loader2, X, Paperclip, FileText } from "lucide-react";
import { toast } from "sonner";
import * as pdfjsLib from "pdfjs-dist";

pdfjsLib.GlobalWorkerOptions.workerSrc = "/pdf.worker.js";

interface PDFUploaderProps {
  onUpload: (text: string) => void;
  onClear: () => void;
  disabled?: boolean;
}

export const PDFUploader = memo(({ onUpload, onClear, disabled }: PDFUploaderProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [fileName, setFileName] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = useCallback(async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file || file.type !== "application/pdf") {
      toast.error("Please upload a valid PDF file");
      return;
    }

    setIsLoading(true);
    try {
      const pdf = await pdfjsLib.getDocument(await file.arrayBuffer()).promise;
      let text = "";
      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const content = await page.getTextContent();
        text += content.items
          .map((item) => (item as { str: string }).str)
          .join(" ") + " ";
      }
      setFileName(file.name);
      onUpload(text.trim());
      toast.success(`PDF "${file.name}" attached`);
    } catch (error) {
      console.error("Error processing PDF:", error);
      toast.error("Failed to process PDF");
    } finally {
      setIsLoading(false);
    }
  }, [onUpload]);

  const handleClearFile = useCallback((e?: React.MouseEvent) => {
    e?.stopPropagation();
    setFileName(null);
    onClear();
    if (fileInputRef.current) fileInputRef.current.value = "";
    toast.info("PDF file removed");
  }, [onClear]);

  const handleButtonClick = useCallback(() => {
    if (!isLoading && !disabled && fileInputRef.current) {
      fileInputRef.current.click();
    }
  }, [isLoading, disabled]);

  return (
    <div className="flex items-center">
      <input
        type="file"
        accept="application/pdf"
        onChange={handleFileChange}
        disabled={isLoading || disabled}
        className="hidden"
        ref={fileInputRef}
      />
      
      {fileName ? (
        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium bg-muted border border-border/80 text-foreground">
          <FileText className="h-3.5 w-3.5 text-primary shrink-0" />
          <span className="truncate max-w-[160px] sm:max-w-[220px]">{fileName}</span>
          <button
            type="button"
            onClick={handleClearFile}
            disabled={disabled}
            className="ml-1 p-0.5 rounded hover:bg-background/80 text-muted-foreground hover:text-foreground transition-colors"
            title="Remove attachment"
          >
            <X className="h-3 w-3" />
          </button>
        </div>
      ) : (
        <Button
          type="button"
          variant="outline"
          size="sm"
          disabled={isLoading || disabled}
          onClick={handleButtonClick}
          className="h-8 px-2.5 text-xs font-medium text-muted-foreground hover:text-foreground border-border/80"
        >
          {isLoading ? (
            <>
              <Loader2 className="h-3.5 w-3.5 animate-spin mr-1.5" />
              Processing...
            </>
          ) : (
            <>
              <Paperclip className="h-3.5 w-3.5 mr-1.5" />
              Attach PDF
            </>
          )}
        </Button>
      )}
    </div>
  );
});

PDFUploader.displayName = "PDFUploader";
