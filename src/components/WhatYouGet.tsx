import { secureBrowsingNote, whatYouGet } from '@/content'
import { FootnoteList, FootnoteRef } from '@/components/Footnote'
import { Eyebrow, Heading, Section } from '@/components/Section'

const SCOPE = 'what-you-get'

export function WhatYouGet() {
  return (
    <Section id="what-you-get" surface="card2" labelledBy="wyg-heading">
      <Eyebrow>{whatYouGet.eyebrow}</Eyebrow>
      <Heading id="wyg-heading">{whatYouGet.heading}</Heading>

      <dl className="mt-12 md:mt-16">
        {whatYouGet.items.map((item, i) => (
          <div
            key={item.label}
            className={
              'grid gap-2 border-t border-border py-7 md:grid-cols-[15rem_1fr] md:gap-10 ' +
              (i === whatYouGet.items.length - 1 ? 'border-b' : '')
            }
          >
            <dt className="font-mono text-[0.9375rem] font-bold text-brand-600">{item.label}</dt>
            <dd className="max-w-prose text-muted-fg">
              {item.body}
              {item.footnote ? <FootnoteRef scope={SCOPE} n={1} /> : null}
            </dd>
          </div>
        ))}
      </dl>

      <div className="mt-12 grid gap-10 md:grid-cols-2 md:gap-12">
        {whatYouGet.extras.map((extra) => (
          <div key={extra.lead} className="max-w-prose">
            <p className="font-bold text-fg">{extra.lead}</p>
            <p className="mt-3 text-muted-fg">{extra.body}</p>
          </div>
        ))}
      </div>

      <FootnoteList scope={SCOPE} notes={[secureBrowsingNote]} />
    </Section>
  )
}
