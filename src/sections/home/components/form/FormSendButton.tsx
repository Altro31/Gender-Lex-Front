import { RefreshCwIcon } from "lucide-react"
import type { JSXInternal } from "node_modules/preact/src/jsx"
import { Button } from "~ui/button"

interface Props {
    disabled?: JSXInternal.Signalish<boolean>
    loading?: JSXInternal.Signalish<boolean>
}

export default function FormSendButton({
    disabled = false,
    loading = false,
}: Props) {
    return (
        <Button
            asChild
            size="sm"
            className="cursor-pointer rounded-lg transition-opacity"
            disabled={disabled}
        >
            {loading.valueOf() ? (
                <button className="flex items-center gap-1">
                    <span className="animate-spin">
                        <RefreshCwIcon />
                    </span>
                    <span>Analizando</span>
                </button>
            ) : (
                <button>Enviar</button>
            )}
        </Button>
    )
}
