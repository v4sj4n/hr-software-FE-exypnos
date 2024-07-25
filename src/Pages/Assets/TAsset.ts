export interface Asset {
    _id: string
    type: string
    status: string
    userId: { firstName: string; lastName: string }
    serialNumber: string
  }