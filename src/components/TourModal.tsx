import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Play, Shield, Sparkles, CheckCircle2 } from 'lucide-react'

interface TourModalProps {
  isOpen: boolean
  onClose: () => void
}

export function TourModal({ isOpen, onClose }: TourModalProps) {
  if (!isOpen) return null

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-slate-950/75 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.94 }}
          className="relative z-10 w-full max-w-3xl max-h-[92dvh] sm:max-h-[90vh] overflow-y-auto overscroll-contain rounded-t-3xl sm:rounded-3xl bg-slate-900 text-white shadow-2xl border border-slate-700/50"
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-slate-800 px-4 sm:px-6 py-3 sm:py-4">
            <div className="flex items-center gap-2">
              <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-teal-500/20 text-teal-400">
                <Play className="h-4 w-4 fill-teal-400" />
              </span>
              <div>
                <h3 className="font-bold text-white">SmileCare Virtual Clinic Tour</h3>
                <p className="text-xs text-slate-400">2-Minute Facility Walkthrough</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-slate-400 hover:bg-slate-800 hover:text-white transition"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Video / Visual Container */}
          <div className="relative aspect-video w-full bg-slate-950">
            <img
              src="https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=1200&q=80"
              alt="Clinic Operatory"
              className="h-full w-full object-cover opacity-80"
            />
            {/* Ambient gradients */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />

            {/* Simulated Live Tour Interface */}
            <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-teal-500 text-slate-950 shadow-xl shadow-teal-500/30 transition hover:scale-105 cursor-pointer">
                <Play className="h-8 w-8 fill-slate-950 ml-1" />
              </div>
              <p className="mt-4 font-semibold text-white drop-shadow">
                Click to Start Interactive 360° Walkthrough
              </p>
              <p className="text-xs text-slate-300 drop-shadow">
                Explore our sterilization suite, dental chairs, and digital 3D imaging bay
              </p>
            </div>

            {/* Status pill */}
            <div className="absolute bottom-4 left-4 flex items-center gap-2 rounded-full bg-black/60 px-3 py-1.5 backdrop-blur text-xs text-teal-300 border border-teal-500/30">
              <span className="h-2 w-2 rounded-full bg-teal-400 animate-ping" />
              4K Ultra-Clean Sterilization Certified
            </div>
          </div>

          {/* Highlights Footer */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 border-t border-slate-800 bg-slate-900/90 p-5 text-xs text-slate-300">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-teal-400 shrink-0" />
              <span>Autoclaved Class-B Sterilization</span>
            </div>
            <div className="flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-amber-400 shrink-0" />
              <span>Low-Radiation 3D CBCT Imaging</span>
            </div>
            <div className="flex items-center gap-2">
              <Shield className="h-4 w-4 text-sky-400 shrink-0" />
              <span>Ergonomic Pain-Free Dental Chairs</span>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  )
}

