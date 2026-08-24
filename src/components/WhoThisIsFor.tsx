import { whoThisIsFor } from '@/content'
import { Eyebrow, Heading, Section } from '@/components/Section'

export function WhoThisIsFor() {
  return (
    <Section id="who-this-is-for" labelledBy="who-heading">
      <Eyebrow>{whoThisIsFor.eyebrow}</Eyebrow>
      <Heading id="who-heading">{whoThisIsFor.heading}</Heading>

      <div className="mt-12 grid gap-10 md:mt-16 md:grid-cols-3 md:gap-8">
        {whoThisIsFor.segments.map((segment) => (
          <div key={segment.label} className="max-w-prose">
            <h3 className="font-mono text-[0.9375rem] font-bold text-brand-600">{segment.label}</h3>
            <p className="mt-3 text-muted-fg">{segment.body}</p>
          </div>
        ))}
      </div>
    </Section>
  )
}
