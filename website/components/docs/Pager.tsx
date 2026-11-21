import { localizedNav } from '../../lib/nav'
import { messages } from '../../lib/i18n'

export default function Pager({ currentPath, locale }: { currentPath: string; locale: string }) {
  const all = localizedNav(locale).flatMap((g) => g.items)
  const i = all.findIndex((d) => d.path === currentPath)
  if (i === -1) return null
  const prev = all[i - 1]
  const next = all[i + 1]
  const ui = messages(locale).ui
  const card = 'group flex flex-col gap-1 rounded-xl border border-line px-4 py-3 transition-colors hover:border-brand/60 hover:bg-brand-soft'
  return (
    <nav aria-label={ui.pager} className="mt-14 grid gap-3 sm:grid-cols-2">
      {prev ? (
        <a href={prev.path} className={card}>
          <span className="text-xs text-muted">{ui.previous}</span>
          <span className="font-medium text-fg group-hover:text-brand-ink">
            <span className="rtl-flip">←</span> {prev.title}
          </span>
        </a>
      ) : (
        <span />
      )}
      {next && (
        <a href={next.path} className={`${card} text-end sm:col-start-2`}>
          <span className="text-xs text-muted">{ui.next}</span>
          <span className="font-medium text-fg group-hover:text-brand-ink">
            {next.title} <span className="rtl-flip">→</span>
          </span>
        </a>
      )}
    </nav>
  )
}
