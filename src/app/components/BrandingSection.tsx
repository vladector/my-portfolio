import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from '../hooks/useInView';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

import museumLogo from '../../assets/museum/Museum_logo.svg';
import fettuciniLogo from '../../assets/fettucini/Fettucini_logo.svg';
import brusokLogo from '../../assets/brusok/2x/Brusok_logo.png';
import korgiLogo from '../../assets/korgi/Korgi_logo.svg';

import musP1 from '../../assets/museum/Pages/1x/Page_1.jpg';
import musP2 from '../../assets/museum/Pages/1x/Page_2.jpg';
import musP3 from '../../assets/museum/Pages/1x/Page_3.jpg';

import fetP1 from '../../assets/fettucini/Pages/1x/Page_1.jpg';
import fetP2 from '../../assets/fettucini/Pages/1x/Page_2.jpg';
import fetP3 from '../../assets/fettucini/Pages/1x/Page_3.jpg';

import bruP1 from '../../assets/brusok/Pages/1x/Page_1.jpg';
import bruP2 from '../../assets/brusok/Pages/1x/Page_2.jpg';
import bruP3 from '../../assets/brusok/Pages/1x/Page_3.jpg';

import korP1 from '../../assets/korgi/Pages/1x/Page_1.jpg';
import korP2 from '../../assets/korgi/Pages/1x/Page_2.jpg';
import korP3 from '../../assets/korgi/Pages/1x/Page_3.jpg';

const brandingProjects = [
  {
    id: 'museum',
    title: 'Мастерская Наперстка',
    description: 'Полная айдентика для музея виртуальной реальности. Логотип, навигация и digital-носители.',
    logo: museumLogo,
    gallery: [musP1, musP2, musP3],
    tags: ['выставка'],
    color: 'bg-indigo-50'
  },
  {
    id: 'fettuccini',
    title: 'Феттучини',
    description: 'Бренд-дизайн для итальянского ресторана свежей пасты: логотип, меню, упаковка.',
    logo: fettuciniLogo,
    gallery: [fetP1, fetP2, fetP3],
    tags: ['f&b'],
    color: 'bg-orange-50'
  },
  {
    id: 'brusok',
    title: 'Брусок',
    description: 'Корпоративный стиль для строительной компании. Акцент на натуральные материалы.',
    logo: brusokLogo,
    gallery: [bruP1, bruP2, bruP3],
    tags: ['строительство'],
    color: 'bg-white border border-zinc-100'
  },
  {
    id: 'corgi',
    title: 'Корги Место',
    description: 'Игривая бренд-система для фестиваля домашних животных: мерч, сайт, навигация.',
    logo: korgiLogo,
    gallery: [korP1, korP2, korP3],
    tags: ['ивент'],
    color: 'bg-green-50'
  }
];

const TAG_STYLE = "text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full border border-black/10 bg-white/60 backdrop-blur-md text-black/70";

