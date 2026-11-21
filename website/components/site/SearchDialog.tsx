import type { Messages } from '../../lib/messages/en'
import { useEffect, useMemo, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { SearchIcon } from './icons'

interface Entry {
  href: string
  title: string
  description: string
  headings: { text: string; slug: string }[]
  body: string
}

interface Hit {
  href: string
  title: string
  sub: string
  snippet: string
  score: number
}

const indexPromises = new Map<string, Promise<Entry[]>>()
function loadIndex(locale: string) {
  let p = indexPromises.get(locale)
  if (!p) {
    p = fetch(`/search-index.${locale}.json`).then((r) => (r.ok ? r.json() : []))
    indexPromises.set(locale, p)
  }
  return p
}

function search(entries: Entry[], query: string): Hit[] {
  const terms = query.toLowerCase().split(/\s+/).filter(Boolean)
  if (!terms.length) return []
  const hits: Hit[] = []
  for (const e of entries) {
    const title = e.title.toLowerCase()
    const body = e.body.toLowerCase()
    if (!terms.every((t) => title.includes(t) || body.includes(t) || e.headings.some((h) => h.text.toLowerCase().includes(t)))) continue
    let score = 0
    for (const t of terms) {
      if (title.includes(t)) score += title.startsWith(t) ? 12 : 8
      if (e.description.toLowerCase().includes(t)) score += 3
      score += Math.min(5, body.split(t).length - 1) * 0.5
    }
    const heading = e.headings.find((h) => terms.every((t) => h.text.toLowerCase().includes(t)))
    const at = body.indexOf(terms[0])
    const snippet =
      at === -1
        ? e.description
        : (at > 40 ? '…' : '') + e.body.slice(Math.max(0, at - 40), at + 110).trim() + '…'
    hits.push({ href: e.href, title: e.title, sub: '', snippet, score })
    if (heading) {
      hits.push({ href: `${e.href}#${heading.slug}`, title: heading.text, sub: e.title, snippet: '', score: score + 4 })
    }
  }
  return hits.sort((a, b) => b.score - a.score).slice(0, 12)
}

export function SearchButton({ onOpen, compact, ui }: { onOpen: () => void; compact?: boolean; ui: Messages['ui'] }) {
  return (
    <button
      type="button"
      onClick={onOpen}
      className={
        compact
          ? 'inline-flex h-9 w-9 items-center justify-center rounded-md text-muted hover:bg-bg-soft hover:text-fg'
          : 'inline-flex h-9 w-44 items-center gap-2 whitespace-nowrap rounded-lg border border-line bg-bg-soft px-3 text-sm text-muted hover:text-fg lg:w-60'
      }
      aria-label={ui.searchDocs}
    >
      <SearchIcon />
      {!compact && (
        <>
          <span className="flex-1 truncate text-start">{ui.searchButton}</span>
          <kbd className="rounded border border-line bg-bg px-1.5 font-sans text-[11px]">⌘ K</kbd>
        </>
      )}
    </button>
  )
}

export default function SearchDialog({ open, onClose, ui, locale }: { open: boolean; onClose: () => void; ui: Messages['ui']; locale: string }) {
  const [entries, setEntries] = useState<Entry[]>([])
  const [query, setQuery] = useState('')
  const [active, setActive] = useState(0)
  const input = useRef<HTMLInputElement>(null)
  const hits = useMemo(() => search(entries, query), [entries, query])

  useEffect(() => {
    if (!open) return
    loadIndex(locale).then(setEntries).catch(() => setEntries([]))
    setActive(0)
    requestAnimationFrame(() => input.current?.focus())
  }, [open])

  useEffect(() => setActive(0), [query])

  if (!open) return null

  const go = (hit: Hit | undefined) => {
    if (hit) window.location.href = hit.href
  }

  return createPortal(
    <div
      className="fixed inset-0 z-[70] flex items-start justify-center bg-black/50 px-4 pt-[10vh] backdrop-blur-sm"
      onMouseDown={(e) => e.target === e.currentTarget && onClose()}
      role="presentation"
    >
      <div role="dialog" aria-modal="true" aria-label={ui.searchDocs} className="w-full max-w-xl overflow-hidden rounded-xl border border-line bg-bg text-fg shadow-2xl">
        <div className="flex items-center gap-3 border-b border-line px-4">
          <SearchIcon className="text-muted" />
          <input
            ref={input}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Escape') onClose()
              else if (e.key === 'ArrowDown') {
                e.preventDefault()
                setActive((a) => Math.min(a + 1, hits.length - 1))
              } else if (e.key === 'ArrowUp') {
                e.preventDefault()
                setActive((a) => Math.max(a - 1, 0))
              } else if (e.key === 'Enter') go(hits[active])
            }}
            placeholder={ui.searchPlaceholder}
            className="no-ring h-14 flex-1 bg-transparent text-base text-fg outline-none placeholder:text-muted"
            aria-label={ui.searchQuery}
          />
          <kbd className="rounded border border-line px-1.5 font-mono text-[11px] text-muted">Esc</kbd>
        </div>
        <ul className="max-h-[60vh] overflow-y-auto p-2" role="listbox">
          {query && hits.length === 0 && <li className="px-3 py-6 text-center text-sm text-muted">{ui.searchNone}</li>}
          {!query && <li className="px-3 py-6 text-center text-sm text-muted">{ui.searchEmpty}</li>}
          {hits.map((hit, i) => (
            <li key={hit.href + i} role="option" aria-selected={i === active}>
              <a
                href={hit.href}
                onMouseEnter={() => setActive(i)}
                className={`block rounded-lg px-3 py-2.5 ${i === active ? 'bg-brand-soft' : ''}`}
              >
                <div className="text-sm font-medium text-fg">
                  {hit.sub && <span className="text-muted">{hit.sub} › </span>}
                  {hit.title}
                </div>
                {hit.snippet && <div className="mt-0.5 line-clamp-2 text-xs text-muted">{hit.snippet}</div>}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>,
    document.body,
  )
}
