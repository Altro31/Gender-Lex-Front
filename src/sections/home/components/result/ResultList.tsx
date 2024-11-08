import type { ExpressionType } from "@/utils/schemas/gender-lex"
import ResultItem from "./ResultItem"

interface Props {
    expressions: (Partial<ExpressionType> | undefined)[]
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
