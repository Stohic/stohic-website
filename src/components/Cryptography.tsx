import { cryptography, secureBrowsingNote } from '@/content'
import { FootnoteList, FootnoteRef } from '@/components/Footnote'
import { Eyebrow, Heading, Section } from '@/components/Section'

const SCOPE = 'cryptography'

export function Cryptography() {
  return (
    <Section id="cryptography" surface="dark800" labelledBy="crypto-heading">
      <Eyebrow dark>{cryptography.eyebrow}</Eyebrow>
      <Heading id="crypto-heading" dark>
        {cryptography.heading}
      </Heading>

      <div className="mt-8 max-w-prose space-y-6 text-brand-300 md:mt-10">
        {cryptography.paragraphs.map((paragraph, i) => (
          <p key={i}>{paragraph}</p>
        ))}

        <p>
          {cryptography.browsing}
          <FootnoteRef scope={SCOPE} n={1} dark />
        </p>

        <p>{cryptography.closing}</p>
      </div>

      <FootnoteList scope={SCOPE} notes={[secureBrowsingNote]} dark />
    </Section>
  )
}
