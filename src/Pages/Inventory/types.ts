export type InventoryItem = {
    _id: string
    type: string
    status: string
    userId?: { _id: string; firstName: string; lastName: string }
    serialNumber: string
    history: ItemHistory[]
}

export type ItemHistory = {
    takenDate: null | Date | string
    returnDate: null | Date | string
    user: { _id: string; firstName: string; lastName: string }
}

export type UserWithInventoryItem = {
    _id: string
    firstName: string
    lastName: string
    imageUrl: string
    assets: InventoryItem[]
}
