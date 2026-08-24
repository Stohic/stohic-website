import { hero } from '@/content'
import { Button } from '@/components/ui/button'

export function Hero() {
  return (
    <section
      id="top"
      aria-labelledby="hero-heading"
      className="surface-dark bg-brand-900 py-24 md:py-36"
    >
      <div className="shell">
        <h1
          id="hero-heading"
          className="text-[clamp(2.5rem,6vw,4rem)] leading-[1.08] tracking-[-0.02em]"
        >
          {/* Trailing space keeps the two lines from running together in the
              accessible name and in copied text. */}
          <span className="block font-light text-brand-300">{hero.line1} </span>
          <span className="block font-bold text-white">{hero.line2}</span>
        </h1>

        <p className="lede mt-8 text-brand-300">{hero.body}</p>

        <div className="mt-10">
          <Button asChild variant="accent">
            <a href="#contact">{hero.cta}</a>
          </Button>
        </div>
      </div>
    </section>
  )
}
