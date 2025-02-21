import { ChevronLeft, ChevronRight, MoreHorizontalIcon } from "lucide-react"
import * as React from "react"

import { type ButtonProps, buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const Pagination = ({ className, ...props }: React.ComponentProps<"nav">) => (
    <nav
        role="navigation"
        aria-label="pagination"
        data-slot="pagination"
        className={cn("mx-auto flex w-full justify-center", className)}
        {...props}
    />
)

const PaginationContent = React.forwardRef<
    HTMLUListElement,
    React.ComponentProps<"ul">
>(({ className, ...props }, ref) => (
    <ul
        ref={ref}
        data-slot="pagination-content"
        className={cn("flex flex-row items-center gap-1", className)}
        {...props}
    />
))

const PaginationItem = React.forwardRef<
    HTMLLIElement,
    React.ComponentProps<"li">
>(({ className, ...props }, ref) => (
    <li ref={ref} data-slot="pagination-item" {...props} />
))

type PaginationLinkProps = {
    isActive?: boolean
} & Pick<ButtonProps, "size"> &
    React.ComponentProps<"a">

const PaginationLink = ({
    className,
    isActive,
    size = "icon",
    ...props
}: PaginationLinkProps) => (
    <a
        data-slot="pagination-link"
        data-active={isActive}
        aria-current={isActive ? "page" : undefined}
        className={cn(
            buttonVariants({
                variant: isActive ? "outline" : "ghost",
                size,
            }),
            className,
        )}
        {...props}
    />
)

const PaginationPrevious = ({
    className,
    ...props
}: React.ComponentProps<typeof PaginationLink>) => (
    <PaginationLink
        aria-label="Go to previous page"
        size="default"
        className={cn("gap-1 px-2.5 sm:pl-2.5", className)}
        {...props}
    >
        <ChevronLeft />
        <span className="hidden sm:block">Previous</span>
    </PaginationLink>
)

const PaginationNext = ({
    className,
    ...props
}: React.ComponentProps<typeof PaginationLink>) => (
    <PaginationLink
        aria-label="Go to next page"
        size="default"
        className={cn("gap-1 px-2.5 sm:pr-2.5", className)}
        {...props}
    >
        <span className="hidden sm:block">Next</span>
        <ChevronRight />
    </PaginationLink>
)

const PaginationEllipsis = ({
    className,
    ...props
}: React.ComponentProps<"span">) => (
    <span
        aria-hidden
        data-slot="pagination-ellipsis"
        className={cn("flex size-9 items-center justify-center", className)}
        {...props}
    >
        <MoreHorizontalIcon className="size-4" />
        <span className="sr-only">More pages</span>
    </span>
)

export {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
}
