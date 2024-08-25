export type Vacation = {
    _id: string
    type: string
    status: string
    description?: string
    userId?: { firstName: string; lastName: string }
    startDate: Date
    endDate: Date
}

export type UserWithVacations = {
    _id: string
    firstName: string
    lastName: string
    imageUrl: string
    email: string
    phone: string
    vacations: Vacation[]
    role: string
}
