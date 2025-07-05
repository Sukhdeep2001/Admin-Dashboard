'use client'

import { useRef, useState } from 'react'
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api'

import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { CheckCircle2, XCircle } from 'lucide-react'

// 👇 Your Google Maps API key
const GOOGLE_MAPS_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || 'YOUR_GOOGLE_MAPS_API_KEY'

// 👇 Map style
const mapContainerStyle = {
  width: '100%',
  height: '500px',
  borderRadius: '0.5rem',
  overflow: 'hidden',
}

// 👇 Mock location access data
const mockAccessData = [
  { admin: 'Store A', location: 'Delhi', sessions: 42, lng: 77.209, lat: 28.6139 },
  { admin: 'Store A', location: 'Mumbai', sessions: 21, lng: 72.8777, lat: 19.076 },
  { admin: 'Store B', location: 'Chennai', sessions: 10, lng: 80.2707, lat: 13.0827 }
]

// 👇 Mock location requests
const mockRequests = [
  { id: 1, admin: 'Store A', type: 'New Location', name: 'North Warehouse', address: 'Delhi', status: 'pending' },
  { id: 2, admin: 'Store B', type: 'Update', name: 'Main Pickup', address: 'Mumbai', status: 'pending' }
]

export default function SuperAdminLocationsPage() {
  const [requests, setRequests] = useState(mockRequests)
  const [center, setCenter] = useState({ lat: 22.5937, lng: 78.9629 }) // Default to India
  const mapRef = useRef<google.maps.Map | null>(null)

  const handleApprove = (id: number) => {
    setRequests(prev => prev.map(r => r.id === id ? { ...r, status: 'approved' } : r))
  }

  const handleReject = (id: number) => {
    setRequests(prev => prev.map(r => r.id === id ? { ...r, status: 'rejected' } : r))
  }

  const handleRowClick = (lat: number, lng: number) => {
    const newCenter = { lat, lng }
    if (mapRef.current) {
      mapRef.current.panTo(newCenter)
      mapRef.current.setZoom(8)
    }
    setCenter(newCenter)
  }

  const handleMapLoad = (map: google.maps.Map) => {
    mapRef.current = map
  }

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold">🗺️ Locations Overview (Super Admin)</h1>

      {/* Requests Section */}
      <Card>
        <CardContent className="space-y-4 p-4">
          <h2 className="text-lg font-semibold">Pending Location Requests</h2>
          {requests.length === 0 ? (
            <p className="text-gray-500 text-sm">No pending requests.</p>
          ) : (
            requests.map(req => (
              <div key={req.id} className="lg:flex justify-between items-center border p-3 rounded-md">
                <div className='pb-3'>
                  <p className="font-medium">{req.name} ({req.type})</p>
                  <p className="text-sm text-gray-600">
                    {req.address} — <span className="font-medium">{req.admin}</span>
                  </p>
                  {req.status === 'approved' && (
                    <p className="text-green-600 text-sm mt-1">✅ Location request approved</p>
                  )}
                  {req.status === 'rejected' && (
                    <p className="text-red-600 text-sm mt-1">❌ Location request rejected</p>
                  )}
                </div>
                {req.status === 'pending' && (
                  <div className="flex gap-2">
                    <Button size="sm" onClick={() => handleApprove(req.id)}>
                      <CheckCircle2 className="w-4 h-4 mr-1" /> Approve
                    </Button>
                    <Button size="sm" variant="destructive" onClick={() => handleReject(req.id)}>
                      <XCircle className="w-4 h-4 mr-1" /> Reject
                    </Button>
                  </div>
                )}
              </div>
            ))
          )}
        </CardContent>
      </Card>

      {/* Admin Access Table */}
      <Card>
        <CardContent className="space-y-4 p-4">
          <h2 className="text-lg font-semibold">📊 Admin Access by Location</h2>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Admin</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Sessions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockAccessData.map((entry, i) => (
                <TableRow
                  key={i}
                  onClick={() => handleRowClick(entry.lat, entry.lng)}
                  className="cursor-pointer hover:bg-gray-50"
                >
                  <TableCell>{entry.admin}</TableCell>
                  <TableCell>{entry.location}</TableCell>
                  <TableCell>{entry.sessions}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Google Map */}
      <Card>
        <CardContent className="space-y-3 p-4">
          <h2 className="text-lg font-semibold">🌍 Live Admin Locations on Map</h2>
          <div className="w-full h-[500px] rounded-md border shadow-sm overflow-hidden">
            <LoadScript googleMapsApiKey={GOOGLE_MAPS_API_KEY}>
              <GoogleMap
                mapContainerStyle={mapContainerStyle}
                center={center}
                zoom={5}
                onLoad={handleMapLoad}
              >
                {mockAccessData.map((entry, i) => (
                  <Marker key={i} position={{ lat: entry.lat, lng: entry.lng }} />
                ))}
              </GoogleMap>
            </LoadScript>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
