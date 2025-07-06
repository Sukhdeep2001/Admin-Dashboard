export type Plan = {
    id?: string // <-- Make optional
    title: string
    description: string
    monthlyPrice: number | string // <-- Accept number or string (during input)
    yearlyPrice: number | string
    features: {
      maxUsers: number | string
      storageLimit: string
      enableSSO: boolean
      prioritySupport: boolean
    }
    limits: {
      apiCallsPerMonth: number | string
    }
    trial: {
      enabled: boolean
      durationDays: number
    }
    visibility: boolean
    archived: boolean
    createdAt?: string // <-- Make optional
  }
  