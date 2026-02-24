import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from '../hooks/useInView';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

// --- ИМПОРТЫ ---
import heroImg from '../../assets/Interiors/interior_16.jpg';
import int12 from '../../assets/Interiors/interior_12.jpg';
import int15 from '../../assets/Interiors/interior_15.jpg';
import int18 from '../../assets/Interiors/interior_18.jpg';
import int20 from '../../assets/Interiors/interior_20.jpg';
import int22 from '../../assets/Interiors/interior_22.jpg';
import int28 from '../../assets/Interiors/interior_28.jpg';
import int30 from '../../assets/Interiors/interior_30.jpg';
import int33 from '../../assets/Interiors/interior_33.jpg';
import int7 from '../../assets/Interiors/interior_7.jpg'; 
import int35 from '../../assets/Interiors/interior_35.jpg';

const allGalleryImages = [
  heroImg, int30, int12, int22, int15, int7, int28, int33, int20, int18, int35
];

const gridItems = [
  { img: int30, size: 'md:col-span-3 md:row-span-2' },
  { img: int12, size: 'md:col-span-3 md:row-span-1' },
  { img: int22, size: 'md:col-span-2 md:row-span-2' },
  { img: int15, size: 'md:col-span-4 md:row-span-2' },
  { img: int7,  size: 'md:col-span-2 md:row-span-1' },
  { img: int28, size: 'md:col-span-3 md:row-span-2' },
  { img: int33, size: 'md:col-span-3 md:row-span-1' },
  { img: int20, size: 'md:col-span-2 md:row-span-1' },
  { img: int18, size: 'md:col-span-4 md:row-span-2' },
  { img: int35, size: 'md:col-span-2 md:row-span-2' },
];

