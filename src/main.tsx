import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

// Fonts ship as npm packages, not from a CDN, so the site renders the same on a
// locked-down network as it does on an open one. Lato has no 500/600/800: asking
// for them makes the browser synthesize weights, which look muddy.
// Latin subsets only. The full packages ship Cyrillic, Greek and Vietnamese too,
// which this site has no copy for.
import '@fontsource/lato/latin-300.css'
import '@fontsource/lato/latin-400.css'
import '@fontsource/lato/latin-700.css'
import '@fontsource/lato/latin-900.css'
import '@fontsource/jetbrains-mono/latin-400.css'
import '@fontsource/jetbrains-mono/latin-700.css'

import App from '@/App'
import '@/index.css'

const container = document.getElementById('root')
if (!container) throw new Error('Root element #root is missing from index.html')

createRoot(container).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
