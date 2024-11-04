import { BulletType } from '@renderer/type'
import styles from './bullet.module.css'

interface BulletProps {
  onChange: (type: BulletType) => void
  type: BulletType
}

const bulletImgMap = {
  [BulletType.Live]: '/src/assets/red.png',
  [BulletType.Blank]: '/src/assets/blue.png',
  [BulletType.Unknown]: '/src/assets/green.png'
}

const Bullet = (props: BulletProps): JSX.Element => {
  const { type = BulletType.Unknown, onChange } = props

  const onClick = (): void => {
    // Change the bullet type in the following order:
    // Unknown → Live → Blank
    switch (type) {
      case BulletType.Unknown:
        onChange(BulletType.Live)
        break
      case BulletType.Live:
        onChange(BulletType.Blank)
        break
      case BulletType.Blank:
        onChange(BulletType.Unknown)
        break
    }
  }

  return (
    <div className={styles.bullet} onClick={onClick}>
      <img src={bulletImgMap[type]} />
    </div>
  )
}

export default Bullet
