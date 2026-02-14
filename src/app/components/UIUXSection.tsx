import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ArrowUpRight, ChevronLeft, ChevronRight } from 'lucide-react';

// --- 1. ИМПОРТЫ АССЕТОВ ---
import fbOverview from '../../assets/findbook/1.png'; 
import fbHome from '../../assets/findbook/2.jpg';     
import fbProduct from '../../assets/findbook/3.jpg'; 
import fbMenu from '../../assets/findbook/4.jpg';     

import runClean from '../../assets/runtracker/1.png'; 
import runContext from '../../assets/runtracker/2.jpg'; 

import taxi1 from '../../assets/taxi/1.png';
import taxi2 from '../../assets/taxi/2.jpg';

import weather1 from '../../assets/weather/1.png';
import weather2 from '../../assets/weather/2.jpg';

import burboroOverview from '../../assets/burboro/1.png'; 
import burboroHero from '../../assets/burboro/2.jpg';     

const projects = [
  {
    id: 'findbook',
    title: 'FindBook',
    shortDescription: 'Маркетплейс для поиска книг.',
    description: 'Концепт книжного маркетплейса, решающий проблему выбора через визуальные ассоциации. Эстетичная витрина вместо скучных списков.',
    previewImage: fbProduct,
    gallery: [fbProduct, fbHome, fbOverview, fbMenu],
    tags: ['E-Commerce', 'Immersive UI'],
    gridClass: 'lg:col-span-2 lg:row-span-2',
    bgClass: 'bg-[#f13c33]', 
    imgPosition: 'object-center'
  },
  {
    id: 'runtracker',
    title: 'Runtracker',
    shortDescription: 'Фитнес-трекер с данными.',
    description: 'Приложение для бегунов. Сложные метрики превращены в понятные инфографические виджеты.',
    previewImage: runContext,
    gallery: [runClean],
    // Обновленные теги: добавили Mobile UI и Data Viz
    tags: ['Utility Tool', 'Mobile UI', 'Data Viz'],
    gridClass: 'lg:col-span-1 lg:row-span-1',
    bgClass: 'bg-[#ffa809]', 
    imgPosition: 'object-center' 
  },
  {
    id: 'weather',
    title: 'Weather App',
    shortDescription: 'Погодная утилита.',
    description: 'Интерфейс мимикрирует под состояние окружающей среды.',
    previewImage: weather1,
    // Обновленная галерея: убрали 1.png, оставили только 2.jpg
    gallery: [weather2],
    // Обновленные теги: добавили Mobile UI
    tags: ['Utility Tool', 'Data Viz', 'Mobile UI'],
    gridClass: 'lg:col-span-1 lg:row-span-2',
    bgClass: 'bg-gradient-to-br from-[#fe94a8] to-[#1c4fc5]', 
    imgPosition: 'object-top'
  },
  {
    id: 'taxi',
    title: 'Taxi Service',
    shortDescription: 'Сервис мобильности.',
    description: 'Редизайн процесса вызова такси. Сокращение кликов до минимума.',
    previewImage: taxi1,
    gallery: [taxi2],
    tags: ['Mobile UI'],
    gridClass: 'lg:col-span-2 lg:row-span-1',
    bgClass: 'bg-blue-600', 
    imgPosition: 'object-center'
  },
  {
    id: 'burboro',
    title: "Burboro's Stuff",
    shortDescription: 'Магазин скульптур.',
    description: 'E-commerce платформа для скульптора Burboro. Передача тактильности материала.',
    previewImage: burboroOverview,
    gallery: [burboroHero],
    tags: ['E-Commerce'],
    gridClass: 'lg:col-span-3 lg:row-span-1',
    bgClass: 'bg-stone-800', 
    imgPosition: 'object-top'
  }
];

