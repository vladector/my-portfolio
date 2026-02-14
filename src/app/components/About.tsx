import { motion } from 'framer-motion'; // Привел к единому стандарту с UI/UX
import { Code, Palette, GraduationCap, PenTool, Layers } from 'lucide-react';
import meImage from '../../assets/me/me.png';

export function About({ theme }: { theme: any }) {
  // --- НАСТРОЙКИ КАРТОЧЕК ---
  
  const cardBg = theme.isDark 
    ? 'bg-zinc-900/60 border-white/10 text-white' 
    : 'bg-white/70 border-gray-200 text-black shadow-lg';

  const cardBorder = theme.isDark ? 'border-white/10' : 'border-white/50';

  const mainTextColor = theme.isDark ? 'text-gray-100' : 'text-black';
  const secondaryTextColor = theme.isDark ? 'text-gray-400' : 'text-slate-900 font-bold';
  
  // --- ИСПРАВЛЕННЫЕ СТИЛИ ТЕГОВ (ПУЗЫРЕЙ) ---
  // 1. Убрал border-2, теперь везде border (1px), чтобы не прыгало.
  // 2. Типографика (text-xs uppercase tracking-wider) теперь как в UI/UX секции.
  const tagBaseStyle = "px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider transition-all border backdrop-blur-md shadow-sm";
  
  const tagThemeStyle = theme.isDark 
    ? 'bg-white/10 text-white border-white/20' // Темная тема
    : 'bg-white/80 text-black border-slate-300'; // Светлая тема (border теперь такой же толщины)

  return (
    <section id="about" className="relative py-24 px-6 overflow-hidden bg-transparent">
      
      {/* ГРАДИЕНТ ФОНА */}
      <motion.div 
        className="absolute inset-0 z-0 pointer-events-none"
        animate={{
          background: `linear-gradient(to bottom, ${theme.bg} 0%, ${theme.bg} 35%, #ffffff 100%)`
        }}
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
            className="text-sm font-black uppercase tracking-widest mb-4"
            animate={{ color: theme.isDark ? theme.subText : '#64748b' }}
          >
            Обо мне
          </motion.h2>
          
          <motion.p 
            className="text-3xl md:text-6xl font-black leading-tight"
            animate={{ color: theme.isDark ? '#ffffff' : '#000000' }}
          >
            Визуальный опыт <br className="hidden md:block"/>
            с инженерной точностью.
          </motion.p>
        </motion.div>

        {/* BENTO GRID */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 auto-rows-[minmax(200px,auto)]">
          
          {/* 1. КАРТОЧКА С ФОТО */}
          <motion.div 
            className={`md:col-span-8 backdrop-blur-2xl border rounded-[40px] p-8 md:p-12 relative overflow-hidden transition-all duration-1000 ${cardBg} ${cardBorder}`}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="relative z-20 max-w-[100%] md:max-w-[65%]">
              <h3 className="text-3xl font-black mb-6 flex items-center gap-3">
                <Palette className="w-8 h-8 text-blue-600" />
                Художественная база
              </h3>
              <p className={`text-xl leading-relaxed font-medium ${mainTextColor}`}>
                Я рисую с детства. За плечами академическая художественная школа и диплом ЧГИК (2025) по дизайну. 
                <br/><br/>
                Мой путь в UI начался еще в середине 2010-х. Я вырос из классической композиции и понимания формы.
              </p>
            </div>
            <div className="hidden md:block absolute bottom-0 right-0 w-[42%] h-[95%] z-10 pointer-events-none">
              <img 
                src={meImage} 
                alt="Vlad Kataev" 
                className="w-full h-full object-contain object-bottom grayscale opacity-100 transition-all duration-700"
                style={{
                  maskImage: 'linear-gradient(to bottom, black 85%, transparent 100%)',
                  WebkitMaskImage: 'linear-gradient(to bottom, black 85%, transparent 100%)'
                }}
              />
            </div>
          </motion.div>

          {/* 2. ПРОСТРАНСТВЕННОЕ МЫШЛЕНИЕ */}
          <motion.div 
            className="md:col-span-4 bg-zinc-950/90 backdrop-blur-xl text-white rounded-[40px] p-8 md:p-12 flex flex-col justify-between relative overflow-hidden shadow-2xl"
          >
            <motion.div 
              className="absolute inset-0 opacity-50"
              animate={{ background: `radial-gradient(circle at top right, ${theme.colors[0]}, transparent 70%)` }}
            />
            <div className="relative z-10">
              <Layers className="w-10 h-10 mb-6 text-blue-400" />
              <h3 className="text-2xl font-black mb-4">Пространственное мышление</h3>
              <p className="text-zinc-400 text-base leading-relaxed">
                Владение Revit и 3ds Max позволяет мне строить интерфейсы как глубокие, архитектурно выверенные структуры.
              </p>
            </div>
          </motion.div>

          {/* 3. ИНСТРУМЕНТАРИЙ */}
         <motion.div 
            className={`md:col-span-7 backdrop-blur-2xl rounded-[40px] p-8 md:p-12 border transition-all duration-1000 ${cardBg} ${cardBorder}`}
          >
            <h4 className="flex items-center gap-3 font-black mb-10 text-2xl">
              <Code className="w-8 h-8 text-indigo-600" /> Инструментарий
            </h4>
            
            <div className="space-y-10">
              {/* ГРУППА 1: Дизайн и Код */}
              <div>
                <span className={`text-xs font-black uppercase tracking-[0.2em] mb-4 block ${secondaryTextColor}`}>
                  Interface & Editorial
                </span>
                <div className="flex flex-wrap gap-3">
                  {['Figma', 'Illustrator', 'InDesign', 'React', 'Tailwind'].map((tag) => (
                    <span key={tag} className={`${tagBaseStyle} ${tagThemeStyle}`}>
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* ГРУППА 2: 3D и Архитектура */}
              <div>
                <span className={`text-xs font-black uppercase tracking-[0.2em] mb-4 block ${secondaryTextColor}`}>
                  3D & Spatial
                </span>
                <div className="flex flex-wrap gap-3">
                  {['Blender', '3ds Max', 'Revit', 'ArchiCAD'].map((tag) => (
                    <span key={tag} className={`${tagBaseStyle} ${tagThemeStyle}`}>
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* ГРУППА 3: Рисование и... специфическое */}
              <div>
                <span className={`text-xs font-black uppercase tracking-[0.2em] mb-4 block ${secondaryTextColor}`}>
                  Digital Art & Legacy
                </span>
                <div className="flex flex-wrap gap-3">
                  {['Fresco', 'Photoshop', 'MS Paint'].map((tag) => (
                    <span key={tag} className={`${tagBaseStyle} ${tagThemeStyle}`}>
                      {tag}
                    </span>
                  ))}
                  
                </div>
              </div>
            </div>
          </motion.div>

          {/* 4. ОБРАЗОВАНИЕ И ЦЕЛЬ */}
          <motion.div 
            className={`md:col-span-5 backdrop-blur-2xl rounded-[40px] p-8 md:p-12 border transition-all duration-1000 ${cardBg} ${cardBorder}`}
          >
            <div className="mb-12">
              <h4 className="flex items-center gap-3 font-black mb-4 text-2xl">
                <GraduationCap className="w-8 h-8 text-orange-600" /> Образование
              </h4>
              <p className="text-xl font-black leading-tight">ЧГИК, Дизайн (2025)</p>
              <p className={`text-sm uppercase tracking-widest mt-2 ${secondaryTextColor}`}>Профильное высшее</p>
            </div>

            <div className="pt-8 border-t border-gray-200/50">
              <h4 className="flex items-center gap-3 font-black mb-4 text-2xl">
                <PenTool className="w-8 h-8 text-green-600" /> Цель
              </h4>
              <p className={`text-lg font-bold leading-relaxed ${mainTextColor}`}>
                Ищу команду, где смогу применить свой широкий профиль для создания чистых, работающих продуктов.
              </p>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}