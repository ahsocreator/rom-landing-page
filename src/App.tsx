import { Backdrop } from './components/ui/Backdrop'
import { Nav } from './components/Nav'
import { Hero } from './components/Hero'
import { TickerBar } from './components/TickerBar'
import { FeatureCards } from './components/FeatureCards'
import { BuildOnRom } from './components/BuildOnRom'
import { Footer } from './components/Footer'

function App() {
  return (
    <div className="relative min-h-screen text-rom-fg font-mono antialiased">
      <Backdrop />
      <Nav />
      <main className="relative">
        <Hero />
        <TickerBar />
        <FeatureCards />
        <BuildOnRom />
      </main>
      <Footer />
    </div>
  )
}

export default App
