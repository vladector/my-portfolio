import { motion } from 'motion/react';
import { useInView } from '../hooks/useInView';
import { Mail, Linkedin, Github, Dribbble } from 'lucide-react';

export function ContactSection() {
  const [ref, isInView] = useInView({ threshold: 0.3 });

  const socialLinks = [
    { icon: Mail, label: 'Email', href: 'mailto:hello@designer.com' },
    { icon: Linkedin, label: 'LinkedIn', href: '#' },
    { icon: Github, label: 'GitHub', href: '#' },
    { icon: Dribbble, label: 'Dribbble', href: '#' }
  ];

  return (
    <section id="contact" className="py-32 px-6 bg-gray-900 text-white" ref={ref}>
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-5xl md:text-6xl mb-6 font-bold">Связаться со мной</h2>
          <p className="text-xl text-gray-400 mb-12 max-w-2xl mx-auto">
            Заинтересованы в сотрудничестве или есть проект на уме? Буду рад обсудить детали.
          </p>

          <motion.div
            className="flex justify-center gap-6 mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {socialLinks.map((link, index) => (
              <motion.a
                key={index}
                href={link.href}
                className="w-14 h-14 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
                whileHover={{ scale: 1.1, y: -4 }}
                whileTap={{ scale: 0.95 }}
                aria-label={link.label}
              >
                <link.icon className="w-5 h-5" />
              </motion.a>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-sm text-gray-500"
          >
            <p>© 2026 Vlad Kataev. Все права защищены.</p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}