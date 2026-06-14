import type { RiskLevel } from '../types'

export const riskConfig: Record<RiskLevel, { bg: string; text: string; border: string; label: string }> = {
  verde: {
    bg: 'bg-risk-green/10',
    text: 'text-risk-green',
    border: 'border-risk-green/30',
    label: 'Baixo',
  },
  amarelo: {
    bg: 'bg-risk-yellow/10',
    text: 'text-risk-yellow',
    border: 'border-risk-yellow/30',
    label: 'Moderado',
  },
  laranja: {
    bg: 'bg-risk-orange/10',
    text: 'text-risk-orange',
    border: 'border-risk-orange/30',
    label: 'Alto',
  },
  vermelho: {
    bg: 'bg-risk-red/10',
    text: 'text-risk-red',
    border: 'border-risk-red/30',
    label: 'Crítico',
  },
}

export const riskSolidColors: Record<RiskLevel, string> = {
  verde: '#22c55e',
  amarelo: '#eab308',
  laranja: '#f97316',
  vermelho: '#ef4444',
}
