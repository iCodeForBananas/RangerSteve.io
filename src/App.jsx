import { useState } from 'react'
import './sass/app.scss'
import GameUi from './components/GameUi'

function App() {
  const [count, setCount] = useState(0)

  return (

    <GameUi />

  )
}

export default App
