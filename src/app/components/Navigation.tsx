import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Имя появляется, когда прокрутили 90% высоты экрана (прошли Hero блок)
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
    }
  };

  const navLinks = [
    { name: 'Обо мне', id: 'about' }, // Добавлена ссылка "Обо мне"
    { name: 'UI/UX', id: 'uiux' },
    { name: 'Брендинг', id: 'branding' },
    { name: 'Контакты', id: 'contact' }
  ];

  return (
    <motion.nav
      className={`fixed top-0 left-0 right-0 z-50 px-6 flex justify-between items-center transition-all duration-300 ${
        isScrolled ? 'bg-white/80 backdrop-blur-md shadow-sm py-4' : 'bg-transparent py-6'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* ЛЕВАЯ ЧАСТЬ: Имя (Появляется только после скролла) */}
      <div className="font-bold text-lg md:text-xl tracking-tight min-w-[150px] overflow-hidden">
        <AnimatePresence>
          {isScrolled && (
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 20, opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => scrollToSection('hero')}
              className="cursor-pointer hover:opacity-70 transition-opacity text-black"
            >
              Влад Катаев
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ПРАВАЯ ЧАСТЬ: Ссылки */}
      <ul className="flex gap-6 md:gap-8">
        {navLinks.map((link) => (
          <li key={link.id}>
            <button
              onClick={() => scrollToSection(link.id)}
              className={`text-xs md:text-sm font-bold uppercase tracking-widest transition-colors hover:text-blue-600 ${
                isScrolled ? 'text-gray-900' : 'text-gray-500'
              }`}
            >
              {link.name}
            </button>
          </li>
        ))}
      </ul>
    </motion.nav>
  );
}