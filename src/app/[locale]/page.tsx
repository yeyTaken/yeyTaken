"use client";

import { motion } from "framer-motion";
import { Card, CardBody, Button, Avatar, Chip, Divider, Tooltip, Link } from "@heroui/react";
import { FaGithub, FaEnvelope, FaNodeJs, FaReact, FaDocker, FaServer } from "react-icons/fa";
import { SiTypescript, SiNextdotjs, SiTailwindcss, SiPostgresql, SiMongodb, SiRedis } from "react-icons/si";
import { useTranslations } from "next-intl";

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

const skills = [
  { name: "Node.js", icon: <FaNodeJs className="text-green-500" /> },
  { name: "TypeScript", icon: <SiTypescript className="text-blue-500" /> },
  { name: "React", icon: <FaReact className="text-cyan-400" /> },
  { name: "Next.js", icon: <SiNextdotjs /> },
  { name: "Tailwind CSS", icon: <SiTailwindcss className="text-sky-400" /> },
  { name: "PostgreSQL", icon: <SiPostgresql className="text-blue-400" /> },
  { name: "MongoDB", icon: <SiMongodb className="text-green-600" /> },
  { name: "Redis", icon: <SiRedis className="text-red-500" /> },
  { name: "Docker", icon: <FaDocker className="text-blue-600" /> },
];

const projects = [
  {
    title: "ARC Studio, Inc.",
    description: "Onde grandes ideias ganham forma. Executamos seu projeto com a excelência que ele merece!",
    tags: ["Node.js", "TypeScript", "BetterAuth", "MongoDB"],
    link: "https://arcstudio.online",
  },
  {
    title: "AtosJS",
    description: "AtosJS é um pacote poderoso e fácil de usar, construído com Node.js e compatível com .ts, .js, .mjs e .cjs para garantir o uso correto das importações. Ele oferece sistemas úteis para tarefas diárias, otimizando seu fluxo de trabalho.",
    tags: ["NPM", "Node.js", "TypeScript", "MongoDB", "AtosDB"],
    link: "https://atos.js.org",
  }
];

