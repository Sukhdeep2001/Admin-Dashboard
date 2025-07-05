import { NextApiRequest, NextApiResponse } from 'next'

// Replace this with real DB or file storage
let settingsStore: Record<string, any> = {}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query

  if (req.method === 'GET') {
    return res.status(200).json(settingsStore[id as string] || {})
  }

  if (req.method === 'PUT') {
    settingsStore[id as string] = req.body
    return res.status(200).json({ success: true })
  }

  return res.status(405).end()
}
