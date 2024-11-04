import { useState } from 'react'
import Versions from './components/Versions'
import LoadGun from './components/LoadGun'
import Chamber from './components/Chamber'

function App(): JSX.Element {
  const [live, setLive] = useState(0)
  const [blank, setBlank] = useState(0)

  const onConfirm = (data: { live: number; blank: number }): void => {
    setLive(data.live)
    setBlank(data.blank)
  }

  const onReset = (): void => {
    setLive(0)
    setBlank(0)
  }
  return (
    <>
      <div>
        <LoadGun onConfirm={onConfirm} onReset={onReset} />
        <Chamber live={live} blank={blank} />
      </div>
      <Versions></Versions>
    </>
  )
}

export default App
