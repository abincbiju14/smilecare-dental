import React from 'react'

// 1. Logo Icon (Stylized tooth outline with smile curve)
export function LogoTooth({ className = 'w-8 h-8 text-[#0d5249]' }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path
        d="M20 5C14.5 5 10 9 10 15C10 19.5 11.8 23 13.5 27.5C14.8 30.8 15.5 35 18 35C20.5 35 20.8 27 20 27C19.2 27 19.5 35 22 35C24.5 35 25.2 30.8 26.5 27.5C28.2 23 30 19.5 30 15C30 9 25.5 5 20 5Z"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M14.5 15.5C16.5 18 23.5 18 25.5 15.5"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
    </svg>
  )
}

// 2. 3D Dental Implant Illustration
export function DentalImplant3D({ className = 'w-24 h-24' }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <defs>
        <radialGradient id="implantCrown" cx="40%" cy="30%" r="65%">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="45%" stopColor="#f3f9f7" />
          <stop offset="85%" stopColor="#d1e6df" />
          <stop offset="100%" stopColor="#b4d4ca" />
        </radialGradient>
        <linearGradient id="metalGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#94a3b8" />
          <stop offset="35%" stopColor="#f1f5f9" />
          <stop offset="70%" stopColor="#cbd5e1" />
          <stop offset="100%" stopColor="#64748b" />
        </linearGradient>
        <linearGradient id="goldCollar" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#d97706" />
          <stop offset="40%" stopColor="#fef3c7" />
          <stop offset="70%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#b45309" />
        </linearGradient>
        <filter id="implantShadow" x="-20%" y="-10%" width="140%" height="130%">
          <feDropShadow dx="0" dy="6" stdDeviation="5" floodColor="#04221d" floodOpacity="0.25" />
        </filter>
      </defs>
      
      <g filter="url(#implantShadow)">
        {/* Implant Screw Posts & Threads */}
        <path d="M52 56 L68 56 L66 62 L54 62 Z" fill="url(#metalGrad)" />
        <path d="M53 62 L67 62 L65 67 L55 67 Z" fill="url(#metalGrad)" />
        <path d="M54 67 L66 67 L64 72 L56 72 Z" fill="url(#metalGrad)" />
        <path d="M55 72 L65 72 L63 77 L57 77 Z" fill="url(#metalGrad)" />
        <path d="M56 77 L64 77 L62 82 L58 82 Z" fill="url(#metalGrad)" />
        <path d="M57 82 L63 82 L60.5 88 L59.5 88 Z" fill="url(#metalGrad)" />
        {/* Threads spiral grooves */}
        <path d="M51 58 Q60 60 69 57" stroke="#475569" strokeWidth="1.2" />
        <path d="M52 63 Q60 65 68 62" stroke="#475569" strokeWidth="1.2" />
        <path d="M53 68 Q60 70 67 67" stroke="#475569" strokeWidth="1.2" />
        <path d="M54 73 Q60 75 66 72" stroke="#475569" strokeWidth="1.2" />
        <path d="M55 78 Q60 80 65 77" stroke="#475569" strokeWidth="1.2" />
        
        {/* Titanium Abutment Collar */}
        <rect x="50" y="52" width="20" height="4" rx="2" fill="url(#goldCollar)" />

        {/* 3D Ceramic Crown */}
        <path
          d="M60 16C46 16 35 22 35 34C35 41 38 46 44 50C48 52.8 52 54 60 54C68 54 72 52.8 76 50C82 46 85 41 85 34C85 22 74 16 60 16Z"
          fill="url(#implantCrown)"
        />
        {/* Crown Cusp Highlights */}
        <path
          d="M48 20C42 22 39 26 40 31C41 34 43 32 46 29C49 26 50 22 48 20Z"
          fill="#ffffff"
          opacity="0.8"
        />
        <ellipse cx="60" cy="24" rx="4" ry="2" fill="#ffffff" opacity="0.6" />
        <ellipse cx="71" cy="28" rx="3.5" ry="5" fill="#ffffff" opacity="0.45" />
      </g>
    </svg>
  )
}

