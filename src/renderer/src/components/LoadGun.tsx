import { useState } from 'react'
import styles from './loadGun.module.css'

interface SelectorItemProps {
  index: number
  hover: boolean
  onClick: (index: number) => void
  onHover: (value: number | null) => void
}

const SelectorItem = (props: SelectorItemProps): JSX.Element => {
  const { index, onClick } = props
  return <div onClick={() => onClick(index)}>A</div>
}

const Selector = (props: { onClick: () => void }): JSX.Element => {
  const { onClick } = props
  const [value, setValue] = useState(0)
  const [hoverValue, setHoverValue] = useState<number | null>(null)

  const onSelect = (index: number): void => {
    setValue(index)
  }

  const onHover = (value: number | null): void => {
    setHoverValue(value)
  }

  return (
    <div>
      {Array(5)
        .fill(0)
        .map((item, index) => (
          <SelectorItem key={item} index={index} hover={!!hoverValue && index <= hoverValue} onClick={onSelect} onHover={onHover} />
        ))}
    </div>
  )
}

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

  const addRed = (): void => {
    setLiveCount(liveCount + 1)
  }
  const addBlue = (): void => {
    setBlankCount(blankCount + 1)
  }

  return (
    <div className={styles.loadGun}>
      <h1>Load the gun!</h1>
      <div style={{ color: 'red', width: 20, height: 20 }} onClick={addRed}>
        Red
      </div>
      <div>{liveCount}</div>
      <div style={{ color: 'blue', width: 20, height: 20 }} onClick={addBlue}>
        Blue
      </div>
      <div>{blankCount}</div>
      <div>sum: {liveCount + blankCount}</div>
      <button onClick={onClickConfirm}>Load</button>
      <button onClick={onClickReset}>Unload</button>
    </div>
  )
}

export default LoadGun
