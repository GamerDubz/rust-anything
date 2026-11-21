import { existsSync, readdirSync, readFileSync } from 'node:fs'
import { join, relative } from 'node:path'
import { WEBSITE_ROOT, expandIncludes } from './md-include.mjs'

export const PAGES_DIR = join(WEBSITE_ROOT, 'pages')

function walk(dir) {
  return readdirSync(dir, { withFileTypes: true }).flatMap((e) =>
    e.isDirectory() ? walk(join(dir, e.name)) : e.name.endsWith('.md') ? [join(dir, e.name)] : [],
  )
}

function frontmatter(src) {
  const m = /^---\n([\s\S]*?)\n---\n?/.exec(src)
  const data = {}
  if (m) {
    for (const line of m[1].split('\n')) {
      const kv = /^(\w+):\s*(.*)$/.exec(line)
      if (kv) data[kv[1]] = kv[2].trim().replace(/^(['"])(.*)\1$/, '$2')
    }
  }
  return { data, body: m ? src.slice(m[0].length) : src }
}

export function anchorSlug(text) {
  return encodeURIComponent(text.trim().toLowerCase().replace(/\s+/g, '-'))
}

export function plainText(markdown) {
  return markdown
    .replace(/^ {0,3}(`{3,}|~{3,}).*$/gm, '')
    .replace(/^ {0,3}#{1,6}\s+/gm, '')
    .replace(/^ {0,3}:::.*$/gm, '')
    .replace(/<!--[\s\S]*?-->/g, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/!\[[^\]]*\]\([^)]*\)/g, ' ')
    .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1')
    .replace(/[|`*]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

export function docPages(locale = 'en') {
  const dir = join(PAGES_DIR, locale)
  if (!existsSync(dir)) return []
  return walk(dir)
    .sort()
    .map((file) => {
      const rel = relative(dir, file).replace(/\\/g, '/')
      const route = (locale === 'en' ? '' : `/${locale}`) + '/' + rel.replace(/\.md$/, '').replace(/(^|\/)index$/, '')
      const src = readFileSync(file, 'utf8')
      const { data, body } = frontmatter(src)
      let expanded = expandIncludes(body)
      if (locale !== 'en') expanded = expanded.replace(/\]\(\/docs\//g, `](/${locale}/docs/`)
      const headings = []
      let inFence = false
      for (const line of expanded.split('\n')) {
        if (/^\s{0,3}(`{3,}|~{3,})/.test(line)) inFence = !inFence
        const h = !inFence && /^(#{2,3})\s+(.+?)\s*$/.exec(line)
        if (h) {
          const text = plainText(h[2])
          headings.push({ depth: h[1].length, text, slug: anchorSlug(text) })
        }
      }
      return {
        file: relative(WEBSITE_ROOT, file).replace(/\\/g, '/'),
        route,
        title: data.title ?? '',
        description: data.description ?? '',
        headings,
        body: plainText(expanded),
      }
    })
}
