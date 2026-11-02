import { Suspense, lazy, useEffect, useState } from 'react'

const Walkthrough = lazy(() => import('./walkthrough/Walkthrough'))
const MotionLab = lazy(() => import('./lab/MotionLab'))

function App() {
  const [labOpen, setLabOpen] = useState(() => window.location.hash === '#lab')

  useEffect(() => {
    const onHash = () => setLabOpen(window.location.hash === '#lab')
    window.addEventListener('hashchange', onHash)
    return () => window.removeEventListener('hashchange', onHash)
  }, [])

  const closeLab = () => {
    history.pushState('', '', `${window.location.pathname}${window.location.search}#architecture`)
    setLabOpen(false)
  }

  if (labOpen) {
    return <Suspense fallback={<div className="app-loading">OPENING MOTION LAB…</div>}><MotionLab onClose={closeLab} /></Suspense>
  }

  return <Suspense fallback={<div className="app-loading">PREPARING THE WALKTHROUGH…</div>}><Walkthrough /></Suspense>
}

export default App
