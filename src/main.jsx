import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import './index.css'

const mobileUserAgent = /Android|iPhone|iPad|iPod|Mobile|UCWEB|UCBrowser/i.test(navigator.userAgent)
const touchOnlyDevice = navigator.maxTouchPoints > 0 && window.matchMedia('(pointer: coarse)').matches

if (mobileUserAgent || touchOnlyDevice) {
  document.documentElement.classList.add('mobile-device')
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
