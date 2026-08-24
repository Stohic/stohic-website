import { comparison } from '@/content'
import { EnclaveComparison } from '@/components/EnclaveComparison'
import { Eyebrow, Heading, Section } from '@/components/Section'

export function Comparison() {
  return (
    <Section
      id="comparison"
      surface="card"
      labelledBy="comparison-heading"
      className="border-y border-border"
    >
      <div className="text-center">
        <Eyebrow>{comparison.eyebrow}</Eyebrow>
        <div className="flex justify-center">
          <Heading id="comparison-heading">{comparison.heading}</Heading>
        </div>
        <p className="mx-auto mt-4 text-muted-fg">{comparison.intro}</p>
      </div>

      <div className="mt-12 md:mt-14">
        <EnclaveComparison />
      </div>
    </Section>
  )
}
