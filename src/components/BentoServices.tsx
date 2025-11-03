import { motion } from 'framer-motion';
import { BentoGrid, BentoItem } from './BentoGrid';

interface Service {
  icon: string;
  title: string;
  description: string;
  gradient: string;
}

const services: Service[] = [
  {
    icon: '🎨',
    title: 'UI/UX Design',
    description: 'Creating beautiful and intuitive interfaces',
    gradient: 'from-blue-500 to-blue-700',
  },
  {
    icon: '⚡',
    title: 'Product Strategy',
    description: 'Aligning design with business goals',
    gradient: 'from-purple-500 to-purple-700',
  },
  {
    icon: '🎬',
    title: 'Interaction Design',
    description: 'Designing meaningful micro-interactions',
    gradient: 'from-pink-500 to-pink-700',
  },
  {
    icon: '📱',
    title: 'Mobile Design',
    description: 'Native and responsive mobile experiences',
    gradient: 'from-green-500 to-green-700',
  },
  {
    icon: '🔧',
    title: 'Design Systems',
    description: 'Building scalable design systems',
    gradient: 'from-orange-500 to-orange-700',
  },
  {
    icon: '🎯',
    title: 'User Research',
    description: 'Understanding user needs and behaviors',
    gradient: 'from-cyan-500 to-cyan-700',
  },
];

export const BentoServices = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' },
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-100px' }}
      className="w-full"
    >
      <div className="mb-12">
        <h2 className="text-4xl font-bold text-gray-900 mb-2">Services</h2>
        <p className="text-gray-600">What I can help you with</p>
      </div>

      <BentoGrid cols={3}>
        {services.map((service, index) => (
          <motion.div key={index} variants={itemVariants}>
            <BentoItem
              colSpan={1}
              variant="default"
              className={`bg-gradient-to-br ${service.gradient} text-white p-8 flex flex-col justify-between group cursor-pointer hover:shadow-xl`}
            >
              <div>
                <div className="text-5xl mb-4 transform group-hover:scale-110 transition-transform duration-300">
                  {service.icon}
                </div>
                <h3 className="font-bold text-xl mb-2">{service.title}</h3>
                <p className="opacity-90">{service.description}</p>
              </div>
              <div className="mt-6 pt-4 border-t border-white/20">
                <button className="text-sm font-semibold opacity-80 hover:opacity-100 transition-opacity">
                  Learn more →
                </button>
              </div>
            </BentoItem>
          </motion.div>
        ))}
      </BentoGrid>
    </motion.div>
  );
};
