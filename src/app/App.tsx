import { useState, useEffect } from 'react';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { UIUXSection } from './components/UIUXSection';
import { BrandingSection } from './components/BrandingSection';
import { InteriorsSection } from './components/InteriorsSection'; // Импортируем новую секцию
import { ContactSection } from './components/ContactSection';
import { Navigation } from './components/Navigation';
import { THEMES } from '../data/themes';
import { GlobalBackground } from './components/GlobalBackground';

export default function App() {
  const [themeIndex, setThemeIndex] = useState(0);

  // Глобальный таймер смены тем
  useEffect(() => {
    const interval = setInterval(() => {
      setThemeIndex((prev) => (prev + 1) % THEMES.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const currentTheme = THEMES[themeIndex];

  return (
    <div className="relative min-h-screen">
      {/* Глобальный фон с органическими формами под всем контентом */}
      <GlobalBackground theme={currentTheme} />

      {/* Навигация */}
      <Navigation theme={currentTheme} />

      {/* Главный экран */}
      <Hero theme={currentTheme} />
      
      {/* Обо мне — теперь с плотным фоном, который не просвечивает */}
      <About theme={currentTheme} />
      
      {/* Проекты: UI/UX и интерфейсы */}
      <UIUXSection />
      
      {/* Проекты: Брендинг и айдентика */}
      <BrandingSection />
      
      {/* Новая секция: 3D-визуализация интерьеров */}
      <InteriorsSection />
      
      {/* Контакты и футер */}
      <ContactSection theme={currentTheme} />
    </div>
  );
}