export default function HomePage() {
  const t = useTranslations("Home");

  return (
    <main className="min-h-screen flex flex-col items-center px-6 pt-20 pb-24">
      
      {/* HERO SECTION */}
      <section id="hero" className="max-w-5xl w-full py-20 md:py-32 flex flex-col md:flex-row items-center gap-12 relative">
        {/* Background Glow */}
        <div className="absolute -top-20 -left-20 w-64 h-64 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
        
        {/* Foto acima no mobile (order-1 no mobile, order-2 no md) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative order-1 md:order-2"
        >
          <div className="absolute inset-0 bg-primary/20 rounded-full blur-2xl animate-pulse" />
          <Avatar
            src="/images/rabbi.jpg"
            alt="Israel R. Jatobá"
            isBordered color="primary"
            className="w-56 h-56 md:w-64 md:h-64 text-large border-4 border-background shadow-2xl"
          />
        </motion.div>

        {/* Conteúdo (order-2 no mobile, order-1 no md) */}
        <motion.div
          initial="initial"
          animate="animate"
          variants={staggerContainer}
          className="flex-1 z-10 order-2 md:order-1"
        >
          <motion.div variants={fadeInUp} className="mb-4">
            <Chip 
              variant="flat" 
              color="success" 
              size="sm" 
              className="capitalize px-2 py-1"
              startContent={<span className="w-2 h-2 rounded-full bg-success animate-pulse mr-1" />}
            >
              {t("status")}
            </Chip>
          </motion.div>
          
          <motion.h1 
            variants={fadeInUp}
            className="text-5xl md:text-7xl font-extrabold mb-6 tracking-tight bg-clip-text text-transparent bg-linear-to-r from-foreground to-foreground/70"
          >
            {t("heroTitle")}
          </motion.h1>
          
          <motion.p 
            variants={fadeInUp}
            className="text-zinc-400 text-xl md:text-2xl mb-8 max-w-2xl leading-relaxed"
          >
            {t("heroSubtitle")}
          </motion.p>

          <motion.div variants={fadeInUp} className="flex flex-wrap gap-4">
            <Button
              as="a"
              href="https://github.com/yeytaken"
              target="_blank"
              startContent={<FaGithub size={20} />}
              color="primary"
              size="lg"
              className="font-semibold shadow-lg shadow-primary/20"
            >
              {t("github")}
            </Button>
            <Button
              as="a"
              href="mailto:contact.israeljatoba@gmail.com"
              startContent={<FaEnvelope size={18} />}
              variant="bordered"
              size="lg"
              className="font-semibold"
            >
              {t("contact")}
            </Button>
          </motion.div>
        </motion.div>
      </section>

      <Divider className="max-w-5xl opacity-50" />

      {/* ABOUT & SKILLS */}
      <section id="sobre" className="max-w-5xl w-full py-24 grid md:grid-cols-5 gap-12">
        <div className="md:col-span-3">
          <motion.h2
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="text-3xl font-bold mb-8 flex items-center gap-3"
          >
            <span className="text-primary">01.</span> {t("aboutTitle")}
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-6 dark:text-zinc-400 text-zinc-800 text-lg leading-relaxed"
          >
            <p>
              {t("aboutText1")}
            </p>
            <p>
              {t("aboutText2")}
            </p>
            <Card className="dark:bg-zinc-900/50 bg-zinc-200/50 border dark:border-zinc-800/50 border-zinc-500/50 backdrop-blur-sm">
              <CardBody className="italic text-zinc-500 text-base">
                &quot;{t("quote")}&quot;
              </CardBody>
            </Card>
          </motion.div>
        </div>

        <div className="md:col-span-2">
          <motion.h2
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="text-3xl font-bold mb-8 flex items-center gap-3"
          >
            {t("techTitle")}
          </motion.h2>
          
          <div className="grid grid-cols-3 gap-4">
            {skills.map((skill, index) => (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
              >
                <Tooltip content={skill.name} placement="bottom">
                  <div className="flex flex-col items-center justify-center p-4 rounded-xl bg-zinc-200/30 dark:bg-zinc-900/30 border dark:border-zinc-800/50 border-zinc-500/50 hover:border-primary/50 hover:bg-primary/5 transition-all group">
                    <span className="text-3xl mb-2 group-hover:scale-110 transition-transform">
                      {skill.icon}
                    </span>
                    <span className="text-xs text-zinc-500 font-medium">{skill.name}</span>
                  </div>
                </Tooltip>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* PROJECTS SECTION */}
      <section id="projetos" className="max-w-5xl w-full py-24">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl font-bold mb-12 flex items-center gap-3"
        >
          <span className="text-primary">02.</span> {t("projectsTitle")}
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -8 }}
            >
              <Card className="dark:bg-zinc-900/40 border border-zinc-800/50 h-full hover:shadow-2xl hover:shadow-primary/10 transition-all overflow-hidden group">
                <CardBody className="p-8">
                  <div className="flex justify-between items-start mb-6">
                    <div className="p-3 rounded-lg bg-primary/10 text-primary">
                      <FaServer size={24} />
                    </div>
                    <div className="flex gap-3">
                      <Link href={project.link} isExternal className="text-zinc-800 dark:text-zinc-400 hover:text-primary transition-colors">
                        <FaGithub size={22} />
                      </Link>
                    </div>
                  </div>
                  
                  <h3 className="text-2xl font-bold mb-4 group-hover:text-primary transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-zinc-800 dark:text-zinc-400 mb-8 leading-relaxed">
                    {project.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mt-auto">
                    {project.tags.map(tag => (
                      <Chip key={tag} size="sm" variant="flat" className="bg-zinc-300/50 dark:bg-zinc-900/50 text-zinc-800/60 dark:text-zinc-400">
                        {tag}
                      </Chip>
                    ))}
                  </div>
                </CardBody>
              </Card>
            </motion.div>
          ))}
        </div>
        
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="mt-12 text-center"
        >
          <Button 
            as="a" 
            href="https://github.com/yeytaken" 
            target="_blank"
            variant="light" 
            color="primary"
            className="font-medium"
          >
            {t("viewAll")}
          </Button>
        </motion.div>
      </section>

      {/* CONTACT SECTION */}
      <section id="contato" className="max-w-5xl w-full py-24 text-center relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
        
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative z-10"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">{t("contactTitle")}</h2>
          <p className="text-zinc-400 text-xl mb-10 max-w-2xl mx-auto">
            {t("contactSubtitle")}
          </p>

          <div className="flex flex-col md:flex-row justify-center items-center gap-6">
            <Button
              as="a"
              href="mailto:contact.israeljatoba@gmail.com"
              startContent={<FaEnvelope />}
              color="primary"
              size="lg"
              className="px-12 font-bold text-lg h-16"
            >
              {t("sendEmail")}
            </Button>
            
            <div className="flex gap-4">
              <Tooltip content="GitHub">
                <Button
                  isIconOnly
                  as="a"
                  href="https://github.com/yeytaken"
                  target="_blank"
                  variant="flat"
                  size="lg"
                  className="w-16 h-16 rounded-2xl"
                >
                  <FaGithub size={24} />
                </Button>
              </Tooltip>
            </div>
          </div>
        </motion.div>
      </section>

      {/* FOOTER */}
      <footer className="max-w-5xl w-full pt-24 pb-8 border-t border-zinc-800/50 flex flex-col md:flex-row justify-between items-center gap-4 text-zinc-500 text-sm">
        <p>© {new Date().getFullYear()} Israel R. Jatobá. {t("rights")}</p>
        <div className="flex gap-6">
          <Link href="#sobre" className="text-zinc-500 hover:text-primary transition-colors">{t("navAbout")}</Link>
          <Link href="#projetos" className="text-zinc-500 hover:text-primary transition-colors">{t("navProjects")}</Link>
          <Link href="#contato" className="text-zinc-500 hover:text-primary transition-colors">{t("navContact")}</Link>
        </div>
      </footer>
    </main>
  );
}
