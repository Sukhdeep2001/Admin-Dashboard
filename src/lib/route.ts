// lib/routes.ts

export const routes = {
    superAdmin: {
      dashboard: "/super-admin",
      products: "/super-admin/products",
      orders: "/super-admin/orders",
      customers: "/super-admin/customers",
      discounts: "/super-admin/discounts",
      plans: "/super-admin/plans",
      apiKeys: "/super-admin/api-keys",
      settings: {
        root: "/super-admin/settings",
        profileSettings: "/super-admin/settings/profile-settings",
        support: "/super-admin/settings/support",
        userPermissions: "/super-admin/settings/users-permissions",
      },
      customerProfile: (id: string) => `/super-admin/customer/${id}`,
    }
}
  