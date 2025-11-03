import { motion } from 'framer-motion';
import { BentoGrid, BentoItem } from './BentoGrid';
import { Mail, Github, Linkedin, Twitter, ArrowRight } from 'lucide-react';

export const BentoFooter = () => {
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

  const socials = [
    { icon: Github, label: 'GitHub', href: '#' },
    { icon: Linkedin, label: 'LinkedIn', href: '#' },
    { icon: Twitter, label: 'Twitter', href: '#' },
    { icon: Mail, label: 'Email', href: 'mailto:hello@olu.com' },
  ];

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-100px' }}
      className="w-full"
    >
      <div className="mb-12">
        <h2 className="text-4xl font-bold text-gray-900 mb-2">Let's Work Together</h2>
        <p className="text-gray-600">Got a project in mind? Let's talk</p>
      </div>

      <BentoGrid cols={3}>
        <motion.div variants={itemVariants} className="col-span-2">
          <BentoItem colSpan={2} variant="gradient" className="p-12 flex flex-col justify-between min-h-64">
            <div>
              <h3 className="text-3xl font-bold mb-4">Ready to create something amazing?</h3>
              <p className="text-lg opacity-90 mb-8">
                I'm always open to new projects and opportunities. Whether you need a design refresh, a full rebrand, or
                consultation on your next big idea, I'd love to help.
              </p>
            </div>
            <motion.button
              whileHover={{ x: 5 }}
              className="inline-flex items-center gap-2 bg-white text-gray-900 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors w-fit"
            >
              Get in Touch <ArrowRight size={20} />
            </motion.button>
          </BentoItem>
        </motion.div>

        <motion.div variants={itemVariants}>
          <BentoItem colSpan={1} variant="dark" className="p-8 flex flex-col justify-between">
            <div>
              <p className="text-sm opacity-70 mb-6 uppercase tracking-wide font-semibold">Connect with me</p>
              <div className="space-y-4">
                {socials.map((social) => {
                  const Icon = social.icon;
                  return (
                    <a
                      key={social.label}
                      href={social.href}
                      className="flex items-center gap-3 text-white hover:text-cyan-400 transition-colors group"
                    >
                      <Icon size={20} />
                      <span className="font-medium">{social.label}</span>
                      <ArrowRight size={16} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                    </a>
                  );
                })}
              </div>
            </div>
          </BentoItem>
        </motion.div>

        <motion.div variants={itemVariants} className="col-span-3">
          <BentoItem colSpan={3} variant="default" className="p-8 flex items-center justify-between">
            <div>
              <p className="text-gray-600 mb-2">Designed and developed with</p>
              <p className="font-semibold text-gray-900">React, Tailwind CSS & Framer Motion</p>
            </div>
            <p className="text-sm text-gray-500">© 2024 Olu. All rights reserved.</p>
          </BentoItem>
        </motion.div>
      </BentoGrid>
    </motion.div>
  );
};
