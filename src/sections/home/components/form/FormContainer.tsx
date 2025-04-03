import UploadButton from "@/components/UploadButton"
import FormSendButton from "@/sections/home/components/form/FormSendButton"
import { droppedFileStore } from "@/stores/droped-file"
import { batch, useComputed, useSignal, useSignalEffect } from "@preact/signals"
import { type FormEventHandler } from "react"
import { Textarea } from "~ui/textarea"

type Input = string | undefined
type State = "ready" | "loading" | "error"

export default function FormContainer() {
    const inputValue = useSignal<Input>("")
    const state = useSignal<State>("ready")

    const isLoading = useComputed(() => state.value === "loading")
    const disabled = useComputed(() => !inputValue.value || isLoading.value)
    const contentEditable = useComputed(() => !isLoading.value)

    const onFileUpload = async (file: File) => {
        batch(() => {
            inputValue.value =
                "📃 " + file.name + ` (${(file.size / 1024).toFixed(2)}KB)`
        })
    }

    useSignalEffect(() => {
        if (droppedFileStore.value !== null)
            onFileUpload(droppedFileStore.value)
    })

    const handleInput: FormEventHandler<HTMLTextAreaElement> = (e) => {
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
                className="bg-background resize-none px-4"
                placeholder="Analizar un texto..."
                id="analyze-text"
                contentEditable={contentEditable}
                value={inputValue}
                onInput={handleInput}
            />
            <div className="flex flex-col gap-1">
                <FormSendButton disabled={disabled} loading={isLoading} />
                <UploadButton disabled={disabled} onFileUpload={onFileUpload} />
            </div>
        </form>
    )
}
