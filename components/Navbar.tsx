"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    section?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? "bg-blue-900/95 shadow-lg" : "bg-transparent"}`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="text-2xl font-bold text-white">
            SP
          </Link>
          <div className="flex space-x-8">
            <button
              onClick={() => scrollToSection("about")}
              className="text-white hover:text-yellow-400 transition-colors"
            >
              Về tôi
            </button>
            <button
              onClick={() => scrollToSection("skills")}
              className="text-white hover:text-yellow-400 transition-colors"
            >
              Kỹ năng
            </button>
            <button
              onClick={() => scrollToSection("projects")}
              className="text-white hover:text-yellow-400 transition-colors"
            >
              Dự án
            </button>
            <button
              onClick={() => scrollToSection("contact")}
              className="text-white hover:text-yellow-400 transition-colors"
            >
              Liên hệ
            </button>
          </div>
        </div>
      </div>
    </motion.nav>
  );
}