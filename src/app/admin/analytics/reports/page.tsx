'use client'

import { useEffect, useState } from 'react'

type Report = {
  name: string
  category: string
  createdBy: string
}

export default function ReportsPage() {
  const [reports, setReports] = useState<Report[]>([])

  useEffect(() => {
    fetch('/api/analytics/reports')
      .then((res) => res.json())
      .then(setReports)
  }, [])

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Reports</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {reports.map((report, i) => (
          <div key={i} className="bg-white rounded-xl shadow p-4 hover:bg-gray-50 transition">
            <h2 className="text-lg font-semibold">{report.name}</h2>
            <p className="text-sm text-gray-500 mt-1">Category: {report.category}</p>
            <p className="text-xs text-gray-400">Created by: {report.createdBy}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
