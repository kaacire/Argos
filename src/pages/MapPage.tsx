import { useState } from 'react'
import { MapContainer, TileLayer, CircleMarker, Marker, Popup } from 'react-leaflet'
import L from 'leaflet'
import {
  CloudRain,
  Thermometer,
  Wind,
  Waves,
  Mountain,
  MessageSquare,
  Home,
  Droplets,
} from 'lucide-react'
import PageHeader from '../components/PageHeader'
import { SENTO_SE_COORDS, mapLayers, mapMarkers } from '../data/mockData'
import 'leaflet/dist/leaflet.css'

const iconMap: Record<string, typeof CloudRain> = {
  'cloud-rain': CloudRain,
  thermometer: Thermometer,
  wind: Wind,
  waves: Waves,
  mountain: Mountain,
  'message-square': MessageSquare,
  home: Home,
  droplets: Droplets,
}

const shelterIcon = new L.DivIcon({
  html: `<div style="background:#eab308;width:28px;height:28px;border-radius:50%;display:flex;align-items:center;justify-content:center;border:2px solid white;box-shadow:0 2px 6px rgba(0,0,0,0.3)">
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/></svg>
  </div>`,
  className: '',
  iconSize: [28, 28],
  iconAnchor: [14, 14],
})

export default function MapPage() {
  const [activeLayers, setActiveLayers] = useState<Set<string>>(new Set(['chuva', 'relatos']))

  const toggleLayer = (id: string) => {
    setActiveLayers((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  return (
    <div className="page-container animate-fade-in">
      <PageHeader title="Mapa de Riscos" subtitle="Sento Sé - BA" />

      <div className="px-4 pt-4">
        <div className="card overflow-hidden" style={{ height: '340px' }}>
          <MapContainer center={SENTO_SE_COORDS} zoom={14} scrollWheelZoom={false}>
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a>'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            {activeLayers.has('chuva') &&
              mapMarkers.chuva.map((m, i) => (
                <CircleMarker
                  key={`chuva-${i}`}
                  center={[m.lat, m.lng]}
                  radius={m.intensity === 'alta' ? 18 : m.intensity === 'média' ? 12 : 8}
                  pathOptions={{
                    color: '#3b82f6',
                    fillColor: '#3b82f6',
                    fillOpacity: 0.4,
                  }}
                >
                  <Popup>Chuva: intensidade {m.intensity}</Popup>
                </CircleMarker>
              ))}

            {activeLayers.has('temperatura') && (
              <CircleMarker
                center={SENTO_SE_COORDS}
                radius={40}
                pathOptions={{
                  color: '#ef4444',
                  fillColor: '#ef4444',
                  fillOpacity: 0.15,
                }}
              >
                <Popup>Temperatura: 28°C</Popup>
              </CircleMarker>
            )}

            {activeLayers.has('ventania') && (
              <CircleMarker
                center={[-9.744, -42.257]}
                radius={25}
                pathOptions={{
                  color: '#8b5cf6',
                  fillColor: '#8b5cf6',
                  fillOpacity: 0.2,
                }}
              >
                <Popup>Ventania: até 45 km/h</Popup>
              </CircleMarker>
            )}

            {activeLayers.has('alagamentos') &&
              mapMarkers.alagamentos.map((m, i) => (
                <CircleMarker
                  key={`alag-${i}`}
                  center={[m.lat, m.lng]}
                  radius={10}
                  pathOptions={{
                    color: '#06b6d4',
                    fillColor: '#06b6d4',
                    fillOpacity: 0.6,
                  }}
                >
                  <Popup>Alagamento: {m.name}</Popup>
                </CircleMarker>
              ))}

            {activeLayers.has('deslizamentos') &&
              mapMarkers.deslizamentos.map((m, i) => (
                <CircleMarker
                  key={`desl-${i}`}
                  center={[m.lat, m.lng]}
                  radius={12}
                  pathOptions={{
                    color: '#f97316',
                    fillColor: '#f97316',
                    fillOpacity: 0.5,
                  }}
                >
                  <Popup>Deslizamento: {m.name}</Popup>
                </CircleMarker>
              ))}

            {activeLayers.has('relatos') &&
              mapMarkers.relatos.map((m, i) => (
                <CircleMarker
                  key={`rel-${i}`}
                  center={[m.lat, m.lng]}
                  radius={8}
                  pathOptions={{
                    color: '#22c55e',
                    fillColor: '#22c55e',
                    fillOpacity: 0.7,
                  }}
                >
                  <Popup>Relato: {m.type}</Popup>
                </CircleMarker>
              ))}

            {activeLayers.has('abrigos') &&
              mapMarkers.abrigos.map((m, i) => (
                <Marker key={`abr-${i}`} position={[m.lat, m.lng]} icon={shelterIcon}>
                  <Popup>Abrigo: {m.name}</Popup>
                </Marker>
              ))}

            {activeLayers.has('rios') &&
              mapMarkers.rios.map((m, i) => (
                <CircleMarker
                  key={`rio-${i}`}
                  center={[m.lat, m.lng]}
                  radius={14}
                  pathOptions={{
                    color: '#1d4ed8',
                    fillColor: '#1d4ed8',
                    fillOpacity: 0.4,
                  }}
                >
                  <Popup>
                    {m.name}: nível {m.level}m
                  </Popup>
                </CircleMarker>
              ))}
          </MapContainer>
        </div>

        <div className="mt-4">
          <h3 className="mb-3 text-sm font-semibold text-slate-700">Camadas do Mapa</h3>
          <div className="grid grid-cols-2 gap-2">
            {mapLayers.map((layer) => {
              const Icon = iconMap[layer.icon]
              const isActive = activeLayers.has(layer.id)
              return (
                <button
                  key={layer.id}
                  onClick={() => toggleLayer(layer.id)}
                  className={`flex items-center gap-2 rounded-xl border-2 px-3 py-2.5 text-left text-sm font-medium transition-all duration-300 ${
                    isActive
                      ? 'border-primary-500 bg-primary-50 text-primary-700 shadow-sm'
                      : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300'
                  }`}
                >
                  <Icon size={18} style={{ color: isActive ? layer.color : undefined }} />
                  {layer.name}
                </button>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
