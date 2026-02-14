import { useState, useEffect } from 'react';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { UIUXSection } from './components/UIUXSection';
import { BrandingSection } from './components/BrandingSection';
import { ContactSection } from './components/ContactSection';
import { Navigation } from './components/Navigation';
import { THEMES } from '../data/themes';
import { GlobalBackground } from './components/GlobalBackground'; // Импортируем массив

export default function App() {
  const [themeIndex, setThemeIndex] = useState(0);

  // Таймер работает глобально для всего сайта
  useEffect(() => {
    const interval = setInterval(() => {
      setThemeIndex((prev) => (prev + 1) % THEMES.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const currentTheme = THEMES[themeIndex];

  return (
    <div className="relative min-h-screen bg-white">
      <Navigation />
      {/* Передаем текущую тему и в Hero, и в About */}
      <Hero theme={currentTheme} />
      <About theme={currentTheme} />
      
      {/* Твой блок UI/UX проектов */}
      <UIUXSection />
      <BrandingSection />
      <ContactSection />
    </div>
  );
}