'use client'

import { ResponsiveLine } from '@nivo/line'

export default function ChartSection({
  timeline = [],
  comparison = [],
}: {
  timeline?: string[]
  comparison?: string[]
}) {
  const data = [
    {
      id: 'Sales',
      color: 'hsl(205, 70%, 50%)',
      data: Array.isArray(timeline)
        ? timeline.map((value, index) => ({
            x: `Hour ${index + 1}`,
            y: Number(value) || 0,
          }))
        : [],
    },
    {
      id: 'Comparison',
      color: 'hsl(100, 70%, 50%)',
      data: Array.isArray(comparison)
        ? comparison.map((value, index) => ({
            x: `Hour ${index + 1}`,
            y: Number(value) || 0,
          }))
        : [],
    },
  ]

  return (
    <div className="bg-white p-4 rounded-xl shadow">
      <h2 className="text-lg font-semibold mb-4">Sales Over Time</h2>
      <div className="h-[300px]">
        <ResponsiveLine
          data={data}
          margin={{ top: 30, right: 30, bottom: 50, left: 60 }}
          xScale={{ type: 'point' }}
          yScale={{
            type: 'linear',
            min: 'auto',
            max: 'auto',
            stacked: false,
            reverse: false,
          }}
          axisBottom={{ tickRotation: -30 }}
          colors={{ scheme: 'nivo' }}
          enablePoints={true}
          pointSize={10}
          useMesh={true}
        />
      </div>
    </div>
  )
}
