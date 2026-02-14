import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// --- ИМПОРТЫ ГРАФИКИ ---
import questionMark from '../assets/Symbols/curiosity/question_mark.svg';
import spyglass from '../assets/Symbols/curiosity/Spyglass.svg';
import ringOfPower from '../assets/Symbols/curiosity/Ring_Of_Power.svg';
import squareBrackets from '../assets/Symbols/research/square_brackets.svg';
import mapIcon from '../assets/Symbols/research/Map.svg';
import fellowship from '../assets/Symbols/research/fellowship.svg';
import checkmark from '../assets/Symbols/solution/checkmark.svg';
import treasure from '../assets/Symbols/solution/Treasure.svg';
import exclamation from '../assets/Symbols/solution/exclamation_mark.svg';
import sauronEye from '../assets/Symbols/solution/Sauron.svg';

type ScenarioType = 'pirate' | 'code' | 'lotr' | null;

// --- КОНФИГУРАЦИЯ ---
const SCENARIOS = {
  pirate: {
    "Любопытство": { src: spyglass, color: '#DAA520', scale: 1.5, noShadow: true },
    "Исследование": { src: mapIcon, color: '#8B4513', scale: 1.5, noShadow: true },
    "Решение": { src: treasure, color: '#FFD700', scale: 1.5, noShadow: true }
  },
  code: {
    "Любопытство": { src: questionMark, isNeon: true },
    "Исследование": { src: squareBrackets, isNeon: true },
    "Решение": { src: exclamation, isNeon: true }
  },
  lotr: {
    "Любопытство": { src: ringOfPower, color: '#FFD700', isLarge: true }, 
    "Исследование": { src: fellowship, color: '#55FFFF', isHuge: true },
    "Решение": { 
      src: sauronEye, 
      color: '#FF4500', 
      effect: 'implode',
      isLarge: true 
    } 
  }
};