// 3. 3D Braces & Alignment Illustration
export function Braces3D({ className = 'w-24 h-24' }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <defs>
        <radialGradient id="gumGrad" cx="50%" cy="20%" r="80%">
          <stop offset="0%" stopColor="#fca5a5" />
          <stop offset="60%" stopColor="#f87171" />
          <stop offset="100%" stopColor="#ef4444" />
        </radialGradient>
        <radialGradient id="braceTooth" cx="40%" cy="30%" r="70%">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="70%" stopColor="#f1f5f9" />
          <stop offset="100%" stopColor="#cbd5e1" />
        </radialGradient>
        <linearGradient id="silverWire" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#64748b" />
          <stop offset="25%" stopColor="#f8fafc" />
          <stop offset="50%" stopColor="#94a3b8" />
          <stop offset="75%" stopColor="#f8fafc" />
          <stop offset="100%" stopColor="#475569" />
        </linearGradient>
        <linearGradient id="bracketMetal" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#f8fafc" />
          <stop offset="50%" stopColor="#94a3b8" />
          <stop offset="100%" stopColor="#475569" />
        </linearGradient>
        <filter id="bracesShadow" x="-10%" y="-10%" width="120%" height="130%">
          <feDropShadow dx="0" dy="5" stdDeviation="4" floodColor="#0f172a" floodOpacity="0.12" />
        </filter>
      </defs>

      <g filter="url(#bracesShadow)">
        {/* Upper Gum Arch */}
        <path
          d="M20 44C25 32 40 28 60 28C80 28 95 32 100 44C95 46 80 43 60 43C40 43 25 46 20 44Z"
          fill="url(#gumGrad)"
        />

        {/* Teeth Arch */}
        {/* Left Premolar */}
        <path d="M22 43 C22 43 23 58 28 64 C32 64 34 56 34 43 Z" fill="url(#braceTooth)" stroke="#94a3b8" strokeWidth="0.75" />
        {/* Left Canine */}
        <path d="M33 42 C33 42 34 62 40 68 C45 68 47 58 47 42 Z" fill="url(#braceTooth)" stroke="#94a3b8" strokeWidth="0.75" />
        {/* Central Left Incisor */}
        <path d="M46 41 C46 41 46 66 52 72 C58 72 59 62 59 41 Z" fill="url(#braceTooth)" stroke="#94a3b8" strokeWidth="0.75" />
        {/* Central Right Incisor */}
        <path d="M61 41 C61 41 61 62 62 72 C68 72 74 66 74 41 Z" fill="url(#braceTooth)" stroke="#94a3b8" strokeWidth="0.75" />
        {/* Right Canine */}
        <path d="M73 42 C73 42 75 58 80 68 C86 62 87 42 87 42 Z" fill="url(#braceTooth)" stroke="#94a3b8" strokeWidth="0.75" />
        {/* Right Premolar */}
        <path d="M86 43 C86 43 86 56 88 64 C94 58 98 43 98 43 Z" fill="url(#braceTooth)" stroke="#94a3b8" strokeWidth="0.75" />

        {/* Archwire */}
        <path
          d="M23 53 Q60 62 97 53"
          stroke="url(#silverWire)"
          strokeWidth="2.5"
          strokeLinecap="round"
        />

        {/* Orthodontic Brackets */}
        {[
          { x: 26, y: 51 },
          { x: 38, y: 53 },
          { x: 51, y: 55 },
          { x: 65, y: 55 },
          { x: 78, y: 53 },
          { x: 90, y: 51 },
        ].map((b, i) => (
          <g key={i}>
            <rect
              x={b.x - 3.5}
              y={b.y - 3.5}
              width="7"
              height="7"
              rx="1.5"
              fill="url(#bracketMetal)"
              stroke="#ffffff"
              strokeWidth="0.6"
            />
            {/* Slot */}
            <line x1={b.x - 3} y1={b.y} x2={b.x + 3} y2={b.y} stroke="#334155" strokeWidth="0.8" />
            {/* Color elastic / tie */}
            <circle cx={b.x} cy={b.y} r="1.5" fill="#38bdf8" opacity="0.85" />
          </g>
        ))}
      </g>
    </svg>
  )
}

