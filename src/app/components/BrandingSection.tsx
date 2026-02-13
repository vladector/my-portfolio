import { motion } from 'motion/react';
import { useInView } from '../hooks/useInView';

const brandingProjects = [
  {
    title: 'University Virtual Museum',
    description: 'Полная айдентика для музея виртуальной реальности, демонстрирующего цифровые выставки и интерактивный образовательный опыт.',
    image: 'https://placehold.co/600x400?text=University+Museum', 
    tags: ['Брендинг', 'Айдентика', 'VR', 'Образование'],
    color: 'bg-amber-50'
  },
  {
    title: 'Fettuccini Restaurant',
    description: 'Бренд-дизайн для итальянского ресторана свежей пасты: логотип, дизайн меню и упаковка.',
    image: 'https://placehold.co/600x400?text=Fettuccini', 
    tags: ['Брендинг', 'F&B', 'Упаковка', 'Айдентика'],
    color: 'bg-yellow-50'
  },
  {
    title: 'Brusok Construction',
    description: 'Корпоративный стиль для компании по строительству домов из бруса. Акцент на мастерство и натуральные материалы.',
    image: 'https://placehold.co/600x400?text=Brusok',
    tags: ['Брендинг', 'Строительство', 'Корпоративный стиль'],
    color: 'bg-red-50'
  },
  {
    title: 'Corgi Festival',
    description: 'Игривая и целостная бренд-система для фестиваля домашних животных, включая навигацию, мерч и digital-носители.',
    image: 'https://placehold.co/600x400?text=Corgi+Festival',
    tags: ['Брендинг', 'Ивент', 'Иллюстрация'],
    color: 'bg-green-50'
  }
];

export function BrandingSection() {
  const [ref, isInView] = useInView({ threshold: 0.1 });

  return (
    <section id="branding" className="py-24 px-6 bg-gray-50" ref={ref}>
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <h2 className="text-5xl md:text-6xl mb-6 font-bold">Branding Projects</h2>
          <p className="text-xl text-gray-600 max-w-3xl">
            Комплексная айдентика, которая рассказывает истории и создает правильное впечатление.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {brandingProjects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.15 }}
            >
              <motion.div
                className="bg-white rounded-2xl overflow-hidden shadow-lg h-full flex flex-col"
                whileHover={{ y: -8 }}
                transition={{ duration: 0.3 }}
              >
                <div className={`p-4 ${project.color}`}>
                  <div className="rounded-xl overflow-hidden shadow-md">
                    <img 
                      src={project.image} 
                      alt={project.title}
                      className="w-full h-auto"
                    />
                  </div>
                </div>
                
                <div className="p-8 flex-grow flex flex-col">
                  <h3 className="text-2xl mb-3 font-bold">{project.title}</h3>
                  <p className="text-gray-600 mb-6 flex-grow">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag, tagIndex) => (
                      <span
                        key={tagIndex}
                        className="text-xs px-3 py-1.5 bg-gray-100 rounded-full text-gray-700"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}