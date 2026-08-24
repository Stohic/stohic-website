import { Comparison } from '@/components/Comparison'
import { Contact } from '@/components/Contact'
import { Cryptography } from '@/components/Cryptography'
import { Hero } from '@/components/Hero'
import { HowItWorks } from '@/components/HowItWorks'
import { Nav } from '@/components/Nav'
import { Problem } from '@/components/Problem'
import { SiteFooter } from '@/components/SiteFooter'
import { WhatYouGet } from '@/components/WhatYouGet'
import { WhoThisIsFor } from '@/components/WhoThisIsFor'

export default function App() {
  return (
    <>
      <a
        href="#main"
        className="sr-only-focusable fixed left-4 top-4 z-[60] rounded-sm bg-accent px-4 py-2 font-bold text-brand-900"
      >
        Skip to content
      </a>

      <Nav />

      <main id="main">
        <Hero />
        <Problem />
        <Comparison />
        <HowItWorks />
        <WhatYouGet />
        <WhoThisIsFor />
        <Cryptography />
        <Contact />
      </main>

      <SiteFooter />
    </>
  )
}
