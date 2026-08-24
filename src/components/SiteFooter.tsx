import { footer } from '@/content'

export function SiteFooter() {
  const year = new Date().getFullYear()

  return (
    <footer className="surface-dark bg-brand-900 py-12">
      <div className="shell flex flex-col gap-6 md:flex-row md:items-baseline md:justify-between">
        <div>
          <p className="font-sans font-black text-white">{footer.company}</p>
          <p className="mt-1 text-note text-brand-300">{footer.location}</p>
        </div>

        <div className="flex flex-col gap-4 md:items-end">
          <nav aria-label="Legal">
            <ul className="flex gap-6">
              {footer.links.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-note text-brand-300 transition-colors duration-200 hover:text-white motion-reduce:transition-none"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <p className="text-note text-brand-300">{footer.copyright(year)}</p>
        </div>
      </div>
    </footer>
  )
}
