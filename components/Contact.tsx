"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { FaFacebook, FaLinkedin, FaGithub } from "react-icons/fa";
import toast from "react-hot-toast";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        toast.success("Gửi tin nhắn thành công!");
        setFormData({ name: "", email: "", message: "" });
      } else {
        toast.error("Có lỗi xảy ra. Vui lòng thử lại!");
      }
    } catch (error) {
      toast.error("Có lỗi xảy ra. Vui lòng thử lại!");
    }

    setLoading(false);
  };

  return (
    <section id="contact" className="py-20 bg-gradient-to-br from-blue-900 via-blue-700 to-blue-500">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-white mb-4">Liên Hệ</h2>
          <div className="w-20 h-1 bg-yellow-400 mx-auto"></div>
        </motion.div>

        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="bg-blue-800/30 p-8 rounded-xl backdrop-blur-sm"
          >
            <h3 className="text-2xl font-bold text-white mb-6">Gửi Tin Nhắn</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <input
                  type="text"
                  placeholder="Họ và tên"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-2 rounded-lg bg-blue-900/50 text-white placeholder-blue-200
                           border border-blue-400/20 focus:outline-none focus:border-yellow-400"
                />
              </div>
              <div>
                <input
                  type="email"
                  placeholder="Email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-2 rounded-lg bg-blue-900/50 text-white placeholder-blue-200
                           border border-blue-400/20 focus:outline-none focus:border-yellow-400"
                />
              </div>
              <div>
                <textarea
                  placeholder="Tin nhắn"
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  rows={4}
                  className="w-full px-4 py-2 rounded-lg bg-blue-900/50 text-white placeholder-blue-200
                           border border-blue-400/20 focus:outline-none focus:border-yellow-400"
                ></textarea>
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-yellow-400 text-blue-900 py-2 px-6 rounded-lg font-semibold
                         hover:bg-yellow-300 transition-colors disabled:bg-yellow-400/50"
              >
                {loading ? "Đang gửi..." : "Gửi Tin Nhắn"}
              </button>
            </form>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="bg-blue-800/30 p-8 rounded-xl backdrop-blur-sm"
          >
            <h3 className="text-2xl font-bold text-white mb-6">Kết Nối</h3>
            <div className="space-y-4">
              <p className="text-blue-100">Hãy kết nối với tôi qua các mạng xã hội:</p>
              <div className="flex space-x-4">
                <a
                  href="https://www.facebook.com/giontan.culac.50/?locale=vi_VN"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white hover:text-yellow-400 text-2xl transition-colors"
                >
                  <FaFacebook />
                </a>
                <a
                  href="https://www.linkedin.com/in/ph%E1%BA%A1m-tr%C6%B0%E1%BB%9Dng-s%C6%A1n-2a924a276/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white hover:text-yellow-400 text-2xl transition-colors"
                >
                  <FaLinkedin />
                </a>
                <a
                  href="https://github.com/dcmmmmmm"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white hover:text-yellow-400 text-2xl transition-colors"
                >
                  <FaGithub />
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}