// --- КОМПОНЕНТ ОДНОГО СЛОВА ---
const SemanticWord = ({ 
  word, 
  baseColor, 
  activeScenario 
}: { 
  word: string, 
  baseColor: string, 
  activeScenario: ScenarioType 
}) => {
  // @ts-ignore
  const scenarioData = activeScenario ? SCENARIOS[activeScenario][word] : null;

  const isCodeTheme = activeScenario === 'code';
  const effectiveIconColor = isCodeTheme ? baseColor : scenarioData?.color;

  // --- АНИМАЦИИ ---
  const getIconAnimation = () => {
    if (!scenarioData) return {};

    // 1. САУРОН (Implode)
    if (scenarioData.effect === 'implode') {
      return {
        initial: { scale: 0, opacity: 0 },
        animate: { 
          scale: [0, 1.2, 1, 1.3, 0],
          opacity: [0, 1, 1, 1, 0], 
          rotate: [0, 0, -5, 5, 720], 
          filter: [
            "brightness(1)", 
            "brightness(1) drop-shadow(0 0 10px #FF4500)", 
            "brightness(2) drop-shadow(0 0 20px #FF0000)", 
            "brightness(5) drop-shadow(0 0 50px #FF0000) blur(2px)",
            "brightness(0)"
          ]
        },
        transition: { 
          duration: 3.5, 
          times: [0, 0.2, 0.5, 0.8, 1], 
          ease: "easeInOut" 
        }
      };
    }

    // 2. БРАТСТВО (Huge)
    if (scenarioData.isHuge) {
      return {
        initial: { opacity: 0, scale: 0.8, y: 10 },
        animate: { opacity: 1, scale: 1, y: 0 },
        exit: { opacity: 0, scale: 0.9 },
        transition: { duration: 0.8, ease: "easeOut" }
      };
    }

    // 3. СТАНДАРТ
    let filter = `drop-shadow(0 0 5px ${effectiveIconColor})`;
    if (scenarioData.noShadow) {
      filter = 'none';
    } else if (scenarioData.isNeon || isCodeTheme) {
       filter = `drop-shadow(0 0 8px ${effectiveIconColor}) brightness(1.3)`;
    }

    const animateState = { 
        opacity: 1, 
        scale: scenarioData.scale || 1, 
        rotate: 0,
        filter: isCodeTheme ? undefined : filter 
    };

    return {
      initial: { opacity: 0, scale: 0, rotate: -45 },
      animate: animateState,
      exit: { opacity: 0, scale: 0, filter: "blur(10px)" },
      transition: { type: "spring", stiffness: 200, damping: 15 }
    };
  };

  const anim: any = getIconAnimation();

  // --- ПОДГОТОВКА СТИЛЕЙ И ПЕРЕХОДОВ (Fix error) ---
  
  // Для маски (тема Code) нам нужно объединить стандартный transition и анимацию цвета
  const maskTransition = {
    ...(anim.transition || {}),
    backgroundColor: { duration: 1.5 }
  };

  // Классы размеров
  let sizeClass = 'h-10 w-10 md:h-14 md:w-14';
  if (scenarioData?.isHuge) {
    sizeClass = 'h-40 md:h-64 w-auto min-w-[300px] -top-16 md:-top-24 z-50 pointer-events-none';
  } else if (scenarioData?.isLarge) {
    sizeClass = 'h-20 w-20 md:h-28 md:w-28 -top-6';
  }

  return (
    <span className="relative inline-flex items-center justify-center mx-3 md:mx-6 h-12 min-w-[140px] md:min-w-[180px]">
      <AnimatePresence mode="wait">
        
        {/* ТЕКСТ */}
        {!activeScenario && (
          <motion.span
            key="text"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, color: baseColor }}
            exit={{ opacity: 0, scale: 0.8, filter: "blur(4px)" }}
            transition={{ color: { duration: 1.5 }, default: { duration: 0.3 } }}
            className="cursor-default whitespace-nowrap text-sm md:text-base font-sans font-medium uppercase tracking-wide"
          >
            {word}
          </motion.span>
        )}

        {/* ИКОНКА */}
        {activeScenario && scenarioData && (
          isCodeTheme ? (
            // МАСКА (Clean Transition)
            <motion.div
              key={`icon-mask-${activeScenario}`}
              initial={anim.initial}
              animate={{ ...anim.animate, backgroundColor: baseColor }}
              exit={anim.exit}
              // Используем заранее подготовленную переменную, чтобы не было ошибки парсинга
              transition={maskTransition}
              style={{
                mask: `url("${scenarioData.src}") no-repeat center / contain`,
                WebkitMask: `url("${scenarioData.src}") no-repeat center / contain`,
                filter: `drop-shadow(0 0 5px ${baseColor}) brightness(1.2)` 
              }}
              className="absolute h-10 w-10 md:h-14 md:w-14"
            />
          ) : (
            // ОБЫЧНАЯ КАРТИНКА
            <motion.img
              key={`icon-img-${activeScenario}`}
              src={scenarioData.src}
              alt={word}
              initial={anim.initial}
              animate={anim.animate}
              exit={anim.exit}
              transition={anim.transition}
              className={`object-contain absolute ${sizeClass}`}
            />
          )
        )}

      </AnimatePresence>
    </span>
  );
};

export const SemanticTags = ({ theme }: { theme: any }) => {
  const [activeScenario, setActiveScenario] = useState<ScenarioType>(null);
  const words = ["Любопытство", "Исследование", "Решение"];

  useEffect(() => {
    const runScenarioLoop = () => {
      const delay = Math.random() * 6000 + 12000; 
      const timer = setTimeout(() => {
        const themes: ScenarioType[] = ['pirate', 'code', 'lotr'];
        const randomTheme = themes[Math.floor(Math.random() * themes.length)];
        setActiveScenario(randomTheme);
        setTimeout(() => {
          setActiveScenario(null);
          runScenarioLoop();
        }, 4000);
      }, delay);
      return timer;
    };
    const loopTimer = runScenarioLoop();
    return () => clearTimeout(loopTimer);
  }, []);

  return (
    <div className="flex flex-wrap justify-center items-center mt-8 md:mt-12 h-16 w-full relative z-30">
      {words.map((w) => (
        <div key={w} className="flex items-center justify-center relative">
          <SemanticWord word={w} baseColor={theme.subText} activeScenario={activeScenario} />
        </div>
      ))}
    </div>
  );
};