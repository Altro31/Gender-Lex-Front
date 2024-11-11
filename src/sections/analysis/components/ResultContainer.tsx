import ResultList from "@/sections/analysis/components/ResultList"
import { genderLexSchema } from "@/utils/schemas/gender-lex"
import { experimental_useObject as useObject } from "ai/react"
import { actions } from "astro:actions"
import { useEffect } from "react"

interface Props {
    text: string
    analysisId?: number
}

export default function ResultContainer({ text, analysisId }: Props) {
    const { object, submit } = useObject({
        id: "analyze-text",
        api: "/api/analyzeText",
        schema: genderLexSchema,
        onFinish(event) {
            if (!analysisId) return
            const expressions = event.object?.expressions ?? []
            actions.completeAnalysisCreating({ analysisId, expressions })
        },
    })

    useEffect(() => {
        submit(text)
    }, [])

    if (!object?.expressions) return null

    return <ResultList expressions={object.expressions ?? []} />
}
