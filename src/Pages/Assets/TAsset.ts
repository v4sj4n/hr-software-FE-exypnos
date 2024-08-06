export type Asset = {
  _id: string
  type: string
  status: string
  userId?: { _id: string; firstName: string; lastName: string }
  serialNumber: string
  takenDate: string
  returnDate: Date | null
  history: history[]
}

type history = {
  receivedDate: Date
  returnDate: Date
  status: string
  userId: string | null
}

export type UserWithAsset = {
  _id: string
  firstName: string
  lastName: string
  imageUrl: string
  email: string
  phone: string
  assets: Asset[]
  role: string
}
