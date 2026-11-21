import type { Messages } from '../../lib/messages/en'
import { useEffect, useState } from 'react'

interface Heading {
  id: string
  text: string
  depth: number
}

function readHeadings(): Heading[] {
  return Array.from(document.querySelectorAll<HTMLElement>('#main-content h2[id], #main-content h3[id]')).map((h) => ({
    id: h.id,
    text: Array.from(h.childNodes)
      .filter((n) => !(n instanceof HTMLElement && n.classList.contains('header-anchor')))
      .map((n) => n.textContent ?? '')
      .join('')
      .trim(),
    depth: h.tagName === 'H2' ? 2 : 3,
  }))
}

export default function Toc({ variant = 'rail', editUrl, ui }: { variant?: 'rail' | 'inline'; editUrl?: string; ui: Messages['ui'] }) {
  const [headings, setHeadings] = useState<Heading[]>([])
  const [active, setActive] = useState('')

  useEffect(() => {
    const hs = readHeadings()
    setHeadings(hs)
    if (variant !== 'rail' || !hs.length) return
    const onScroll = () => {
      let current = hs[0].id
      for (const h of hs) {
        const el = document.getElementById(h.id)
        if (el && el.getBoundingClientRect().top < 120) current = h.id
      }
      setActive(current)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [variant])

  const list = (
    <ul className="space-y-1.5 text-sm">
      {headings.map((h) => (
        <li key={h.id} className={h.depth === 3 ? 'pl-3' : ''}>
          <a
            href={`#${h.id}`}
            className={`block leading-snug ${active === h.id ? 'font-semibold text-brand-ink' : 'text-muted hover:text-fg'}`}
          >
            {h.text}
          </a>
        </li>
      ))}
    </ul>
  )

  if (variant === 'inline') {
    if (headings.length < 2) return null
    return (
      <details className="mb-6 rounded-lg border border-line bg-bg-soft px-4 py-3 xl:hidden">
        <summary className="cursor-pointer text-sm font-medium text-fg">{ui.onThisPage}</summary>
        <div className="mt-3">{list}</div>
      </details>
    )
  }

  return (
    <div className="thin-scrollbar sticky top-16 max-h-[calc(100vh-4rem)] overflow-y-auto py-8 pl-2 pr-6">
      {headings.length > 1 && (
        <>
          <div className="mb-3 text-sm font-semibold text-fg">{ui.onThisPage}</div>
          {list}
        </>
      )}
      {editUrl && (
        <a href={editUrl} className="mt-6 block border-t border-line pt-4 text-sm text-muted hover:text-fg">
          {ui.editPage} <span className="rtl-flip">→</span>
        </a>
      )}
    </div>
  )
}
