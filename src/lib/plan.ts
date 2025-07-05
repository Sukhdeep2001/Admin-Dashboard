export type Plan = {
    id: string
    title: string
    description: string
    monthlyPrice: number
    yearlyPrice: number
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
    createdAt: string
}
  