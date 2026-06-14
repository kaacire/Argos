import type { Alert, EmergencyContact, MapLayer, Report, WeatherData } from '../types'

export const SENTO_SE_COORDS: [number, number] = [-9.7436, -42.2564]

export const weatherData: WeatherData = {
  temperature: 28,
  condition: 'Parcialmente Nublado',
  humidity: 72,
  windSpeed: 32,
  city: 'Sento Sé',
  state: 'BA',
  riskLevel: 'laranja',
  lastUpdate: '11/06/2026 às 14:32',
}

export const alerts: Alert[] = [
  {
    id: '1',
    category: 'Chuva Intensa',
    level: 'laranja',
    description: 'Previsão de chuva intensa para as próximas 2 horas. Volume estimado de 40-60mm.',
    time: 'Válido até 16:30',
  },
  {
    id: '2',
    category: 'Ventania',
    level: 'amarelo',
    description: 'Rajadas de vento de até 45 km/h previstas na região central.',
    time: 'Válido até 18:00',
  },
  {
    id: '3',
    category: 'Alagamento',
    level: 'verde',
    description: 'Sem risco imediato de alagamento nas áreas monitoradas.',
    time: 'Atualizado agora',
  },
]

export const reports: Report[] = [
  {
    id: '1',
    type: 'Rua alagada',
    location: 'Rua da Matriz, Centro',
    time: 'Há 15 min',
    status: 'verificado',
    imageColor: '#3b82f6',
  },
  {
    id: '2',
    type: 'Árvore caída',
    location: 'Av. Principal, Bairro Novo',
    time: 'Há 42 min',
    status: 'pendente',
    imageColor: '#22c55e',
  },
  {
    id: '3',
    type: 'Falta de energia',
    location: 'Rua do Comércio, Centro',
    time: 'Há 1h',
    status: 'verificado',
    imageColor: '#eab308',
  },
  {
    id: '4',
    type: 'Acidente',
    location: 'BR-235, Km 12',
    time: 'Há 2h',
    status: 'resolvido',
    imageColor: '#ef4444',
  },
  {
    id: '5',
    type: 'Ponte interditada',
    location: 'Ponte sobre o Rio Piauí',
    time: 'Há 3h',
    status: 'verificado',
    imageColor: '#f97316',
  },
]

export const emergencyContacts: EmergencyContact[] = [
  {
    id: '1',
    name: 'Defesa Civil',
    phone: '199',
    hours: '24 horas',
    icon: 'shield',
    color: 'from-blue-600 to-blue-700',
  },
  {
    id: '2',
    name: 'Bombeiros',
    phone: '193',
    hours: '24 horas',
    icon: 'flame',
    color: 'from-red-600 to-red-700',
  },
  {
    id: '3',
    name: 'SAMU',
    phone: '192',
    hours: '24 horas',
    icon: 'heart-pulse',
    color: 'from-emerald-600 to-emerald-700',
  },
  {
    id: '4',
    name: 'Polícia',
    phone: '190',
    hours: '24 horas',
    icon: 'shield-check',
    color: 'from-slate-700 to-slate-800',
  },
]

export const mapLayers: MapLayer[] = [
  { id: 'chuva', name: 'Chuva', icon: 'cloud-rain', color: '#3b82f6' },
  { id: 'temperatura', name: 'Temperatura', icon: 'thermometer', color: '#ef4444' },
  { id: 'ventania', name: 'Ventania', icon: 'wind', color: '#8b5cf6' },
  { id: 'alagamentos', name: 'Alagamentos', icon: 'waves', color: '#06b6d4' },
  { id: 'deslizamentos', name: 'Deslizamentos', icon: 'mountain', color: '#f97316' },
  { id: 'relatos', name: 'Relatos', icon: 'message-square', color: '#22c55e' },
  { id: 'abrigos', name: 'Abrigos', icon: 'home', color: '#eab308' },
  { id: 'rios', name: 'Nível dos Rios', icon: 'droplets', color: '#1d4ed8' },
]

export const mapMarkers = {
  chuva: [
    { lat: -9.741, lng: -42.254, intensity: 'alta' },
    { lat: -9.746, lng: -42.258, intensity: 'média' },
    { lat: -9.738, lng: -42.261, intensity: 'baixa' },
  ],
  alagamentos: [
    { lat: -9.742, lng: -42.255, name: 'Rua da Matriz' },
    { lat: -9.745, lng: -42.259, name: 'Av. Principal' },
  ],
  deslizamentos: [
    { lat: -9.748, lng: -42.252, name: 'Morro do Cruzeiro' },
  ],
  relatos: [
    { lat: -9.740, lng: -42.257, type: 'Árvore caída' },
    { lat: -9.744, lng: -42.260, type: 'Falta de energia' },
  ],
  abrigos: [
    { lat: -9.743, lng: -42.256, name: 'Ginásio Municipal' },
    { lat: -9.739, lng: -42.253, name: 'Escola Municipal' },
  ],
  rios: [
    { lat: -9.741, lng: -42.262, name: 'Rio Piauí', level: 2.4 },
    { lat: -9.747, lng: -42.251, name: 'Rio do Peixe', level: 1.8 },
  ],
}

