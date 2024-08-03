export type Asset = {
  _id: string
  type: string
  status: string
  userId?: { _id: string; firstName: string; lastName: string }
  serialNumber: string
}

export type UserWithAsset = {
  _id: string
  firstName: string
  lastName: string
  imageUrl: string
  assets: Asset[]
}
