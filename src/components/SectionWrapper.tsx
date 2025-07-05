import { ReactNode } from 'react'

export default function SectionWrapper({
  title,
  description,
  children,
}: {
  title: string
  description?: string
  children: ReactNode
}) {
  return (
    <section className="space-y-3 mt-3 p-4 border rounded-xl bg-white shadow-sm">
      <div>
        <h3 className="text-lg font-semibold">{title}</h3>
        {description && <p className="text-sm text-gray-500">{description}</p>}
      </div>
      <div>{children}</div>
    </section>
  )
}
