'use client'

import { ResponsivePie } from '@nivo/pie'

export default function PieChartSection({
  title,
  data,
}: {
  title: string
  data: Record<string, string>
}) {
  const pieData = Object.entries(data).map(([key, val]) => ({
    id: key,
    label: key,
    value: parseFloat(val.replace(/[^\d.-]/g, '')) || 0,
  }))

  return (
    <div className="bg-white p-4 rounded-xl shadow mt-6">
      <h2 className="text-lg font-semibold mb-4">{title}</h2>
      <div className="h-[500px]">
        <ResponsivePie
          data={pieData}
          margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
          innerRadius={0.5}
          padAngle={1}
          cornerRadius={3}
          activeOuterRadiusOffset={8}
          borderWidth={1}
          borderColor={{ from: 'color', modifiers: [['darker', 0.2]] }}
          colors={{ scheme: 'paired' }} // brighter & multi-colored
          arcLinkLabelsSkipAngle={10}
          arcLinkLabelsTextColor="#333"
          arcLinkLabelsThickness={2}
          arcLinkLabelsColor={{ from: 'color' }}
          arcLabelsSkipAngle={10}
          arcLabelsTextColor={{ from: 'color', modifiers: [['darker', 2]] }}
          legends={[
            {
              anchor: 'bottom',
              direction: 'row',
              translateY: 56,
              itemWidth: 100,
              itemHeight: 18,
              itemTextColor: '#444',
              symbolSize: 14,
              symbolShape: 'circle',
              effects: [
                {
                  on: 'hover',
                  style: {
                    itemTextColor: '#000',
                    itemBackground: '#f0f0f0',
                  },
                },
              ],
            },
          ]}
        />
      </div>
    </div>
  )
}
