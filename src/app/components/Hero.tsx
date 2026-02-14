import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { SemanticTags } from '../../data/SemanticWord';

function AbstractBackground({ theme }: { theme: any }) {
  const isClayTheme = theme.id === 'clay-light';
  return (
    <motion.div 
      className="absolute inset-0 overflow-hidden"
      animate={{ backgroundColor: theme.bg }}
      transition={{ duration: 1, ease: "easeInOut" }}
    >
      <svg viewBox="0 0 1000 600" className="w-full h-full" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">
        <defs>
          <motion.filter id="dynamicBlur" x="-50%" y="-50%" width="200%" height="200%">
            <motion.feGaussianBlur in="SourceGraphic" animate={{ stdDeviation: theme.blur }} transition={{ duration: 2.5 }} />
          </motion.filter>
          <filter id="clay-3d" x="-50%" y="-50%" width="200%" height="200%">
            <feDropShadow dx="12" dy="12" stdDeviation="8" floodColor="#000000" floodOpacity="0.15" result="dropShadow"/>
            <feSpecularLighting in="dropShadow" surfaceScale="5" specularConstant="0.8" specularExponent="20" lightingColor="#ffffff" result="specularLight">
                <fePointLight x="150" y="100" z="300" />
            </feSpecularLighting>
            <feComposite in="specularLight" in2="SourceAlpha" operator="in" result="specularLightIn"/>
            <feComposite in="SourceGraphic" in2="specularLightIn" operator="arithmetic" k1="0" k2="1" k3="1" k4="0" result="litObject"/>
            <feMerge><feMergeNode in="dropShadow"/> <feMergeNode in="litObject"/></feMerge>
          </filter>
        </defs>
        <motion.g 
            filter={isClayTheme ? "url(#clay-3d)" : "url(#dynamicBlur)"}
            style={{ mixBlendMode: theme.mixBlend as any }}
        >
          <motion.path d="M150,200 Q250,100 400,250 T500,400 T200,500 Z" animate={{ fill: theme.colors[0], d: ["M150,200 Q250,100 400,250 T500,400 T200,500 Z", "M120,220 Q220,120 380,270 T480,420 T180,520 Z", "M150,200 Q250,100 400,250 T500,400 T200,500 Z"] }} transition={{ fill: { duration: 2.5 }, d: { duration: 10, repeat: Infinity, ease: "easeInOut" } }} opacity="0.9" />
          <motion.circle cx="450" cy="400" r="140" animate={{ fill: theme.colors[1], r: [140, 160, 130, 140], cx: [450, 470, 430, 450] }} transition={{ fill: { duration: 2.5 }, default: { duration: 12, repeat: Infinity, ease: "easeInOut" }}} opacity="0.9" />
          <motion.circle cx="550" cy="200" r="120" animate={{ fill: theme.colors[2], cy: [200, 180, 220, 200], cx: [550, 570, 540, 550] }} transition={{ fill: { duration: 2.5 }, default: { duration: 10, repeat: Infinity, ease: "easeInOut" }}} opacity="0.9" />
          <motion.path d="M600,300 Q700,150 850,300 T800,500 T600,450 Z" animate={{ fill: theme.colors[3], d: ["M600,300 Q700,150 850,300 T800,500 T600,450 Z", "M580,320 Q680,170 830,320 T780,520 T580,470 Z", "M600,300 Q700,150 850,300 T800,500 T600,450 Z"] }} transition={{ fill: { duration: 2.5 }, d: { duration: 14, repeat: Infinity, ease: "easeInOut" }}} opacity="0.9" />
           <motion.circle cx="500" cy="300" r="100" animate={{ fill: theme.colors[4], r: [100, 120, 100], opacity: [0.5, 0.3, 0.5] }} transition={{ fill: { duration: 2.5 }, default: { duration: 8, repeat: Infinity, ease: "easeInOut" }}} />
        </motion.g>
      </svg>
      <motion.div className="absolute inset-0 pointer-events-none mix-blend-overlay" animate={{ opacity: theme.noise }} transition={{ duration: 2.5 }} style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }} />
    </motion.div>
  );
}