export function BrandingSection() {
  const [ref, isInView] = useInView({ threshold: 0.1 });
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [activeSlide, setActiveSlide] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);
  const isLocked = useRef(false);

  const currentProject = brandingProjects.find(p => p.id === selectedId);

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
    <section id="branding" className="py-32 px-6 bg-zinc-50 border-t border-zinc-200" ref={ref}>
      <div className="max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          
          <div className="lg:col-span-4 lg:sticky lg:top-32 lg:order-last">
            <motion.div initial={{ opacity: 0, x: 20 }} animate={isInView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.6 }}>
              <h2 className="text-5xl md:text-7xl font-bold mb-6 text-zinc-900 leading-tight tracking-tighter">Брендинг</h2>
              <p className="text-xl text-zinc-500 max-w-md leading-relaxed">
                Комплексные визуальные системы, которые рассказывают истории брендов и создают правильное впечатление.
              </p>
            </motion.div>
          </div>

          <div className="lg:col-span-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {brandingProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  layoutId={`card-container-${project.id}`}
                  onClick={() => { setSelectedId(project.id); setActiveSlide(0); }}
                  initial={{ opacity: 0, y: 50 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: index * 0.15 }}
                  className="group cursor-pointer flex flex-col h-full"
                >
                  <motion.div
                    className={`rounded-[40px] flex items-center justify-center relative aspect-[4/3] shadow-sm group-hover:shadow-2xl transition-all duration-500 ${project.color}`}
                    whileHover={{ y: -8 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                  >
                    <motion.img layoutId={`logo-${project.id}`} src={project.logo} alt={`${project.title} logo`} className="w-4/5 h-4/5 object-contain transition-transform duration-700 group-hover:scale-110" />
                    <div className="absolute bottom-6 left-6 flex flex-wrap gap-2 z-10">
                      {project.tags.map((tag, i) => <span key={i} className={TAG_STYLE}>{tag}</span>)}
                    </div>
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        <AnimatePresence>
          {selectedId && currentProject && (
            <div className="fixed inset-0 z-[300] flex items-center justify-center p-0 md:p-12">
              <motion.div 
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }} 
                exit={{ opacity: 0 }} 
                onClick={() => setSelectedId(null)} 
                className="absolute inset-0 bg-black/60 backdrop-blur-xl" 
              />
              
              <motion.div 
                layoutId={`card-container-${selectedId}`} 
                // --- ВОТ ЭТИ ПАРАМЕТРЫ МЫ ДОБАВИЛИ ДЛЯ СВАЙПА ---
                drag="y"
                dragConstraints={{ top: 0, bottom: 0 }}
                dragElastic={0.7}
                onDragEnd={(_, info) => {
                  if (Math.abs(info.offset.y) > 150) {
                    setSelectedId(null);
                  }
                }}
                // ---------------------------------------------
                className={`relative w-full h-full md:w-[90vw] md:h-[85vh] md:rounded-[56px] overflow-hidden shadow-2xl flex flex-col md:block z-[310] ${currentProject.color}`}
              >
                <motion.img layoutId={`logo-${selectedId}`} src={currentProject.logo} className="absolute inset-0 m-auto w-1/2 h-1/2 object-contain opacity-5 pointer-events-none" />
                
                <div ref={scrollRef} className="absolute inset-0 flex overflow-x-auto snap-x snap-mandatory hide-scrollbar scroll-smooth z-0">
                  {currentProject.gallery.map((img, index) => (
                    <div key={index} className="min-w-full h-full flex items-start md:items-center justify-center snap-center shrink-0 p-4 pt-20 md:p-16">
                      <div className="relative w-auto h-auto max-w-full max-h-[55vh] md:max-h-full overflow-hidden shadow-2xl border border-black/5 rounded-[16px] md:rounded-[24px]">
                        <motion.img 
                          initial={{ opacity: 0, scale: 0.95 }} 
                          animate={{ opacity: 1, scale: 1 }} 
                          transition={{ delay: 0.2, duration: 0.5 }} 
                          src={img} 
                          className="block max-w-full max-h-[55vh] md:max-h-[75vh] object-contain" 
                        />
                      </div>
                    </div>
                  ))}
                </div>

                <motion.div 
                  initial={{ y: 50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  className="absolute bottom-0 left-0 right-0 md:bottom-12 md:left-12 md:right-auto md:w-[450px] p-8 md:p-10 rounded-t-[40px] md:rounded-[48px] shadow-2xl z-[120] border-t md:border border-white/40 backdrop-blur-3xl bg-white/90"
                >
                  <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
                    <div className="flex gap-2 mb-4 flex-wrap">
                      {currentProject.tags.map(t => <span key={t} className={TAG_STYLE}>{t}</span>)}
                    </div>
                    <h3 className="text-3xl md:text-4xl font-black text-zinc-900 mb-2 md:mb-4 leading-tight drop-shadow-sm">{currentProject.title}</h3>
                    <p className="text-zinc-600 text-sm md:text-base mb-6 leading-relaxed line-clamp-3 md:line-clamp-none">{currentProject.description}</p>
                    <div className="flex gap-2">
                      {currentProject.gallery.length > 1 && currentProject.gallery.map((_, i) => (
                        <div key={i} className={`h-1.5 rounded-full transition-all duration-300 ${i === activeSlide ? 'bg-zinc-900 w-10' : 'bg-zinc-300 w-2'}`} />
                      ))}
                    </div>
                  </motion.div>
                </motion.div>

                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} className="absolute top-6 right-6 md:top-10 md:right-10 flex gap-4 z-[140]">
                  {currentProject.gallery.length > 1 && (
                    <div className="hidden md:flex gap-3">
                      <button onClick={(e) => { e.stopPropagation(); goToSlide(activeSlide - 1); }} className="p-4 bg-black/10 hover:bg-black/20 backdrop-blur-xl rounded-full text-black transition-colors"><ChevronLeft size={28} /></button>
                      <button onClick={(e) => { e.stopPropagation(); goToSlide(activeSlide + 1); }} className="p-4 bg-black/10 hover:bg-black/20 backdrop-blur-xl rounded-full text-black transition-colors"><ChevronRight size={28} /></button>
                    </div>
                  )}
                  <button onClick={() => setSelectedId(null)} className="p-3 md:p-4 bg-black/10 hover:bg-black/20 backdrop-blur-xl rounded-full text-black transition-colors">
                    <X size={24} className="md:w-7 md:h-7" />
                  </button>
                </motion.div>

              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}