import ResultItem from "@/sections/analysis/components/ResultItem"
import type { ExpressionType } from "@/utils/schemas/gender-lex"

type MaybePartialExpression = Partial<ExpressionType> | undefined

interface Props {
    expressions: MaybePartialExpression[]
}

export default function ResultList({ expressions }: Props) {
    return (
        <div className="space-y-4 p-10">
            {expressions.length > 0 &&
                expressions.map((expression, index) => (
                    <ResultItem
                        expression={expression}
                        index={index}
                        key={index}
                    />
                ))}
        </div>
    )
}
