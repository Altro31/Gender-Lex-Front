import { RefreshCwIcon } from "lucide-react"
import { memo } from "react"
import { Button } from "~ui/button"

interface Props {
    disabled: boolean
    loading: boolean
}

function FormSendButton({ disabled, loading }: Props) {
    return (
        <Button
            size="sm"
            className="rounded-lg transition-opacity"
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

export default memo(FormSendButton)