export function UIUXSection() {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [activeSlide, setActiveSlide] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);
  const isLocked = useRef(false);

  useEffect(() => {
    const style = document.createElement('style');
    style.innerHTML = `
      .hide-scrollbar::-webkit-scrollbar { display: none; }
      .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      body.modal-open { overflow: hidden !important; }
    `;
    document.head.appendChild(style);
    return () => { document.head.removeChild(style); };
  }, []);

  const currentProject = projects.find(p => p.id === selectedId);

  const goToSlide = (index: number) => {
    if (!scrollRef.current || !currentProject || isLocked.current) return;
    const targetIndex = Math.max(0, Math.min(index, currentProject.gallery.length - 1));
    if (targetIndex === activeSlide && index !== activeSlide) return;

    isLocked.current = true;
    const width = scrollRef.current.offsetWidth;
    scrollRef.current.scrollTo({ left: targetIndex * width, behavior: 'smooth' });

    setTimeout(() => {
      isLocked.current = false;
      setActiveSlide(targetIndex);
    }, 550);
  };

  useEffect(() => {
    if (!selectedId) {
        document.body.classList.remove('modal-open');
        return;
    }
    document.body.classList.add('modal-open');

    const handleGlobalWheel = (e: WheelEvent) => {
      e.preventDefault();
      if (isLocked.current) return;
      if (e.deltaY > 20 || e.deltaX > 20) goToSlide(activeSlide + 1);
      else if (e.deltaY < -20 || e.deltaX < -20) goToSlide(activeSlide - 1);
    };

    const handleGlobalKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') goToSlide(activeSlide + 1);
      else if (e.key === 'ArrowLeft') goToSlide(activeSlide - 1);
      else if (e.key === 'Escape') setSelectedId(null);
    };

    window.addEventListener('wheel', handleGlobalWheel, { passive: false });
    window.addEventListener('keydown', handleGlobalKey);

    return () => {
      window.removeEventListener('wheel', handleGlobalWheel);
      window.removeEventListener('keydown', handleGlobalKey);
    };
  }, [selectedId, activeSlide]);

  return (
    <section id="uiux" className="py-32 px-6 bg-white">
      <div className="max-w-[1400px] mx-auto">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start mb-24">
          <div className="lg:col-span-4 lg:sticky lg:top-32">
            <h2 className="text-5xl md:text-7xl font-bold mb-6 text-gray-900 leading-tight tracking-tighter">UI/UX Проекты</h2>
            <p className="text-xl text-gray-500 max-w-md leading-relaxed">
                Коммерческие интерфейсы и концепты, сделанные с душой.
            </p>
          </div>

          <div className="lg:col-span-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 auto-rows-[320px] gap-8">
              {projects.map((p) => (
                <motion.div
                  key={p.id}
                  layoutId={`card-${p.id}`}
                  onClick={() => { setSelectedId(p.id); setActiveSlide(0); }}
                  className={`group cursor-pointer rounded-[40px] overflow-hidden shadow-sm hover:shadow-2xl flex flex-col bg-gray-50 border border-gray-100 relative ${p.gridClass}`}
                >
                  <motion.div layoutId={`info-bg-${p.id}`} className={`p-6 relative z-10 ${p.bgClass}`}>
                    <motion.div layoutId={`tags-${p.id}`} className="flex flex-wrap gap-2 mb-3">
                       {p.tags.map(t => <span key={t} className="text-[9px] uppercase font-black tracking-widest bg-white/20 backdrop-blur-md px-2 py-0.5 rounded text-white border border-white/10">{t}</span>)}
                    </motion.div>
                    <motion.h3 layoutId={`title-${p.id}`} className="text-xl font-bold text-white mb-1 leading-tight">{p.title}</motion.h3>
                    <motion.p layoutId={`desc-${p.id}`} className="text-white/70 text-[10px] line-clamp-1">{p.shortDescription}</motion.p>
                  </motion.div>
                  
                  <div className="relative flex-grow overflow-hidden bg-white">
                    <motion.img layoutId={`img-${p.id}`} src={p.previewImage} className={`w-full h-full object-cover ${p.imgPosition}`} />
                    <div className="absolute top-4 right-4 w-10 h-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <ArrowUpRight className="text-white w-5 h-5" />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        <AnimatePresence>
          {selectedId && currentProject && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-0 md:p-12">
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSelectedId(null)} className="absolute inset-0 bg-black/40 backdrop-blur-2xl" />

              <motion.div 
                layoutId={`card-${selectedId}`} 
                className={`relative w-full h-full md:w-[90vw] md:h-[85vh] md:rounded-[56px] overflow-hidden shadow-2xl ${currentProject.bgClass}`}
              >
                
                <div ref={scrollRef} className="absolute inset-0 flex overflow-x-auto snap-x snap-mandatory hide-scrollbar scroll-smooth z-0">
                  {currentProject.gallery.map((img, index) => (
                    <div key={index} className="min-w-full h-full flex items-center justify-center snap-center shrink-0 p-4 md:p-16">
                      
                      <div className="relative w-auto h-auto max-w-full max-h-full rounded-[32px] md:rounded-[48px] overflow-hidden shadow-2xl border border-white/10 bg-black/10">
                        <motion.img 
                          layoutId={index === 0 ? `img-${selectedId}` : undefined}
                          src={img} 
                          className="block max-w-full max-h-[70vh] object-contain" 
                        />
                      </div>

                    </div>
                  ))}
                </div>

                <motion.div layoutId={`info-bg-${selectedId}`} className={`absolute bottom-12 left-6 right-6 md:left-12 md:right-auto md:w-[450px] p-10 rounded-[48px] shadow-2xl z-[120] border border-white/20 backdrop-blur-3xl bg-black/30`}>
                   <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
                     <motion.div layoutId={`tags-${selectedId}`} className="flex gap-2 mb-4 flex-wrap">
                        {currentProject.tags.map(t => <span key={t} className="text-[10px] font-black uppercase tracking-widest text-white/60 border border-white/10 px-3 py-1 rounded-full">{t}</span>)}
                     </motion.div>
                     <motion.h3 layoutId={`title-${selectedId}`} className="text-4xl font-black text-white mb-4 leading-tight drop-shadow-lg">{currentProject.title}</motion.h3>
                     <motion.p layoutId={`desc-${selectedId}`} className="text-white/90 text-sm md:text-base mb-6 leading-relaxed drop-shadow-md">{currentProject.description}</motion.p>
                     
                     <div className="flex gap-2">
                       {currentProject.gallery.length > 1 && currentProject.gallery.map((_, i) => (
                          <div key={i} className={`h-1.5 rounded-full transition-all duration-300 ${i === activeSlide ? 'bg-white w-10 shadow-[0_0_10px_white]' : 'bg-white/20 w-2'}`} />
                       ))}
                     </div>
                   </motion.div>
                </motion.div>

                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} className="absolute top-10 right-10 flex gap-4 z-[140]">
                  {currentProject.gallery.length > 1 && (
                    <div className="hidden md:flex gap-3">
                       <button onClick={(e) => { e.stopPropagation(); goToSlide(activeSlide - 1); }} className="p-4 bg-white/10 hover:bg-white/20 backdrop-blur-xl rounded-full text-white border border-white/10"><ChevronLeft size={28} /></button>
                       <button onClick={(e) => { e.stopPropagation(); goToSlide(activeSlide + 1); }} className="p-4 bg-white/10 hover:bg-white/20 backdrop-blur-xl rounded-full text-white border border-white/10"><ChevronRight size={28} /></button>
                    </div>
                  )}
                  <button onClick={() => setSelectedId(null)} className="p-4 bg-white/10 hover:bg-white/20 backdrop-blur-xl rounded-full text-white border border-white/10"><X size={28} /></button>
                </motion.div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}