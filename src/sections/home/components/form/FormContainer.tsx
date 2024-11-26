import UploadButton from "@/components/UploadButton"
import { useUploadThing } from "@/hooks/use-uploadthing"
import FormSendButton from "@/sections/home/components/form/FormSendButton"
import { useCallback, useState } from "react"
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
            action="/analysis"
            method="POST"
            className="group flex h-full gap-2 pr-2"
            onSubmit={() => setState("loading")}
        >
            <Textarea
                name="text"
                className="resize-none px-4"
                placeholder="Analizar un texto..."
                id="analyze-text"
                contentEditable={state !== "loading"}
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
                    readOnly
                />
                <FormSendButton
                    disabled={disabled}
                    loading={state === "loading"}
                />
                <UploadButton disabled={disabled} onFileUpload={onFileUpload} />
            </div>
        </form>
    )
}
