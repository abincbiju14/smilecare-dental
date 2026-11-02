import React from 'react'
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  ExternalLink,
  ShieldCheck,
  Navigation,
  MessageCircle,
  Calendar,
  CheckCircle2,
  Heart,
  ArrowRight,
} from 'lucide-react'
import { LogoTooth } from './DentalIllustrations'

interface FooterProps {
  onOpenBooking: (service?: string) => void
  onOpenTour: () => void
}

export function Footer({ onOpenBooking, onOpenTour }: FooterProps) {
  // Free Google Maps embed for MG Road, Central Healthcare Area (Zero API key needed, 100% free)
  const mapEmbedUrl =
    'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3887.985590924905!2d77.6045627!3d12.9715987!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae1670c9b44e6d%3A0xf8dfc3e8517e4fe0!2sMG%20Road%2C%20Bengaluru%2C%20Karnataka!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin'

  const directionsUrl =
    'https://www.google.com/maps/search/?api=1&query=SmileCare+Dental+Clinic+MG+Road+Bengaluru'

  return (
    <footer id="contact" className="relative bg-[#072924] text-slate-200 overflow-hidden pt-12 sm:pt-16 pb-8">
      {/* Decorative background glows */}
      <div className="pointer-events-none absolute -top-24 -left-24 h-96 w-96 rounded-full bg-teal-500/10 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 right-0 h-96 w-96 rounded-full bg-emerald-500/10 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-6">
        {/* ========================================================= */}
        {/* Top Contact & Location Highlights Bar                     */}
        {/* ========================================================= */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-6 pb-10 sm:pb-12 border-b border-teal-900/60">
          {/* Item 1: Phone & WhatsApp */}
          <div className="flex items-start gap-4 rounded-2xl bg-white/5 p-5 backdrop-blur border border-white/5 hover:border-teal-500/30 transition">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-teal-500/20 text-teal-400">
              <Phone className="h-6 w-6" />
            </div>
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-teal-400 block mb-1">
                Call &amp; WhatsApp
              </span>
              <a
                href="tel:+919876543210"
                className="text-lg font-bold text-white hover:text-teal-300 transition block"
              >
                +91 98765 43210
              </a>
              <div className="mt-2 flex items-center gap-2">
                <a
                  href="https://wa.me/919876543210"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-full bg-emerald-600/30 border border-emerald-500/40 px-3 py-1 text-xs font-semibold text-emerald-300 hover:bg-emerald-600/50 transition"
                >
                  <MessageCircle className="h-3.5 w-3.5" />
                  Chat on WhatsApp
                </a>
              </div>
            </div>
          </div>

          {/* Item 2: Clinic Location */}
          <div className="flex items-start gap-4 rounded-2xl bg-white/5 p-5 backdrop-blur border border-white/5 hover:border-teal-500/30 transition">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-teal-500/20 text-teal-400">
              <MapPin className="h-6 w-6" />
            </div>
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-teal-400 block mb-1">
                Clinic Location
              </span>
              <p className="text-sm font-semibold text-white leading-snug">
                12, MG Road, 2nd Floor, Central Healthcare Plaza
              </p>
              <p className="text-xs text-slate-400 mt-0.5">
                Opposite Metro Exit B, Bengaluru 560001
              </p>
              <a
                href={directionsUrl}
                target="_blank"
                rel="noreferrer"
                className="mt-2 inline-flex items-center gap-1 text-xs font-semibold text-teal-400 hover:text-teal-300 transition"
              >
                <span>Open in Google Maps</span>
                <ExternalLink className="h-3 w-3" />
              </a>
            </div>
          </div>

          {/* Item 3: Working Hours */}
          <div className="flex items-start gap-4 rounded-2xl bg-white/5 p-5 backdrop-blur border border-white/5 hover:border-teal-500/30 transition">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-teal-500/20 text-teal-400">
              <Clock className="h-6 w-6" />
            </div>
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-teal-400 block mb-1">
                Consultation Hours
              </span>
              <p className="text-sm font-bold text-white">Mon – Sat: 9:00 AM – 8:00 PM</p>
              <p className="text-xs text-slate-400 mt-0.5">
                Sun: 10:00 AM – 2:00 PM (Emergency & Prior Appts)
              </p>
              <div className="mt-2 flex items-center gap-1.5 text-xs text-emerald-400 font-semibold">
                <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>Open Today • Walk-ins Welcome</span>
              </div>
            </div>
          </div>
        </div>

        {/* ========================================================= */}
        {/* Main Footer Content Grid + Embedded Free Map              */}
        {/* ========================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-10 py-10 sm:py-12">
          {/* Column 1: Brand Info & Accreditations (4 cols) */}
          <div className="lg:col-span-4 space-y-5">
            <a href="#home" className="flex items-center gap-2.5 group">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-[#0d5249] transition group-hover:scale-105">
                <LogoTooth className="h-7 w-7 text-[#0d5249]" />
              </div>
              <div className="leading-tight">
                <span className="block text-xl font-bold tracking-tight text-white">
                  SmileCare
                </span>
                <span className="text-[11px] font-medium text-teal-300 tracking-wide">
                  Dental Clinic &amp; Implant Centre
                </span>
              </div>
            </a>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              SmileCare Dental Clinic combines international sterilisation protocols, digital 3D imaging, and board-certified specialists to deliver comfortable, pain-free dental treatments.
            </p>

            {/* Trust Certifications */}
            <div className="flex flex-wrap gap-2 pt-1">
              <span className="inline-flex items-center gap-1 rounded-full bg-white/10 px-3 py-1 text-[11px] font-medium text-teal-200 border border-white/10">
                <ShieldCheck className="h-3.5 w-3.5 text-teal-400" />
                NABH Quality Compliant
              </span>
              <span className="inline-flex items-center gap-1 rounded-full bg-white/10 px-3 py-1 text-[11px] font-medium text-teal-200 border border-white/10">
                <CheckCircle2 className="h-3.5 w-3.5 text-teal-400" />
                ISO 9001:2015 Certified
              </span>
            </div>

            <div className="pt-2">
              <button
                onClick={() => onOpenBooking()}
                className="flex items-center gap-2 rounded-full bg-teal-500 px-5 py-2.5 text-xs font-bold text-slate-950 shadow-lg shadow-teal-500/20 hover:bg-teal-400 transition hover:scale-105"
              >
                <Calendar className="h-4 w-4" />
                <span>Book Instant Consultation</span>
              </button>
            </div>
          </div>

          {/* Column 2: Treatments Quick Links (2.5 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-teal-400">
              Treatments
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-300">
              {[
                'Dental Implants',
                'Braces & Aligners',
                'Root Canal Treatment',
                'Teeth Whitening',
                'Cosmetic Dentistry',
                'Full Mouth Rehabilitation',
                'Pediatric Dentistry',
              ].map((item) => (
                <li key={item}>
                  <button
                    onClick={() => onOpenBooking(item)}
                    className="hover:text-teal-300 transition hover:translate-x-1 inline-flex items-center gap-1"
                  >
                    <span>{item}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Patient Quick Links (2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-teal-400">
              Quick Links
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-300">
              <li>
                <a href="#about" className="hover:text-teal-300 transition">
                  About Us
                </a>
              </li>
              <li>
                <a href="#doctors" className="hover:text-teal-300 transition">
                  Our Specialists
                </a>
              </li>
              <li>
                <button onClick={onOpenTour} className="hover:text-teal-300 transition text-left">
                  Virtual Clinic Tour (2 min)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onOpenBooking()}
                  className="hover:text-teal-300 transition text-left"
                >
                  Book Appointment
                </button>
              </li>
              <li>
                <a href="#why" className="hover:text-teal-300 transition">
                  Why Choose Us
                </a>
              </li>
              <li>
                <a href="tel:+919876543211" className="text-rose-400 hover:text-rose-300 font-semibold transition">
                  🚨 24/7 Dental Emergency
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Free Interactive Embedded Map (3.5 cols) */}
          <div className="lg:col-span-4 space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-bold uppercase tracking-wider text-teal-400 flex items-center gap-1.5">
                <Navigation className="h-3.5 w-3.5" />
                Find Us on Map
              </h4>
              <a
                href={directionsUrl}
                target="_blank"
                rel="noreferrer"
                className="text-[11px] font-semibold text-teal-300 hover:underline flex items-center gap-1"
              >
                <span>Get Directions</span>
                <ArrowRight className="h-3 w-3" />
              </a>
            </div>

            {/* Embedded Free Google Map Iframe Container */}
            <div className="relative overflow-hidden rounded-2xl border border-teal-800/80 bg-slate-900 shadow-xl">
              <iframe
                title="SmileCare Dental Clinic Location"
                src={mapEmbedUrl}
                width="100%"
                height="190"
                style={{ border: 0 }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full grayscale-[25%] contrast-[110%] hover:grayscale-0 transition duration-500"
              />

              {/* Map Floating Badge */}
              <div className="absolute top-2 left-2 flex items-center gap-1.5 rounded-full bg-slate-950/80 px-2.5 py-1 text-[10px] font-bold text-white backdrop-blur border border-white/10 shadow">
                <MapPin className="h-3 w-3 text-teal-400" />
                SmileCare Dental • MG Road
              </div>
            </div>

            <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between text-[11px] text-slate-400 pt-1">
              <span>🚗 Free Patient Parking &amp; Valet</span>
              <span>♿ Wheelchair Accessible</span>
            </div>
          </div>
        </div>

        {/* ========================================================= */}
        {/* Bottom Copyright & Legal Bar                              */}
        {/* ========================================================= */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-teal-900/60 pt-8 text-xs text-slate-400">
          <p>© 2026 SmileCare Dental Clinic. All rights reserved.</p>

          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
            <a href="#contact" className="hover:text-teal-300 transition">
              Privacy Policy
            </a>
            <a href="#contact" className="hover:text-teal-300 transition">
              Terms of Service
            </a>
            <a href="#contact" className="hover:text-teal-300 transition">
              Patient Charter
            </a>
          </div>

          <p className="flex items-center gap-1 text-[11px] text-slate-500">
            Crafted for <Heart className="h-3 w-3 text-rose-500 fill-rose-500" /> Healthy Smiles
          </p>
        </div>
      </div>
    </footer>
  )
}

