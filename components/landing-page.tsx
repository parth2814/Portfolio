"use client";

import React from "react";
import { Mail, Clipboard, ExternalLink } from "lucide-react";
import Image from "next/image";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";
import { TooltipProvider } from "@radix-ui/react-tooltip";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";
import BlogList from "./BlogPost";

interface Project {
  title: string;
  description: string;
  image: string;
  link: string;
  tags: string[];
}

export function LandingPage() {
  const [isHovered, setIsHovered] = React.useState<boolean>(false);
  const [selectedProject, setSelectedProject] = React.useState<string | null>(
    null
  );

  const projects: Project[] = [
    {
      title: "HashCraft",
      description:
        "CLI tool for generating secure hash values using multiple algorithms including MD5, SHA-1, and SHA-256",
      image: "/hashcraft.png",
      link: "https://github.com/parth2814/HashCraft",
      tags: ["Python", "Cryptography", "CLI"],
    },
    {
      title: "File Integrity Checker",
      description:
        "Security tool that monitors and detects unauthorized file modifications using hash comparison",
      image: "/file-checker.png",
      link: "https://github.com/parth2814/File-Integrity-Checker",
      tags: ["Python", "Security", "File Monitoring"],
    },
    {
      title: "Drowsiness Detection",
      description:
        "Real-time driver safety system using OpenCV to monitor eye movements and detect drowsiness",
      image: "/drowsiness-detector.png",
      link: "https://github.com/parth2814/Drowsiness-Detection-System",
      tags: ["Python", "OpenCV", "Computer Vision"],
    },
    {
      title: "Upcoming Project",
      description: "New security tool in development. Stay tuned for updates!",
      image: "/comingsoon.png",
      link: "/",
      tags: ["Coming Soon"],
    },
  ];

  const textRevealVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
        ease: [0.25, 0.25, 0.25, 0.75],
      },
    }),
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="min-h-screen p-6 sm:p-12 flex flex-col items-start relative"
    >
      {/* Matrix-like background effect */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.05 }}
        transition={{ duration: 2 }}
        style={{
          backgroundImage: `radial-gradient(#00ff00 1px, transparent 1px)`,
          backgroundSize: "50px 50px",
        }}
      />

      <header className="mb-8 max-w-3xl relative">
        <motion.div
          className="mb-6 relative"
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <Image
            src="/2.jpg"
            alt="Parth Panchal"
            width={150}
            height={150}
            className="rounded-full border-4 border-[#00ff00] object-cover"
            style={{ aspectRatio: '1 / 1' }} // Optional: Maintain aspect ratio
          />

        </motion.div>

        <motion.h1
          className="text-3xl sm:text-4xl font-extrabold text-[#00ff00] mb-4 tracking-wider"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          PARTH PANCHAL{" "}
          <motion.span
            className="text-sm font-normal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            @M0n4rch
          </motion.span>
        </motion.h1>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.h2
            className="text-xl sm:text-2xl mb-6 font-light tracking-wide"
            variants={textRevealVariants}
            custom={0}
          >
            CYBER SECURITY EXPERT & ETHICAL HACKER
            <br />
            FOCUSED ON PROTECTING DIGITAL ASSETS.
          </motion.h2>

          <motion.p
            className="text-gray-400 mb-8 font-light"
            variants={textRevealVariants}
            custom={1}
          >
          I am an enthusiastic cybersecurity professional with a strong track record in Capture The Flag (CTF) challenges, 
          including the Cyber Defense CTF by Level Effect and achieving 10th place in Hack the Havoc. 
          I&apos;ve earned the &quot;Hacker&quot; rank on Hack The Box (HTB).
          </motion.p>

          <motion.p
            className="text-gray-400 mb-8 font-light"
            variants={textRevealVariants}
            custom={2}
          >
            I&apos;m an avid CTF participant who can{" "}
            <span className="text-[#00ff00] font-normal">
              leverage my skills in cybersecurity
            </span>{" "}
            to provide your organization with innovative solutions and a robust defense against
            cyber threats. I am committed to{" "}
            <span className="text-[#00ff00] font-normal">
              continuously learning
            </span>{" "}
            and evolving in this dynamic field to ensure your security posture remains strong.
        </motion.p>

        </motion.div>
      </header>

      <motion.section
        className="mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
      >
        <div className="flex items-center text-[#ff6600] mb-6 font-medium">
          <motion.div
            className="w-4 h-4 rounded-full bg-[#ff6600] mr-4 shadow-[0_0_10px_#ff6600]"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.7, 1, 0.7],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <p className="text-sm sm:text-base">CURRENTLY AVAILABLE FOR A FULLTIME JOB OR INTERNSHIP.</p>
        </div>

        <div className="flex flex-col sm:flex-row space-y-6 sm:space-y-0 sm:space-x-4 items-center">
          <TooltipProvider>
            <Tooltip>
              <TooltipContent>
                <p>Open mail app</p>
              </TooltipContent>
              <TooltipTrigger>
                <motion.a
                  href="mailto:parthkpanchal12@gmail.com"
                  className="flex items-center justify-center border border-gray-500 rounded-xl p-4 hover:border-[#00ff00] transition-colors duration-300"
                  whileHover={{
                    scale: 1.1,
                    boxShadow: "0 0 15px rgba(0, 255, 0, 0.3)",
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Mail className="text-[#00ff00]" size={20} />
                </motion.a>
              </TooltipTrigger>
            </Tooltip>
            <Tooltip>
              <TooltipContent>
                <p>Copy to clipboard</p>
              </TooltipContent>
              <TooltipTrigger>
                <motion.a
                  onClick={() => {
                    navigator.clipboard.writeText("parthkpanchal12@gmail.com");
                    toast("Mail copied to clipboard");
                  }}
                  className="flex items-center justify-center border border-gray-500 rounded-xl p-4 hover:border-[#00ff00] transition-colors duration-300"
                  whileHover={{
                    scale: 1.1,
                    boxShadow: "0 0 15px rgba(0, 255, 0, 0.3)",
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Clipboard className="text-[#00ff00]" size={20} />
                </motion.a>
              </TooltipTrigger>
            </Tooltip>
          </TooltipProvider>
          <motion.p
            className="text-center sm:text-left sm:ml-4 text-sm sm:text-base"
            variants={textRevealVariants}
            custom={3}
          >
            Want to chat either way?
            <br />
            Send me an email.
          </motion.p>
        </div>
      </motion.section>

      <motion.section
        className="mb-16"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2 }}
      >
        <p className="text-gray-400 mb-4 font-light">
          OR YOU CAN{" "}
          <motion.a
            href="https://drive.google.com/file/d/1zzyt8T6ieV-l3g3qfr8Ir2OWxib_7dRM/view?usp=drivesdk"
            className="text-[#00ff00] hover:text-white transition-colors duration-300 font-normal relative"
            whileHover={{ scale: 1.05 }}
            onHoverStart={() => setIsHovered(true)}
            onHoverEnd={() => setIsHovered(false)}
          >
            GO FOR MY RESUME
            {isHovered && (
              <motion.div
                className="absolute inset-0 bg-[#00ff00]"
                layoutId="underline"
                style={{
                  height: "2px",
                  bottom: "-2px",
                  left: 0,
                  right: 0,
                  top: "auto",
                }}
              />
            )}
          </motion.a>
        </p>
      </motion.section>

      <motion.section
        className="mb-16"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
      >
        <h3 className="text-gray-400 mb-4 font-medium">ELSEWHERE</h3>
        <div className="flex flex-wrap justify-center gap-4 sm:gap-6">
          {[
            {
              name: "X",
              link: "https://x.com/052Parth?t=ybH0lrMtqSqpEdHlXU2aNw&s=09",
            },
            { name: "GITHUB", link: "https://github.com/parth2814" },
            { name: "LINKEDIN", link: "https://www.linkedin.com/in/m0n4rch/" },
          ].map((platform, index) => (
            <motion.a
              key={platform.name}
              href={platform.link}
              target="_blank" // Opens link in new tab
              rel="noopener noreferrer" // Security best practice
              className="text-[#00ff00] hover:text-white transition-colors duration-300 text-sm sm:text-base"
              whileHover={{
                scale: 1.1,
                textShadow: "0 0 8px rgba(0, 255, 0, 0.8)",
              }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.4 + index * 0.1 }}
            >
              {platform.name}
            </motion.a>
          ))}
        </div>
      </motion.section>

      <AnimatePresence mode="wait">
        <motion.section
          className="w-full mb-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
        >
          <h3 className="text-gray-400 mb-6 font-medium">PROJECTS</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {projects.map((project, index) => (
              <motion.div
                key={project.title}
                className="relative group rounded-xl overflow-hidden border border-gray-800 bg-black/20 backdrop-blur-sm"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.5 + index * 0.1 }}
                onHoverStart={() => setSelectedProject(project.title)}
                onHoverEnd={() => setSelectedProject(null)}
                whileHover={{ scale: 1.02 }}
              >
                <div className="relative h-48 sm:h-64 overflow-hidden">
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10"
                    initial={{ opacity: 0 }}
                    animate={{
                      opacity: selectedProject === project.title ? 1 : 0,
                    }}
                    transition={{ duration: 0.3 }}
                  />
                  <motion.div
                    className="relative w-full h-full"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.6 }}
                  >
                    <Image
                      src={project.image}
                      alt={project.title}
                      className="object-cover"
                      fill
                    />
                  </motion.div>
                </div>

                <motion.div
                  className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 z-20"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{
                    opacity: selectedProject === project.title ? 1 : 0,
                    y: selectedProject === project.title ? 0 : 20,
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <h4 className="text-lg sm:text-xl font-bold text-white mb-2">
                    {project.title}
                  </h4>
                  <p className="text-gray-200 text-sm mb-4">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs px-2 py-1 rounded-full bg-[#00ff00]/20 text-[#00ff00] border border-[#00ff00]/30"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <motion.a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-[#00ff00] hover:text-white transition-colors duration-300"
                    whileHover={{ x: 5 }}
                  >
                    View Project <ExternalLink className="ml-2" size={16} />
                  </motion.a>
                </motion.div>

                <motion.div
                  className="absolute inset-0 border-2 border-[#00ff00]/0 group-hover:border-[#00ff00]/50 transition-colors duration-300 rounded-xl pointer-events-none"
                  initial={false}
                  animate={{
                    boxShadow:
                      selectedProject === project.title
                        ? "0 0 20px rgba(0, 255, 0, 0.2)"
                        : "none",
                  }}
                />
              </motion.div>
            ))}
          </div>
        </motion.section>
      </AnimatePresence>

      <BlogList />
    </motion.div>
  );
}
