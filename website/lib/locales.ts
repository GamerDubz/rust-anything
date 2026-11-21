export const LOCALES = [
  { code: 'en', name: 'English', lang: 'en' },
  { code: 'tr', name: 'Türkçe', lang: 'tr' },
  { code: 'uk', name: 'Українська', lang: 'uk' },
  { code: 'zh', name: '简体中文', lang: 'zh-Hans' },
  { code: 'zh-tw', name: '繁體中文', lang: 'zh-Hant' },
  { code: 'de', name: 'Deutsch', lang: 'de' },
  { code: 'fr', name: 'Français', lang: 'fr' },
  { code: 'ru', name: 'Русский', lang: 'ru' },
  { code: 'ja', name: '日本語', lang: 'ja' },
  { code: 'ko', name: '한국어', lang: 'ko' },
  { code: 'az', name: 'Azərbaycanca', lang: 'az' },
  { code: 'uz', name: 'Oʻzbekcha', lang: 'uz' },
  { code: 'kk', name: 'Қазақша', lang: 'kk' },
  { code: 'ky', name: 'Кыргызча', lang: 'ky' },
  { code: 'tk', name: 'Türkmençe', lang: 'tk' },
  { code: 'tt', name: 'Татарча', lang: 'tt' },
  { code: 'ug', name: 'ئۇيغۇرچە', lang: 'ug', rtl: true },
  { code: 'pt', name: 'Português', lang: 'pt' },
] as const

export type Locale = (typeof LOCALES)[number]['code']
export const DEFAULT_LOCALE: Locale = 'en'
const CODES = new Set<string>(LOCALES.map((l) => l.code))

export function localeOf(path: string): Locale {
  const first = path.split('/')[1] ?? ''
  return (CODES.has(first) && first !== DEFAULT_LOCALE ? first : DEFAULT_LOCALE) as Locale
}

export function stripLocale(path: string): string {
  const loc = localeOf(path)
  if (loc === DEFAULT_LOCALE) return path
  const rest = path.slice(loc.length + 1)
  return rest === '' ? '/' : rest
}

export function withLocale(path: string, locale: string): string {
  if (locale === DEFAULT_LOCALE || !path.startsWith('/')) return path
  return path === '/' ? `/${locale}` : `/${locale}${path}`
}

export function localeInfo(locale: string) {
  return LOCALES.find((l) => l.code === locale) ?? LOCALES[0]
}

export function fill(template: string, vars: Record<string, string>): string {
  return template.replace(/\{(\w+)\}/g, (m, k) => vars[k] ?? m)
}
