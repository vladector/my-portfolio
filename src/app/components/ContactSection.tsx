import { motion } from 'framer-motion';
import { useInView } from '../hooks/useInView';
import { Mail, Github, Send, Globe } from 'lucide-react';

// Кастомная иконка VK с оптической правкой центра
const VKIcon = ({ className }: { className?: string }) => (
  <svg 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="1.8" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <g transform="translate(-2, 0)">
      <path d="M15.05 19c-5.83 0-9.15-4-9.29-10.66h3.1c.1 4.75 2.19 6.76 3.85 7.18V8.34h2.91v4.1c1.78-.19 3.51-2.04 4.14-4.1h2.91a8.6 8.6 0 0 1-3.8 5.4 8.71 8.71 0 0 1 4.39 5.26h-3.19a5.1 5.1 0 0 0-4.52-3.1v3.1h-.5z" />
    </g>
  </svg>
);

// Добавили { theme }: { theme: any } в аргументы функции
export function ContactSection({ theme }: { theme: any }) {
  const [ref, isInView] = useInView({ threshold: 0.3 });
  const isDark = theme.id !== 'clay-light';

  const socialLinks = [
    { id: 'tg', icon: Send, href: 'https://t.me/vladector' },
    { id: 'mail', icon: Mail, href: 'mailto:vladector2@gmail.com' },
    { id: 'vk', icon: VKIcon, href: 'https://vk.com/vladector' },
    { id: 'gh', icon: Github, href: 'https://github.com/vladector' }
  ];

  return (
    <section 
      id="contact" 
      className="py-32 px-6 relative overflow-hidden transition-colors duration-1000"
      // Футер остается темным для акцента, но мы можем мягко подсвечивать его цветом темы
      style={{ backgroundColor: isDark ? '#0a0a0a' : '#0f172a' }} 
      ref={ref}
    >
      
      {/* ФОНОВОЕ СВЕЧЕНИЕ: Теперь использует первый цвет из текущей темы colors[0] */}
      <motion.div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60%] h-[60%] blur-[120px] pointer-events-none opacity-20"
        animate={{ backgroundColor: theme.colors[0] }}
        transition={{ duration: 2 }}
      />

      <div className="max-w-[1400px] mx-auto text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-6xl md:text-[11rem] font-black mb-12 leading-[0.8] tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white to-white/20 uppercase">
            я не хочу <br className="md:hidden" /> работать на заводе
          </h2>
          
          <p className="text-xl md:text-2xl text-zinc-500 mb-20 max-w-2xl mx-auto leading-relaxed font-medium">
            Всегда открыт для сложных задач, <br className="hidden md:block" />
            интересных вакансий и смелых идей.
          </p>

          <div className="flex flex-wrap justify-center items-center gap-6 md:gap-10 mb-32 max-w-[400px] md:max-w-none mx-auto">
            {socialLinks.map((link) => (
              <motion.a
                key={link.id}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative w-16 h-16 md:w-24 md:h-24 rounded-full bg-zinc-900/40 border border-white/5 flex items-center justify-center hover:border-white/20 transition-all duration-500"
                whileHover={{ y: -8, scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {/* Свечение кнопки при ховере тоже в цвет темы */}
                <motion.div 
                  className="absolute inset-0 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" 
                  style={{ backgroundColor: `${theme.colors[0]}40` }}
                />
                
                <link.icon 
                  className={`relative z-10 transition-all duration-500 text-zinc-400 group-hover:text-white ${
                    link.id === 'vk' ? 'w-9 h-9 md:w-12 md:h-12' : 'w-6 h-6 md:w-9 md:h-9' 
                  }`} 
                />
              </motion.a>
            ))}
          </div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-12 border-t border-white/5 text-[10px] md:text-xs font-black uppercase tracking-[0.3em] text-zinc-600"
          >
            <div className="md:text-left flex flex-col gap-2">
              <span className="text-zinc-800">Локация</span>
              <p className="text-zinc-400 flex items-center justify-center md:justify-start gap-2">
                <Globe size={12} style={{ color: theme.colors[0] }} /> Solikamsk, RU
              </p>
            </div>

            <div className="flex flex-col gap-2">
              <span className="text-zinc-800">© 2026</span>
              <p className="text-zinc-400 font-bold tracking-[0.4em]">Влад Катаев</p>
            </div>

            <div className="md:text-right flex flex-col gap-2">
              <span className="text-zinc-800">Статус</span>
              <p className="text-green-500/70 animate-pulse">Доступен для работы</p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}