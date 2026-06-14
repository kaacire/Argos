import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Camera, Send, AlertCircle, CheckCircle2, ArrowLeft } from 'lucide-react'
import PageHeader from '../components/PageHeader'
import SimulatedPhoto from '../components/SimulatedPhoto'
import { SimulatedNotification } from '../components/SimulatedNotification'

// ---------- TIPOS ----------
// "interface" descreve o formato de um objeto: quais campos ele tem
// e o tipo de cada um. Isso ajuda o editor a te avisar de erros antes
// mesmo de rodar o código.

interface AccidentType {
  value: string
  label: string
  color: string
}

interface SubmittedReport {
  type: string
  color: string
  location: string
  description: string
  photoPreview: string | null
  time: string
  status: 'pendente'
}

// "Record<string, string>" = um objeto onde toda chave e todo valor são texto.
// Ex: { type: "Selecione...", photo: "Envie uma foto..." }
type FormErrors = Record<string, string>

const accidentTypes: AccidentType[] = [
  { value: 'buraco', label: 'Buraco na via', color: '#f59e0b' },
  { value: 'alagamento', label: 'Alagamento', color: '#3b82f6' },
  { value: 'queda-de-arvore', label: 'Queda de árvore', color: '#22c55e' },
  { value: 'acidente-transito', label: 'Acidente de trânsito', color: '#ef4444' },
  { value: 'fio-eletrico', label: 'Fio elétrico exposto', color: '#eab308' },
  { value: 'iluminacao', label: 'Falta de iluminação', color: '#6366f1' },
  { value: 'outro', label: 'Outro', color: '#64748b' },
]

const MIN_DESCRIPTION_LENGTH = 100

