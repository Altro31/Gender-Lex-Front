import type { ExpressionType } from "@/utils/schemas/gender-lex"
import { Skeleton } from "~ui/skeleton"

interface Props {
    expression?: Partial<ExpressionType>
    index: number
}

export default function ResultItem({ expression, index }: Props) {
    return (
        expression && (
            <div className="overflow-hidden rounded-lg bg-white shadow-md dark:bg-gray-800">
                <div className="p-6">
                    <h2 className="mb-2 text-xl font-semibold">
                        Expresión {index + 1}
                    </h2>
                    <p className="mb-4 text-gray-600 dark:text-gray-400">
                        Contenido original: {expression.originalText}
                    </p>
                    <div className="space-y-4">
                        {expression.biasRate !== undefined && (
                            <div>
                                <h3 className="mb-2 font-semibold">
                                    Tasa de Sesgo
                                </h3>
                                <div className="flex items-center space-x-2">
                                    <div className="h-2.5 w-full rounded-full bg-gray-200 dark:bg-gray-700">
                                        <div
                                            className={`h-2.5 rounded-full ${getBiasColor(expression.biasRate)}`}
                                            style={{
                                                width: `${expression.biasRate * 100}%`,
                                            }}
                                        />
                                    </div>
                                    <span className="text-sm font-medium">
                                        {(expression.biasRate * 100).toFixed(
                                            0,
                                        ) + "%"}
                                    </span>
                                </div>
                            </div>
                        )}
                        <div>
                            <h3 className="mb-2 font-semibold">
                                Justificación
                            </h3>
                            {expression.justification ? (
                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                    {expression.justification}
                                </p>
                            ) : (
                                <Skeleton className="h-16" />
                            )}
                        </div>
                        <div>
                            <h3 className="mb-2 font-semibold">
                                Ejemplo Corregido
                            </h3>
                            {expression.alternative ? (
                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                    {expression.alternative}
                                </p>
                            ) : (
                                <Skeleton className="h-4" />
                            )}
                        </div>
                    </div>
                </div>
            </div>
        )
    )
}

function getBiasColor(biasRate: number): string {
    if (biasRate < 0.3) return "bg-green-500"
    if (biasRate < 0.7) return "bg-yellow-500"
    return "bg-red-500"
}
