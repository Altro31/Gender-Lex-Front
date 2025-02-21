import * as React from "react"
import * as PopoverPrimitive from "@radix-ui/react-popover"

import { cn } from "@/lib/utils"

const Popover = ({ open, ...props }: PopoverPrimitive.PopoverProps) => (
    <PopoverPrimitive.Root
        data-slot="popover"
        open={open?.valueOf()}
        {...props}
    />
)

const PopoverTrigger = (props: PopoverPrimitive.PopoverTriggerProps) => (
    <PopoverPrimitive.PopoverTrigger data-slot="popover" {...props} />
)

const PopoverContent = React.forwardRef<
    React.ElementRef<typeof PopoverPrimitive.Content>,
    React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Content>
>(({ className, align = "center", sideOffset = 4, ...props }, ref) => (
    <PopoverPrimitive.Portal>
        <PopoverPrimitive.Content
            ref={ref}
            align={align}
            sideOffset={sideOffset}
            data-slot="popover-content"
            className={cn(
                "bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 w-72 rounded-md border p-4 shadow-md outline-hidden",
                className,
            )}
            {...props}
        />
    </PopoverPrimitive.Portal>
))

const PopoverAnchor = (props: PopoverPrimitive.PopoverAnchorProps) => (
    <PopoverPrimitive.PopoverAnchor data-slot="popover-anchor" {...props} />
)

export { Popover, PopoverTrigger, PopoverContent, PopoverAnchor }
