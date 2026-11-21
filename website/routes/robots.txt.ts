import { defineHandler } from 'void'

export const GET = defineHandler((c) => {
  const origin = new URL(c.req.url).origin
  return c.text(`User-agent: *\nAllow: /\n\nSitemap: ${origin}/sitemap.xml\n`)
})
