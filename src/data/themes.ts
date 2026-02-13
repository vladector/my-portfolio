export const THEMES = [
  // 1. CLAY (Светлая) -> Делаем фон явно сероватым
  {
    id: 'clay-light',
    isDark: false,
    bg: '#f3f4f6', // Cool Gray 100 (Виден на белом)
    text: '#171717',
    subText: '#57534e',
    blur: 0,
    noise: 0.03,
    mixBlend: 'normal',
    colors: ['#3b82f6', '#8b5cf6', '#facc15', '#10b981', '#f97316']
  },
  
  // 2. PASTEL (Светлая) -> Делаем фон голубоватым
  {
    id: 'pastel',
    isDark: false,
    bg: '#eff6ff', // Blue 50
    text: '#111827',
    subText: '#4b5563',
    blur: 50,
    noise: 0.04,
    mixBlend: 'normal',
    colors: ['#3b82f6', '#8b5cf6', '#f97316', '#10b981', '#eab308']
  },

  // 3. BAUHAUS (Светлая) -> Делаем фон кремовым
  {
    id: 'bauhaus',
    isDark: false,
    bg: '#fefce8', // Yellow 50
    text: '#171717',
    subText: '#57534e',
    blur: 0,
    noise: 0.15,
    mixBlend: 'multiply',
    colors: ['#dc2626', '#1d4ed8', '#facc15', '#171717', '#ea580c']
  },

  // === ТЕМНЫЙ ЦИКЛ (Без изменений) ===
  {
    id: 'thermal',
    isDark: true,
    bg: '#0f172a',
    text: '#ffffff',
    subText: '#cbd5e1',
    blur: 70,
    noise: 0.12,
    mixBlend: 'screen',
    colors: ['#3b0764', '#7e22ce', '#db2777', '#f59e0b', '#ffffff']
  },
  {
    id: 'luxury',
    isDark: true,
    bg: '#020617',
    text: '#fef3c7',
    subText: '#94a3b8',
    blur: 45,
    noise: 0.06,
    mixBlend: 'lighten',
    colors: ['#1e3a8a', '#b45309', '#fbbf24', '#78350f', '#451a03']
  },
  {
    id: 'acid',
    isDark: true,
    bg: '#052e16',
    text: '#ecfccb',
    subText: '#a3e635',
    blur: 35,
    noise: 0.08,
    mixBlend: 'overlay',
    colors: ['#ccff00', '#ff00ff', '#00ffff', '#ffff00', '#39ff14']
  },
  {
    id: 'sith',
    isDark: true,
    bg: '#0a0a0a',
    text: '#ffffff',
    subText: '#9ca3af',
    blur: 20,
    noise: 0.2,
    mixBlend: 'normal',
    colors: ['#ef4444', '#b91c1c', '#7f1d1d', '#991b1b', '#ff0000']
  }
];