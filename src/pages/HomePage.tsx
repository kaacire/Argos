import { Link } from 'react-router-dom'
import {
  CloudRain,
  Droplets,
  Wind,
  MapPin,
  Clock,
  ChevronRight,
  Brain,
  BarChart3,
  AlertTriangle,
} from 'lucide-react'
import Logo from '../components/Logo'
import RiskBadge from '../components/RiskBadge'
import { weatherData, alerts } from '../data/mockData'

export default function HomePage() {
  return (
    <div className="page-container animate-fade-in">
      <div className="bg-gradient-to-br from-primary-700 via-primary-600 to-primary-800 px-4 pb-8 pt-6 text-white">
        <div className="mb-6">
          <Logo size="md" light />
        </div>

        <div className="mb-2 flex items-center gap-1 text-sm text-white/80">
          <MapPin size={14} />
          <span>
            {weatherData.city} - {weatherData.state}
          </span>
        </div>

        <div className="flex items-end justify-between">
          <div>
            <p className="text-6xl font-bold tracking-tight">{weatherData.temperature}°</p>
            <p className="mt-1 text-lg text-white/90">{weatherData.condition}</p>
          </div>
          <div className="text-right">
            <CloudRain size={64} className="text-white/30" />
          </div>
        </div>

        <div className="mt-6 flex gap-4">
          <div className="flex items-center gap-2 rounded-xl bg-white/15 px-3 py-2 backdrop-blur-sm">
            <Droplets size={16} />
            <span className="text-sm">{weatherData.humidity}%</span>
          </div>
          <div className="flex items-center gap-2 rounded-xl bg-white/15 px-3 py-2 backdrop-blur-sm">
            <Wind size={16} />
            <span className="text-sm">{weatherData.windSpeed} km/h</span>
          </div>
        </div>
      </div>

      <div className="px-4 -mt-4">
        <div className="card p-4 animate-slide-up">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500">Nível Geral de Risco</p>
              <div className="mt-1">
                <RiskBadge level={weatherData.riskLevel} size="lg" />
              </div>
            </div>
            <AlertTriangle size={32} className="text-risk-orange" />
          </div>
          <div className="mt-3 flex items-center gap-1 text-xs text-slate-400">
            <Clock size={12} />
            <span>Última atualização: {weatherData.lastUpdate}</span>
          </div>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-3">
          <Link to="/historico" className="card card-hover p-4">
            <BarChart3 size={24} className="text-primary-600" />
            <p className="mt-2 font-semibold text-slate-800">Histórico</p>
            <p className="text-xs text-slate-500">Dados climáticos</p>
          </Link>
          <Link to="/ia" className="card card-hover p-4">
            <Brain size={24} className="text-accent-500" />
            <p className="mt-2 font-semibold text-slate-800">IA Preditiva</p>
            <p className="text-xs text-slate-500">Análise de riscos</p>
          </Link>
        </div>

        <div className="mt-6">
          <div className="mb-3 flex items-center justify-between">
            <h2 className="font-bold text-slate-800">Alertas Ativos</h2>
            <Link to="/alertas" className="flex items-center gap-1 text-sm text-primary-600">
              Ver todos <ChevronRight size={16} />
            </Link>
          </div>
          <div className="space-y-3">
            {alerts.slice(0, 2).map((alert) => (
              <div key={alert.id} className="card card-hover p-3">
                <div className="flex items-center justify-between">
                  <p className="font-semibold text-slate-800">{alert.category}</p>
                  <RiskBadge level={alert.level} size="sm" />
                </div>
                <p className="mt-1 text-xs text-slate-500">{alert.description}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-6 pb-4">
          <h2 className="mb-3 font-bold text-slate-800">Acesso Rápido</h2>
          <div className="grid grid-cols-3 gap-3">
            <Link
              to="/mapa"
              className="card card-hover flex flex-col items-center p-3 text-center"
            >
              <MapPin size={20} className="text-primary-600" />
              <span className="mt-1 text-xs font-medium">Mapa</span>
            </Link>
            <Link
              to="/relatos"
              className="card card-hover flex flex-col items-center p-3 text-center"
            >
              <CloudRain size={20} className="text-primary-600" />
              <span className="mt-1 text-xs font-medium">Relatos</span>
            </Link>
            <Link
              to="/emergencia"
              className="card card-hover flex flex-col items-center p-3 text-center"
            >
              <AlertTriangle size={20} className="text-risk-red" />
              <span className="mt-1 text-xs font-medium">Emergência</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
