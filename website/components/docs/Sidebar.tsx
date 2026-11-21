import { localizedNav } from '../../lib/nav'
import { messages } from '../../lib/i18n'

const Chevron = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden className="transition-transform group-open:rotate-180">
    <path d="m6 9 6 6 6-6" />
  </svg>
)

export default function Sidebar({ currentPath, locale, footer }: { currentPath: string; locale: string; footer?: React.ReactNode }) {
  const nav = localizedNav(locale)
  return (
    <div className="sticky top-16 flex h-[calc(100vh-4rem)] flex-col">
      <nav aria-label={messages(locale).ui.docs} className="thin-scrollbar flex-1 overflow-y-auto px-4 pt-6 pb-4">
        {nav.map((g) => (
          <details key={g.key} open className="group mb-3">
            <summary className="flex cursor-pointer items-center justify-between rounded-md px-2 py-1.5 text-xs font-semibold text-muted hover:text-fg">
              {g.title}
              <Chevron />
            </summary>
            <ul className="mt-1 space-y-px">
              {g.items.map((i) => {
                const on = i.path === currentPath
                return (
                  <li key={i.path}>
                    <a
                      href={i.path}
                      aria-current={on ? 'page' : undefined}
                      className={`block rounded-md px-2 py-1.5 text-[13.5px] transition-colors ${on ? 'bg-brand-soft font-medium text-brand-ink' : 'text-fg/75 hover:bg-bg-soft hover:text-fg'}`}
                    >
                      {i.title}
                    </a>
                  </li>
                )
              })}
            </ul>
          </details>
        ))}
      </nav>
      {footer && <div className="border-t border-line px-4 py-2">{footer}</div>}
    </div>
  )
}
