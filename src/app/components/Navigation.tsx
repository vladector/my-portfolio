import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

export function Navigation({ theme }: { theme: any }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const showThreshold = window.innerHeight * 0.9;
      setIsScrolled(window.scrollY > showThreshold);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMobileMenuOpen(false);
    }
  };

  const navLinks = [
    { name: 'Обо мне', id: 'about' },
    { name: 'UI/UX', id: 'uiux' },
    { name: 'Брендинг', id: 'branding' },
    { name: 'Интерьеры', id: 'interiors' },
    { name: 'Контакты', id: 'contact' }
  ];

  const socialLinks = [
    { name: 'TG', href: 'https://t.me/vladector' },
    { name: 'VK', href: 'https://vk.com/vladector' },
    { name: 'IG', href: 'https://instagram.com/vladector' },
    { name: 'GH', href: 'https://github.com/vladector' }
  ];

  const listVariants = {
    closed: { opacity: 0 },
    opened: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 }
    }
  };

  const linkVariants = {
    closed: { x: -20, opacity: 0 },
    opened: { x: 0, opacity: 1 }
  };

  return (
    <>
      {/* 1. НЕВИДИМАЯ ЗОНА ДЛЯ СВАЙПА (ОТКРЫТИЕ) */}
      {!isMobileMenuOpen && (
        <motion.div
          className="fixed inset-y-0 left-0 w-6 z-[145] md:hidden"
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          onDragEnd={(_, info) => {
            // Если свайпнули вправо больше чем на 40px — открываем меню
            if (info.offset.x > 40) setIsMobileMenuOpen(true);
          }}
        />
      )}

      <motion.nav
        className={`fixed top-0 left-0 right-0 z-[150] px-6 md:px-12 flex flex-row-reverse md:flex-row justify-between items-center transition-all duration-500 ${
          isScrolled 
            ? 'bg-white/70 backdrop-blur-xl border-b border-white/20 shadow-sm py-4' 
            : 'bg-transparent py-8'
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
      >
        {/* ИМЯ */}
        <div className="font-black text-lg md:text-xl tracking-tighter z-[160] text-right md:text-left">
          <AnimatePresence mode="wait">
            {(isScrolled || isMobileMenuOpen) ? (
              <motion.div
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 30, opacity: 0 }}
                onClick={() => { window.scrollTo({ top: 0, behavior: 'smooth' }); setIsMobileMenuOpen(false); }}
                className="cursor-pointer text-black flex flex-row-reverse md:flex-row items-center gap-2"
              >
                <span className="w-2.5 h-2.5 bg-blue-600 rounded-full" />
                Влад Катаев
              </motion.div>
            ) : (
               <div className="w-[20px] md:w-[150px]" /> 
            )}
          </AnimatePresence>
        </div>

        {/* DESKTOP LINKS */}
        <ul className="hidden md:flex gap-10">
          {navLinks.map((link) => (
            <li key={link.id}>
              <button
                onClick={() => scrollToSection(link.id)}
                className="text-xs font-black uppercase tracking-[0.2em] transition-all relative group"
                style={{ color: isScrolled ? '#000000' : theme.text }}
              >
                {link.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full" />
              </button>
            </li>
          ))}
        </ul>

        {/* MOBILE TOGGLE */}
        <button 
          className="md:hidden z-[160] p-2"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? (
            <X size={28} className="text-black" />
          ) : (
            <Menu 
              size={28} 
              style={{ color: isScrolled ? '#000000' : theme.text }}
              className="transition-colors duration-500"
            />
          )}
        </button>
      </motion.nav>

      {/* 2. МОБИЛЬНОЕ МЕНЮ С ПОДДЕРЖКОЙ СВАЙПА (ЗАКРЫТИЕ) */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            
            // Логика закрытия свайпом влево
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={{ left: 0.5, right: 0.1 }}
            onDragEnd={(_, info) => {
              if (info.offset.x < -100) setIsMobileMenuOpen(false);
            }}
            
            className="fixed inset-0 z-[140] bg-white/95 backdrop-blur-3xl flex flex-col justify-center px-10 touch-none"
          >
            {/* Фон для клика (закрытие) */}
            <div className="absolute inset-0 z-[-1]" onClick={() => setIsMobileMenuOpen(false)} />

            <motion.div variants={listVariants} initial="closed" animate="opened" className="flex flex-col gap-8">
              {navLinks.map((link) => (
                <motion.button
                  key={link.id}
                  variants={linkVariants}
                  onClick={() => scrollToSection(link.id)}
                  className="text-4xl font-black text-black text-left tracking-tighter active:text-blue-600 transition-colors"
                >
                  {link.name}
                </motion.button>
              ))}
              <motion.div variants={linkVariants} className="mt-10 pt-10 border-t border-black/5">
                <p className="text-zinc-400 text-sm font-bold uppercase tracking-widest mb-4">Соцсети</p>
                <div className="flex gap-6 text-black font-black">
                  {socialLinks.map((link) => (
                    <a key={link.name} href={link.href} target="_blank" rel="noopener noreferrer" className="hover:text-blue-600 transition-colors">
                      {link.name}
                    </a>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}