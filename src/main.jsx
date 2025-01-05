import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

// import App from './App.jsx'
// import Animation from './Animation.jsx'
// import BufferGeometry from './BufferGeometry.jsx'
// import BufferGeometry2 from './BufferGeometry2.jsx'
import SnowEffect from './SnowEffect.jsx'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* <App /> */}
    {/* <Animation /> */}
    {/* <BufferGeometry /> */}
    {/* <BufferGeometry2 /> */}
    <SnowEffect />
  </StrictMode>,
)
