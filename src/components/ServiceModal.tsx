import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Calendar, Check, Clock, ShieldCheck, ArrowRight } from 'lucide-react'

export interface ServiceInfo {
  title: string
  subtitle: string
  description: string
  benefits: string[]
  process: string[]
  timeRequired: string
  anesthesia: string
  icon: React.ReactNode
}

interface ServiceModalProps {
  service: ServiceInfo | null
  onClose: () => void
  onBook: (serviceTitle: string) => void
}

export function ServiceModal({ service, onClose, onBook }: ServiceModalProps) {
  if (!service) return null

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative z-10 w-full max-w-lg rounded-t-3xl sm:rounded-3xl bg-white shadow-2xl border border-slate-100 max-h-[92dvh] sm:max-h-[90vh] overflow-y-auto overscroll-contain"
        >
          {/* Header */}
          <div className="relative bg-gradient-to-br from-[#0d5249] to-[#08352f] p-6 text-white">
            <button
              onClick={onClose}
              className="absolute right-4 top-4 rounded-full bg-white/10 p-2 text-white hover:bg-white/20 transition"
              aria-label="Close"
            >
              <X className="h-5 w-5" />
            </button>
            <div className="flex items-center gap-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/10 p-2 backdrop-blur">
                {service.icon}
              </div>
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-teal-300">
                  Specialized Treatment
                </span>
                <h3 className="text-2xl font-bold">{service.title}</h3>
                <p className="text-xs text-slate-200">{service.subtitle}</p>
              </div>
            </div>
          </div>

          {/* Body */}
          <div className="p-6 space-y-5">
            <p className="text-sm text-slate-600 leading-relaxed">{service.description}</p>

            <div className="grid grid-cols-2 gap-3 text-xs bg-[#f2f7f5] p-3.5 rounded-2xl border border-[#e2ede8]">
              <div>
                <span className="text-slate-400 block mb-0.5">Duration:</span>
                <span className="font-semibold text-slate-800 flex items-center gap-1">
                  <Clock className="h-3.5 w-3.5 text-[#0d5249]" />
                  {service.timeRequired}
                </span>
              </div>
              <div>
                <span className="text-slate-400 block mb-0.5">Comfort Level:</span>
                <span className="font-semibold text-slate-800 flex items-center gap-1">
                  <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" />
                  {service.anesthesia}
                </span>
              </div>
            </div>

            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                Key Patient Benefits
              </h4>
              <div className="space-y-1.5 text-xs text-slate-700">
                {service.benefits.map((b, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <Check className="h-4 w-4 text-[#0d5249] shrink-0 mt-0.5" />
                    <span>{b}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                Procedure Steps
              </h4>
              <div className="space-y-2 text-xs text-slate-600">
                {service.process.map((step, idx) => (
                  <div key={idx} className="flex items-start gap-2.5">
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#0d5249] text-[10px] font-bold text-white">
                      {idx + 1}
                    </span>
                    <span className="mt-0.5">{step}</span>
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={() => {
                onBook(service.title)
                onClose()
              }}
              className="mt-2 flex w-full items-center justify-center gap-2 rounded-full bg-[#0d5249] py-3.5 font-bold text-white shadow-lg shadow-[#0d5249]/20 hover:bg-[#093d37] transition"
            >
              <Calendar className="h-4 w-4" />
              Book Consultation for {service.title}
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  )
}

