import { Bell, Clock } from 'lucide-react'
import PageHeader from '../components/PageHeader'
import RiskBadge from '../components/RiskBadge'
import { alerts } from '../data/mockData'
import { riskSolidColors } from '../utils/riskColors'
import type { RiskLevel } from '../types'

const levelIcons: Record<RiskLevel, string> = {
  verde: '✓',
  amarelo: '!',
  laranja: '⚠',
  vermelho: '✕',
}

export default function AlertsPage() {
  return (
    <div className="page-container animate-fade-in">
      <PageHeader title="Alertas" subtitle={`${alerts.length} alertas ativos`} />

      <div className="px-4 pt-4">
        <div className="mb-4 flex items-center gap-2 rounded-xl bg-primary-50 p-3">
          <Bell size={20} className="text-primary-600" />
          <p className="text-sm text-primary-800">
            Monitoramento ativo para <strong>Sento Sé - BA</strong>
          </p>
        </div>

        <div className="space-y-4">
          {alerts.map((alert, index) => (
            <div
              key={alert.id}
              className="card overflow-hidden animate-slide-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div
                className="h-1.5"
                style={{ backgroundColor: riskSolidColors[alert.level] }}
              />
              <div className="p-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div
                      className="flex h-10 w-10 items-center justify-center rounded-xl text-lg font-bold text-white"
                      style={{ backgroundColor: riskSolidColors[alert.level] }}
                    >
                      {levelIcons[alert.level]}
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-800">{alert.category}</h3>
                      <RiskBadge level={alert.level} size="sm" />
                    </div>
                  </div>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-slate-600">
                  {alert.description}
                </p>
                <div className="mt-3 flex items-center gap-1 text-xs text-slate-400">
                  <Clock size={12} />
                  <span>{alert.time}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 card p-4">
          <h3 className="mb-3 text-sm font-semibold text-slate-700">Legenda de Níveis</h3>
          <div className="grid grid-cols-2 gap-2">
            {(['verde', 'amarelo', 'laranja', 'vermelho'] as RiskLevel[]).map((level) => (
              <div key={level} className="flex items-center gap-2">
                <div
                  className="h-3 w-3 rounded-full"
                  style={{ backgroundColor: riskSolidColors[level] }}
                />
                <span className="text-xs capitalize text-slate-600">{level}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
