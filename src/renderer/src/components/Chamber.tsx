import { BulletType, LoadedBullet } from '@renderer/type'
import { Fragment, useEffect, useMemo, useState } from 'react'
import Bullet from './Bullet'

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
    <div>
      {bulletList.map((item, index) => (
        <Fragment key={index}>
          <Bullet
            onChange={(type) => {
              onChangeBullet(type, index)
            }}
            type={item.type}
          />
          {/* last used bullet will be provided a revoke btn */}
          {index === (curIndex - 1) && item.used ? <div onClick={onRevoke}>revoke</div> : null}
          {/* current bullet will be provided a fire btn */}
          {index === curIndex ? <div onClick={onFire}>fire</div> : null}
        </Fragment>
      ))}
      <div>
        剩余子弹数：<span>{lastLive}</span> + <span>{lastBlank}</span>
      </div>
    </div>
  )
}

export default Chamber
