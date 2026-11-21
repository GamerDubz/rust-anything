import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vite-plus'
import { voidPlugin } from 'void'
import { voidReact } from '@void/react/plugin'
import { voidMarkdown } from '@void/md/plugin'
import tailwindcss from '@tailwindcss/vite'
import { mdIncludePlugin } from './scripts/md-include.mjs'
import {
  faviconPlugin,
  notFoundPlugin,
  ogImagePlugin,
  searchIndexPlugin,
} from './scripts/build-plugins.mjs'
import { groupOf } from './lib/nav.ts'

const root = fileURLToPath(new URL('.', import.meta.url)).replace(/\/$/, '')

export default defineConfig({
  resolve: {
    alias: [{ find: /^@\//, replacement: `${root}/` }],
  },
  server: {
    fs: { allow: ['..'] },
  },
  plugins: [
    faviconPlugin(),
    tailwindcss(),
    voidPlugin(),
    voidReact(),
    mdIncludePlugin(),
    voidMarkdown(),
    searchIndexPlugin(),
    ogImagePlugin((route: string) => groupOf(route)?.title ?? ''),
    notFoundPlugin(),
  ],
})
