import { RefreshCwIcon } from "lucide-react"
import { Button } from "~ui/button"

interface Props {
    disabled?: boolean
    loading?: boolean
}

export default function FormSendButton({
    disabled = false,
    loading = false,
}: Props) {
    return (
        <Button
            size="sm"
            className="cursor-pointer rounded-lg transition-opacity"
            disabled={disabled}
        >
            {loading ? (
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
    )
}
