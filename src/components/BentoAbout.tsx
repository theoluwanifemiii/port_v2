import { motion } from 'framer-motion';
import { BentoGrid, BentoItem } from './BentoGrid';

export const BentoAbout = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
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

  const skills = ['UI Design', 'UX Design', 'Figma', 'Prototyping', 'Web Design', 'Design Systems'];

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-100px' }}
      className="w-full"
    >
      <div className="mb-12">
        <h2 className="text-4xl font-bold text-gray-900 mb-2">About Me</h2>
        <p className="text-gray-600">Get to know me better</p>
      </div>

      <BentoGrid cols={3}>
        <motion.div variants={itemVariants} className="col-span-2">
          <BentoItem colSpan={2} variant="default" className="p-8 md:p-12">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">I'm Olu, a Product Designer</h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              With over 5 years of experience, I'm passionate about creating intuitive and beautiful digital experiences.
              I specialize in end-to-end product design, from research and strategy to implementation and measurement.
            </p>
            <p className="text-gray-700 leading-relaxed">
              I love working with teams that value user-centered design and are committed to building products that make
              a real difference in people's lives. When I'm not designing, you can find me exploring new design trends,
              contributing to the design community, or enjoying outdoor activities.
            </p>
          </BentoItem>
        </motion.div>

        <motion.div variants={itemVariants}>
          <BentoItem colSpan={1} variant="accent" className="p-8 flex flex-col justify-center">
            <p className="text-sm font-semibold text-gray-700 mb-3 uppercase tracking-wide">Based in</p>
            <p className="text-2xl font-bold text-gray-900">Lagos, Nigeria 🌍</p>
          </BentoItem>
        </motion.div>

        <motion.div variants={itemVariants}>
          <BentoItem colSpan={1} variant="default" className="p-6">
            <p className="text-sm font-semibold text-gray-700 mb-4 uppercase tracking-wide">Skills</p>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill) => (
                <span key={skill} className="px-3 py-1.5 bg-blue-100 text-blue-700 text-xs font-semibold rounded-full">
                  {skill}
                </span>
              ))}
            </div>
          </BentoItem>
        </motion.div>

        <motion.div variants={itemVariants}>
          <BentoItem colSpan={1} variant="dark" className="p-8 flex flex-col justify-center text-center">
            <div className="text-4xl mb-2">📊</div>
            <p className="font-bold text-white mb-1">100+</p>
            <p className="text-sm text-gray-400">Clients Satisfied</p>
          </BentoItem>
        </motion.div>
      </BentoGrid>
    </motion.div>
  );
};
