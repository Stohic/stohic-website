import { howItWorks } from '@/content'
import { Eyebrow, Heading, Section } from '@/components/Section'

export function HowItWorks() {
  return (
    <Section id="how-it-works" labelledBy="how-heading">
      <Eyebrow>{howItWorks.eyebrow}</Eyebrow>
      <Heading id="how-heading">{howItWorks.heading}</Heading>
      <p className="lede mt-6 text-muted-fg">{howItWorks.intro}</p>

      <dl className="mt-12 md:mt-16">
        {howItWorks.points.map((point, i) => (
          <div
            key={point.label}
            className={
              'grid gap-2 border-t border-border py-7 md:grid-cols-[15rem_1fr] md:gap-10 ' +
              (i === howItWorks.points.length - 1 ? 'border-b' : '')
            }
          >
            <dt className="font-mono text-[0.9375rem] font-bold text-brand-600">{point.label}</dt>
            <dd className="max-w-prose text-muted-fg">{point.body}</dd>
          </div>
        ))}
      </dl>
    </Section>
  )
}
