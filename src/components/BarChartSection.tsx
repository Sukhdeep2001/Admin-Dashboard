'use client'

import { ResponsiveBar } from '@nivo/bar'


export default function BarChartSection({
  title,
  data,
}: {
  title: string
  data: { label: string; value: number }[]
}) {
  
  return (
    <div className="bg-white p-4 rounded-xl shadow mt-6">
      <h2 className="text-lg font-semibold mb-4">{title}</h2>
      <div className="h-[600px]">
        <ResponsiveBar
          data={data}
          keys={['value']}
          indexBy="label"
          margin={{ top: 30, right: 30, bottom: 50, left: 60 }}
          padding={0.3}
          colors={{ scheme: 'category10' }}
          colorBy="indexValue"
          enableGridY={true}
          axisBottom={{
            tickRotation: -30,
            tickPadding: 6,
            legend: title,
            legendPosition: 'middle',
            legendOffset: 40,
          }}
          axisLeft={{
            tickSize: 5,
            tickPadding: 10,
            tickRotation: 0,
            tickValues: 6,
            legend: 'Value',
            legendPosition: 'middle',
            legendOffset: -50,
          }}
          labelSkipHeight={12}
          labelTextColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
        />
      </div>
    </div>
  )
}
