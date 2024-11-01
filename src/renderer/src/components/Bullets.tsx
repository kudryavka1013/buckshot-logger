import { useState } from 'react'

interface BulletsProps {
  onConfirm: (data: { live: number; blank: number }) => void
  onReset: () => void
}

const Bullets = (props: BulletsProps): JSX.Element => {
  const { onConfirm, onReset } = props
  const [liveBullets, setLiveBullets] = useState<number>(0)
  const [blankBullets, setBlankBullets] = useState<number>(0)

  const onClickConfirm = (): void => {
    onConfirm({ live: liveBullets, blank: blankBullets })
  }

  const onClickReset = (): void => {
    setBlankBullets(0)
    setLiveBullets(0)
    onReset()
  }

  return (
    <div>
      <h1>Bullets</h1>
      <span>sum: {liveBullets + blankBullets}</span>
      <button onClick={onClickConfirm}>Load</button>
      <button onClick={onClickReset}>Unload</button>
    </div>
  )
}

export default Bullets
