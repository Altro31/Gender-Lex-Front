import * as React from "react"
import { Check, ChevronsUpDown } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { actions } from "astro:actions"

interface Props {
    options: any[]
    defaultValue: any
}

export default function Combobox({ defaultValue, options }: Props) {
    const [open, setOpen] = React.useState(false)
    const [value, setValue] = React.useState(defaultValue)

    const handleSelect = (currentValue: any) => () => {
        setValue(currentValue === value ? "" : currentValue)
        setOpen(false)
        actions.registerModel(currentValue)
    }

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="menu:flex -ml-2 hidden w-full cursor-pointer justify-between"
                >
                    {value}
                    <ChevronsUpDown className="opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-39 p-0">
                <Command>
                    <CommandInput
                        placeholder="Search framework..."
                        className="h-9"
                    />
                    <CommandList>
                        <CommandEmpty>Sin resultados...</CommandEmpty>
                        <CommandGroup>
                            {options.map((option) => (
                                <CommandItem
                                    key={option}
                                    value={option}
                                    onSelect={handleSelect(option)}
                                >
                                    {option}
                                    <Check
                                        className={cn(
                                            "ml-auto",
                                            value === option
                                                ? "opacity-100"
                                                : "opacity-0",
                                        )}
                                    />
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    )
}
