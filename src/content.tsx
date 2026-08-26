import type { ReactNode } from 'react'

/**
 * ---------------------------------------------------------------------------
 * REPLACE ME. The contact form has no backend.
 *
 * Leave CONTACT_ENDPOINT null and the form composes a mailto: to CONTACT_EMAIL.
 * Set it to a real URL and the form POSTs JSON instead. If you do that, add the
 * endpoint's origin to connect-src in the CSP meta tag in index.html.
 * ---------------------------------------------------------------------------
 */
export const CONTACT_ENDPOINT: string | null = null
export const CONTACT_EMAIL = 'hello@stohic.com'

const Mono = ({ children }: { children: ReactNode }) => (
  <span className="font-mono text-[0.95em]">{children}</span>
)

export const nav = [
  { href: '#problem', label: 'The problem' },
  { href: '#comparison', label: 'Comparison' },
  { href: '#how-it-works', label: 'How it works' },
  { href: '#what-you-get', label: 'What you get' },
  { href: '#cryptography', label: 'Cryptography' },
  { href: '#contact', label: 'Contact' },
]

export const hero = {
  line1: 'Encryption hides what you said.',
  line2: 'Not who you said it to.',
  body: 'Stohic Enclave gives every customer its own isolated deployment, with its own entrance and an exit your organization governs. There is no shared platform to look at, so from outside there is no way to list who the customers are or to tell which of them are working together.',
  cta: 'Request a working session',
}

export const problem = {
  eyebrow: 'The problem',
  heading: 'Who is talking to whom is its own kind of secret',
  blocks: [
    {
      lead: 'Shared platforms leak association.',
      body: 'Most collaboration tools put every customer in one building with one front door. Permissions decide what each tenant can open once inside. They do not change the fact that everyone arrives at the same address, where anyone watching can see who comes and goes.',
    },
    {
      lead: 'Encryption does not address it.',
      body: 'Strong encryption protects the contents of a message and leaves the pattern intact. An observer outside still sees who is connected to whom, how often they talk, and when the pace changes. That pattern is frequently enough.',
    },
    {
      lead: 'Sometimes the relationship is the sensitive fact.',
      body: 'A law firm and a company that has not announced anything yet. A university and the partner it shares restricted work with. Two competitors comparing notes after the same intrusion. In each case the existence of the conversation is the part that cannot get out, and the contents are almost beside the point.',
    },
  ],
}

export const comparison = {
  eyebrow: 'One front door, or your own street',
  heading: 'The same six organizations, two architectures',
  intro: 'Switch between them.',
  options: {
    shared: 'Shared platform',
    enclave: 'Enclave',
  },
  captions: {
    shared:
      'Six organizations, one front door. Anyone watching from outside can list who the customers are, and the pattern of traffic shows which of them are working together.',
    enclave:
      'Six deployments, six separate entrances, nothing held in common. From outside, an observer cannot see which organizations exist, or that any two of them are working together.',
  },
  descriptions: {
    shared:
      'Diagram. Six organizations arranged below a single shared front door, each connected to it, with faint lines running between three pairs of organizations that are working together.',
    enclave:
      'Diagram. The shared front door is gone. Each of the six organizations sits inside its own bounded area with its own separate entrance, and the lines between them are gone.',
  },
}

export const howItWorks = {
  eyebrow: 'How it works',
  heading: 'One deployment per customer',
  intro:
    'The architecture is the product. Four things follow from it, and none of them depend on getting a permission model exactly right.',
  points: [
    {
      label: 'Its own deployment',
      body: 'Every customer, program or matter runs on a deployment of its own. Nothing is shared with another customer, so there is no tenant boundary that can be misconfigured.',
    },
    {
      label: 'Its own entrance',
      body: 'Each deployment answers at its own address. Your people reach yours. That address tells an outsider nothing about anyone else, because there is no one else behind it.',
    },
    {
      label: 'An exit you govern',
      body: 'You decide where traffic leaves. That exit is yours to point, restrict and log, rather than a default we picked once on behalf of everyone.',
    },
    {
      label: 'Nothing to enumerate',
      body: 'No common surface holds a directory of customers, so there is no directory for anyone to read. An observer who finds one deployment learns about that deployment.',
    },
  ],
}

