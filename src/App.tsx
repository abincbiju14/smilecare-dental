import React, { useEffect, useRef, useState, type ReactNode } from 'react'
import { motion, useInView, useReducedMotion, animate, useScroll, useTransform, useMotionValueEvent } from 'framer-motion'
import Lenis from 'lenis'
import {
  Calendar,
  Phone,
  ArrowRight,
  Play,
  Shield,
  ShieldCheck,
  Award,
  Monitor,
  UserCheck,
  Star,
  ChevronDown,
  Menu,
  X,
  Sparkles,
  Check,
  Clock,
  MapPin,
} from 'lucide-react'

import {
  LogoTooth,
  DentalImplant3D,
  Braces3D,
  RootCanal3D,
  TeethWhitening3D,
  CosmeticDentistry3D,
  HolographicNeonTooth,
} from './components/DentalIllustrations'
import { BookingModal } from './components/BookingModal'
import { TourModal } from './components/TourModal'
import { DoctorModal, type DoctorInfo } from './components/DoctorModal'
import { ServiceModal, type ServiceInfo } from './components/ServiceModal'
import { Footer } from './components/Footer'

// Image assets matching the design
const IMAGES = {
  hero: '/hero_abin_clarity.webp',
  room: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=1200&q=80',
  d1: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=600&q=80',
  d2: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&w=600&q=80',
  d3: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=600&q=80',
  p1: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80',
  p2: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
  p3: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80',
}

// Mobile breakpoint hook (below md = 768px)
function useIsMobile() {
  const q = '(max-width: 767px)'
  const [m, setM] = useState(() => typeof window !== 'undefined' && window.matchMedia(q).matches)
  useEffect(() => {
    const mq = window.matchMedia(q)
    const on = () => setM(mq.matches)
    on()
    mq.addEventListener('change', on)
    return () => mq.removeEventListener('change', on)
  }, [])
  return m
}

