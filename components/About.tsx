"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const About = () => {
  return (
    <section id="about" className="py-20 bg-gradient-to-br from-blue-800 via-blue-600 to-blue-400">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold text-white mb-4">Về Tôi</h2>
          <div className="w-20 h-1 bg-yellow-400 mx-auto"></div>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="rounded-lg overflow-hidden border-4 border-yellow-400 shadow-2xl">
              <Image
                src="/images/about.png"
                alt="About Image"
                width={1000}
                height={1000}
                className="object-cover"
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-white"
          >
            <h3 className="text-3xl font-bold mb-6 text-yellow-300">
              Web Developer 
            </h3>
            <p className="text-blue-100 mb-8">
              
            </p>
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-4">
                <p className="flex justify-between">
                  <span className="font-semibold text-yellow-300">Sinh nhật:</span>
                  <span className="text-blue-100">18/9/2001</span>
                </p>
                <p className="flex justify-between">
                  <span className="font-semibold text-yellow-300">Giới tính:</span>
                  <span className="text-blue-100">Nam</span>
                </p>
                <p className="flex justify-between">
                  <span className="font-semibold text-yellow-300">SĐT:</span>
                  <span className="text-blue-100">0376381868</span>
                </p>
                <p className="flex justify-between">
                  <span className="font-semibold text-yellow-300">Địa chỉ:</span>
                  <span className="text-blue-100">Hà Nội</span>
                </p>
              </div>
              <div className="space-y-4">
                <p className="flex justify-between">
                  <span className="font-semibold text-yellow-300">Email:</span>
                  <span className="text-blue-100">ptson.son@gmail.com</span>
                </p>
                <p className="flex justify-between">
                  <span className="font-semibold text-yellow-300">Học vấn:</span>
                  <span className="text-blue-100">Trường Đại học Thăng Long</span>
                </p>
                <p className="flex justify-between">
                  <span className="font-semibold text-yellow-300">Chuyên ngành:</span>
                  <span className="text-blue-100">Công nghệ Thông tin</span>
                </p>
                <p className="flex justify-between">
                  <span className="font-semibold text-yellow-300">Thời gian:</span>
                  <span className="text-blue-100">10/2019 - Đã tốt nghiệp</span>
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;