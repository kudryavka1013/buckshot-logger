export enum BulletType {
  Unknown,
  Live,
  Blank
}

export interface BulletItem {
  type: BulletType
  used: boolean
}
