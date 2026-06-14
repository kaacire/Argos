export type RiskLevel = 'verde' | 'amarelo' | 'laranja' | 'vermelho'

export interface WeatherData {
  temperature: number
  condition: string
  humidity: number
  windSpeed: number
  city: string
  state: string
  riskLevel: RiskLevel
  lastUpdate: string
}

export interface Alert {
  id: string
  category: string
  level: RiskLevel
  description: string
  time: string
}

export interface Report {
  id: string
  type: string
  location: string
  time: string
  status: 'pendente' | 'verificado' | 'resolvido'
  imageColor: string
}

export interface EmergencyContact {
  id: string
  name: string
  phone: string
  hours: string
  icon: string
  color: string
}

export interface MapLayer {
  id: string
  name: string
  icon: string
  color: string
}

export interface ChartDataPoint {
  label: string
  value: number
}

export interface AIRiskResult {
  rain: number
  flood: number
  landslide: number
  explanation: string
}
