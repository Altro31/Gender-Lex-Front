import { genderLexSchema } from "@/utils/schemas/gender-lex"
import { experimental_useObject as useObject } from "ai/react"
import { useEffect, type PropsWithChildren } from "react"
import ResultItem from "./ResultItem"

interface Props extends PropsWithChildren {
    text: string
}

export default function ResultContainer({ text, children }: Props) {
    const { object, submit } = useObject({
        id: "analyze-text",
        api: "/api/analyzeText",
        schema: genderLexSchema,
    })

    useEffect(() => {
        submit(text)
    }, [])

    if (!object?.expressions) return null

    return (
        <div className="space-y-4 p-10">
            {object.expressions.length
                ? object.expressions.map((expression, index) => (
                      <ResultItem expression={expression} index={index} />
                  ))
                : children}
        </div>
    )
}