// Reveal animation helper
function Reveal({
  children,
  delay = 0,
  className = '',
  direction = 'up',
  scale = false,
  rotate = 0,
  blur = false,
}: {
  children: ReactNode
  delay?: number
  className?: string
  direction?: 'up' | 'left' | 'right'
  scale?: boolean
  rotate?: number
  blur?: boolean
}) {
  const r = useReducedMotion()
  const mobile = useIsMobile()
  const travel = mobile ? 0.4 : 1
  const from = {
    opacity: 0,
    x: (direction === 'left' ? -64 : direction === 'right' ? 64 : 0) * travel,
    y: (direction === 'up' ? 52 : 0) * travel,
    scale: scale ? (mobile ? 0.97 : 0.94) : 1,
    rotate: mobile ? 0 : rotate,
    filter: blur && !mobile ? 'blur(8px)' : 'blur(0px)',
  }
  return (
    <motion.div
      className={className}
      initial={r ? false : from}
      whileInView={{ opacity: 1, x: 0, y: 0, scale: 1, rotate: 0, filter: 'blur(0px)' }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: mobile ? 0.6 : 0.8, delay: mobile ? Math.min(delay, 0.2) : delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}

// Animated Counter
function Counter({ to, suffix }: { to: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true })
  const r = useReducedMotion()
  const [val, setVal] = useState(r ? to : 0)

  useEffect(() => {
    if (!inView || r) return
    const controls = animate(0, to, {
      duration: 1.8,
      ease: 'easeOut',
      onUpdate: (v) => setVal(Math.round(v)),
    })
    return () => controls.stop()
  }, [inView, to, r])

  return (
    <span ref={ref}>
      {val.toLocaleString('en-IN')}
      {suffix}
    </span>
  )
}

export default function App() {
  const reduced = useReducedMotion()
  const isMobile = useIsMobile()
  // Disable heavy parallax on phones (and for reduced-motion users)
  const r = reduced || isMobile

  // Modal states
  const [isBookingOpen, setIsBookingOpen] = useState(false)
  const [bookingService, setBookingService] = useState('')
  const [bookingDoctor, setBookingDoctor] = useState('')

  const [isTourOpen, setIsTourOpen] = useState(false)
  const [selectedDoctor, setSelectedDoctor] = useState<DoctorInfo | null>(null)
  const [selectedService, setSelectedService] = useState<ServiceInfo | null>(null)

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeTestimonial, setActiveTestimonial] = useState(0)
  const [activeService, setActiveService] = useState(0)
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  // Scroll-linked motion
  const heroRef = useRef<HTMLElement>(null)
  const aboutRef = useRef<HTMLElement>(null)
  const { scrollYProgress: heroProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] })
  const heroY = useTransform(heroProgress, [0, 1], r ? ['0%', '0%'] : ['0%', '18%'])
  const heroScale = useTransform(heroProgress, [0, 1], r ? [1, 1] : [1.04, 1.12])
  const { scrollYProgress: aboutProgress } = useScroll({ target: aboutRef, offset: ['start end', 'end start'] })
  const aboutY = useTransform(aboutProgress, [0, 1], r ? ['0%', '0%'] : ['-6%', '6%'])
  const aboutScale = useTransform(aboutProgress, [0, 0.5, 1], r ? [1, 1, 1] : [1.12, 1.04, 1.1])
  const { scrollY } = useScroll()
  const [scrolled, setScrolled] = useState(false)
  useMotionValueEvent(scrollY, 'change', (v) => setScrolled(v > 12))

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setServicesDropdownOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // Initialize Lenis smooth scroll
  useEffect(() => {
    if (reduced) return
    const lenis = new Lenis({ lerp: 0.1, duration: 1.2 })
    let reqId = 0
    const raf = (time: number) => {
      lenis.raf(time)
      reqId = requestAnimationFrame(raf)
    }
    reqId = requestAnimationFrame(raf)
    return () => {
      cancelAnimationFrame(reqId)
      lenis.destroy()
    }
  }, [reduced])

  // Open booking with preselected item
  const openBooking = (service = '', doctor = '') => {
    setBookingService(service)
    setBookingDoctor(doctor)
    setIsBookingOpen(true)
  }

  // Doctor Data
  const doctors: DoctorInfo[] = [
    {
      name: 'Dr. Rahul Menon',
      degree: 'BDS, MDS (Implantology)',
      specialty: 'Dental Implant Specialist',
      image: IMAGES.d1,
      experience: '12+ Years',
      days: 'Mon - Fri',
      about:
        'Dr. Rahul Menon is an internationally certified implantologist specializing in immediate load implants, computer-guided surgery, and full-arch rehabilitation with over 3,000 successful restorations.',
      highlights: [
        'Single & Multi-Tooth Implants',
        'All-on-4 / All-on-6 Solutions',
        'Bone Grafting & Sinus Lift',
        'Computer-Guided 3D Placement',
      ],
    },
    {
      name: 'Dr. Anjali Nair',
      degree: 'BDS, MDS (Orthodontics)',
      specialty: 'Orthodontist',
      image: IMAGES.d2,
      experience: '9+ Years',
      days: 'Mon - Sat',
      about:
        'Dr. Anjali Nair brings artistic precision to digital smile design. She is a certified Invisalign provider specializing in invisible aligners, lingual braces, and pediatric early interception.',
      highlights: [
        'Clear Aligners (Invisalign)',
        'Self-Ligating Ceramic Braces',
        'Bite Correction & TMJ Care',
        'Retainers & Smile Shaping',
      ],
    },
    {
      name: 'Dr. Vivek Thomas',
      degree: 'BDS, MDS (Endodontics)',
      specialty: 'Root Canal Specialist',
      image: IMAGES.d3,
      experience: '11+ Years',
      days: 'Tue - Sun',
      about:
        'Dr. Vivek Thomas specializes in microscopic endodontics, performing single-visit painless root canals and salvaging heavily damaged teeth using advanced rotary nickel-titanium instruments.',
      highlights: [
        'Single-Sitting Painless RCT',
        'Microscopic Endodontics',
        'Cracked Tooth Preservation',
        'Post & Core Crown Build-ups',
      ],
    },
  ]

  // Testimonials Data
  const testimonials = [
    {
      quote:
        'Excellent care and a very friendly team. The treatment was painless and the results are amazing!',
      name: 'Priya Nair',
      role: 'Happy Patient',
      image: IMAGES.p1,
    },
    {
      quote:
        'Got clear aligners with Dr. Anjali. In just 8 months my smile completely transformed with zero discomfort.',
      name: 'Arjun Das',
      role: 'Braces Patient',
      image: IMAGES.p2,
    },
    {
      quote:
        'I was terrified of root canals, but Dr. Vivek made it 100% painless. The clinic feels like a 5-star hotel!',
      name: 'Sneha Rao',
      role: 'Root Canal Patient',
      image: IMAGES.p3,
    },
  ]

  // Service Details Data
  const servicesData: ServiceInfo[] = [
    {
      title: 'Dental Implants',
      subtitle: 'Permanent, natural looking solution',
      description:
        'State-of-the-art titanium implants topped with custom zirconia crowns that feel, function, and look exactly like your natural teeth.',
      benefits: [
        'Preserves facial structure & jawbone density',
        'Lifetime durability with proper oral hygiene',
        'Restores 100% chewing efficiency and biting power',
        'Seamless color match to adjacent teeth',
      ],
      process: [
        '3D CBCT digital scan & virtual planning',
        'Gentle precision placement under local anesthesia',
        'Osseointegration healing phase',
        'Final handcrafted ceramic crown placement',
      ],
      timeRequired: '2 - 3 Visits',
      anesthesia: 'Painless Local Anesthesia',
      icon: <DentalImplant3D className="w-12 h-12" />,
    },
    {
      title: 'Braces & Alignment',
      subtitle: 'Straighten your smile with modern braces',
      description:
        'From discreet clear aligners to ultra-low profile ceramic braces, achieve a perfectly aligned smile for both aesthetics and oral health.',
      benefits: [
        'Virtually invisible clear aligner options',
        'Corrects crowded teeth, gaps, and overbites',
        'Prevents uneven enamel wear and jaw stress',
        'Customized digital simulation of your future smile',
      ],
      process: [
        'Digital 3D intraoral scan & smile simulation',
        'Personalized treatment map and aligner set fabrication',
        'Bi-weekly progress checks & aligner progression',
        'Final retainer delivery to maintain your smile forever',
      ],
      timeRequired: '6 - 14 Months',
      anesthesia: 'No Anesthesia Required',
      icon: <Braces3D className="w-12 h-12" />,
    },
    {
      title: 'Root Canal Treatment',
      subtitle: 'Save your natural tooth with painless RCT',
      description:
        'Save your infected or severely damaged natural tooth using rotary microscopic endodontics in a single comfortable sitting.',
      benefits: [
        'Instant relief from severe toothache and sensitivity',
        'Saves the natural tooth from extraction',
        'Single-sitting completion in under 45 minutes',
        'Digital apex locator ensuring 100% canal seal',
      ],
      process: [
        'Digital radiography diagnosis & gentle numbing',
        'Complete removal of infected pulp tissue',
        'Micro-sterilization of all root canals',
        'Biocompatible sealing & protective crown fitting',
      ],
      timeRequired: 'Single 45-min Visit',
      anesthesia: '100% Pain-Free Numbing',
      icon: <RootCanal3D className="w-12 h-12" />,
    },
    {
      title: 'Teeth Whitening',
      subtitle: 'Brighten your smile safely and effectively',
      description:
        'Professional in-chair laser whitening that removes years of tea, coffee, and tobacco stains to reveal a smile up to 8 shades whiter.',
      benefits: [
        'Up to 8 shades brighter in just 45 minutes',
        'Enamel-safe hydrogen peroxide formula',
        'Anti-sensitivity desensitizing application included',
        'Includes complimentary at-home touch-up kit',
      ],
      process: [
        'Initial shade assessment and gentle polish',
        'Protective gingival barrier application',
        'Application of medical-grade whitening gel with LED activation',
        'Post-treatment fluoride seal for zero sensitivity',
      ],
      timeRequired: '45 - 60 Minutes',
      anesthesia: 'Completely Non-Invasive',
      icon: <TeethWhitening3D className="w-12 h-12" />,
    },
    {
      title: 'Cosmetic Dentistry',
      subtitle: 'Enhance the look of your smile',
      description:
        'Transform your smile aesthetics with custom porcelain veneers, composite bonding, gum contouring, and full digital smile makeovers.',
      benefits: [
        'Closes awkward gaps and masks stubborn discoloration',
        'Repairs chipped, worn, or uneven teeth',
        'Ultra-thin porcelain veneers requiring minimal prep',
        'Designed to match your unique facial symmetry',
      ],
      process: [
        'Aesthetic consultation & digital smile design mockup',
        'Minimal tooth contouring & temporary try-ins',
        'Master ceramist fabrication of custom restorations',
        'Permanent high-strength adhesive bonding',
      ],
      timeRequired: '2 Visits',
      anesthesia: 'Gentle Local Anesthesia',
      icon: <CosmeticDentistry3D className="w-12 h-12" />,
    },
  ]

  return (
    <div className="min-h-screen bg-white text-slate-800">
      {/* ========================================================= */}
      {/* 1. HEADER / NAVBAR                                        */}
      {/* ========================================================= */}
      <header className={`sticky top-0 z-40 backdrop-blur-md border-b transition-all duration-300 ${scrolled ? 'bg-white/85 border-slate-200/70 shadow-lg shadow-slate-900/5 backdrop-blur-xl' : 'bg-white/95 border-slate-100'}`}>
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-2 px-4 py-2.5 sm:px-6 sm:py-3.5">
          {/* Logo */}
          <a href="#home" className="flex min-w-0 items-center gap-2 sm:gap-2.5 group">
            <div className="flex h-9 w-9 sm:h-10 sm:w-10 shrink-0 items-center justify-center rounded-xl bg-teal-50 text-[#0d5249] transition group-hover:scale-105">
              <LogoTooth className="h-6 w-6 sm:h-7 sm:w-7 text-[#0d5249]" />
            </div>
            <div className="leading-tight">
              <span className="block text-lg sm:text-xl font-bold tracking-tight text-[#0e322d]">
                SmileCare
              </span>
              <span className="hidden min-[360px]:block text-[10px] sm:text-[11px] font-medium text-slate-400 tracking-wide">
                Dental Clinic
              </span>
            </div>
          </a>

          {/* Nav Links */}
          <nav className="hidden lg:flex items-center gap-8 text-sm font-semibold text-slate-600">
            <a
              href="#home"
              className="relative text-[#0d5249] transition pb-1 after:absolute after:bottom-0 after:left-0 after:h-[2.5px] after:w-full after:rounded-full after:bg-[#0d5249]"
            >
              Home
            </a>
            <a href="#about" className="hover:text-[#0d5249] transition">
              About
            </a>
            <div
              ref={dropdownRef}
              className="relative"
              onMouseEnter={() => setServicesDropdownOpen(true)}
              onMouseLeave={() => setServicesDropdownOpen(false)}
            >
              <button
                type="button"
                onClick={() => setServicesDropdownOpen(!servicesDropdownOpen)}
                className="flex items-center gap-1 hover:text-[#0d5249] transition font-semibold text-sm cursor-pointer outline-none"
              >
                <span>Services</span>
                <ChevronDown
                  className={`h-3.5 w-3.5 text-slate-400 transition-transform duration-200 ${
                    servicesDropdownOpen ? 'rotate-180 text-[#0d5249]' : ''
                  }`}
                />
              </button>

              {/* Dropdown Popup with Seamless Bridge */}
              <div
                className={`absolute top-full left-0 pt-2 z-50 transition-all duration-200 ${
                  servicesDropdownOpen
                    ? 'opacity-100 visible translate-y-0 pointer-events-auto'
                    : 'opacity-0 invisible translate-y-2 pointer-events-none'
                }`}
              >
                <div className="w-60 rounded-2xl bg-white p-2 shadow-2xl border border-slate-100 ring-1 ring-black/5">
                  {servicesData.map((s, index) => (
                    <button
                      key={s.title}
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation()
                        setActiveService(index)
                        setSelectedService(s)
                        setServicesDropdownOpen(false)
                        const el = document.getElementById('services')
                        if (el) {
                          el.scrollIntoView({ behavior: 'smooth' })
                        }
                      }}
                      className="group/item flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-left text-xs font-semibold text-slate-700 hover:bg-[#f2f7f5] hover:text-[#0d5249] transition cursor-pointer"
                    >
                      <span>{s.title}</span>
                      <ArrowRight className="h-3.5 w-3.5 opacity-0 -translate-x-1 transition-all group-hover/item:opacity-100 group-hover/item:translate-x-0 text-[#0d5249]" />
                    </button>
                  ))}
                </div>
              </div>
            </div>
            <a href="#doctors" className="hover:text-[#0d5249] transition">
              Doctors
            </a>
            <a href="#why" className="hover:text-[#0d5249] transition">
              Gallery
            </a>
            <a href="#contact" className="hover:text-[#0d5249] transition">
              Contact
            </a>
          </nav>

          {/* Right Action Buttons */}
          <div className="flex shrink-0 items-center gap-1.5 sm:gap-3 lg:gap-4">
            <a
              href="tel:+919876543210"
              className="hidden md:flex items-center gap-2 rounded-full border border-slate-200/80 bg-white px-3.5 py-1.5 text-xs font-bold text-[#0e322d] shadow-sm hover:border-[#0d5249] transition"
            >
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-teal-50 text-[#0d5249]">
                <Phone className="h-3 w-3" />
              </span>
              +91 98765 43210
            </a>

            <button
              onClick={() => openBooking()}
              className="flex min-h-[44px] items-center gap-1.5 sm:gap-2 rounded-xl bg-[#0d5249] px-3.5 sm:px-4 md:px-5 py-2.5 text-xs md:text-sm font-semibold text-white shadow-md shadow-[#0d5249]/20 hover:bg-[#083832] transition hover:-translate-y-0.5"
            >
              <Calendar className="h-4 w-4" />
              <span className="sm:hidden">Book</span>
              <span className="hidden sm:inline">Book Appointment</span>
            </button>

            {/* Mobile Hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="flex h-11 w-11 items-center justify-center rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-100 lg:hidden"
              aria-label="Toggle menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile menu panel */}
        {mobileMenuOpen && (
          <nav className="lg:hidden max-h-[calc(100dvh-64px)] overflow-y-auto border-t border-slate-100 bg-white px-4 pb-5 pt-2 shadow-xl shadow-slate-900/5">
            {[
              ['#home', 'Home'],
              ['#about', 'About'],
            ].map(([href, label]) => (
              <a
                key={href}
                href={href}
                onClick={() => setMobileMenuOpen(false)}
                className="flex min-h-[48px] items-center justify-between rounded-xl px-3 text-[15px] font-semibold text-slate-700 hover:bg-[#f2f7f5] hover:text-[#0d5249]"
              >
                {label}
                <ArrowRight className="h-4 w-4 text-slate-300" />
              </a>
            ))}
            <div className="my-1 rounded-2xl bg-[#f4f8f6] p-2">
              <a
                href="#services"
                onClick={() => setMobileMenuOpen(false)}
                className="flex min-h-[44px] items-center px-2 text-[15px] font-bold text-[#0d5249]"
              >
                Services
              </a>
              <div className="grid grid-cols-1 gap-1">
                {servicesData.map((s, index) => (
                  <button
                    key={s.title}
                    type="button"
                    onClick={() => {
                      setActiveService(index)
                      setSelectedService(s)
                      setMobileMenuOpen(false)
                      const el = document.getElementById('services')
                      if (el) el.scrollIntoView({ behavior: 'smooth' })
                    }}
                    className="flex min-h-[44px] w-full items-center gap-2.5 rounded-xl bg-white px-3 text-left text-sm font-medium text-slate-700 ring-1 ring-slate-100 hover:text-[#0d5249]"
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-teal-500" />
                    {s.title}
                  </button>
                ))}
              </div>
            </div>
            {[
              ['#doctors', 'Doctors'],
              ['#why', 'Gallery'],
              ['#contact', 'Contact'],
            ].map(([href, label]) => (
              <a
                key={href}
                href={href}
                onClick={() => setMobileMenuOpen(false)}
                className="flex min-h-[48px] items-center justify-between rounded-xl px-3 text-[15px] font-semibold text-slate-700 hover:bg-[#f2f7f5] hover:text-[#0d5249]"
              >
                {label}
                <ArrowRight className="h-4 w-4 text-slate-300" />
              </a>
            ))}
            <div className="mt-3 grid grid-cols-1 gap-2 min-[400px]:grid-cols-2">
              <a
                href="tel:+919876543210"
                onClick={() => setMobileMenuOpen(false)}
                className="flex min-h-[48px] items-center justify-center gap-2 rounded-xl border border-slate-200 text-sm font-bold text-[#0d5249]"
              >
                <Phone className="h-4 w-4" />
                +91 98765 43210
              </a>
              <button
                onClick={() => {
                  setMobileMenuOpen(false)
                  openBooking()
                }}
                className="flex min-h-[48px] items-center justify-center gap-2 rounded-xl bg-[#0d5249] text-sm font-bold text-white"
              >
                <Calendar className="h-4 w-4" />
                Book Appointment
              </button>
            </div>
          </nav>
        )}
      </header>

      <main>
        {/* ========================================================= */}
        {/* 2. HERO SECTION                                           */}
        {/* ========================================================= */}
        <section ref={heroRef} id="home" className="relative overflow-hidden bg-[#eef4f6] md:min-h-[520px] lg:min-h-[580px] xl:min-h-[620px]">
          {/* Hero background image - Ultra-clarity master photo, no linear gradient */}
          <div className="absolute inset-0 overflow-hidden">
            <motion.div className="absolute inset-0 will-change-transform" style={{ y: heroY, scale: heroScale }}>
              <picture>
                <source srcSet={IMAGES.hero} type="image/webp" />
                <img
                  src="/hero_abin_clarity.png"
                  alt="Happy dental patient"
                  fetchPriority="high"
                  decoding="async"
                  style={{ imageRendering: '-webkit-optimize-contrast' }}
                  className="h-full w-full object-cover object-[78%_center] sm:object-[72%_center] md:object-[68%_center] lg:object-[60%_center] xl:object-center select-none"
                />
              </picture>
            </motion.div>
            {/* Very soft left wash for text legibility only */}
            {/* Mobile: soft top-to-bottom wash so copy stays readable while the face (right) shows */}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#eef4f6]/85 via-[#eef4f6]/55 to-[#eef4f6]/90 md:hidden" />
            <div className="pointer-events-none absolute inset-y-0 left-0 hidden md:block md:w-3/5 bg-gradient-to-r from-[#eef4f6]/80 via-[#eef4f6]/35 to-transparent" />
          </div>

          <div className="relative mx-auto max-w-7xl px-5 pt-10 pb-8 sm:px-6 sm:pt-14 md:py-24">
            <div className="max-w-xl lg:max-w-2xl">
              {/* Badge */}
              <Reveal delay={0.05} blur>
                <span className="inline-flex items-center rounded-full bg-white/80 px-3 py-1 text-[11px] sm:text-xs font-bold uppercase tracking-[0.18em] text-[#0d5249] shadow-sm ring-1 ring-teal-100 md:bg-transparent md:p-0 md:shadow-none md:ring-0">
                  MODERN DENTAL CARE
                </span>
              </Reveal>

              {/* Headline */}
              <Reveal delay={0.15} blur>
                <h1 className="mt-4 text-[2rem] leading-[1.1] min-[390px]:text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-[#0e322d] sm:leading-[1.12]">
                  Healthy Smiles <br />
                  for a Better Life
                </h1>
              </Reveal>

              {/* Paragraph */}
              <Reveal delay={0.25} blur>
                <p className="mt-4 sm:mt-5 text-[15px] sm:text-base md:text-lg text-slate-600 leading-relaxed max-w-[22rem] sm:max-w-lg">
                  Comprehensive, compassionate and advanced dental care for you and your family.
                </p>
              </Reveal>

              {/* Action Buttons */}
              <Reveal delay={0.35} blur>
                <div className="mt-7 sm:mt-8 flex flex-col items-stretch gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4">
                  {/* Primary CTA */}
                  <button
                    onClick={() => openBooking()}
                    className="flex min-h-[48px] w-full sm:w-auto items-center justify-center gap-2 rounded-full bg-[#0d5249] px-7 py-3.5 text-sm font-bold text-white shadow-lg shadow-[#0d5249]/25 hover:bg-[#083832] transition hover:-translate-y-0.5"
                  >
                    <Calendar className="h-4 w-4" />
                    <span>Book Appointment</span>
                    <ArrowRight className="h-4 w-4" />
                  </button>

                  {/* Secondary Video Tour CTA */}
                  <button
                    onClick={() => setIsTourOpen(true)}
                    className="flex min-h-[48px] w-full sm:w-auto items-center justify-center sm:justify-start gap-2.5 rounded-full bg-white/80 sm:bg-transparent px-5 sm:px-0 text-sm font-semibold text-slate-800 ring-1 ring-slate-200 sm:ring-0 hover:text-[#0d5249] transition"
                  >
                    <span className="flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-full bg-white shadow-md border border-slate-100 text-[#0d5249]">
                      <Play className="h-4 w-4 fill-[#0d5249] ml-0.5" />
                    </span>
                    <span>Watch Clinic Tour</span>
                  </button>
                </div>
              </Reveal>

              {/* Feature Points Row */}
              <Reveal delay={0.45} blur>
                <div className="mt-8 grid grid-cols-1 gap-2.5 min-[480px]:grid-cols-3 min-[480px]:gap-3 md:mt-14 md:flex md:flex-wrap md:items-center md:gap-8 md:pt-4">
                  {/* Item 1 */}
                  <div className="flex items-center gap-3 rounded-2xl bg-white/75 px-3.5 py-2.5 ring-1 ring-white/80 backdrop-blur-sm md:bg-transparent md:p-0 md:ring-0 md:backdrop-blur-none">
                    <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-teal-50/80 text-[#0d5249]">
                      <LogoTooth className="h-5 w-5" />
                    </span>
                    <div>
                      <h4 className="text-xs font-bold text-[#0e322d]">Expert Dentists</h4>
                      <p className="text-[11px] text-slate-500">Experienced & caring</p>
                    </div>
                  </div>

                  {/* Item 2 */}
                  <div className="flex items-center gap-3 rounded-2xl bg-white/75 px-3.5 py-2.5 ring-1 ring-white/80 backdrop-blur-sm md:bg-transparent md:p-0 md:ring-0 md:backdrop-blur-none">
                    <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-teal-50/80 text-[#0d5249]">
                      <ShieldCheck className="h-5 w-5" />
                    </span>
                    <div>
                      <h4 className="text-xs font-bold text-[#0e322d]">Advanced Technology</h4>
                      <p className="text-[11px] text-slate-500">Safe & precise treatment</p>
                    </div>
                  </div>

                  {/* Item 3 */}
                  <div className="flex items-center gap-3 rounded-2xl bg-white/75 px-3.5 py-2.5 ring-1 ring-white/80 backdrop-blur-sm md:bg-transparent md:p-0 md:ring-0 md:backdrop-blur-none">
                    <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-teal-50/80 text-[#0d5249]">
                      <Sparkles className="h-5 w-5" />
                    </span>
                    <div>
                      <h4 className="text-xs font-bold text-[#0e322d]">Comfortable Care</h4>
                      <p className="text-[11px] text-slate-500">A relaxing experience</p>
                    </div>
                  </div>
                </div>
              </Reveal>
            </div>

            {/* Quick Appointment Floating Pill Card (Bottom Right) */}
            <div className="mt-6 sm:mt-10 lg:absolute lg:bottom-12 lg:right-6 lg:mt-0">
              <Reveal delay={0.55} direction={isMobile ? 'up' : 'right'} scale>
                <div
                  onClick={() => openBooking()}
                  className="group flex w-full cursor-pointer items-center justify-between gap-4 sm:gap-6 rounded-2xl bg-white/95 backdrop-blur-md p-4 shadow-xl shadow-slate-900/5 border border-white/80 hover:shadow-2xl transition sm:max-w-sm quick-float"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-teal-50 text-[#0d5249]">
                      <Calendar className="h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-[#0e322d] group-hover:text-[#0d5249] transition">
                        Quick Appointment
                      </h4>
                      <p className="text-xs text-slate-500">Choose a convenient time and visit us.</p>
                    </div>
                  </div>
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#0d5249] text-white transition group-hover:scale-110">
                    <ArrowRight className="h-4 w-4" />
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* ========================================================= */}
        {/* 3. ABOUT US SECTION                                       */}
        {/* ========================================================= */}
        <section ref={aboutRef} id="about" className="relative py-14 sm:py-20 lg:py-28 overflow-hidden bg-white">
          {/* Subtle decorative mint blob in top right */}
          <div className="pointer-events-none absolute -right-24 -top-24 h-96 w-96 rounded-full bg-gradient-to-br from-teal-100/50 via-emerald-50/30 to-transparent blur-3xl" />

          <div className="relative mx-auto max-w-7xl px-5 sm:px-6">
            <div className="grid items-center gap-8 sm:gap-12 lg:grid-cols-2 lg:gap-16">
              {/* Left Column: Image with Tour pill */}
              <Reveal direction="left" scale>
                <div className="relative group overflow-hidden rounded-3xl sm:rounded-[2rem] shadow-xl border border-slate-100">
                  <motion.img
                    src={IMAGES.room}
                    alt="SmileCare Modern Operatory"
                    style={{ y: aboutY, scale: aboutScale }}
                    className="h-[270px] min-[400px]:h-[300px] sm:h-[400px] lg:h-[440px] w-full object-cover will-change-transform"
                  />
                  {/* Dark Frosted Pill: Clinic Tour 2 min */}
                  <button
                    onClick={() => setIsTourOpen(true)}
                    className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6 flex min-h-[44px] items-center gap-2.5 rounded-full bg-black/60 px-4 py-2 text-xs font-semibold text-white backdrop-blur-md border border-white/20 transition hover:bg-black/80 hover:scale-105"
                  >
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white text-slate-900">
                      <Play className="h-3 w-3 fill-slate-900 ml-0.5" />
                    </span>
                    <span>Clinic Tour</span>
                    <span className="text-slate-300 font-normal">2 min</span>
                  </button>
                </div>
              </Reveal>

              {/* Right Column: About Details */}
              <Reveal delay={0.2} direction={isMobile ? 'up' : 'right'}>
                <div>
                  <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#0d5249]">
                    ABOUT US
                  </span>
                  <h2 className="mt-3 text-[1.75rem] sm:text-4xl font-extrabold text-[#0e322d] tracking-tight leading-tight">
                    A Trusted Dental Clinic in Your Community
                  </h2>
                  <p className="mt-5 text-sm sm:text-base text-slate-600 leading-relaxed">
                    At SmileCare, we combine expert care, advanced technology and a patient-first approach to deliver healthy, confident smiles for all ages.
                  </p>

                  {/* Stats Row */}
                  <div className="mt-7 sm:mt-10 grid grid-cols-3 gap-2.5 sm:gap-4 sm:border-y sm:border-slate-100 sm:py-6">
                    <div>
                      <div className="text-xl min-[380px]:text-2xl sm:text-3xl font-extrabold text-[#0e322d]">
                        <Counter to={10} suffix="+" />
                      </div>
                      <p className="mt-1 text-[11px] sm:text-xs leading-snug text-slate-500">Years of Experience</p>
                    </div>
                    <div>
                      <div className="text-xl min-[380px]:text-2xl sm:text-3xl font-extrabold text-[#0e322d]">
                        <Counter to={5000} suffix="+" />
                      </div>
                      <p className="mt-1 text-[11px] sm:text-xs leading-snug text-slate-500">Happy Patients</p>
                    </div>
                    <div>
                      <div className="text-xl min-[380px]:text-2xl sm:text-3xl font-extrabold text-[#0e322d]">
                        <Counter to={15} suffix="+" />
                      </div>
                      <p className="mt-1 text-[11px] sm:text-xs leading-snug text-slate-500">Dental Treatments</p>
                    </div>
                  </div>

                  {/* Learn More Button */}
                  <div className="mt-7 sm:mt-8">
                    <button
                      onClick={() => setIsTourOpen(true)}
                      className="flex w-full sm:inline-flex sm:w-auto min-h-[48px] justify-center items-center gap-2 rounded-full border border-slate-300 bg-white px-6 py-2.5 text-xs sm:text-sm font-semibold text-[#0e322d] shadow-sm hover:border-[#0d5249] hover:text-[#0d5249] transition"
                    >
                      <span>Learn More</span>
                      <ArrowRight className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* ========================================================= */}
        {/* 4. OUR SERVICES SECTION                                   */}
        {/* ========================================================= */}
        <section id="services" className="py-12 sm:py-20 lg:py-28 bg-white">
          <div className="mx-auto max-w-7xl px-5 sm:px-6">
            {/* Header with Title and "View All Services" link */}
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
              <Reveal>
                <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#0d5249]">
                  OUR SERVICES
                </span>
                <h2 className="mt-2 text-[1.75rem] leading-tight sm:text-4xl font-extrabold text-[#0e322d] tracking-tight">
                  Complete Dental Care Under One Roof
                </h2>
              </Reveal>

              <Reveal delay={0.1}>
                <button
                  onClick={() => openBooking()}
                  className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#0d5249] hover:text-[#083832] transition group"
                >
                  <span>View All Services</span>
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </button>
              </Reveal>
            </div>

            {/* 5 Service Cards Grid with Interactive Hover Color Transition */}
            <div className="mt-8 sm:mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5 sm:gap-5">
              {servicesData.map((s, index) => {
                const isActive = activeService === index
                return (
                  <Reveal key={s.title} delay={index * 0.09} scale rotate={index % 2 === 0 ? -2 : 2} className="h-full">
                    <div
                      onMouseEnter={() => setActiveService(index)}
                      onClick={() => setSelectedService(s)}
                      className={`group relative flex h-full flex-row items-center gap-4 sm:flex-col sm:items-stretch sm:justify-between sm:gap-0 rounded-3xl p-4 sm:p-6 transition-all duration-300 sm:hover:-translate-y-2 cursor-pointer ${
                        isActive
                          ? 'bg-[#0c4942] text-white shadow-2xl shadow-[#0c4942]/25 sm:scale-[1.02]'
                          : 'bg-[#f4f8f6] text-slate-800 border border-slate-100 hover:bg-[#0c4942] hover:text-white hover:shadow-2xl hover:shadow-[#0c4942]/25 hover:border-transparent'
                      }`}
                    >
                      <div className="flex min-w-0 flex-1 items-center gap-4 sm:block">
                        {/* 3D Illustration with smooth hover zoom */}
                        <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-white/60 sm:h-28 sm:w-auto sm:bg-transparent transition-transform duration-300 group-hover:scale-110 [&>svg]:h-11 [&>svg]:w-11 sm:[&>svg]:h-12 sm:[&>svg]:w-12">
                          {s.icon}
                        </div>

                        <h3
                          className={`sm:mt-4 text-[15px] sm:text-base font-bold transition-colors duration-300 ${
                            isActive ? 'text-white' : 'text-[#0e322d] group-hover:text-white'
                          }`}
                        >
                          {s.title}
                        </h3>
                        <p
                          className={`mt-1 sm:mt-2 text-xs leading-relaxed transition-colors duration-300 ${
                            isActive ? 'text-white/80' : 'text-slate-500 group-hover:text-white/80'
                          }`}
                        >
                          {s.subtitle}
                        </p>
                      </div>

                      <div className="shrink-0 sm:mt-6 flex justify-end">
                        <div
                          className={`flex h-9 w-9 sm:h-8 sm:w-8 items-center justify-center rounded-full transition-all duration-300 ${
                            isActive
                              ? 'bg-white text-[#0c4942] scale-110 shadow-sm'
                              : 'bg-white text-slate-600 shadow-sm border border-slate-200 group-hover:bg-white group-hover:text-[#0c4942] group-hover:border-white group-hover:scale-110'
                          }`}
                        >
                          <ArrowRight className="h-4 w-4" />
                        </div>
                      </div>
                    </div>
                  </Reveal>
                )
              })}
            </div>
          </div>
        </section>

        {/* ========================================================= */}
        {/* 5. WHY CHOOSE SMILECARE BANNER                            */}
        {/* ========================================================= */}
        <section id="why" className="px-4 py-6 sm:px-6 sm:py-8">
          <div className="relative mx-auto max-w-7xl overflow-hidden rounded-3xl sm:rounded-[2.5rem] bg-gradient-to-br sm:bg-gradient-to-r from-[#0c4942] via-[#093d37] to-[#042823] px-5 py-9 sm:px-8 sm:py-14 md:px-14 md:py-16 text-white shadow-2xl shadow-[#0c4942]/20">
            {/* Subtle glow blur circles */}
            <div className="pointer-events-none absolute -left-20 -bottom-20 h-64 w-64 rounded-full bg-emerald-500/10 blur-3xl" />
            <div className="pointer-events-none absolute right-12 top-10 h-72 w-72 rounded-full bg-teal-400/20 blur-3xl" />

            <div className="relative grid items-center gap-6 sm:gap-10 lg:grid-cols-[1.4fr_1fr]">
              {/* Left Content */}
              <Reveal direction="left">
                <div>
                  <h2 className="text-[1.75rem] sm:text-4xl font-extrabold tracking-tight text-white">
                    Why Choose SmileCare?
                  </h2>

                  {/* 4 Feature Items in a Clean Row / 2x2 grid */}
                  <div className="mt-6 sm:mt-10 grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-6 sm:pt-2">
                    {/* Feature 1 */}
                    <div className="flex flex-col items-start gap-3 rounded-2xl bg-white/[0.06] p-3.5 ring-1 ring-white/10 sm:bg-transparent sm:p-0 sm:ring-0">
                      <div className="flex h-11 w-11 sm:h-12 sm:w-12 items-center justify-center rounded-2xl bg-white/10 text-white backdrop-blur border border-white/10">
                        <Award className="h-6 w-6 stroke-[1.5]" />
                      </div>
                      <span className="text-[13px] sm:text-sm font-semibold text-white/95 leading-snug">
                        Experienced
                        <br />
                        Dental Team
                      </span>
                    </div>

                    {/* Feature 2 */}
                    <div className="flex flex-col items-start gap-3 rounded-2xl bg-white/[0.06] p-3.5 ring-1 ring-white/10 sm:bg-transparent sm:p-0 sm:ring-0">
                      <div className="flex h-11 w-11 sm:h-12 sm:w-12 items-center justify-center rounded-2xl bg-white/10 text-white backdrop-blur border border-white/10">
                        <Monitor className="h-6 w-6 stroke-[1.5]" />
                      </div>
                      <span className="text-[13px] sm:text-sm font-semibold text-white/95 leading-snug">
                        Modern
                        <br />
                        Equipment
                      </span>
                    </div>

                    {/* Feature 3 */}
                    <div className="flex flex-col items-start gap-3 rounded-2xl bg-white/[0.06] p-3.5 ring-1 ring-white/10 sm:bg-transparent sm:p-0 sm:ring-0">
                      <div className="flex h-11 w-11 sm:h-12 sm:w-12 items-center justify-center rounded-2xl bg-white/10 text-white backdrop-blur border border-white/10">
                        <Shield className="h-6 w-6 stroke-[1.5]" />
                      </div>
                      <span className="text-[13px] sm:text-sm font-semibold text-white/95 leading-snug">
                        Hygiene &amp;
                        <br />
                        Safety First
                      </span>
                    </div>

                    {/* Feature 4 */}
                    <div className="flex flex-col items-start gap-3 rounded-2xl bg-white/[0.06] p-3.5 ring-1 ring-white/10 sm:bg-transparent sm:p-0 sm:ring-0">
                      <div className="flex h-11 w-11 sm:h-12 sm:w-12 items-center justify-center rounded-2xl bg-white/10 text-white backdrop-blur border border-white/10">
                        <UserCheck className="h-6 w-6 stroke-[1.5]" />
                      </div>
                      <span className="text-[13px] sm:text-sm font-semibold text-white/95 leading-snug">
                        Personalised
                        <br />
                        Treatment
                      </span>
                    </div>
                  </div>
                </div>
              </Reveal>

              {/* Right Side: Glowing Holographic Neon Tooth with Orbit Ring */}
              <Reveal delay={0.25} direction={isMobile ? 'up' : 'right'} scale className="flex items-center justify-center">
                <div className="relative flex items-center justify-center">
                  <div className="tooth-glow absolute h-36 w-36 sm:h-60 sm:w-60 rounded-full bg-teal-400/25 blur-3xl pointer-events-none" />
                  <div className="tooth-float relative">
                    <HolographicNeonTooth className="w-32 h-32 sm:w-56 sm:h-56 lg:w-64 lg:h-64 drop-shadow-[0_15px_30px_rgba(45,212,191,0.3)]" />
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* ========================================================= */}
        {/* 6. OUR DENTISTS / "MEET OUR DENTAL EXPERTS" SECTION       */}
        {/* ========================================================= */}
        <section id="doctors" className="py-12 sm:py-20 lg:py-28 bg-white">
          <div className="mx-auto max-w-7xl px-5 sm:px-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
              <Reveal>
                <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#0d5249]">
                  OUR DENTISTS
                </span>
                <h2 className="mt-2 text-[1.75rem] leading-tight sm:text-4xl font-extrabold text-[#0e322d] tracking-tight">
                  Meet Our Dental Experts
                </h2>
              </Reveal>

              <Reveal delay={0.1}>
                <button
                  onClick={() => setSelectedDoctor(doctors[0])}
                  className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#0d5249] hover:text-[#083832] transition group"
                >
                  <span>View All Doctors</span>
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </button>
              </Reveal>
            </div>

            {/* 4 Columns: 3 Doctors + 1 Testimonial Card */}
            <div className="mt-8 sm:mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {/* Doctor 1 */}
              <Reveal delay={0.08} scale>
                <div
                  onClick={() => setSelectedDoctor(doctors[0])}
                  className="group relative flex h-full flex-col justify-between overflow-hidden rounded-3xl bg-[#f4f8f6] border border-slate-100 transition duration-300 hover:-translate-y-1.5 hover:shadow-xl cursor-pointer"
                >
                  <div className="relative h-[230px] sm:h-64 overflow-hidden bg-slate-100">
                    <img
                      src={doctors[0].image}
                      alt={doctors[0].name}
                      className="h-full w-full object-cover object-top transition duration-500 group-hover:scale-105"
                    />
                  </div>

                  <div className="p-5 flex items-center justify-between gap-3 bg-white">
                    <div>
                      <h4 className="text-sm font-bold text-[#0e322d] group-hover:text-[#0d5249] transition">
                        {doctors[0].name}
                      </h4>
                      <p className="text-[11px] text-slate-500">{doctors[0].degree}</p>
                      <p className="text-[11px] font-semibold text-[#0d5249] mt-0.5">
                        {doctors[0].specialty}
                      </p>
                    </div>

                    <div className="flex h-10 w-10 sm:h-8 sm:w-8 shrink-0 items-center justify-center rounded-full bg-slate-100 text-slate-700 transition group-hover:bg-[#0d5249] group-hover:text-white">
                      <ArrowRight className="h-4 w-4" />
                    </div>
                  </div>
                </div>
              </Reveal>

              {/* Doctor 2 */}
              <Reveal delay={0.16} scale>
                <div
                  onClick={() => setSelectedDoctor(doctors[1])}
                  className="group relative flex h-full flex-col justify-between overflow-hidden rounded-3xl bg-[#f4f8f6] border border-slate-100 transition duration-300 hover:-translate-y-1.5 hover:shadow-xl cursor-pointer"
                >
                  <div className="relative h-[230px] sm:h-64 overflow-hidden bg-slate-100">
                    <img
                      src={doctors[1].image}
                      alt={doctors[1].name}
                      className="h-full w-full object-cover object-top transition duration-500 group-hover:scale-105"
                    />
                  </div>

                  <div className="p-5 flex items-center justify-between gap-3 bg-white">
                    <div>
                      <h4 className="text-sm font-bold text-[#0e322d] group-hover:text-[#0d5249] transition">
                        {doctors[1].name}
                      </h4>
                      <p className="text-[11px] text-slate-500">{doctors[1].degree}</p>
                      <p className="text-[11px] font-semibold text-[#0d5249] mt-0.5">
                        {doctors[1].specialty}
                      </p>
                    </div>

                    <div className="flex h-10 w-10 sm:h-8 sm:w-8 shrink-0 items-center justify-center rounded-full bg-slate-100 text-slate-700 transition group-hover:bg-[#0d5249] group-hover:text-white">
                      <ArrowRight className="h-4 w-4" />
                    </div>
                  </div>
                </div>
              </Reveal>

              {/* Doctor 3 */}
              <Reveal delay={0.24} scale>
                <div
                  onClick={() => setSelectedDoctor(doctors[2])}
                  className="group relative flex h-full flex-col justify-between overflow-hidden rounded-3xl bg-[#f4f8f6] border border-slate-100 transition duration-300 hover:-translate-y-1.5 hover:shadow-xl cursor-pointer"
                >
                  <div className="relative h-[230px] sm:h-64 overflow-hidden bg-slate-100">
                    <img
                      src={doctors[2].image}
                      alt={doctors[2].name}
                      className="h-full w-full object-cover object-top transition duration-500 group-hover:scale-105"
                    />
                  </div>

                  <div className="p-5 flex items-center justify-between gap-3 bg-white">
                    <div>
                      <h4 className="text-sm font-bold text-[#0e322d] group-hover:text-[#0d5249] transition">
                        {doctors[2].name}
                      </h4>
                      <p className="text-[11px] text-slate-500">{doctors[2].degree}</p>
                      <p className="text-[11px] font-semibold text-[#0d5249] mt-0.5">
                        {doctors[2].specialty}
                      </p>
                    </div>

                    <div className="flex h-10 w-10 sm:h-8 sm:w-8 shrink-0 items-center justify-center rounded-full bg-slate-100 text-slate-700 transition group-hover:bg-[#0d5249] group-hover:text-white">
                      <ArrowRight className="h-4 w-4" />
                    </div>
                  </div>
                </div>
              </Reveal>

              {/* Column 4: Testimonial Card */}
              <Reveal delay={0.45} direction={isMobile ? 'up' : 'right'}>
                <div className="flex h-full flex-col justify-between rounded-3xl bg-[#f4f8f6] p-5 sm:p-7 border border-slate-100 shadow-sm transition hover:shadow-lg">
                  <div>
                    {/* Big quote mark */}
                    <span className="text-4xl font-extrabold text-[#0d5249] font-serif leading-none block">
                      “
                    </span>
                    <p className="mt-2 text-xs sm:text-sm text-slate-700 leading-relaxed font-normal">
                      "{testimonials[activeTestimonial].quote}"
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-slate-200/60">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <img
                          src={testimonials[activeTestimonial].image}
                          alt={testimonials[activeTestimonial].name}
                          className="h-9 w-9 rounded-full object-cover border border-slate-200"
                        />
                        <div>
                          <h5 className="text-xs font-bold text-[#0e322d]">
                            {testimonials[activeTestimonial].name}
                          </h5>
                          <p className="text-[10px] text-slate-500">
                            {testimonials[activeTestimonial].role}
                          </p>
                        </div>
                      </div>

                      {/* 5 Stars */}
                      <div className="flex items-center gap-0.5 text-amber-400">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="h-3 w-3 fill-amber-400 text-amber-400" />
                        ))}
                      </div>
                    </div>

                    {/* Pagination Indicator Dots */}
                    <div className="mt-4 flex items-center justify-center gap-1.5">
                      {testimonials.map((_, i) => (
                        <button
                          key={i}
                          onClick={() => setActiveTestimonial(i)}
                          className={`h-2 rounded-full transition-all relative after:absolute after:-inset-3 after:content-[''] ${
                            activeTestimonial === i
                              ? 'w-5 bg-[#0d5249]'
                              : 'w-2 bg-slate-300 hover:bg-slate-400'
                          }`}
                          aria-label={`Testimonial slide ${i + 1}`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* ========================================================= */}
        {/* 7. BOTTOM CTA BANNER                                      */}
        {/* ========================================================= */}
        <section className="px-4 pb-12 sm:px-6 sm:pb-20">
          <Reveal scale>
            <div className="relative mx-auto max-w-7xl overflow-hidden rounded-3xl sm:rounded-[2.5rem] bg-[#0c4942] text-white px-5 py-8 sm:p-12 shadow-2xl shadow-[#0c4942]/20">
              {/* Dental chair subtle background blending on the left */}
              <div className="pointer-events-none absolute inset-y-0 left-0 w-full md:w-1/2 opacity-10 md:opacity-20 mix-blend-luminosity overflow-hidden">
                <img
                  src={IMAGES.room}
                  alt="Dental operatory"
                  className="h-full w-full object-cover"
                />
              </div>

              <div className="relative z-10 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-6">
                <div className="text-center md:text-left">
                  <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-white">
                    Ready for a Healthier, Brighter Smile?
                  </h2>
                  <p className="mt-2 text-xs sm:text-sm text-slate-200">
                    Book your appointment today and experience quality dental care.
                  </p>
                </div>

                <button
                  onClick={() => openBooking()}
                  className="flex min-h-[48px] w-full md:w-auto shrink-0 items-center justify-center gap-2 rounded-full bg-white px-7 py-3.5 text-sm font-bold text-[#0c4942] shadow-xl hover:bg-slate-100 transition md:hover:scale-105"
                >
                  <Calendar className="h-4 w-4" />
                  <span>Book Appointment</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </Reveal>
        </section>
      </main>

      {/* ========================================================= */}
      {/* 8. FOOTER WITH LOCATION, PHONES & FREE INTERACTIVE MAP   */}
      {/* ========================================================= */}
      <Footer onOpenBooking={openBooking} onOpenTour={() => setIsTourOpen(true)} />

      {/* ========================================================= */}
      {/* MODALS & DRAWERS                                          */}
      {/* ========================================================= */}
      {/* Booking Modal */}
      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        initialService={bookingService}
        initialDoctor={bookingDoctor}
      />

      {/* Virtual Tour Modal */}
      <TourModal isOpen={isTourOpen} onClose={() => setIsTourOpen(false)} />

      {/* Doctor Info Modal */}
      <DoctorModal
        doctor={selectedDoctor}
        onClose={() => setSelectedDoctor(null)}
        onBook={(doc) => openBooking('', doc)}
      />

      {/* Service Info Modal */}
      <ServiceModal
        service={selectedService}
        onClose={() => setSelectedService(null)}
        onBook={(srv) => openBooking(srv, '')}
      />
    </div>
  )
}