// 4. 3D Root Canal Illustration
export function RootCanal3D({ className = 'w-24 h-24' }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <defs>
        <radialGradient id="rcEnamel" cx="40%" cy="25%" r="70%">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="60%" stopColor="#f8fafc" />
          <stop offset="90%" stopColor="#e2e8f0" />
          <stop offset="100%" stopColor="#cbd5e1" />
        </radialGradient>
        <radialGradient id="rcDentin" cx="45%" cy="35%" r="65%">
          <stop offset="0%" stopColor="#fef3c7" />
          <stop offset="70%" stopColor="#fde68a" />
          <stop offset="100%" stopColor="#f59e0b" />
        </radialGradient>
        <linearGradient id="rcPulp" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#fb7185" />
          <stop offset="40%" stopColor="#f43f5e" />
          <stop offset="80%" stopColor="#e11d48" />
          <stop offset="100%" stopColor="#9f1239" />
        </linearGradient>
        <filter id="rcShadow" x="-10%" y="-10%" width="120%" height="130%">
          <feDropShadow dx="0" dy="5" stdDeviation="4" floodColor="#0f172a" floodOpacity="0.12" />
        </filter>
      </defs>

      <g filter="url(#rcShadow)">
        {/* Full Tooth Shell */}
        <path
          d="M60 20C45 20 36 26 36 38C36 48 40 55 42 66C44 76 43 90 48 94C52 94 54 84 58 72C59 69 61 69 62 72C66 84 68 94 72 94C77 90 76 76 78 66C80 55 84 48 84 38C84 26 75 20 60 20Z"
          fill="url(#rcEnamel)"
        />

        {/* Dentin Layer (Cross section) */}
        <path
          d="M60 26C49 26 43 31 43 40C43 48 46 54 48 64C49 71 49 82 50 86C52 86 53 79 56 70C58 66 62 66 64 70C67 79 68 86 70 86C71 82 71 71 72 64C74 54 77 48 77 40C77 31 71 26 60 26Z"
          fill="url(#rcDentin)"
          opacity="0.85"
        />

        {/* Pulp Chamber & Root Canals (Red / Pink Vital Nerve) */}
        <path
          d="M60 34C54 34 50 37 50 42C50 47 52 51 53 58C54 64 53 74 53 82C54 82 54.5 76 56 68C57.5 61 60 55 60 48C60 55 62.5 61 64 68C65.5 76 66 82 67 82C67 74 66 64 67 58C68 51 70 47 70 42C70 37 66 34 60 34Z"
          fill="url(#rcPulp)"
        />

        {/* Specular Glow / Healing Spark */}
        <ellipse cx="60" cy="38" rx="2.5" ry="1.5" fill="#ffffff" opacity="0.7" />
        <circle cx="53.5" cy="81" r="1.5" fill="#38bdf8" />
        <circle cx="66.5" cy="81" r="1.5" fill="#38bdf8" />
      </g>
    </svg>
  )
}

// 5. 3D Teeth Whitening Illustration
export function TeethWhitening3D({ className = 'w-24 h-24' }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <defs>
        <radialGradient id="twTooth" cx="35%" cy="30%" r="70%">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="55%" stopColor="#f0fdfa" />
          <stop offset="85%" stopColor="#ccfbf1" />
          <stop offset="100%" stopColor="#99f6e4" />
        </radialGradient>
        <linearGradient id="shieldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#e2e8f0" stopOpacity="0.8" />
          <stop offset="40%" stopColor="#f8fafc" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#94a3b8" stopOpacity="0.5" />
        </linearGradient>
        <filter id="twShadow" x="-10%" y="-10%" width="120%" height="130%">
          <feDropShadow dx="0" dy="5" stdDeviation="4" floodColor="#0f172a" floodOpacity="0.12" />
        </filter>
      </defs>

      <g filter="url(#twShadow)">
        {/* Pearlescent White Tooth */}
        <path
          d="M60 22C46 22 37 28 37 40C37 49 41 55 43 66C45 76 44 89 49 93C53 93 55 83 58 72C59 69 61 69 62 72C65 83 67 93 71 93C76 89 75 76 77 66C79 55 83 49 83 40C83 28 74 22 60 22Z"
          fill="url(#twTooth)"
        />

        {/* Protective Silver/Glass Shield */}
        <path
          d="M60 30 L80 37 C80 57 71 72 60 81 C49 72 40 57 40 37 Z"
          fill="url(#shieldGrad)"
          stroke="#ffffff"
          strokeWidth="1.5"
        />
        {/* Shield Inner Crest / Cross */}
        <path
          d="M60 42 L60 68 M48 53 L72 53"
          stroke="#ffffff"
          strokeWidth="2"
          strokeLinecap="round"
          opacity="0.8"
        />

        {/* Gleam Sparkles */}
        <g transform="translate(76, 26)">
          <path d="M0 -6 Q0 0 6 0 Q0 0 0 6 Q0 0 -6 0 Q0 0 0 -6 Z" fill="#38bdf8" />
          <circle cx="0" cy="0" r="1.5" fill="#ffffff" />
        </g>
        <g transform="translate(34, 48)">
          <path d="M0 -4 Q0 0 4 0 Q0 0 0 4 Q0 0 -4 0 Q0 0 0 -4 Z" fill="#0ea5e9" />
        </g>
      </g>
    </svg>
  )
}