const GlitchChar = ({ char, color }: { char: string, color: string }) => {
    const [style, setStyle] = useState({ fontFamily: 'inherit', fontWeight: 'inherit', fontStyle: 'normal', scale: 1, y: 0 });
    useEffect(() => {
        const timeout = Math.random() * 5000 + 1000; 
        const glitchInterval = setInterval(() => {
            if (Math.random() > 0.7) {
                const fonts = ['monospace', 'serif', 'sans-serif'];
                const weights = [100, 400, 900];
                const styles = ['normal', 'italic'];
                setStyle({ fontFamily: fonts[Math.floor(Math.random() * fonts.length)], fontWeight: weights[Math.floor(Math.random() * weights.length)] as any, fontStyle: styles[Math.floor(Math.random() * styles.length)], scale: Math.random() > 0.5 ? 1.2 : 0.9, y: Math.random() > 0.5 ? -5 : 5 });
                setTimeout(() => { setStyle({ fontFamily: 'inherit', fontWeight: 'inherit', fontStyle: 'normal', scale: 1, y: 0 }); }, Math.random() * 200 + 50);
            }
        }, timeout);
        return () => clearInterval(glitchInterval);
    }, []);
    return ( <motion.span className="inline-block transition-all duration-75" style={{ color: color, fontFamily: style.fontFamily, fontWeight: style.fontWeight, fontStyle: style.fontStyle, y: style.y }} animate={{ scale: style.scale }}>{char === ' ' ? '\u00A0' : char}</motion.span> );
};

const GlitchTitle = ({ text, color, subColor }: { text: string, color: string, subColor: string }) => {
    return (
        <div className="flex flex-col items-center justify-center leading-none select-none w-full">
            {/* ПРИВЕТСТВИЕ:
               - font-sans (как у описания)
               - font-medium (как у описания)
               - tracking-normal (как у описания - теперь никакой разрядки)
               - uppercase (единственное отличие от описания, для "шапки")
            */}
            <motion.div 
              className="text-sm md:text-xl font-sans font-medium tracking-normal mb-4 md:mb-6 opacity-60 text-center" 
              animate={{ color: subColor }}
            >
              Привет, это
            </motion.div>
            
            <div className="flex flex-wrap justify-center w-full text-6xl md:text-8xl lg:text-[140px] font-black tracking-tighter uppercase leading-[0.85] mix-blend-difference text-center">
                {text.split('').map((char, index) => ( <GlitchChar key={index} char={char} color={color} /> ))}
            </div>
        </div>
    );
};

export function Hero({ theme }: { theme: any }) {
  const currentTheme = theme;

  return (
    <section id="hero" className="min-h-screen flex items-center justify-center px-4 relative overflow-hidden transition-colors duration-1000">
      <AbstractBackground theme={currentTheme} />
      <motion.div 
        className="absolute bottom-0 left-0 right-0 h-64 z-0 pointer-events-none"
        animate={{ background: `linear-gradient(to bottom, rgba(0,0,0,0) 0%, ${currentTheme.bg} 100%)` }}
        transition={{ duration: 1, ease:"easeInOut" }}
      />
      <motion.div 
        className="absolute inset-0 pointer-events-none"
        animate={{ background: `radial-gradient(circle at center, ${currentTheme.bg}E6 0%, ${currentTheme.bg}00 70%)` }} 
        transition={{ duration: 2.5 }} 
      />

      <div className="w-full max-w-[1200px] mx-auto text-center relative z-10 flex flex-col items-center">
        <motion.div 
          className="w-full flex flex-col items-center"
          initial={{ opacity: 0, scale: 0.95 }} 
          animate={{ opacity: 1, scale: 1 }} 
          transition={{ duration: 1 }}
        >
          
          <div className="mb-6 md:mb-10 py-4 w-full text-center">
              <GlitchTitle text="ВЛАД КАТАЕВ" color={currentTheme.text} subColor={currentTheme.subText} />
          </div>
          
          {/* ОПИСАНИЕ: font-sans font-medium tracking-normal (стандарт) */}
          <motion.p 
            className="text-base md:text-xl font-sans font-medium tracking-normal mb-12 max-w-2xl mx-auto leading-relaxed text-center px-4" 
            animate={{ color: currentTheme.subText }} 
            transition={{ duration: 1.5 }}
          >
            Создаю исключительный пользовательский опыт и запоминающийся бренд-дизайн в цифровой и физической среде
          </motion.p>
          
          <SemanticTags theme={currentTheme} />

        </motion.div>
      </div>
    </section>
  );
}