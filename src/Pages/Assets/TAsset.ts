export interface Asset {
  _id: string
  type: string
  status: string
  userId: { firstName: string; lastName: string; imageUrl: string }
  serialNumber: string
  history: History[]
}

type History = {
  receivedDate: Date
  returnDate: Date | null
  status: string
  userId: string | null
}
