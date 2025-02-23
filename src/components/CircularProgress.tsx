import { untracked, useSignal } from "@preact/signals"
import React, { useRef, useEffect } from "react"

interface Props {
    progress: number
    size?: number
    strokeWidth?: number
    label?: boolean
    className: string
}

const CircularProgress: React.FC<Props> = ({
    progress,
    size = 100,
    strokeWidth = 8,
    label = false,
    className,
    ...props
}) => {
    const circleRef = useRef<SVGCircleElement>(null)
    const count = useSignal(0)
    const radius = (size - strokeWidth) / 2
    const circumference = radius * 2 * Math.PI

    useEffect(() => {
        const interval = setInterval(() => {
            if (count.peek() >= 100) clearInterval(interval)
            else {
                untracked(() => count.value++)
                if (circleRef.current) {
                    const offset =
                        circumference - (count.peek() / 100) * circumference
                    circleRef.current.style.strokeDashoffset = offset.toString()
                }
            }
        }, 10)
    }, [])

    return (
        <div
            className={`relative inline-flex items-center justify-center ${className}`}
            {...props}
        >
            <svg width={size} height={size} className="-rotate-90 transform">
                <circle
                    className="text-muted-foreground"
                    strokeWidth={strokeWidth}
                    stroke="currentColor"
                    fill="transparent"
                    r={radius}
                    cx={size / 2}
                    cy={size / 2}
                ></circle>
                <circle
                    ref={circleRef}
                    className="text-primary progress-circle transition-all duration-1000 ease-out"
                    strokeWidth={strokeWidth}
                    strokeDasharray={circumference}
                    strokeDashoffset={circumference}
                    strokeLinecap="round"
                    stroke="inherit"
                    fill="transparent"
                    r={radius}
                    cx={size / 2}
                    cy={size / 2}
                ></circle>
            </svg>
            {label && (
                <div className="absolute inset-0 flex items-center justify-center">
                    <span className="progress-label font-medium">{count}%</span>
                </div>
            )}
        </div>
    )
}

export default CircularProgress
