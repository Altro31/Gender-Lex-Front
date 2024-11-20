import { PaperclipIcon } from "lucide-react"
import { memo } from "react"
import { Button, type ButtonProps } from "~ui/button"

interface Props extends ButtonProps {
    onFileUpload: (file: File) => void
}

function UploadButton(props: Props) {
    return (
        <Button
            asChild
            className="cursor-pointer"
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
                        props.onFileUpload(e.currentTarget.files?.item(0)!)
                    }
                />
            </label>
        </Button>
    )
}

export default memo(UploadButton)
