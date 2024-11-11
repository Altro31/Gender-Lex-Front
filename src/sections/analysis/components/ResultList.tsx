import ResultItem from "@/sections/analysis/components/ResultItem"
import type { ExpressionType } from "@/utils/schemas/gender-lex"

type MaybePartialExpression = Partial<ExpressionType> | undefined

interface Props {
    expressions: MaybePartialExpression[]
}

export default function ResultList({ expressions }: Props) {
    return (
        <>
            {expressions.length > 0 ? (
                expressions.map((expression, index) => (
                    <ResultItem
                        expression={expression}
                        index={index}
                        key={index}
                    />
                ))
            ) : (
                <div className="grid h-full place-content-center">
                    No se detectaron sesgos de género
                </div>
            )}
        </>
    )
}
