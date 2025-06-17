"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const Hero = () => {
  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-900 via-blue-700 to-blue-500">
      <div className="container mx-auto px-4 grid md:grid-cols-2 gap-8 items-center">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-5xl md:text-6xl font-extrabold text-white mb-6 drop-shadow-lg">
            Xin chào, tôi là{" "}
            <span className="text-yellow-400">Son Pham</span>
          </h1>
          <h2 className="text-2xl md:text-3xl font-semibold text-yellow-300 mb-4">
            FullStack Web Developer
          </h2>
          <p className="text-lg text-blue-100 mb-8 max-w-xl">
            Tôi là một lập trình viên website tự học, có kinh nghiệm làm việc với
            các công nghệ front-end và back-end. Tôi có khả năng làm việc độc lập
            và làm việc nhóm tốt. Tôi luôn cố gắng học hỏi và cải thiện kỹ năng
            của mình mỗi ngày. Tôi mong muốn được thực tập tại công ty để học hỏi
            và phát triển bản thân.
          </p>
          <motion.button
            onClick={() => {
              const projectsSection = document.getElementById('projects');
              projectsSection?.scrollIntoView({ behavior: 'smooth' });
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-block bg-yellow-400 text-blue-900 font-bold px-8 py-3 rounded-full shadow-lg hover:bg-yellow-300 transition"
          >
            Xem dự án
          </motion.button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="flex justify-center"
        >
          <div className="rounded-full overflow-hidden border-4 border-yellow-400 shadow-2xl w-64 h-64 bg-white/10">
            <Image
              src="/images/avatar.png"
              alt="Hero"
              width={256}
              height={256}
              className="object-cover w-full h-full"
              priority
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;