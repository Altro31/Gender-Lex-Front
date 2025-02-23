import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import type { AvailableModelsType } from "@/services/ai/models"
import { model } from "@/stores/model"
import { actions } from "astro:actions"

interface Props {
    options: any[]
    defaultValue: any
}

export default function Combobox({ defaultValue, options }: Props) {
    const handleChange = (currentValue: AvailableModelsType) => {
        model.value = currentValue
        actions.registerModel(currentValue)
    }
    return (
        <Select defaultValue={defaultValue} onValueChange={handleChange}>
            <SelectTrigger className="not-menu:hidden">
                <SelectValue />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    {options.map((option: AvailableModelsType) => (
                        <SelectItem key={option} value={option}>
                            {option}
                        </SelectItem>
                    ))}
                </SelectGroup>
            </SelectContent>
        </Select>
    )
}
