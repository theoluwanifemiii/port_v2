import { motion } from 'framer-motion';
import { BentoGrid, BentoItem } from './BentoGrid';
import { ArrowRight, Github, Linkedin, Twitter, Mail } from 'lucide-react';

export const BentoHero = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
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
      animate="visible"
      className="w-full"
    >
      <BentoGrid cols={3}>
        <motion.div variants={itemVariants} className="col-span-2">
          <BentoItem colSpan={2} rowSpan={1} variant="gradient" className="p-8 md:p-12 flex flex-col justify-center min-h-64">
            <div>
              <motion.h1
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="text-4xl md:text-5xl font-bold mb-4"
              >
                Hi, I'm Olu
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
                className="text-lg md:text-xl opacity-90 mb-6"
              >
                Product Designer crafting delightful digital experiences
              </motion.p>
              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.6 }}
                whileHover={{ x: 5 }}
                className="inline-flex items-center gap-2 bg-white text-gray-900 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
              >
                View Work <ArrowRight size={20} />
              </motion.button>
            </div>
          </BentoItem>
        </motion.div>

        <motion.div variants={itemVariants}>
          <BentoItem colSpan={1} rowSpan={2} variant="dark" className="p-8 flex flex-col justify-between min-h-64">
            <div>
              <p className="text-sm opacity-70 mb-2">Quick Links</p>
              <div className="space-y-3">
                <a href="#" className="block text-white hover:text-cyan-400 transition-colors font-medium">
                  Portfolio
                </a>
                <a href="#" className="block text-white hover:text-cyan-400 transition-colors font-medium">
                  About
                </a>
                <a href="#" className="block text-white hover:text-cyan-400 transition-colors font-medium">
                  Contact
                </a>
              </div>
            </div>
            <div className="flex gap-3 pt-4 border-t border-gray-700">
              <a href="#" className="p-2 hover:bg-gray-800 rounded-lg transition-colors">
                <Github size={20} />
              </a>
              <a href="#" className="p-2 hover:bg-gray-800 rounded-lg transition-colors">
                <Linkedin size={20} />
              </a>
              <a href="#" className="p-2 hover:bg-gray-800 rounded-lg transition-colors">
                <Twitter size={20} />
              </a>
            </div>
          </BentoItem>
        </motion.div>

        <motion.div variants={itemVariants}>
          <BentoItem colSpan={1} variant="accent" className="p-6 flex flex-col items-center justify-center text-center">
            <div className="text-5xl mb-3">✨</div>
            <h3 className="font-semibold text-gray-900 mb-1">5+ Years</h3>
            <p className="text-sm text-gray-600">Experience in Design</p>
          </BentoItem>
        </motion.div>

        <motion.div variants={itemVariants}>
          <BentoItem colSpan={1} variant="accent" className="p-6 flex flex-col items-center justify-center text-center">
            <div className="text-5xl mb-3">🎨</div>
            <h3 className="font-semibold text-gray-900 mb-1">20+</h3>
            <p className="text-sm text-gray-600">Projects Completed</p>
          </BentoItem>
        </motion.div>
      </BentoGrid>
    </motion.div>
  );
};