export default function NewReportPage() {
  // useNavigate() retorna uma função que usamos para trocar de página
  // programaticamente (ex: ao clicar em um botão "Voltar" ou após enviar).
  const navigate = useNavigate()

  // Estados do formulário (campos controlados)
  // O texto dentro de < > é o TIPO do que vai dentro do useState.
  const [type, setType] = useState<string>('')
  const [location, setLocation] = useState<string>('')
  const [description, setDescription] = useState<string>('')
  const [photo, setPhoto] = useState<File | null>(null)
  const [photoPreview, setPhotoPreview] = useState<string | null>(null)

  // Estados de controle de UI
  const [errors, setErrors] = useState<FormErrors>({})
  const [submitted, setSubmitted] = useState<SubmittedReport | null>(null)
  const [notify, setNotify] = useState<boolean>(false)

  // "e: React.ChangeEvent<HTMLInputElement>" diz que "e" é o evento
  // de mudança de um <input> especificamente.
  function handlePhotoChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return

    setPhoto(file)

    const reader = new FileReader()
    reader.onload = () => setPhotoPreview(reader.result as string)
    reader.readAsDataURL(file)
  }

  function validate(): FormErrors {
    const newErrors: FormErrors = {}

    if (!type) {
      newErrors.type = 'Selecione o tipo de ocorrência.'
    }

    if (!photo) {
      newErrors.photo = 'Envie uma foto do local.'
    }

    const descLength = description.trim().length
    if (descLength < MIN_DESCRIPTION_LENGTH) {
      newErrors.description = `A descrição precisa ter pelo menos ${MIN_DESCRIPTION_LENGTH} caracteres (${descLength}/${MIN_DESCRIPTION_LENGTH}).`
    }

    return newErrors
  }

  // "e: React.FormEvent<HTMLFormElement>" = evento de submit de um <form>
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()

    const newErrors = validate()
    setErrors(newErrors)

    if (Object.keys(newErrors).length > 0) return

    const selectedType = accidentTypes.find((t) => t.value === type)
    if (!selectedType) return // segurança extra para o TypeScript

    setSubmitted({
      type: selectedType.label,
      color: selectedType.color,
      location: location.trim() || 'Localização não informada',
      description: description.trim(),
      photoPreview,
      time: 'Agora mesmo',
      status: 'pendente',
    })

    setNotify(true)
  }

  function handleReset() {
    setType('')
    setLocation('')
    setDescription('')
    setPhoto(null)
    setPhotoPreview(null)
    setErrors({})
    setSubmitted(null)
  }

  const descLength = description.trim().length
  const descOk = descLength >= MIN_DESCRIPTION_LENGTH

  return (
    <div className="page-container animate-fade-in">
      <SimulatedNotification
        visible={notify}
        title="Relato enviado"
        message="Seu relato foi recebido e está pendente de análise."
        time="agora"
        onClose={() => setNotify(false)}
      />

      <PageHeader title="Novo Relato" subtitle="Conte o que está acontecendo" />

      <div className="px-4 pt-4">
        {/* Botão de voltar — exemplo de navegação programática */}
        <button
          onClick={() => navigate(-1)}
          className="mb-4 flex items-center gap-1 text-sm font-medium text-slate-500"
        >
          <ArrowLeft size={16} />
          Voltar
        </button>

        {submitted ? (
          // ---------- TELA DE CONFIRMAÇÃO (após enviar) ----------
          <div className="space-y-4 animate-slide-up">
            <div className="card flex items-start gap-3 p-4 border-l-4 border-risk-green">
              <CheckCircle2 className="mt-0.5 flex-shrink-0 text-risk-green" size={22} />
              <div>
                <h3 className="font-bold text-slate-800">Relato enviado com sucesso!</h3>
                <p className="mt-1 text-sm text-slate-500">
                  Seu relato foi registrado com status "Pendente". A equipe
                  responsável irá analisar em breve.
                </p>
              </div>
            </div>

            <div className="card p-4 animate-slide-up">
              <div className="flex gap-3">
                {submitted.photoPreview ? (
                  <img
                    src={submitted.photoPreview}
                    alt={submitted.type}
                    className="h-20 w-20 flex-shrink-0 rounded-xl object-cover"
                  />
                ) : (
                  <SimulatedPhoto color={submitted.color} label={submitted.type} />
                )}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="font-bold text-slate-800">{submitted.type}</h3>
                    <span className="flex-shrink-0 rounded-full bg-risk-yellow/10 px-2 py-0.5 text-[10px] font-semibold text-risk-yellow">
                      Pendente
                    </span>
                  </div>
                  <p className="mt-1 text-xs text-slate-500">{submitted.location}</p>
                  <p className="mt-2 text-sm text-slate-600">{submitted.description}</p>
                  <p className="mt-2 text-xs text-slate-400">{submitted.time}</p>
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <button className="btn-primary flex-1" onClick={handleReset}>
                Enviar outro relato
              </button>
              <button
                className="flex-1 rounded-lg bg-slate-100 text-sm font-semibold text-slate-600"
                onClick={() => navigate('/relatos')}
              >
                Ver meus relatos
              </button>
            </div>
          </div>
        ) : (
          // ---------- FORMULÁRIO ----------
          <form className="space-y-5" onSubmit={handleSubmit} noValidate>
            {/* Tipo de ocorrência */}
            <div className="card p-4">
              <label className="mb-2 block text-sm font-bold text-slate-800" htmlFor="type">
                Tipo de ocorrência
              </label>
              <select
                id="type"
                className={`w-full rounded-lg border bg-white px-3 py-2.5 text-sm text-slate-700 outline-none focus:ring-2 focus:ring-primary-300 ${
                  errors.type ? 'border-risk-red' : 'border-slate-200'
                }`}
                value={type}
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setType(e.target.value)}
              >
                <option value="">Selecione...</option>
                {accidentTypes.map((t) => (
                  <option key={t.value} value={t.value}>
                    {t.label}
                  </option>
                ))}
              </select>
              {errors.type && (
                <p className="mt-1.5 flex items-center gap-1 text-xs text-risk-red">
                  <AlertCircle size={12} /> {errors.type}
                </p>
              )}
            </div>

            {/* Localização (opcional) */}
            <div className="card p-4">
              <label className="mb-2 block text-sm font-bold text-slate-800" htmlFor="location">
                Localização <span className="font-normal text-slate-400">(opcional)</span>
              </label>
              <input
                id="location"
                type="text"
                placeholder="Ex: Rua das Flores, próximo ao nº 123"
                className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-700 outline-none focus:ring-2 focus:ring-primary-300"
                value={location}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setLocation(e.target.value)}
              />
            </div>

            {/* Foto (obrigatória) */}
            <div className="card p-4">
              <label className="mb-2 block text-sm font-bold text-slate-800">
                Foto do local <span className="font-normal text-risk-red">*</span>
              </label>

              <label
                htmlFor="photo"
                className={`flex cursor-pointer items-center gap-3 rounded-lg border-2 border-dashed px-3 py-4 text-sm transition-colors ${
                  errors.photo ? 'border-risk-red' : 'border-slate-200'
                } ${photoPreview ? 'bg-slate-50' : 'bg-white hover:bg-slate-50'}`}
              >
                {photoPreview ? (
                  <img
                    src={photoPreview}
                    alt="Pré-visualização"
                    className="h-16 w-16 rounded-lg object-cover"
                  />
                ) : (
                  <div className="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-lg bg-slate-100 text-slate-400">
                    <Camera size={22} />
                  </div>
                )}
                <div className="flex-1">
                  <p className="font-medium text-slate-700">
                    {photo ? photo.name : 'Toque para enviar uma foto'}
                  </p>
                  <p className="mt-0.5 text-xs text-slate-400">JPG ou PNG, até 10MB</p>
                </div>
              </label>

              <input
                id="photo"
                type="file"
                accept="image/*"
                capture="environment"
                className="hidden"
                onChange={handlePhotoChange}
              />

              {errors.photo && (
                <p className="mt-1.5 flex items-center gap-1 text-xs text-risk-red">
                  <AlertCircle size={12} /> {errors.photo}
                </p>
              )}
            </div>

            {/* Descrição (mínimo 100 caracteres) */}
            <div className="card p-4">
              <label className="mb-2 block text-sm font-bold text-slate-800" htmlFor="description">
                Descrição
              </label>
              <textarea
                id="description"
                rows={5}
                placeholder="Descreva com detalhes o que está acontecendo, há quanto tempo e quais os riscos..."
                className={`w-full resize-none rounded-lg border bg-white px-3 py-2.5 text-sm text-slate-700 outline-none focus:ring-2 focus:ring-primary-300 ${
                  errors.description ? 'border-risk-red' : 'border-slate-200'
                }`}
                value={description}
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setDescription(e.target.value)}
              />
              <div className="mt-1.5 flex items-center justify-between text-xs">
                <span className={descOk ? 'text-risk-green' : 'text-slate-400'}>
                  {descLength}/{MIN_DESCRIPTION_LENGTH} caracteres mínimos
                </span>
                {descOk && <CheckCircle2 size={14} className="text-risk-green" />}
              </div>
              {errors.description && (
                <p className="mt-1.5 flex items-center gap-1 text-xs text-risk-red">
                  <AlertCircle size={12} /> {errors.description}
                </p>
              )}
            </div>

            <button type="submit" className="btn-primary flex w-full items-center justify-center gap-2">
              <Send size={16} />
              Enviar Relato
            </button>
          </form>
        )}
      </div>
    </div>
  )
}