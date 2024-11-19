import UploadButton from "@/components/UploadButton"
import { useUploadThing } from "@/hooks/use-uploadthing"
import { RefreshCwIcon } from "lucide-react"
import { useCallback, useState } from "react"
import { Button } from "~ui/button"
import { Textarea } from "~ui/textarea"

type Input = string | undefined
type State = "ready" | "loading" | "error"

export default function FormContainer() {
    const { isUploading, startUpload } = useUploadThing("fileUploader")
    const [input, setInput] = useState<string>("")
    const [inputValue, setInputValue] = useState<Input>("")
    const [inputFile, setInputFile] = useState("")
    const [state, setState] = useState<State>("ready")

    const disabled = !input || state === "loading"

    const onFileUpload = useCallback(async (file: File) => {
        if (file) {
            const files = await startUpload([file])
            const newFile = files?.[0]

            if (newFile) {
                setInputFile(newFile.appUrl)
                setInput(newFile.appUrl)
                setInputValue(
                    "📃 " +
                        newFile.name +
                        ` (${(newFile.size / 1024).toFixed(2)}KB)`,
                )
            }
        }
    }, [])
    return (
        <form
            action={"/analysis"}
            method="POST"
            className="group flex h-full gap-2 pr-2"
            onSubmit={() => setState("loading")}
        >
            <Textarea
                className="resize-none px-4"
                placeholder="Analizar un texto..."
                id="analyze-text"
                name="text"
                disabled={state === "loading"}
                value={inputValue}
                onInput={(e) => {
                    setInput(e.currentTarget.value)
                    setInputValue(e.currentTarget.value)
                }}
            />
            <div className="flex flex-col gap-1">
                <input
                    name="file"
                    className="hidden"
                    id="analyze-input"
                    value={inputFile}
                />
                <Button
                    size="sm"
                    className="rounded-lg transition-opacity"
                    disabled={disabled}
                >
                    {state === "loading" ? (
                        <div className="flex items-center gap-1">
                            <span className="animate-spin">
                                <RefreshCwIcon />
                            </span>
                            <span>Analizando</span>
                        </div>
                    ) : (
                        <span>Enviar</span>
                    )}
                </Button>
                <UploadButton disabled={disabled} onFileUpload={onFileUpload} />
            </div>
        </form>
    )
}
