import { useState } from 'react'
import { Send } from 'lucide-react'

import { CONTACT_EMAIL, CONTACT_ENDPOINT, contact } from '@/content'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Eyebrow, Heading, Section } from '@/components/Section'

type Status = { kind: 'idle' | 'sending' | 'sent' | 'error'; message?: string }

const emptyForm = { name: '', email: '', organization: '', message: '' }

function mailtoHref(form: typeof emptyForm) {
  const body = [
    `Name: ${form.name}`,
    `Work email: ${form.email}`,
    `Organization: ${form.organization}`,
    '',
    form.message,
  ].join('\n')

  const params = new URLSearchParams({
    subject: `Working session request: ${form.organization || form.name}`,
    body,
  })

  return `mailto:${CONTACT_EMAIL}?${params.toString().replace(/\+/g, '%20')}`
}

export function Contact() {
  const [form, setForm] = useState(emptyForm)
  const [status, setStatus] = useState<Status>({ kind: 'idle' })

  const set = (key: keyof typeof emptyForm) => (event: { target: { value: string } }) =>
    setForm((prev) => ({ ...prev, [key]: event.target.value }))

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (!CONTACT_ENDPOINT) {
      window.location.href = mailtoHref(form)
      return
    }

    setStatus({ kind: 'sending' })
    try {
      const response = await fetch(CONTACT_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (!response.ok) throw new Error(`Request failed with status ${response.status}`)
      setForm(emptyForm)
      setStatus({ kind: 'sent', message: contact.promise })
    } catch (error) {
      setStatus({
        kind: 'error',
        message: `That did not send. Please write to ${CONTACT_EMAIL} instead. (${
          error instanceof Error ? error.message : 'Unknown error'
        })`,
      })
    }
  }

  return (
    <Section id="contact" surface="card" labelledBy="contact-heading">
      <div className="grid gap-12 md:grid-cols-[minmax(0,26rem)_minmax(0,1fr)] md:gap-16">
        <div>
          <Eyebrow>{contact.eyebrow}</Eyebrow>
          <Heading id="contact-heading">{contact.heading}</Heading>
          <p className="mt-6 max-w-prose text-muted-fg">{contact.body}</p>
          <p className="mt-4 max-w-prose text-muted-fg">{contact.promise}</p>
        </div>

        <form onSubmit={onSubmit} className="max-w-xl space-y-5">
          <div className="grid gap-5 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="name">{contact.fields.name}</Label>
              <Input
                id="name"
                name="name"
                autoComplete="name"
                required
                value={form.name}
                onChange={set('name')}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">{contact.fields.email}</Label>
              <Input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={form.email}
                onChange={set('email')}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="organization">{contact.fields.organization}</Label>
            <Input
              id="organization"
              name="organization"
              autoComplete="organization"
              required
              value={form.organization}
              onChange={set('organization')}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="message">{contact.fields.message}</Label>
            <Textarea
              id="message"
              name="message"
              required
              placeholder={contact.messagePlaceholder}
              value={form.message}
              onChange={set('message')}
            />
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <Button type="submit" variant="solid" disabled={status.kind === 'sending'}>
              <Send aria-hidden="true" size={16} />
              {contact.submit}
            </Button>
            {!CONTACT_ENDPOINT ? (
              <p className="text-note text-muted-fg">{contact.mailtoNote}</p>
            ) : null}
          </div>

          <p role="status" aria-live="polite" className="text-note text-muted-fg empty:hidden">
            {status.message ?? ''}
          </p>
        </form>
      </div>
    </Section>
  )
}