export function getChartData(period: '7d' | '3m' | '1y') {
  const data = {
    '7d': {
      rain: [
        { label: 'Seg', value: 12 },
        { label: 'Ter', value: 45 },
        { label: 'Qua', value: 8 },
        { label: 'Qui', value: 62 },
        { label: 'Sex', value: 28 },
        { label: 'Sáb', value: 15 },
        { label: 'Dom', value: 38 },
      ],
      temperature: [
        { label: 'Seg', value: 29 },
        { label: 'Ter', value: 31 },
        { label: 'Qua', value: 28 },
        { label: 'Qui', value: 27 },
        { label: 'Sex', value: 30 },
        { label: 'Sáb', value: 32 },
        { label: 'Dom', value: 28 },
      ],
      wind: [
        { label: 'Seg', value: 18 },
        { label: 'Ter', value: 32 },
        { label: 'Qua', value: 22 },
        { label: 'Qui', value: 45 },
        { label: 'Sex', value: 28 },
        { label: 'Sáb', value: 15 },
        { label: 'Dom', value: 38 },
      ],
      occurrences: [
        { label: 'Seg', value: 2 },
        { label: 'Ter', value: 5 },
        { label: 'Qua', value: 1 },
        { label: 'Qui', value: 8 },
        { label: 'Sex', value: 3 },
        { label: 'Sáb', value: 2 },
        { label: 'Dom', value: 6 },
      ],
    },
    '3m': {
      rain: [
        { label: 'Abr', value: 180 },
        { label: 'Mai', value: 320 },
        { label: 'Jun', value: 245 },
      ],
      temperature: [
        { label: 'Abr', value: 30 },
        { label: 'Mai', value: 28 },
        { label: 'Jun', value: 27 },
      ],
      wind: [
        { label: 'Abr', value: 25 },
        { label: 'Mai', value: 35 },
        { label: 'Jun', value: 28 },
      ],
      occurrences: [
        { label: 'Abr', value: 12 },
        { label: 'Mai', value: 28 },
        { label: 'Jun', value: 18 },
      ],
    },
    '1y': {
      rain: [
        { label: 'Jul', value: 45 },
        { label: 'Ago', value: 12 },
        { label: 'Set', value: 8 },
        { label: 'Out', value: 35 },
        { label: 'Nov', value: 78 },
        { label: 'Dez', value: 120 },
        { label: 'Jan', value: 95 },
        { label: 'Fev', value: 65 },
        { label: 'Mar', value: 42 },
        { label: 'Abr', value: 180 },
        { label: 'Mai', value: 320 },
        { label: 'Jun', value: 245 },
      ],
      temperature: [
        { label: 'Jul', value: 26 },
        { label: 'Ago', value: 28 },
        { label: 'Set', value: 30 },
        { label: 'Out', value: 31 },
        { label: 'Nov', value: 29 },
        { label: 'Dez', value: 28 },
        { label: 'Jan', value: 30 },
        { label: 'Fev', value: 31 },
        { label: 'Mar', value: 30 },
        { label: 'Abr', value: 30 },
        { label: 'Mai', value: 28 },
        { label: 'Jun', value: 27 },
      ],
      wind: [
        { label: 'Jul', value: 15 },
        { label: 'Ago', value: 18 },
        { label: 'Set', value: 22 },
        { label: 'Out', value: 20 },
        { label: 'Nov', value: 28 },
        { label: 'Dez', value: 25 },
        { label: 'Jan', value: 30 },
        { label: 'Fev', value: 32 },
        { label: 'Mar', value: 28 },
        { label: 'Abr', value: 25 },
        { label: 'Mai', value: 35 },
        { label: 'Jun', value: 28 },
      ],
      occurrences: [
        { label: 'Jul', value: 5 },
        { label: 'Ago', value: 3 },
        { label: 'Set', value: 2 },
        { label: 'Out', value: 8 },
        { label: 'Nov', value: 15 },
        { label: 'Dez', value: 22 },
        { label: 'Jan', value: 18 },
        { label: 'Fev', value: 10 },
        { label: 'Mar', value: 8 },
        { label: 'Abr', value: 12 },
        { label: 'Mai', value: 28 },
        { label: 'Jun', value: 18 },
      ],
    },
  }
  return data[period]
}

export const aiInputs = {
  rainForecast: '40-60mm nas próximas 6h',
  humidity: '72%',
  regionHistory: '3 eventos de alagamento nos últimos 30 dias',
  riverProximity: 'Distância média de 850m dos rios monitorados',
}

export const aiResults = {
  rain: 78,
  flood: 52,
  landslide: 15,
  explanation:
    'Com base na previsão de chuva intensa (40-60mm), umidade elevada (72%) e histórico recente de alagamentos na região central de Sento Sé, o sistema identifica risco elevado de chuva (78%) e moderado de alagamento (52%). A proximidade dos rios Piauí e do Peixe amplifica o risco hidrológico. O risco de deslizamento permanece baixo (15%) devido à topografia plana predominante na área urbana.',
}
