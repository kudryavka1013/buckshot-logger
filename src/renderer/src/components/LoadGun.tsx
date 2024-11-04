import { useState } from 'react'

interface BulletsProps {
  onConfirm: (data: { live: number; blank: number }) => void
  onReset: () => void
}

const LoadGun = (props: BulletsProps): JSX.Element => {
  const { onConfirm, onReset } = props
  const [liveCount, setLiveCount] = useState<number>(0)
  const [blankCount, setBlankCount] = useState<number>(0)

  const onClickConfirm = (): void => {
    onConfirm({ live: liveCount, blank: blankCount })
  }

  const onClickReset = (): void => {
    setBlankCount(0)
    setLiveCount(0)
    onReset()
  }

  return (
    <div>
      <h1>Load the gun!</h1>
      <button onClick={onClickConfirm}>Load</button>
      <button onClick={onClickReset}>Unload</button>
    </div>
  )
}

export default LoadGun
