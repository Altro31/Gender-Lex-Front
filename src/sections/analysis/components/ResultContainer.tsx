import ResultList from "@/sections/analysis/components/ResultList"
import { genderLexSchema } from "@/utils/schemas/gender-lex"
import { experimental_useObject as useObject } from "ai/react"
import { actions } from "astro:actions"
import { useEffect, useTransition } from "react"

interface Props {
    text: string
}

export default function ResultContainer({ text }: Props) {
    const { object, submit } = useObject({
        id: "analyze-text",
        api: "/api/analyzeText",
        schema: genderLexSchema,
        onFinish(event) {
            const expressions = event.object?.expressions ?? []
            actions.registerAnalysis({ expressions, text })
        },
    })

    useEffect(() => {
        submit(text)
    }, [])

    if (!object?.expressions) return null

    return (
        <>
            <ResultList expressions={object.expressions ?? []} />
        </>
    )
}
