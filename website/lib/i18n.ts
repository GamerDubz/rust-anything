import { en, type Messages } from './messages/en'
import { DEFAULT_LOCALE } from './locales'
import { translations as loaded } from './messages/index'

export * from './locales'
export type { Messages }


function merge<T>(base: T, over: unknown): T {
  if (Array.isArray(base)) {
    if (!Array.isArray(over) || over.length !== base.length) return base
    return base.map((b, i) => merge(b, over[i])) as T
  }
  if (base && typeof base === 'object') {
    if (!over || typeof over !== 'object') return base
    const out: Record<string, unknown> = {}
    for (const k of Object.keys(base as object)) {
      out[k] = merge((base as Record<string, unknown>)[k], (over as Record<string, unknown>)[k])
    }
    return out as T
  }
  return (typeof over === typeof base ? over : base) as T
}

const cache = new Map<string, Messages>()
export function messages(locale: string): Messages {
  if (locale === DEFAULT_LOCALE || !loaded[locale]) return en
  let m = cache.get(locale)
  if (!m) {
    m = merge(en, loaded[locale])
    cache.set(locale, m)
  }
  return m
}
