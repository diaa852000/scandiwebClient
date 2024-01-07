import { Footer, Navbar } from './components'
import Pathes from './pathes/Pathes'
function App() {

  return (
    <div className='app'>
      <Navbar />
      <div className='main'>
        <Pathes />
      </div>
      <Footer />
    </div>
  )
}

export default App
