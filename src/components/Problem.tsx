import { problem } from '@/content'
import { Eyebrow, Heading, Section } from '@/components/Section'

export function Problem() {
  return (
    <Section id="problem" labelledBy="problem-heading">
      <Eyebrow>{problem.eyebrow}</Eyebrow>
      <Heading id="problem-heading">{problem.heading}</Heading>

      <div className="mt-12 grid gap-10 md:mt-16 md:grid-cols-3 md:gap-8">
        {problem.blocks.map((block) => (
          <div key={block.lead} className="max-w-prose">
            <p className="font-bold text-fg">{block.lead}</p>
            <p className="mt-3 text-muted-fg">{block.body}</p>
          </div>
        ))}
      </div>
    </Section>
  )
}
