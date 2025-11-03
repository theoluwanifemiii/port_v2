import { FC, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { BentoNav } from '../../components/BentoNav';
import { BentoHero } from '../../components/BentoHero';
import { BentoProjects } from '../../components/BentoProjects';
import { BentoServices } from '../../components/BentoServices';
import { BentoAbout } from '../../components/BentoAbout';
import { BentoFooter } from '../../components/BentoFooter';

interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  tags: string[];
  colSpan: 1 | 2 | 3;
}

const mockProjects: Project[] = [
  {
    id: '1',
    title: 'Vitalswap',
    description: 'A health-focused social commerce platform connecting users with wellness products',
    image: '/Project 1.png',
    tags: ['Product Design', 'Mobile'],
    colSpan: 2,
  },
  {
    id: '2',
    title: 'Scene',
    description: 'Event discovery and booking platform with real-time updates',
    image: '/Project 2.png',
    tags: ['UI/UX', 'Web'],
    colSpan: 1,
  },
  {
    id: '3',
    title: 'Digtvant',
    description: 'Digital transformation platform for businesses',
    image: '/Project 3.png',
    tags: ['Product Design', 'SaaS'],
    colSpan: 1,
  },
  {
    id: '4',
    title: 'Motobills',
    description: 'Fleet management solution for logistics companies',
    image: '/Project 4.png',
    tags: ['Mobile App', 'IoT'],
    colSpan: 2,
  },
  {
    id: '5',
    title: 'Additional Project',
    description: 'Comprehensive design case study with multiple iterations',
    image: '/Project 5.png',
    tags: ['Strategy', 'Research'],
    colSpan: 1,
  },
];

export const BentoPortfolio: FC = () => {
  const [selectedProject, setSelectedProject] = useState<string | null>(null);
  const workRef = useRef<HTMLDivElement>(null);
  const servicesRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);

  const pageVariants = {
    initial: { opacity: 0 },
    animate: {
      opacity: 1,
      transition: {
        duration: 0.6,
      },
    },
  };

  const handleNavClick = (section: string) => {
    const refs: { [key: string]: React.RefObject<HTMLDivElement> } = {
      work: workRef,
      services: servicesRef,
      about: aboutRef,
      contact: contactRef,
    };
    refs[section]?.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      className="min-h-screen bg-white"
    >
      <BentoNav onNavClick={handleNavClick} />
      <div className="pt-16 md:pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <BentoHero />
          </motion.div>

          <motion.div
            ref={workRef}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true, margin: '-100px' }}
            className="mt-24 md:mt-32"
          >
            <BentoProjects projects={mockProjects} />
          </motion.div>

          <motion.div
            ref={servicesRef}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true, margin: '-100px' }}
            className="mt-24 md:mt-32"
          >
            <BentoServices />
          </motion.div>

          <motion.div
            ref={aboutRef}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true, margin: '-100px' }}
            className="mt-24 md:mt-32"
          >
            <BentoAbout />
          </motion.div>

          <motion.div
            ref={contactRef}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true, margin: '-100px' }}
            className="mt-24 md:mt-32"
          >
            <BentoFooter />
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};
