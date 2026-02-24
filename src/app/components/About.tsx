import { motion } from 'framer-motion';
import { Code, Palette, GraduationCap, PenTool, Cpu, Globe, Gamepad2 } from 'lucide-react';
import meImage from '../../assets/me/me.png';

export function About({ theme }: { theme: any }) {
  const isDark = theme.id !== 'clay-light';

  const cardBg = isDark 
    ? 'bg-zinc-900/60 border-white/10 text-white' 
    : 'bg-white/70 border-gray-200 text-black shadow-lg';

  const cardBorder = isDark ? 'border-white/10' : 'border-white/50';
  
  // Единые цвета для текстов
  const mainTextColor = isDark ? 'text-zinc-100' : 'text-zinc-900';
  const secondaryTextColor = isDark ? 'text-zinc-400' : 'text-zinc-600';

  // Единые стили для шрифтов
  const bodyText = `text-lg font-medium leading-relaxed ${mainTextColor}`;
  const smallText = `text-base font-medium leading-relaxed ${secondaryTextColor}`;
  const cardTitle = "text-2xl font-black flex items-center gap-3 mb-6";

  const tagBaseStyle = "px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all border backdrop-blur-md shadow-sm";
  const tagThemeStyle = isDark 
    ? 'bg-white/10 text-white border-white/20' 
    : 'bg-white/80 text-black border-zinc-300'; 

  return (
    <section id="about" className="relative py-24 px-6 overflow-hidden bg-transparent">
      
      <motion.div 
        className="absolute inset-0 z-0 pointer-events-none"
        animate={{ backgroundColor: theme.bg }}
        transition={{ duration: 1, ease: "easeInOut" }}
      />

      <div className="relative z-10 max-w-6xl mx-auto">
        
        {/* ЗАГОЛОВОК СЕКЦИИ */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 md:mb-24 text-center md:text-left"
        >
          <motion.h2 
            className="text-sm font-black uppercase tracking-[0.3em] mb-4"
            animate={{ color: isDark ? theme.subText : '#64748b' }}
          >
            Обо мне
          </motion.h2>
          
          <motion.p 
            className="text-4xl md:text-6xl font-black leading-tight tracking-tighter"
            animate={{ color: isDark ? '#ffffff' : '#000000' }}
          >
            Визуальный опыт <br className="hidden md:block"/>
            с инженерной точностью.
          </motion.p>
        </motion.div>

        {/* BENTO GRID */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 auto-rows-[minmax(200px,auto)]">
          
          {/* 1. ХУДОЖЕСТВЕННАЯ БАЗА */}
          <motion.div 
            className={`md:col-span-8 backdrop-blur-2xl border rounded-[40px] p-8 md:p-12 relative overflow-hidden transition-all duration-1000 ${cardBg} ${cardBorder}`}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="relative z-20 max-w-[100%] md:max-w-[65%]">
              <h3 className={cardTitle}>
                <Palette className="w-8 h-8 text-blue-600 shrink-0" />
                Художественная база
              </h3>
              <p className={bodyText}>
                Я рисую с детства. За плечами академическая художественная школа и диплом по дизайну. 
                <br/><br/>
                Мой путь в UI начался еще в середине 2010-х. Я вырос из классической композиции и понимания формы, что позволяет мне создавать не просто красивые, но и структурно выверенные интерфейсы.
              </p>
            </div>
            <div className="hidden md:block absolute bottom-0 right-0 w-[42%] h-[95%] z-10 pointer-events-none">
              <img 
                src={meImage} 
                alt="Evgeny" 
                className="w-full h-full object-contain object-bottom grayscale opacity-100 transition-all duration-700"
                style={{
                  maskImage: 'linear-gradient(to bottom, black 80%, transparent 100%)',
                  WebkitMaskImage: 'linear-gradient(to bottom, black 80%, transparent 100%)'
                }}
              />
            </div>
          </motion.div>

          {/* 2. ИНЖЕНЕРНЫЙ БЭКГРАУНД */}
          <motion.div 
            className="md:col-span-4 bg-zinc-950/90 backdrop-blur-xl text-white rounded-[40px] p-8 md:p-12 flex flex-col justify-between relative overflow-hidden shadow-2xl"
          >
            <motion.div 
              className="absolute inset-0 opacity-50"
              animate={{ background: `radial-gradient(circle at top right, ${theme.colors[0]}, transparent 70%)` }}
            />
            <div className="relative z-10">
              <Cpu className="w-10 h-10 mb-6 text-blue-400" />
              <h3 className="text-2xl font-black mb-4">Инженерный фундамент</h3>
              <p className="text-zinc-300 text-lg font-medium leading-relaxed">
                Более 8 лет опыта работы со сложным оборудованием и КИПиА. Я понимаю технические системы изнутри, поэтому проектирую логичные UX-сценарии.
              </p>
            </div>
          </motion.div>

          {/* 3. ИНСТРУМЕНТАРИЙ */}
          <motion.div className={`md:col-span-6 lg:col-span-4 backdrop-blur-2xl rounded-[40px] p-8 md:p-10 border transition-all duration-1000 ${cardBg} ${cardBorder}`}>
            <h4 className={cardTitle}>
              <Code className="w-8 h-8 text-indigo-600 shrink-0" /> Инструменты
            </h4>
            <div className="space-y-6">
              <div>
                <span className="text-[10px] font-black uppercase tracking-[0.2em] mb-3 block opacity-50">Interface & Editorial</span>
                <div className="flex flex-wrap gap-2">
                  {['Figma', 'Photoshop', 'Illustrator', 'React', 'Tailwind'].map((tag) => (
                    <span key={tag} className={`${tagBaseStyle} ${tagThemeStyle}`}>{tag}</span>
                  ))}
                </div>
              </div>
              <div>
                <span className="text-[10px] font-black uppercase tracking-[0.2em] mb-3 block opacity-50">3D & Spatial</span>
                <div className="flex flex-wrap gap-2">
                  {['Blender', '3ds Max', 'Revit', 'ArchiCAD'].map((tag) => (
                    <span key={tag} className={`${tagBaseStyle} ${tagThemeStyle}`}>{tag}</span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* 4. ХАРДВАРНЫЙ DIY */}
          <motion.div className={`md:col-span-6 lg:col-span-4 backdrop-blur-2xl rounded-[40px] p-8 md:p-10 border transition-all duration-1000 ${cardBg} ${cardBorder} flex flex-col`}>
            <h4 className={cardTitle}>
              <Gamepad2 className="w-8 h-8 text-purple-500 shrink-0" /> Железо & DIY
            </h4>
            <p className={bodyText + " mb-6"}>
              Адаптирую старое железо и софт к современным реалиям, давая вещам вторую жизнь.
            </p>
            <ul className="space-y-3 flex-grow">
              <li className={`flex items-start gap-3 ${smallText}`}>
                <span className="text-purple-500 font-black">▹</span> 
                <span>Эмуляция и запуск тяжелых портов на смартфонах.</span>
              </li>
              <li className={`flex items-start gap-3 ${smallText}`}>
                <span className="text-purple-500 font-black">▹</span> 
                <span>Аппаратные моды: впайка HDMI в Dreamcast и PS2.</span>
              </li>
            </ul>
          </motion.div>

          {/* 5. ОБРАЗОВАНИЕ */}
          <motion.div className={`md:col-span-12 lg:col-span-4 backdrop-blur-2xl rounded-[40px] p-8 md:p-10 border transition-all duration-1000 flex flex-col justify-between ${cardBg} ${cardBorder}`}>
            <div>
              <h4 className={cardTitle}>
                <GraduationCap className="w-8 h-8 text-orange-600 shrink-0" /> Образование
              </h4>
              <div className="mb-6">
                <p className="text-xl font-black leading-tight">ЧГИК (2025)</p>
                <p className={smallText + " text-xs uppercase tracking-widest mt-1"}>Дизайн (Профильное высшее)</p>
              </div>
              <div className="mb-6">
                <p className="text-xl font-black leading-tight">
                  <span className="line-through decoration-red-500 decoration-[3px] opacity-70">ПНИПУ</span> / СГХТ (2018)
                </p>
                <p className={smallText + " text-xs uppercase tracking-widest mt-1"}>Автоматизация процессов</p>
              </div>
            </div>
            <div className="pt-6 border-t border-zinc-500/20">
              <div className="flex justify-between items-center">
                <div>
                  <h4 className="font-black text-sm uppercase tracking-widest flex items-center gap-2 mb-1">
                    <Globe className="w-4 h-4 text-sky-500" /> English
                  </h4>
                  <p className="text-base font-bold">Very big</p>
                </div>
                <div className="text-right">
                  <h4 className="font-black text-sm uppercase tracking-widest flex items-center gap-2 mb-1 justify-end">
                    <PenTool className="w-4 h-4 text-green-600" /> Цель
                  </h4>
                  <p className="text-base font-bold"> Art-direction</p>
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}