import type { Messages } from '../../lib/messages/en'
import { useEffect, useState } from 'react'
import { MonitorIcon, MoonIcon, SunIcon } from './icons'

type Mode = 'dark' | 'light' | 'system'
const ORDER: Mode[] = ['dark', 'light', 'system']

function readMode(): Mode {
  try {
    const t = localStorage.getItem('theme')
    return t === 'light' || t === 'system' ? t : 'dark'
  } catch {
    return 'dark'
  }
}

function apply(mode: Mode) {
  const dark = mode === 'dark' || (mode === 'system' && matchMedia('(prefers-color-scheme: dark)').matches)
  document.documentElement.setAttribute('data-theme', dark ? 'dark' : 'light')
}

export default function ThemeToggle({ withLabel = false, ui }: { withLabel?: boolean; ui: Messages['ui'] }) {
  const LABEL: Record<Mode, string> = { dark: ui.themeDark, light: ui.themeLight, system: ui.themeSystem }
  const [mode, setMode] = useState<Mode>('dark')
  useEffect(() => setMode(readMode()), [])
  const next = ORDER[(ORDER.indexOf(mode) + 1) % ORDER.length]
  const Icon = mode === 'light' ? SunIcon : mode === 'dark' ? MoonIcon : MonitorIcon
  return (
    <button
      type="button"
      onClick={() => {
        try {
          localStorage.setItem('theme', next)
        } catch {}
        setMode(next)
        apply(next)
      }}
      className={`inline-flex h-8 items-center gap-2 rounded-md text-sm text-muted hover:bg-bg-soft hover:text-fg ${withLabel ? 'px-2' : 'w-8 justify-center'}`}
      aria-label={`${ui.theme}: ${LABEL[mode]}. ${ui.themeSwitch} ${LABEL[next]}`}
      title={`${ui.theme}: ${LABEL[mode]}`}
    >
      <Icon />
      {withLabel && <span>{LABEL[mode]}</span>}
    </button>
  )
}
