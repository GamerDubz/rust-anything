import { localizedNav } from '../../lib/nav'
import { messages } from '../../lib/i18n'

export default function Breadcrumb({ currentPath, locale }: { currentPath: string; locale: string }) {
  const nav = localizedNav(locale)
  const group = nav.find((g) => g.items.some((i) => i.path === currentPath))
  const page = group?.items.find((i) => i.path === currentPath)
  if (!group || !page) return null
  const sep = <span aria-hidden className="text-muted/60">›</span>
  return (
    <nav aria-label={messages(locale).ui.breadcrumb} className="mb-4 flex flex-wrap items-center gap-2 text-sm text-muted">
      <a href={nav[0].items[0].path} className="hover:text-fg">{messages(locale).ui.docs}</a>
      {sep}
      <a href={group.items[0].path} className="hover:text-fg">{group.title}</a>
      {sep}
      <span className="font-medium text-fg">{page.title}</span>
    </nav>
  )
}
