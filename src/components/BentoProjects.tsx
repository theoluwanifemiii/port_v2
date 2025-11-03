import { motion } from 'framer-motion';
import { BentoGrid, BentoItem } from './BentoGrid';
import { ExternalLink } from 'lucide-react';

interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  tags: string[];
  colSpan: 1 | 2 | 3;
  gradient?: string;
}

interface BentoProjectsProps {
  projects: Project[];
}

export const BentoProjects = ({ projects }: BentoProjectsProps) => {
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

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-100px' }}
      className="w-full"
    >
      <div className="mb-12">
        <h2 className="text-4xl font-bold text-gray-900 mb-2">Featured Work</h2>
        <p className="text-gray-600">A selection of recent projects</p>
      </div>

      <BentoGrid cols={3}>
        {projects.map((project) => (
          <motion.div key={project.id} variants={itemVariants}>
            <BentoItem
              colSpan={project.colSpan}
              variant="default"
              className="group overflow-hidden cursor-pointer"
            >
              <div className="relative h-64 overflow-hidden bg-gray-200">
                <motion.img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.4 }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                  <h3 className="text-white font-bold text-lg mb-2">{project.title}</h3>
                  <div className="flex gap-2">
                    {project.tags.map((tag) => (
                      <span key={tag} className="text-xs px-2 py-1 bg-white/20 text-white rounded-full">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              <div className="p-6">
                <h3 className="font-bold text-lg text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                  {project.title}
                </h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">{project.description}</p>
                <motion.div
                  whileHover={{ x: 5 }}
                  className="inline-flex items-center gap-2 text-blue-600 font-semibold hover:gap-3 transition-all"
                >
                  View Project <ExternalLink size={16} />
                </motion.div>
              </div>
            </BentoItem>
          </motion.div>
        ))}
      </BentoGrid>
    </motion.div>
  );
};
