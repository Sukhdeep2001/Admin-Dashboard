export default function ProfileSettingsPage() {
  const data = {
    username: "admin_872648",
    name: "John Doe",
    email: "client@email.com",
    contact: "+91 9876543210",
    address: "123 Main St, City, ZIP, Country",
    businessName: "My Business Pvt. Ltd.",
    businessEmail: "biz@email.com",
    businessAddress: "Office Address, Area, City, ZIP",
    location: "India",
    employees: 25,
    taxId: "GSTIN1234ABC567",
    plan: "Pro Plan ($29/month)",
    businessType: "E-commerce",
    revenue: "$12,000",
    paymentMethod: "PayPal",
    image: "/placeholder.jpg",
  }

  return (
    <div className="space-y-10">
      <h1 className="text-2xl font-bold">Client Profile Summary</h1>

      {/* Personal Information */}
      <div className="bg-white rounded-xl shadow p-6 space-y-4">
        <h2 className="text-xl font-semibold mb-4">Personal Information</h2>

        <div className="flex items-center gap-4 mb-6">
          <img
            src={data.image}
            alt="Profile"
            className="w-20 h-20 rounded-full object-cover border"
          />
          <div>
            <p className="text-sm text-gray-600">Profile Picture</p>
          </div>
        </div>

        <table className="w-full text-sm text-left">
          <tbody className="divide-y divide-gray-200">
            <tr><td className="py-2 font-medium w-1/3">Product ID (Username)</td><td>{data.username}</td></tr>
            <tr><td className="py-2 font-medium">Name</td><td>{data.name}</td></tr>
            <tr><td className="py-2 font-medium">Email</td><td>{data.email}</td></tr>
            <tr><td className="py-2 font-medium">Contact Number</td><td>{data.contact}</td></tr>
            <tr><td className="py-2 font-medium">Address</td><td>{data.address}</td></tr>
          </tbody>
        </table>
      </div>

      {/* Business Information */}
      <div className="bg-white rounded-xl shadow p-6 space-y-4">
        <h2 className="text-xl font-semibold mb-4">Business Information</h2>

        <table className="w-full text-sm text-left">
          <tbody className="divide-y divide-gray-200">
            <tr><td className="py-2 font-medium w-1/3">Business Name</td><td>{data.businessName}</td></tr>
            <tr><td className="py-2 font-medium">Business Email</td><td>{data.businessEmail}</td></tr>
            <tr><td className="py-2 font-medium">Business Address</td><td>{data.businessAddress}</td></tr>
            <tr><td className="py-2 font-medium">Business Location</td><td>{data.location}</td></tr>
            <tr><td className="py-2 font-medium">Number of Employees</td><td>{data.employees}</td></tr>
            <tr><td className="py-2 font-medium">Tax / VAT / GST Number</td><td>{data.taxId}</td></tr>
            <tr><td className="py-2 font-medium">Plan Subscribed</td><td>{data.plan}</td></tr>
            <tr><td className="py-2 font-medium">Business Type</td><td>{data.businessType}</td></tr>
            <tr><td className="py-2 font-medium">Monthly Revenue / Sales</td><td>{data.revenue}</td></tr>
            <tr><td className="py-2 font-medium">Payment Method</td><td>{data.paymentMethod}</td></tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}