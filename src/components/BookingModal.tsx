import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Calendar, Clock, User, Phone, Mail, CheckCircle2, ShieldCheck } from 'lucide-react'

interface BookingModalProps {
  isOpen: boolean
  onClose: () => void
  initialService?: string
  initialDoctor?: string
}

const timeSlots = [
  '09:30 AM',
  '11:00 AM',
  '02:30 PM',
  '04:00 PM',
  '05:30 PM',
  '06:45 PM',
]

const servicesList = [
  'Dental Implants',
  'Braces & Alignment',
  'Root Canal Treatment',
  'Teeth Whitening',
  'Cosmetic Dentistry',
  'Comprehensive Check-up & Cleaning',
]

const doctorsList = [
  { name: 'Dr. Rahul Menon', role: 'Dental Implant Specialist' },
  { name: 'Dr. Anjali Nair', role: 'Orthodontist (Braces & Aligners)' },
  { name: 'Dr. Vivek Thomas', role: 'Root Canal Specialist (Endodontist)' },
  { name: 'First Available Specialist', role: 'Quickest Consultation' },
]

export function BookingModal({
  isOpen,
  onClose,
  initialService = '',
  initialDoctor = '',
}: BookingModalProps) {
  const [service, setService] = useState(initialService || servicesList[0])
  const [doctor, setDoctor] = useState(initialDoctor || doctorsList[0].name)
  const [date, setDate] = useState(() => {
    const tomorrow = new Date()
    tomorrow.setDate(tomorrow.getDate() + 1)
    return tomorrow.toISOString().split('T')[0]
  })
  const [slot, setSlot] = useState(timeSlots[1])
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [notes, setNotes] = useState('')
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [bookingRef, setBookingRef] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const ref = 'SC-' + Math.floor(100000 + Math.random() * 900000)
    setBookingRef(ref)
    setIsSubmitted(true)
  }

  const handleReset = () => {
    setIsSubmitted(false)
    onClose()
  }

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
          className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm"
        />

        {/* Modal Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          className="relative z-10 w-full max-w-xl max-h-[92dvh] sm:max-h-[90vh] overflow-y-auto overscroll-contain rounded-t-3xl sm:rounded-3xl bg-white shadow-2xl border border-slate-100"
        >
          {/* Header */}
          <div className="sticky top-0 z-10 flex items-center justify-between border-b border-slate-100 bg-white/95 px-4 sm:px-6 py-3 sm:py-4 backdrop-blur">
            <div>
              <div className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-xs font-bold uppercase tracking-wider text-[#0d5249]">
                  Instant Confirmation
                </span>
              </div>
              <h3 className="text-xl font-extrabold text-[#0e322d]">Book Your Dental Visit</h3>
            </div>
            <button
              onClick={onClose}
              className="rounded-full p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-700 transition"
              aria-label="Close modal"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="p-4 pb-8 sm:p-6 md:p-8">
            {isSubmitted ? (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center py-6"
              >
                <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-emerald-50 text-emerald-600 mb-6 ring-8 ring-emerald-50">
                  <CheckCircle2 className="h-12 w-12" />
                </div>
                <h4 className="text-2xl font-bold text-[#0e322d]">Appointment Reserved!</h4>
                <p className="mt-2 text-slate-600">
                  Thank you, <span className="font-semibold text-slate-900">{name || 'valued patient'}</span>.
                  Your appointment has been registered with reference ID:
                </p>
                <div className="mt-4 inline-block rounded-xl bg-slate-100 px-4 py-2 font-mono text-base font-bold text-[#0d5249] tracking-wider">
                  {bookingRef}
                </div>

                <div className="mt-6 rounded-2xl bg-[#f2f7f5] p-5 text-left border border-[#e2ede8] text-sm text-slate-700 space-y-2">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Service:</span>
                    <span className="font-semibold">{service}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Doctor:</span>
                    <span className="font-semibold">{doctor}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Date & Time:</span>
                    <span className="font-semibold">
                      {date} at {slot}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Phone:</span>
                    <span className="font-semibold">{phone || '+91 98765 43210'}</span>
                  </div>
                </div>

                <p className="mt-6 text-xs text-slate-500 flex items-center justify-center gap-1.5">
                  <ShieldCheck className="h-4 w-4 text-emerald-600" />
                  Our clinic care coordinator will call you 30 minutes before your appointment.
                </p>

                <button
                  onClick={handleReset}
                  className="mt-8 w-full rounded-full bg-[#0d5249] py-3.5 font-semibold text-white shadow-lg shadow-[#0d5249]/20 hover:bg-[#093d37] transition"
                >
                  Done
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Select Service */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                    Select Treatment / Service
                  </label>
                  <select
                    value={service}
                    onChange={(e) => setService(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 bg-[#f8faf9] px-4 py-3 text-sm font-medium text-slate-800 outline-none focus:border-[#0d5249] focus:bg-white transition"
                  >
                    {servicesList.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Select Doctor */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                    Preferred Doctor
                  </label>
                  <select
                    value={doctor}
                    onChange={(e) => setDoctor(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 bg-[#f8faf9] px-4 py-3 text-sm font-medium text-slate-800 outline-none focus:border-[#0d5249] focus:bg-white transition"
                  >
                    {doctorsList.map((d) => (
                      <option key={d.name} value={d.name}>
                        {d.name} — {d.role}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Date & Time Slot */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                      <Calendar className="inline h-3.5 w-3.5 mr-1" />
                      Preferred Date
                    </label>
                    <input
                      type="date"
                      required
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      className="w-full rounded-xl border border-slate-200 bg-[#f8faf9] px-4 py-3 text-sm font-medium text-slate-800 outline-none focus:border-[#0d5249] focus:bg-white transition"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                      <Clock className="inline h-3.5 w-3.5 mr-1" />
                      Time Slot
                    </label>
                    <select
                      value={slot}
                      onChange={(e) => setSlot(e.target.value)}
                      className="w-full rounded-xl border border-slate-200 bg-[#f8faf9] px-4 py-3 text-sm font-medium text-slate-800 outline-none focus:border-[#0d5249] focus:bg-white transition"
                    >
                      {timeSlots.map((s) => (
                        <option key={s} value={s}>
                          {s}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Patient Information */}
                <div className="space-y-3 pt-2">
                  <div className="relative">
                    <User className="absolute left-4 top-3.5 h-4 w-4 text-slate-400" />
                    <input
                      type="text"
                      required
                      placeholder="Your Full Name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full rounded-xl border border-slate-200 bg-[#f8faf9] pl-11 pr-4 py-3 text-sm font-medium text-slate-800 outline-none focus:border-[#0d5249] focus:bg-white transition"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div className="relative">
                      <Phone className="absolute left-4 top-3.5 h-4 w-4 text-slate-400" />
                      <input
                        type="tel"
                        required
                        placeholder="Phone Number"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full rounded-xl border border-slate-200 bg-[#f8faf9] pl-11 pr-4 py-3 text-sm font-medium text-slate-800 outline-none focus:border-[#0d5249] focus:bg-white transition"
                      />
                    </div>
                    <div className="relative">
                      <Mail className="absolute left-4 top-3.5 h-4 w-4 text-slate-400" />
                      <input
                        type="email"
                        placeholder="Email (Optional)"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full rounded-xl border border-slate-200 bg-[#f8faf9] pl-11 pr-4 py-3 text-sm font-medium text-slate-800 outline-none focus:border-[#0d5249] focus:bg-white transition"
                      />
                    </div>
                  </div>

                  <textarea
                    rows={2}
                    placeholder="Tell us any specific concerns (e.g. toothache, sensitive teeth, first time visit)..."
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 bg-[#f8faf9] p-3 text-sm font-medium text-slate-800 outline-none focus:border-[#0d5249] focus:bg-white transition resize-none"
                  />
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  className="w-full rounded-full bg-[#0d5249] py-3.5 font-bold text-white shadow-lg shadow-[#0d5249]/25 hover:bg-[#093d37] transition"
                >
                  Confirm Appointment
                </button>

                <p className="text-center text-xs text-slate-400">
                  🔒 No advance payment needed. Free rescheduling up to 2 hours prior.
                </p>
              </form>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  )
}

