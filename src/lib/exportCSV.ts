export function exportToCSV(data: any[], filename = 'data.csv') {
  const csvRows = []

  const headers = Object.keys(data[0])
  csvRows.push(headers.join(','))

  for (const row of data) {
    const values = headers.map(header => JSON.stringify(row[header] ?? ''))
    csvRows.push(values.join(','))
  }

  const csvContent = csvRows.join('\n')
  const blob = new Blob([csvContent], { type: 'text/csv' })
  const url = URL.createObjectURL(blob)

  const a = document.createElement('a')
  a.href = url
  a.download = filename
  a.click()
}
