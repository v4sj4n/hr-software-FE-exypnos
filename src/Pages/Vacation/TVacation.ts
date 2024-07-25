export type Vacation = {
  _id: string
  type: string
  startDate: Date
  endDate: Date
  description?: string
  status: string
  userId?: { firstName: string; lastName: string }
}
