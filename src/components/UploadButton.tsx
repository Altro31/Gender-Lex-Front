import { cn } from "@/lib/utils"
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
                <PaperclipIcon className="h-4 w-4" />
                <input
                    type="file"
                    className="hidden"
                    onChange={(e) =>
                        onFileUpload(e.currentTarget.files?.item(0)!)
                    }
                />
            </label>
        </Button>
    )
}
