export enum BulletType {
  Unknown,
  Live,
  Blank
}

export interface LoadedBullet {
  type: BulletType
  used: boolean
}
