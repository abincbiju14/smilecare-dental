import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Award, Clock, Calendar, CheckCircle2, Star } from 'lucide-react'

export interface DoctorInfo {
  name: string
  degree: string
  specialty: string
  image: string
  experience: string
  about: string
  highlights: string[]
  days: string
}

interface DoctorModalProps {
  doctor: DoctorInfo | null
  onClose: () => void
  onBook: (doctorName: string) => void
}

export function DoctorModal({ doctor, onClose, onBook }: DoctorModalProps) {
  if (!doctor) return null

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
          className="relative z-10 w-full max-w-lg max-h-[92dvh] sm:max-h-[90vh] overflow-y-auto overscroll-contain rounded-t-3xl sm:rounded-3xl bg-white shadow-2xl border border-slate-100"
        >
          {/* Header Image banner */}
          <div className="relative h-52 sm:h-64 w-full shrink-0 bg-[#0d5249]">
            <img
              src={doctor.image}
              alt={doctor.name}
              className="h-full w-full object-cover object-top"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            <button
              onClick={onClose}
              className="absolute right-4 top-4 flex h-11 w-11 items-center justify-center rounded-full bg-black/40 text-white hover:bg-black/60 transition"
              aria-label="Close"
            >
              <X className="h-5 w-5" />
            </button>
            <div className="absolute bottom-4 left-6 right-6 text-white">
              <span className="rounded-full bg-teal-500/80 px-3 py-1 text-xs font-semibold backdrop-blur">
                {doctor.specialty}
              </span>
              <h3 className="mt-2 text-2xl font-bold">{doctor.name}</h3>
              <p className="text-xs text-slate-200">{doctor.degree}</p>
            </div>
          </div>

          {/* Details Body */}
          <div className="p-6 space-y-4">
            <div className="flex items-center justify-between text-xs text-slate-600 bg-[#f2f7f5] p-3 rounded-2xl border border-[#e2ede8]">
              <div className="flex items-center gap-1.5">
                <Award className="h-4 w-4 text-[#0d5249]" />
                <span>{doctor.experience} Experience</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Clock className="h-4 w-4 text-[#0d5249]" />
                <span>{doctor.days}</span>
              </div>
              <div className="flex items-center gap-1 text-amber-500 font-bold">
                <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                <span>4.9 / 5.0</span>
              </div>
            </div>

            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">
                Background & Approach
              </h4>
              <p className="text-sm text-slate-600 leading-relaxed">{doctor.about}</p>
            </div>

            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                Specialized Treatments
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-700">
                {doctor.highlights.map((h, i) => (
                  <div key={i} className="flex items-center gap-1.5">
                    <CheckCircle2 className="h-3.5 w-3.5 text-teal-600 shrink-0" />
                    <span>{h}</span>
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={() => {
                onBook(doctor.name)
                onClose()
              }}
              className="mt-4 flex w-full items-center justify-center gap-2 rounded-full bg-[#0d5249] py-3.5 font-bold text-white shadow-lg shadow-[#0d5249]/20 hover:bg-[#093d37] transition"
            >
              <Calendar className="h-4 w-4" />
              Schedule with {doctor.name.split(' ')[1]}
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  )
}

