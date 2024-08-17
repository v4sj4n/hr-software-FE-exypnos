export type Vacation = {
    _id: string
    type: string
    status: string
    description?: string
    userId?: { firstName: string; lastName: string }
    startDate: Date
    endDate: Date
}