export function InteriorsSection() {
  const [ref, isInView] = useInView({ threshold: 0.05 });
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const isLocked = useRef(false);

  // Плавный переход
  const goToSlide = (index: number, behavior: ScrollBehavior = 'smooth') => {
    if (!scrollRef.current) return;
    const targetIndex = Math.max(0, Math.min(index, allGalleryImages.length - 1));
    isLocked.current = true;
    const width = scrollRef.current.offsetWidth;
    scrollRef.current.scrollTo({ left: targetIndex * width, behavior });

    if (behavior === 'smooth') {
      setTimeout(() => {
        isLocked.current = false;
        setActiveIndex(targetIndex);
      }, 500);
    } else {
      setActiveIndex(targetIndex);
      isLocked.current = false;
    }
  };

  // Мгновенный прыжок при открытии
  useEffect(() => {
    if (activeIndex !== null && scrollRef.current && !isLocked.current) {
      const width = scrollRef.current.offsetWidth;
      scrollRef.current.scrollTo({ left: activeIndex * width, behavior: 'auto' });
    }
  }, [activeIndex === null]);

  useEffect(() => {
    if (activeIndex === null) {
      document.body.style.overflow = 'unset';
      return;
    }
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') goToSlide(activeIndex + 1);
      if (e.key === 'ArrowLeft') goToSlide(activeIndex - 1);
      if (e.key === 'Escape') setActiveIndex(null);
    };

    const handleWheel = (e: WheelEvent) => {
      if (isLocked.current) return;
      if (e.deltaY > 30 || e.deltaX > 30) goToSlide(activeIndex + 1);
      else if (e.deltaY < -30 || e.deltaX < -30) goToSlide(activeIndex - 1);
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('wheel', handleWheel, { passive: false });
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('wheel', handleWheel);
    };
  }, [activeIndex]);

  return (
    <section id="interiors" className="py-32 px-4 md:px-6 bg-zinc-950 text-white" ref={ref}>
      <div className="max-w-[1500px] mx-auto">
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="mb-24 md:mb-32 text-center md:text-left"
        >
          <h2 className="text-5xl md:text-8xl font-black mb-8 leading-tight tracking-tighter">
            Атмосфера <br className="hidden md:block" />
            <span className="text-zinc-500">и детализация.</span>
          </h2>
          <p className="text-xl text-zinc-400 max-w-xl leading-relaxed mx-auto md:mx-0">
            Не просто расстановка мебели, а создание живого пространства. Работа со сложным светом, материалами и композицией кадра.
          </p>
        </motion.div>

        {/* HERO */}
        <motion.div
          layoutId="interiors-container-0"
          whileHover={{ y: -8 }}
          className="relative w-full aspect-[16/9] md:aspect-[21/9] rounded-[24px] md:rounded-[40px] overflow-hidden mb-3 cursor-pointer border border-white/5 shadow-2xl bg-zinc-900"
          onClick={() => setActiveIndex(0)}
        >
           <motion.img 
            layoutId="interiors-img-0"
            src={heroImg} 
            className="w-full h-full object-cover" 
           />
        </motion.div>

        {/* GRID */}
        <div className="grid grid-cols-1 md:grid-cols-6 gap-3 auto-rows-fr">
          {gridItems.map((item, index) => (
            <motion.div
              key={index}
              layoutId={`interiors-container-${index + 1}`}
              whileHover={{ y: -8 }}
              className={`${item.size} relative cursor-pointer overflow-hidden rounded-[20px] bg-zinc-900 border border-white/5 shadow-lg`}
              onClick={() => setActiveIndex(index + 1)}
            >
              <motion.img 
                layoutId={`interiors-img-${index + 1}`}
                src={item.img} 
                className="w-full h-full object-cover" 
                loading="lazy" 
              />
            </motion.div>
          ))}
        </div>

        {/* ГАЛЕРЕЯ */}
        <AnimatePresence mode="wait">
          {activeIndex !== null && (
            <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/98 backdrop-blur-3xl">
              <motion.div 
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }} 
                exit={{ opacity: 0 }} 
                className="absolute inset-0" 
                onClick={() => setActiveIndex(null)} 
              />
              
              <button 
                className="absolute top-8 right-8 p-4 text-white/50 hover:text-white z-[210]" 
                onClick={() => setActiveIndex(null)}
              >
                <X size={40} />
              </button>

              <div className="absolute inset-x-8 top-1/2 -translate-y-1/2 flex justify-between pointer-events-none z-[210] hidden md:flex">
                <button onClick={(e) => { e.stopPropagation(); goToSlide(activeIndex - 1); }} className="p-5 bg-white/5 hover:bg-white/10 rounded-full text-white pointer-events-auto backdrop-blur-xl border border-white/10">
                  <ChevronLeft size={32} />
                </button>
                <button onClick={(e) => { e.stopPropagation(); goToSlide(activeIndex + 1); }} className="p-5 bg-white/5 hover:bg-white/10 rounded-full text-white pointer-events-auto backdrop-blur-xl border border-white/10">
                  <ChevronRight size={32} />
                </button>
              </div>

              <div 
                ref={scrollRef} 
                className="flex w-full h-full overflow-x-auto snap-x snap-mandatory hide-scrollbar z-[205]"
              >
                {allGalleryImages.map((img, i) => (
                  <div key={i} className="min-w-full h-full flex items-center justify-center snap-center p-4 md:p-20">
                    <motion.div 
                      layoutId={i === activeIndex ? `interiors-container-${i}` : undefined}
                      className="relative max-w-full max-h-full flex items-center justify-center"
                      // --- ЛОГИКА СВАЙПА ---
                      drag={i === activeIndex ? "y" : false}
                      dragConstraints={{ top: 0, bottom: 0 }}
                      dragElastic={0.7}
                      onDragEnd={(_, info) => {
                        if (Math.abs(info.offset.y) > 150) {
                          setActiveIndex(null);
                        }
                      }}
                      // -------------------
                    >
                      <motion.img
                        layoutId={i === activeIndex ? `interiors-img-${i}` : undefined}
                        src={img}
                        className="max-w-full max-h-[85vh] object-contain rounded-xl shadow-2xl"
                        transition={{ type: "spring", damping: 30, stiffness: 300, mass: 0.8 }}
                      />
                    </motion.div>
                  </div>
                ))}
              </div>

              <div className="absolute bottom-10 flex gap-2 z-[210]">
                {allGalleryImages.map((_, i) => (
                  <div key={i} className={`h-1.5 rounded-full transition-all duration-300 ${i === activeIndex ? 'bg-white w-8' : 'bg-white/20 w-1.5'}`} />
                ))}
              </div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}