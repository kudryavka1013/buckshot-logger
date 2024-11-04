import { BulletType, LoadedBullet } from '@renderer/type'
import { useEffect, useMemo, useState } from 'react'
import Bullet from './Bullet'
import styles from './chamber.module.css'
interface ChamberProps {
  live: number
  blank: number
}

const Chamber = (props: ChamberProps): JSX.Element => {
  const { live, blank } = props
  const sum = useMemo(() => live + blank, [live, blank])
  const [bulletList, setBulletList] = useState<LoadedBullet[]>([])

  const lastLive = useMemo(
    () => live - bulletList.filter((item) => item.type === BulletType.Live && item.used).length,
    [bulletList]
  )
  const lastBlank = useMemo(
    () => blank - bulletList.filter((item) => item.type === BulletType.Blank && item.used).length,
    [bulletList]
  )
  const labelLive = useMemo(
    () => bulletList.filter((item) => item.type === BulletType.Live && !item.used).length,
    [bulletList]
  )
  const labelBlank = useMemo(
    () => bulletList.filter((item) => item.type === BulletType.Blank && !item.used).length,
    [bulletList]
  )
  const labelUnknown = useMemo(
    () => bulletList.filter((item) => item.type === BulletType.Unknown && !item.used).length,
    [bulletList]
  )

  const curIndex = useMemo(() => bulletList.findIndex((item) => !item.used), [bulletList])

  useEffect(() => {
    const newList = Array.from(Array(sum), () => ({
      type: BulletType.Unknown,
      used: false
    }))
    setBulletList(newList)
  }, [live, blank])

  const onChangeBullet = (type: BulletType, index: number): void => {
    const newBulletList = [...bulletList]
    newBulletList[index].type = type
    setBulletList(newBulletList)
  }

  const onFire = (): void => {
    const newBulletList = [...bulletList]
    newBulletList[curIndex].used = true
    setBulletList(newBulletList)
  }

  const onRevoke = (): void => {
    const newBulletList = [...bulletList]
    newBulletList[curIndex - 1].used = false
    setBulletList(newBulletList)
  }

  return (
    <>
      <div className={styles.chamber}>
        {bulletList.map((item, index) => (
          <div key={index} className={styles.bulletItem}>
            {index === curIndex ? <div className={styles.divider}></div> : null}
            <Bullet
              onChange={(type) => {
                onChangeBullet(type, index)
              }}
              type={item.type}
            />
            {/* last used bullet will be provided a revoke btn */}
            {/* {index === (curIndex - 1) && item.used ? <div onClick={onRevoke}>revoke</div> : null} */}
            {/* current bullet will be provided a fire btn */}
          </div>
        ))}
      </div>
      <div onClick={onRevoke}>revoke</div>
      <div onClick={onFire}>fire</div>
      <div>
        剩余子弹数：<span className={styles.liveCount}>{lastLive}</span> + <span className={styles.blankCount}>{lastBlank}</span>
      </div>
      <div>
        标记子弹数：<span className={styles.liveCount}>{labelLive}</span> + <span className={styles.blankCount}>{labelBlank}</span> + <span className={styles.unknownCount}>{labelUnknown}</span>
      </div>
    </>
  )
}

export default Chamber
