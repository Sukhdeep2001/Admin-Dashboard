export type MetafieldDefinition = {
    id: string
    name: string
    key: string
    namespace: string
    resourceTypes: string[]
    type: string
    description: string
    apiAccess: 'public' | 'private'
    customerAccess: boolean
    createdBy: string
    createdAt: string
    visible: boolean
}
  