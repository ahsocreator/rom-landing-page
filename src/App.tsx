import { Backdrop } from './components/ui/Backdrop'
import { MatrixBackdrop } from './components/ui/MatrixBackdrop'
import { RomCursor } from './components/ui/RomCursor'
import { Nav } from './components/Nav'
import { Hero } from './components/Hero'
import { HowRomWorks } from './components/HowRomWorks'
import { ExampleFlow } from './components/ExampleFlow'
import { ApiExample } from './components/ApiExample'
import { WhyRom } from './components/WhyRom'
import { FooterCTA } from './components/FooterCTA'
import { Footer } from './components/Footer'

function App() {
  return (
    <div className="relative min-h-screen text-rom-fg font-mono antialiased">
      <Backdrop />
      <MatrixBackdrop />
      <Nav />
      <main className="relative">
        <Hero />
        <HowRomWorks />
        <ExampleFlow />
        <ApiExample />
        <WhyRom />
        <FooterCTA />
      </main>
      <Footer />
      <RomCursor />
    </div>
  )
}

export default App
