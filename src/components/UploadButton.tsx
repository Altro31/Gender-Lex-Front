import { cn } from "@/lib/utils"
import { droppedFileStore } from "@/stores/droped-file"
import { untracked } from "@preact/signals"
import { PaperclipIcon } from "lucide-react"
import { Button, type ButtonProps } from "~ui/button"

interface Props extends ButtonProps {
    onFileUpload: (file: File) => void
}

export default function UploadButton({
    onFileUpload,
    className,
    ...props
}: Props) {
    return (
        <Button
            asChild
            className={cn("cursor-pointer", className)}
            size="icon"
            variant="outline"
            {...props}
        >
            <label>
                <span className="sr-only">Upload file</span>
                <PaperclipIcon className="h-4 w-4" />
                <input
                    name="file"
                    type="file"
                    className="hidden"
                    accept=".pdf"
                    onChange={(e) => {
                        untracked(() =>
                            onFileUpload(e.currentTarget.files?.item(0)!),
                        )
                    }}
                />
            </label>
        </Button>
    )
}
