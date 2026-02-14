import { motion } from 'framer-motion';
import { useInView } from '../hooks/useInView';
import { Mail, Github, Send, Share2 } from 'lucide-react'; // Импортируем подходящие иконки

export function ContactSection() {
  const [ref, isInView] = useInView({ threshold: 0.3 });

  const socialLinks = [
    { icon: Mail, label: 'Email', href: 'mailto:vladector2@gmail.com' },
    { icon: Github, label: 'GitHub', href: 'https://github.com/vladector' },
    { icon: Send, label: 'Telegram', href: 'https://t.me/vladector' },
    { icon: Share2, label: 'VK', href: 'https://vk.com/vladector' }
  ];

  return (
    <section id="contact" className="py-32 px-6 bg-[#0a0a0a] text-white relative overflow-hidden" ref={ref}>
      
      {/* ФОНОВОЕ СВЕЧЕНИЕ (для глубины) */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60%] h-[60%] bg-blue-900/10 blur-[150px] pointer-events-none" />

      <div className="max-w-[1400px] mx-auto text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          {/* ЗАГОЛОВОК — Визуальный центр футера */}
          <h2 className="text-7xl md:text-[10rem] font-black mb-8 leading-[0.85] tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white to-white/40">
            LET'S TALK
          </h2>
          
          <p className="text-xl md:text-2xl text-zinc-400 mb-16 max-w-2xl mx-auto leading-relaxed">
            Есть идея для проекта или вакансия? <br/>
            Я всегда открыт для обсуждения новых возможностей и вызовов.
          </p>

          {/* КНОПКИ СВЯЗИ */}
          <motion.div
            className="flex flex-wrap justify-center gap-6 mb-24"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {socialLinks.map((link, index) => (
              <motion.a
                key={index}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white hover:text-black transition-all duration-500 group"
                whileHover={{ scale: 1.1, rotate: 5 }}
                whileTap={{ scale: 0.95 }}
                aria-label={link.label}
              >
                <link.icon className="w-6 h-6 md:w-8 md:h-8 group-hover:scale-110 transition-transform" />
              </motion.a>
            ))}
          </motion.div>

          {/* НИЖНЯЯ ПАНЕЛЬ (Copyright) */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col md:flex-row justify-between items-center border-t border-white/10 pt-8 text-sm text-zinc-500 uppercase tracking-[0.2em] font-bold"
          >
            <p>© 2026 Vlad Kataev.</p>
            <div className="flex gap-6 mt-4 md:mt-0">
               <p>UI/UX & Branding</p>
               <p className="hidden md:block">Based in Solikamsk</p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}