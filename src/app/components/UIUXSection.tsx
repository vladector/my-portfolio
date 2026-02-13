import { useState, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react';

const projects = [
  {
    id: 'findbook',
    title: 'FindBook',
    shortDescription: 'Изысканный способ поиска книг, когда друзья спрашивают «что почитать?».',
    description: 'Для случаев, когда друзья спрашивают «что почитать?», а вам нужен изысканный способ ответить «просто загугли».',
    image: 'https://placehold.co/800x600?text=FindBook',
    tags: ['Tablet UI', 'Mobile', 'Marketplace'],
    gridClass: 'lg:col-span-2 lg:row-span-2',
    bgClass: 'bg-[#f13c33]', 
    imgPosition: 'object-left-top'
  },
  {
    id: 'runtracker',
    title: 'Runtracker',
    shortDescription: 'Трекер бега. Потому что бегать и не хвастаться — зря тратить время.',
    description: 'Детальная аналитика темпа, пульса и маршрутов.',
    image: 'https://placehold.co/800x600?text=Runtracker',
    tags: ['Фитнес', 'Mobile', 'GPS'],
    gridClass: 'lg:col-span-1 lg:row-span-1',
    bgClass: 'bg-[#ffa809]', 
    imgPosition: 'object-center' 
  },
  {
    id: 'weather',
    title: 'Weather App',
    shortDescription: 'Сочные градиенты и ностальгия по эстетике интерфейсов 2016-го года.',
    description: 'Дань уважения эпохе, когда погода должна была выглядеть как конфета.',
    image: 'https://placehold.co/800x600?text=Weather',
    tags: ['Погода', 'Gradient', '2010s Vibe'],
    gridClass: 'lg:col-span-1 lg:row-span-2',
    bgClass: 'bg-gradient-to-r from-[#fe94a8] to-[#1c4fc5]', 
    imgPosition: 'object-top'
  },
  {
    id: 'taxi',
    title: 'Taxi Service',
    shortDescription: 'Сервис заказа такси с упором на кириллицу и понятную навигацию.',
    description: 'Интерфейс очищен от лишнего визуального шума.',
    image: 'https://placehold.co/800x600?text=Taxi',
    tags: ['Транспорт', 'Mobile'],
    gridClass: 'lg:col-span-2 lg:row-span-1',
    bgClass: 'bg-blue-600', 
    imgPosition: 'object-top'
  },
  {
    id: 'burboro',
    title: "Burboro's Stuff",
    shortDescription: 'E-commerce для коллекционеров редких фигурок и мерча.',
    description: 'Удобная фильтрация, детальные карточки товаров и dark-mode по умолчанию.',
    image: 'https://placehold.co/800x600?text=Burboro',
    tags: ['E-Commerce', 'Collectibles'],
    gridClass: 'lg:col-span-3 lg:row-span-1',
    bgClass: 'bg-stone-700', 
    imgPosition: 'object-top'
  }
];

export function UIUXSection() {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [fullScreenImage, setFullScreenImage] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const headerScale = useTransform(scrollYProgress, [0, 0.2], [1, 0.9]);
  const headerOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0.8]);

  return (
    <section id="uiux" ref={containerRef} className="py-24 px-4 bg-gradient-to-b from-white to-gray-200 min-h-screen"> 
      <div className="max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-4 lg:sticky lg:top-24 lg:h-fit mb-12 lg:mb-0">
            <motion.div style={{ scale: headerScale, opacity: headerOpacity, originX: 0 }}>
              <h2 className="text-5xl md:text-7xl font-bold mb-6 text-gray-900 leading-tight">UI/UX <br/> Projects</h2>
              <p className="text-xl text-gray-500 max-w-md leading-relaxed">Интерфейсы с душой.</p>
            </motion.div>
          </div>

          <div className="lg:col-span-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 auto-rows-[350px] gap-6">
              {projects.map((project) => (
                <motion.div
                  key={project.id}
                  layoutId={`card-${project.id}`}
                  onClick={() => setSelectedId(project.id)}
                  className={`group cursor-pointer rounded-[32px] overflow-hidden ${project.gridClass} ${project.bgClass} flex flex-col text-white relative`}
                >
                  <div className="p-8 z-20 relative">
                    <h3 className="text-2xl font-bold">{project.title}</h3>
                    <p className="text-white/90 text-sm">{project.shortDescription}</p>
                  </div>
                  <div className="absolute inset-0 z-0 overflow-hidden">
                    <motion.img src={project.image} className="w-full h-full object-cover" animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 10, repeat: Infinity }} />
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