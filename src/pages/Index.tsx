
import React from 'react';
import { motion } from 'framer-motion';

const ProjectCard = ({ title, description, tags }: { title: string; description: string; tags: string[] }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    className="bg-[#1C1C1C] p-8 rounded-3xl h-full"
  >
    <h3 className="text-2xl font-bold mb-4">{title}</h3>
    <p className="text-gray-400 mb-6">{description}</p>
    <div className="flex flex-wrap gap-3">
      {tags.map((tag, index) => (
        <span key={index} className="bg-[#2A2A2A] px-4 py-2 rounded-full text-sm">{tag}</span>
      ))}
    </div>
  </motion.div>
);

const Index = () => {
  return (
    <div className="min-h-screen bg-[#151515] text-white">
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Navigation */}
        <nav className="flex justify-between items-center mb-20">
          <a href="/" className="text-2xl font-bold hover:text-purple-500 transition-colors">
            Imf.
          </a>
          <div className="flex gap-6">
            <a href="#works" className="hover:text-purple-500 transition-colors">Trabalhos</a>
            <a href="#about" className="hover:text-purple-500 transition-colors">Sobre</a>
            <a href="#contact" className="hover:text-purple-500 transition-colors">Contato</a>
          </div>
        </nav>

        {/* Hero Section */}
        <div className="grid md:grid-cols-2 gap-12 items-center mb-32">
          <div>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-5xl md:text-6xl font-bold mb-6"
            >
              Olá, eu sou o Luis Fernando.
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-gray-400 text-lg mb-8"
            >
              Desenvolvedor front-end apaixonado por criar experiências digitais únicas e memoráveis.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex gap-4"
            >
              <a href="#contact" className="bg-purple-500 hover:bg-purple-600 transition-colors px-6 py-3 rounded-full">
                Contate-me
              </a>
            </motion.div>
          </div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="relative"
          >
            <div className="w-full h-[400px] relative overflow-hidden rounded-3xl">
              <img 
                src="https://drive.google.com/uc?export=download&id=1JL_vt7x-45a-KZFs8z7Ze2vYSo6tKT6n" 
                alt="Luis Fernando"
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>
        </div>

        {/* Projects Section */}
        <section id="works" className="mb-32">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-3xl font-bold mb-12"
          >
            Projetos em Destaque
          </motion.h2>
          <div className="grid md:grid-cols-2 gap-8">
            <ProjectCard
              title="Projeto 1"
              description="Uma aplicação web moderna construída com React e TypeScript."
              tags={["React", "TypeScript", "TailwindCSS"]}
            />
            <ProjectCard
              title="Projeto 2"
              description="Sistema de gerenciamento de conteúdo responsivo e escalável."
              tags={["Next.js", "Node.js", "MongoDB"]}
            />
          </div>
        </section>

        {/* About & Skills Section */}
        <section id="about" className="grid md:grid-cols-2 gap-8 mb-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-[#1C1C1C] p-8 rounded-3xl"
          >
            <h3 className="text-2xl font-bold mb-4">Sobre mim</h3>
            <p className="text-gray-400">
              Desenvolvedor front-end com experiência em criar interfaces modernas e responsivas.
              Focado em entregar experiências excepcionais para os usuários.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-[#1C1C1C] p-8 rounded-3xl"
          >
            <h3 className="text-2xl font-bold mb-4">Habilidades</h3>
            <div className="flex flex-wrap gap-3">
              <span className="bg-[#2A2A2A] px-4 py-2 rounded-full">React</span>
              <span className="bg-[#2A2A2A] px-4 py-2 rounded-full">TypeScript</span>
              <span className="bg-[#2A2A2A] px-4 py-2 rounded-full">Next.js</span>
              <span className="bg-[#2A2A2A] px-4 py-2 rounded-full">TailwindCSS</span>
            </div>
          </motion.div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-[#1C1C1C] p-8 rounded-3xl"
          >
            <h3 className="text-2xl font-bold mb-4">Vamos conversar?</h3>
            <p className="text-gray-400 mb-6">
              Estou sempre aberto a novas oportunidades e colaborações.
            </p>
            <a
              href="mailto:ffnandofferreira@gmail.com"
              className="inline-block bg-purple-500 hover:bg-purple-600 transition-colors px-6 py-3 rounded-full"
            >
              Enviar mensagem
            </a>
          </motion.div>
        </section>

        {/* Footer */}
        <footer className="text-center text-gray-400 py-8">
          <p>&copy; {new Date().getFullYear()} Luis Fernando. Todos os direitos reservados.</p>
          <p className="mt-2 text-sm">Contato: (22) 99794-6175</p>
        </footer>
      </div>
    </div>
  );
};

export default Index;
