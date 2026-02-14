import { motion } from 'motion/react';

// Этот компонент теперь живет отдельно от Hero и лежит ПОД всем сайтом
export function GlobalBackground({ theme }: { theme: any }) {
  const isClayTheme = theme.id === 'clay-light';

  return (
    // position: fixed — чтобы фон стоял на месте, пока контент скроллится
    // z-[-1] — чтобы он был позади всего контента
    <motion.div 
      className="fixed inset-0 w-full h-full overflow-hidden z-[-1]"
      animate={{ backgroundColor: theme.bg }} // Главная анимация цвета фона темы
      transition={{ duration: 1, ease: "easeInOut" }}
    >
      {/* Увеличили viewBox по Y до 1000, чтобы фигуры могли уходить "вниз" за пределы Hero.
         preserveAspectRatio="xMidYMin slice" — прижимает графику к верху, позволяя низу обрезаться или уходить за экран.
      */}
      <svg viewBox="0 0 1000 1000" className="w-full h-full min-h-screen" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMin slice">
        <defs>
          <motion.filter id="dynamicBlur" x="-50%" y="-50%" width="200%" height="200%">
            <motion.feGaussianBlur in="SourceGraphic" animate={{ stdDeviation: theme.blur }} transition={{ duration: 2.5 }} />
          </motion.filter>

          {/* Фильтр для глиняной темы */}
          <filter id="clay-3d" x="-50%" y="-50%" width="200%" height="200%">
            <feDropShadow dx="12" dy="12" stdDeviation="8" floodColor="#000000" floodOpacity="0.15" result="dropShadow"/>
            <feSpecularLighting in="dropShadow" surfaceScale="5" specularConstant="0.8" specularExponent="20" lightingColor="#ffffff" result="specularLight">
                <fePointLight x="150" y="100" z="300" />
            </feSpecularLighting>
            <feComposite in="specularLight" in2="SourceAlpha" operator="in" result="specularLightIn"/>
            <feComposite in="SourceGraphic" in2="specularLightIn" operator="arithmetic" k1="0" k2="1" k3="1" k4="0" result="litObject"/>
            <feMerge>
                <feMergeNode in="dropShadow"/> 
                <feMergeNode in="litObject"/>
            </feMerge>
          </filter>
        </defs>

        <motion.g 
            filter={isClayTheme ? "url(#clay-3d)" : "url(#dynamicBlur)"}
            animate={{ style: { mixBlendMode: theme.mixBlend as any } }} 
            transition={{ duration: 1.0 }}
        >
          {/* Фигуры. Можно добавить новые координаты, чтобы они были ниже */}
          <motion.path d="M150,200 Q250,100 400,250 T500,400 T200,500 Z" animate={{ fill: theme.colors[0], d: ["M150,200 Q250,100 400,250 T500,400 T200,500 Z", "M120,220 Q220,120 380,270 T480,420 T180,520 Z", "M150,200 Q250,100 400,250 T500,400 T200,500 Z"] }} transition={{ fill: { duration: 2.5 }, d: { duration: 10, repeat: Infinity, ease: "easeInOut" } }} opacity="0.9" />
          <motion.circle cx="450" cy="400" r="140" animate={{ fill: theme.colors[1], r: [140, 160, 130, 140], cx: [450, 470, 430, 450] }} transition={{ fill: { duration: 2.5 }, default: { duration: 12, repeat: Infinity, ease: "easeInOut" }}} opacity="0.9" />
          {/* Эту фигуру я немного опустил (cy="600"), чтобы она была на границе Hero и About */}
          <motion.circle cx="550" cy="600" r="150" animate={{ fill: theme.colors[2], cy: [600, 580, 620, 600], cx: [550, 570, 540, 550] }} transition={{ fill: { duration: 2.5 }, default: { duration: 10, repeat: Infinity, ease: "easeInOut" }}} opacity="0.9" />
          <motion.path d="M600,300 Q700,150 850,300 T800,500 T600,450 Z" animate={{ fill: theme.colors[3], d: ["M600,300 Q700,150 850,300 T800,500 T600,450 Z", "M580,320 Q680,170 830,320 T780,520 T580,470 Z", "M600,300 Q700,150 850,300 T800,500 T600,450 Z"] }} transition={{ fill: { duration: 2.5 }, d: { duration: 14, repeat: Infinity, ease: "easeInOut" }}} opacity="0.9" />
           <motion.circle cx="500" cy="300" r="100" animate={{ fill: theme.colors[4], r: [100, 120, 100], opacity: [0.5, 0.3, 0.5] }} transition={{ fill: { duration: 2.5 }, default: { duration: 8, repeat: Infinity, ease: "easeInOut" }}} />
        </motion.g>
      </svg>

      {/* Виньетка тоже здесь, чтобы затемнять края глобального фона */}
      <motion.div 
        className="absolute inset-0 pointer-events-none"
        animate={{ background: `radial-gradient(circle at center, transparent 0%, ${theme.bg}E6 80%)` }} 
        transition={{ duration: 1 }} 
      />

      {/* Шум */}
      <motion.div className="absolute inset-0 pointer-events-none mix-blend-overlay" animate={{ opacity: theme.noise }} transition={{ duration: 2.5 }} style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }} />
    </motion.div>
  );
}