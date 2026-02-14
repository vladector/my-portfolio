import { motion } from 'framer-motion';
import { useInView } from '../hooks/useInView';
import { ArrowUpRight } from 'lucide-react';

const brandingProjects = [
  {
    title: 'University Museum',
    description: 'Полная айдентика для музея виртуальной реальности. Логотип, навигация и digital-носители.',
    image: 'https://placehold.co/600x400/indigo/white?text=VR+Museum', 
    tags: ['Брендинг', 'Айдентика', 'VR'],
    color: 'bg-indigo-50'
  },
  {
    title: 'Fettuccini',
    description: 'Бренд-дизайн для итальянского ресторана свежей пасты: логотип, меню, упаковка.',
    image: 'https://placehold.co/600x400/orange/white?text=Fettuccini', 
    tags: ['Брендинг', 'F&B', 'Упаковка'],
    color: 'bg-orange-50'
  },
  {
    title: 'Brusok',
    description: 'Корпоративный стиль для строительной компании. Акцент на натуральные материалы.',
    image: 'https://placehold.co/600x400/red/white?text=Brusok',
    tags: ['Брендинг', 'Строительство'],
    color: 'bg-red-50'
  },
  {
    title: 'Corgi Festival',
    description: 'Игривая бренд-система для фестиваля домашних животных: мерч, сайт, навигация.',
    image: 'https://placehold.co/600x400/green/white?text=Corgi+Fest',
    tags: ['Брендинг', 'Ивент', 'Иллюстрация'],
    color: 'bg-green-50'
  }
];

// ЕДИНЫЙ СТИЛЬ ТЕГА
const TAG_STYLE = "text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full border border-black/10 bg-white/60 backdrop-blur-md text-black/70";

export function BrandingSection() {
  const [ref, isInView] = useInView({ threshold: 0.1 });

  return (
    <section id="branding" className="py-32 px-6 bg-zinc-50 border-t border-zinc-200" ref={ref}>
      <div className="max-w-[1400px] mx-auto">
        
        {/* ГЛАВНАЯ СЕТКА: 12 колонок */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          
          {/* 1. ЗАГОЛОВОК (Справа на десктопе, Сверху на мобильном) */}
          {/* lg:order-last — перекидывает блок в конец (направо) только на больших экранах */}
          <div className="lg:col-span-4 lg:sticky lg:top-32 lg:order-last">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-5xl md:text-7xl font-bold mb-6 text-zinc-900 leading-tight tracking-tighter">Брендинг</h2>
              <p className="text-xl text-zinc-500 max-w-md leading-relaxed">
                Комплексные визуальные системы, которые рассказывают истории брендов и создают правильное впечатление.
              </p>
            </motion.div>
          </div>

          {/* 2. КАРТОЧКИ (Слева на десктопе) */}
          <div className="lg:col-span-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {brandingProjects.map((project, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: index * 0.15 }}
                  className="group cursor-pointer flex flex-col h-full"
                >
                  {/* КАРТИНКА */}
                  <motion.div
                    className={`rounded-[40px] overflow-hidden mb-6 relative aspect-[4/3] shadow-sm group-hover:shadow-2xl transition-all duration-500`}
                    whileHover={{ y: -8 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                  >
                    <img 
                      src={project.image} 
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute top-6 right-6 w-12 h-12 bg-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 shadow-lg">
                      <ArrowUpRight className="w-5 h-5 text-black" />
                    </div>
                  </motion.div>
                  
                  {/* ОПИСАНИЕ */}
                  <div className="px-2 flex-grow flex flex-col">
                    <div className="flex flex-wrap gap-2 mb-4">
                        {project.tags.map((tag, i) => (
                          <span key={i} className={TAG_STYLE}>{tag}</span>
                        ))}
                    </div>
                    
                    <h3 className="text-2xl font-black mb-3 text-zinc-900 leading-tight group-hover:text-blue-600 transition-colors">
                      {project.title}
                    </h3>
                    
                    <p className="text-base font-medium text-zinc-500 leading-relaxed">
                      {project.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}