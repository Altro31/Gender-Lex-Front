import UploadButton from "@/components/UploadButton"
import { useUploadThing } from "@/hooks/use-uploadthing"
import FormSendButton from "@/sections/home/components/form/FormSendButton"
import { useComputed, useSignal } from "@preact/signals"
import { type FormEventHandler } from "react"
import { Textarea } from "~ui/textarea"

type Input = string | undefined
type State = "ready" | "loading" | "error"

export default function FormContainer() {
    const { startUpload } = useUploadThing("fileUploader")
    const inputValue = useSignal<Input>("")
    const inputFile = useSignal("")
    const state = useSignal<State>("ready")
    const input = useSignal("")

    const isLoading = useComputed(() => state.value === "loading")
    const disabled = useComputed(() => !input.value || isLoading.value)
    const contentEditable = useComputed(() => !isLoading.value)

    const onFileUpload = async (file: File) => {
        if (file) {
            const files = await startUpload([file])
            const newFile = files?.[0]

            if (newFile) {
                inputFile.value = newFile.appUrl
                input.value = newFile.appUrl
                inputValue.value =
                    "📃 " +
                    newFile.name +
                    ` (${(newFile.size / 1024).toFixed(2)}KB)`
            }
        }
    }
    const handleInput: FormEventHandler<HTMLTextAreaElement> = (e) => {
        input.value = e.currentTarget.value
        inputValue.value = e.currentTarget.value
    }
    const handleSubmit = () => (state.value = "loading")
    return (
        <form
            action="/analysis"
            method="POST"
            className="group flex h-full gap-2 pr-2"
            onSubmit={handleSubmit}
        >
            <Textarea
                name="text"
                className="resize-none px-4"
                placeholder="Analizar un texto..."
                id="analyze-text"
                contentEditable={contentEditable}
                value={input}
                onInput={handleInput}
            />
            <div className="flex flex-col gap-1">
                <input
                    name="file"
                    className="hidden"
                    id="analyze-input"
                    value={inputFile}
                    readOnly
                />
                <FormSendButton disabled={disabled} loading={isLoading} />
                <UploadButton disabled={disabled} onFileUpload={onFileUpload} />
            </div>
        </form>
    )
}