export const whatYouGet: {
  eyebrow: string
  heading: string
  items: { label: string; body: ReactNode; footnote: boolean }[]
  extras: { lead: string; body: string }[]
} = {
  eyebrow: 'What you get',
  heading: 'Familiar tools, on ground that is only yours',
  items: [
    {
      label: 'Chat',
      body: 'Talk to your team in channels and direct messages, and search the history later, all of it inside your own deployment.',
      footnote: false,
    },
    {
      label: 'Files',
      body: 'Share documents and keep versions straight without them passing through a service that other organizations also use.',
      footnote: false,
    },
    {
      label: 'Data rooms',
      body: 'Open a room for a transaction or an investigation, decide who may enter, and close it when the work is done.',
      footnote: false,
    },
    {
      label: 'Secure browsing',
      body: (
        <>
          Do research without it tracing back to your organization’s own address. Traffic leaves
          through a managed <Mono>WireGuard</Mono> tunnel in a region you choose, so the exit point
          is yours to pick.
        </>
      ),
      footnote: true,
    },
  ],
  extras: [
    {
      lead: 'Bring in an outside collaborator without bringing them in.',
      body: 'Counsel, a forensics vendor or a regulator can be admitted to a single conversation rather than to the platform. They get the thread they need and nothing arranged around it.',
    },
    {
      lead: 'Release material for a period, not forever.',
      body: 'Set how long access lasts when you grant it. When the period ends, access ends, and nobody has to remember to go back and take it away.',
    },
  ],
}

export const whoThisIsFor = {
  eyebrow: 'Who this is for',
  heading: 'Three kinds of work',
  segments: [
    {
      label: 'Legal and incident response',
      body: 'Firms and response teams whose client list is confidential and whose engagements are often newsworthy before they are public. Run a matter with the client, the forensics vendor and outside counsel in one place, without the fact of the engagement surfacing in anyone’s traffic.',
    },
    {
      label: 'Research institutions',
      body: 'Universities and institutes working under agreements that restrict who may see the work and where it may travel. Collaborate with a partner institution and keep the collaboration itself out of view.',
    },
    {
      label: 'Defense and regulated industry',
      body: 'Programs where the relationship between a prime, a supplier and a customer carries its own sensitivity. Hold the conversations that would say too much if an outsider merely knew they were happening.',
    },
  ],
}

export const cryptography = {
  eyebrow: 'Cryptography',
  heading: 'What Enclave implements',
  paragraphs: [
    (
      <>
        Enclave is CNSA 2.0 compliant at the Category 5 parameter sets. Key establishment uses{' '}
        <Mono>ML-KEM-1024</Mono>, per <Mono>FIPS 203</Mono>. Signatures use <Mono>ML-DSA-87</Mono>,
        per <Mono>FIPS 204</Mono>.
      </>
    ),
    (
      <>
        Category 5 is the highest of the parameter sets, chosen for material that has to stay closed
        long after a quantum computer capable of breaking today’s public key cryptography
        exists. Traffic captured now and stored is still traffic. The parameter set is the part of
        that problem we can decide today.
      </>
    ),
  ],
  browsing: (
    <>
      Secure browsing runs over a managed <Mono>WireGuard</Mono> tunnel, which uses{' '}
      <Mono>ChaCha20-Poly1305</Mono> for data, <Mono>Curve25519</Mono> for key agreement and{' '}
      <Mono>BLAKE2s</Mono> for hashing.
    </>
  ),
  closing:
    'Those are facts about what the software implements. Questions about how we run and review the company itself are better answered by a person, and we would rather have that conversation directly.',
}

export const contact = {
  eyebrow: 'Contact',
  heading: 'Request a working session',
  body: 'Tell us what you are trying to protect and who needs to be in the room. A working session runs about an hour with an engineer present. It is not a slide deck.',
  promise: 'A real person reads this. You will usually hear back within a business day.',
  fields: {
    name: 'Name',
    email: 'Work email',
    organization: 'Organization',
    message: 'Message',
  },
  messagePlaceholder: 'What are you working on, and what would you like to see?',
  submit: 'Send',
  mailtoNote: 'This opens your email client. Nothing is sent from this page.',
}

export const footer = {
  company: 'Stohic, Inc.',
  location: 'Kansas City, Missouri',
  copyright: (year: number) => `© ${year} Stohic, Inc. All rights reserved.`,
  links: [
    { href: '/privacy/', label: 'Privacy' },
    { href: '/terms/', label: 'Terms' },
  ],
}

/**
 * Footnote 1. Used verbatim wherever a secure browsing claim appears.
 *
 * DO NOT reintroduce a FIPS 140-3 claim here without a module to point at.
 * A previous version of this note cited the AWS-LC 3 module under CMVP
 * certificates 5314 (static) and 5298 (dynamic). Those certificates are real,
 * but AWS-LC is not in this product: the secure browser is stock Debian
 * `chromium` (BoringSSL) and the egress path is stock `wireguard` from apt.
 * Neither is a FIPS-validated module, and `aws-lc` appears nowhere in the
 * source. enc-api docs/COMPLIANCE-GAP-ANALYSIS.md also still lists FIPS
 * validation as an OPEN gap (FED-SC-01), which a customer or auditor reading
 * both documents would notice.
 */
export const secureBrowsingNote: ReactNode = (
  <>
    Secure browsing is streamed as pixels: the page renders on an isolated instance and never
    on your machine. Egress is a managed <Mono>WireGuard</Mono> tunnel with a per-campaign
    address, so traffic a target sees is never your organization’s own.
  </>
)