// 6. 3D Cosmetic Dentistry Illustration
export function CosmeticDentistry3D({ className = 'w-24 h-24' }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <defs>
        <radialGradient id="cdTooth" cx="35%" cy="30%" r="70%">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="50%" stopColor="#fdf4ff" />
          <stop offset="85%" stopColor="#fae8ff" />
          <stop offset="100%" stopColor="#e9d5ff" />
        </radialGradient>
        <filter id="cdShadow" x="-10%" y="-10%" width="120%" height="130%">
          <feDropShadow dx="0" dy="5" stdDeviation="4" floodColor="#0f172a" floodOpacity="0.12" />
        </filter>
      </defs>

      <g filter="url(#cdShadow)">
        {/* Gleaming Aesthetic Tooth */}
        <path
          d="M60 22C46 22 37 28 37 40C37 49 41 55 43 66C45 76 44 89 49 93C53 93 55 83 58 72C59 69 61 69 62 72C65 83 67 93 71 93C76 89 75 76 77 66C79 55 83 49 83 40C83 28 74 22 60 22Z"
          fill="url(#cdTooth)"
        />

        {/* High Gloss Enamel Highlights */}
        <ellipse cx="50" cy="33" rx="7" ry="4" fill="#ffffff" opacity="0.9" />
        <ellipse cx="68" cy="37" rx="5" ry="3" fill="#ffffff" opacity="0.6" />

        {/* Golden Diamond Star Flares */}
        <g transform="translate(80, 24)">
          <path d="M0 -10 Q0 0 10 0 Q0 0 0 10 Q0 0 -10 0 Q0 0 0 -10 Z" fill="#f59e0b" />
          <circle cx="0" cy="0" r="2.5" fill="#fef3c7" />
        </g>
        <g transform="translate(32, 60)">
          <path d="M0 -6 Q0 0 6 0 Q0 0 0 6 Q0 0 -6 0 Q0 0 0 -6 Z" fill="#fbbf24" />
        </g>
        <g transform="translate(74, 76)">
          <path d="M0 -5 Q0 0 5 0 Q0 0 0 5 Q0 0 -5 0 Q0 0 0 -5 Z" fill="#ec4899" />
        </g>
      </g>
    </svg>
  )
}

// 7. Holographic Glowing 3D Crystal Tooth Banner
export function HolographicNeonTooth({ className = 'w-64 h-64' }: { className?: string }) {
  return (
    <svg viewBox="0 0 280 280" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <defs>
        <filter id="neonHalo" x="-40%" y="-40%" width="180%" height="180%">
          <feGaussianBlur stdDeviation="10" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <linearGradient id="orbitGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#34d399" stopOpacity="0" />
          <stop offset="40%" stopColor="#2dd4bf" stopOpacity="0.9" />
          <stop offset="60%" stopColor="#38bdf8" stopOpacity="1" />
          <stop offset="100%" stopColor="#a7f3d0" stopOpacity="0.1" />
        </linearGradient>
        <linearGradient id="crystalToothGrad" x1="20%" y1="10%" x2="80%" y2="90%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.95" />
          <stop offset="35%" stopColor="#a7f3d0" stopOpacity="0.65" />
          <stop offset="70%" stopColor="#14b8a6" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#065f46" stopOpacity="0.15" />
        </linearGradient>
      </defs>

      {/* Radial Background Glow */}
      <circle cx="140" cy="140" r="90" fill="#2dd4bf" opacity="0.18" filter="url(#neonHalo)" />

      {/* Back Half of Orbit Ring */}
      <ellipse
        cx="140"
        cy="146"
        rx="105"
        ry="42"
        transform="rotate(-18 140 146)"
        stroke="url(#orbitGrad)"
        strokeWidth="3.5"
        strokeDasharray="220 200"
        filter="url(#neonHalo)"
        opacity="0.6"
      />

      {/* 3D Glass Crystal Tooth */}
      <g>
        {/* Ambient interior shadow */}
        <path
          d="M140 50C110 50 92 64 92 90C92 110 99 124 104 148C108 170 106 198 116 206C124 206 128 184 135 160C137 154 143 154 145 160C152 184 156 206 164 206C174 198 172 170 176 148C181 124 188 110 188 90C188 64 170 50 140 50Z"
          fill="url(#crystalToothGrad)"
          stroke="#5eead4"
          strokeWidth="2"
        />
        {/* Crystal facets and light refraction paths */}
        <path
          d="M140 52 L140 152 M116 80 L140 98 L164 80 M104 144 L140 156 L176 144"
          stroke="#99f6e4"
          strokeWidth="1.2"
          strokeOpacity="0.65"
        />
        {/* Top Rim Glowing Edge */}
        <path
          d="M112 66 C124 55 156 55 168 66"
          stroke="#ffffff"
          strokeWidth="2.5"
          strokeLinecap="round"
          filter="url(#neonHalo)"
        />
        <ellipse cx="140" cy="74" rx="10" ry="4" fill="#ffffff" opacity="0.6" />
      </g>

      {/* Front Half of Orbit Ring (Glowing in front of tooth) */}
      <ellipse
        cx="140"
        cy="146"
        rx="105"
        ry="42"
        transform="rotate(-18 140 146)"
        stroke="url(#orbitGrad)"
        strokeWidth="3.5"
        strokeDashoffset="180"
        filter="url(#neonHalo)"
      />

      {/* Little Orbiting Neon Particle */}
      <circle cx="215" cy="120" r="3.5" fill="#ffffff" filter="url(#neonHalo)" />
      <circle cx="65" cy="170" r="2.5" fill="#34d399" filter="url(#neonHalo)" />
    </svg>
  )
}

