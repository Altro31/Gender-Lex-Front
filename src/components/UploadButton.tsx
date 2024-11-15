import {
    $analyzeFile,
    $analyzeText,
} from "@/sections/home/stores/analyle-input"
import type { FileRouter } from "@/services/uploadthing"
import { generateReactHelpers } from "@uploadthing/react"
import { PaperclipIcon } from "lucide-react"
import { Button } from "~ui/button"

const { useUploadThing } = generateReactHelpers<FileRouter>()

export default function UploadButton() {
    const { isUploading, startUpload } = useUploadThing("fileUploader")

    async function handleInput(e: React.ChangeEvent<HTMLInputElement>) {
        const file = e.target.files?.item(0)
        if (file) {
            const files = await startUpload([file])
            const newFile = files?.[0]

            if (newFile) {
                $analyzeFile.set(newFile.appUrl)
                $analyzeText.set(
                    "📃 " +
                        newFile.name +
                        ` (${(newFile.size / 1024).toFixed(2)}KB)`,
                )
            }
        }
    }

    return (
        <Button
            asChild
            className="cursor-pointer"
            size="icon"
            variant="outline"
        >
            <label>
                <PaperclipIcon className="h-4 w-4" />
                <input type="file" className="hidden" onChange={handleInput} />
            </label>
        </Button>
    )
}
