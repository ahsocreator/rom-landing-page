import { Backdrop } from './components/ui/Backdrop'
import { MatrixBackdrop } from './components/ui/MatrixBackdrop'
import { Nav } from './components/Nav'
import { Hero } from './components/Hero'
import { TickerBar } from './components/TickerBar'
import { HowItWorks } from './components/HowItWorks'
import { ContentUniverse } from './components/ContentUniverse'
import { IPShowcase } from './components/IPShowcase'
import { SeriesProtocol } from './components/SeriesProtocol'
import { MakeMoney } from './components/MakeMoney'
import { AssetAnatomy } from './components/AssetAnatomy'
import { MonetizationFlow } from './components/MonetizationFlow'
import { DeveloperCTA } from './components/DeveloperCTA'
import { Footer } from './components/Footer'

function App() {
  return (
    <div className="relative min-h-screen text-rom-fg font-mono antialiased">
      <MatrixBackdrop />
      <Backdrop />
      <Nav />
      <main className="relative">
        <Hero />
        <TickerBar />
        <HowItWorks />
        <ContentUniverse />
        <IPShowcase />
        <SeriesProtocol />
        <MakeMoney />
        <AssetAnatomy />
        <MonetizationFlow />
        <DeveloperCTA />
      </main>
      <Footer />
    </div>
  )
}

export default App
