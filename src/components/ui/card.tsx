import * as React from "react"

import { cn } from "@/lib/utils"

const Card = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
    <div
        ref={ref}
        data-slot="card"
        className={cn(
            "bg-card text-card-foreground flex flex-col gap-6 rounded-xl border py-6 shadow-sm",
            className,
        )}
        {...props}
    />
))

const CardHeader = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
    <div
        ref={ref}
        data-slot="card-header"
        className={cn("flex flex-col gap-1.5 px-6", className)}
        {...props}
    />
))

const CardTitle = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
    <div
        ref={ref}
        data-slot="card-title"
        className={cn("leading-none font-semibold", className)}
        {...props}
    />
))

const CardDescription = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
    <div
        ref={ref}
        data-slot="card-description"
        className={cn("text-muted-foreground text-sm", className)}
        {...props}
    />
))

const CardContent = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
    <div
        ref={ref}
        data-slot="card-content"
        className={cn("px-6", className)}
        {...props}
    />
))

const CardFooter = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
    <div
        ref={ref}
        data-slot="card-footer"
        className={cn("flex items-center px-6", className)}
        {...props}
    />
))

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent }
