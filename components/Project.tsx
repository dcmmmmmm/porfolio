"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import React, { Suspense, useState } from "react";
import { FaGithub, FaExternalLinkAlt, FaPlus, FaEdit, FaTrash } from "react-icons/fa";
import UploadZone from "./Uploadzone";
import toast from "react-hot-toast";
import Link from "next/link";


interface Project {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  tags: string[];
  demoUrl: string;
  githubUrl: string;
}

export default function Projects() {
  return (
    <Suspense>
      <ProjectsContent />
    </Suspense>
  );
}

function ProjectsContent () {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [projectData, setProjectData] = useState({
    title: "",
    demoUrl: "",
    githubUrl: "",
    tech: "",
    description: "",
    imageUrl: "",
  });
  const [projects, setProjects] = useState<Project[]>([]);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(false);

  // hàm tạo dự án
  async function handleSubmit (event: React.FormEvent) {
    event.preventDefault();
    setLoading(true)
    // Handle form submission logic here
    try {
      const response = await fetch('/api/projects', {
        method: 'POST',
        headers: {'Content-Type': 'application/json',},
        body: JSON.stringify({
          title: projectData.title,
          demoUrl: projectData.demoUrl,
          githubUrl: projectData.githubUrl,
          tech: projectData.tech,
          description: projectData.description,
          imageUrl: projectData.imageUrl,
        }),
      });

      if(response.ok) {
        console.log("Thêm dự án thành công");
        toast.success("Thêm dự án thành công");
        setIsModalOpen(false);
      }
    }catch (error) {
      console.log(error);
      toast.error("Đã xảy ra lỗi");
      setIsModalOpen(false);
    }
    console.log("Project Data:", projectData);
    setLoading(false);
  }
  //  hàm xóa dự án
  async function handleDelete(id: string) {
    if (window.confirm('Bạn có chắc chắn muốn xóa dự án này?')) {
      try {
        const response = await fetch(`/api/projects?id=${id}`, {
          method: 'DELETE',
        });
  
        if (response.ok) {
          toast.success("Xóa dự án thành công");
          setProjects(projects.filter(p => p.id !== id));
        }
      } catch (error) {
        console.error(error);
        toast.error("Đã xảy ra lỗi");
      }
    }
  }
  // hàm sửa dự án
  async function handleUpdate(event: React.FormEvent) {
    event.preventDefault();
    if (!editingProject) return;
  
    setLoading(true);
    try {
      const response = await fetch(`/api/projects?id=${editingProject.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: projectData.title,
          demoUrl: projectData.demoUrl,
          githubUrl: projectData.githubUrl,
          tech: projectData.tech,
          description: projectData.description,
          imageUrl: projectData.imageUrl,
        }),
      });
  
      if (response.ok) {
        const updatedProject = await response.json();
        toast.success("Cập nhật dự án thành công");
        setProjects(projects.map(p => p.id === updatedProject.id ? updatedProject : p));
        setEditingProject(null);
        setIsModalOpen(false);
      }
    } catch (error) {
      console.error(error);
      toast.error("Đã xảy ra lỗi");
    }
    setLoading(false);
  }
  // ferching data
  React.useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch('/api/projects', { 
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          cache: 'no-store'
        });
        if(!response.ok) {
          throw new Error('Lỗi ko lấy được dữ liệu');
        }
        const data = await response.json();
        setProjects(data);
      } catch (error) {
        console.error(error);
      }
    }
    fetchProjects();
  }, [])
  return (
    <section id="projects" className="py-20 bg-gradient-to-br from-blue-900 via-blue-700 to-blue-500 min-h-screen">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-white mb-4">Dự Án</h2>
          <div className="w-20 h-1 bg-yellow-400 mx-auto"></div>
        </motion.div>

        <div className="flex justify-end mb-8">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 bg-yellow-400 text-blue-900 px-6 py-3 rounded-lg
                     font-semibold shadow-lg hover:bg-yellow-300 transition-all"
          >
            <FaPlus />
            Thêm Dự Án
          </motion.button>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.length > 0 ? (
            projects.map((project) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="bg-blue-800/30 rounded-xl overflow-hidden backdrop-blur-sm
                         border border-blue-400/20 shadow-lg group hover:shadow-xl 
                         transition-all duration-300"
              >
                <div className="relative h-48">
                  <Image
                    src={project.imageUrl}
                    alt={project.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-blue-900/80 opacity-0 group-hover:opacity-100
                              flex items-center justify-center gap-4 transition-all duration-300">
                    {project.githubUrl && (
                      <Link
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-white hover:text-yellow-400 text-2xl transition-colors"
                      >
                        <FaGithub />
                      </Link>
                    )}
                    {project.demoUrl && (
                      <Link
                        href={project.demoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-white hover:text-yellow-400 text-2xl transition-colors"
                      >
                        <FaExternalLinkAlt />
                      </Link>
                    )}
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-bold text-white mb-2">
                    {project.title}
                  </h3>
                  <p className="text-blue-100 mb-4 line-clamp-3">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 bg-blue-900/50 text-blue-100 text-sm rounded-full"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="absolute top-2 right-2 flex gap-2">
                  <button
                    onClick={() => {
                      setProjectData({
                        title: project.title,
                        demoUrl: project.demoUrl,
                        githubUrl: project.githubUrl,
                        tech: project.tags.join(', '),
                        description: project.description,
                        imageUrl: project.imageUrl,
                      });
                      setEditingProject(project);
                      setIsModalOpen(true);
                    }}
                    className="p-2 bg-yellow-400 text-blue-900 rounded-full hover:bg-yellow-300 transition-colors"
                  >
                    <FaEdit />
                  </button>
                  <button
                    onClick={() => handleDelete(project.id)}
                    className="p-2 bg-red-500 text-white rounded-full hover:bg-red-400 transition-colors"
                  >
                    <FaTrash />
                  </button>
                </div>
              </motion.div>
            ))
          ) : (
            <p className="text-white text-center col-span-3">Chưa có dự án nào.</p>
          )}
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-lg p-8 w-full max-w-2xl max-h-[90vh] overflow-y-auto"
          >
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold text-blue-900">
                {editingProject ? 'Sửa Dự Án' : 'Thêm Dự Án Mới'}
              </h3>
              <button
                onClick={() => {
                  setIsModalOpen(false);
                  setEditingProject(null);
                  setProjectData({
                    title: "",
                    demoUrl: "",
                    githubUrl: "",
                    tech: "",
                    description: "",
                    imageUrl: "",
                  });
                }}
                className="text-gray-500 hover:text-gray-700"
              >
                ×
              </button>
            </div>
            {/* Form thêm mới dự án */}
            <form onSubmit={editingProject ? handleUpdate : handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                  Tên dự án
                </label>
                <input
                  type="text"
                  id="title"
                  value={projectData.title}
                  onChange={(e) => setProjectData({ ...projectData, title: e.target.value })}
                  className="text-black w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label htmlFor="demoUrl" className="block text-sm font-medium text-gray-700 mb-1">
                  Đường dẫn dự án
                </label>
                <input
                  type="text"
                  id = "demoUrl"
                  value={projectData.demoUrl}
                  onChange={(e) => setProjectData({ ...projectData, demoUrl : e.target.value})}
                  className="text-black w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label htmlFor="githubUrl" className="block text-sm font-medium text-gray-700 mb-1">
                  Đường dẫn Github
                </label>
                <input
                  type="text"
                  id="githubUrl"
                  value={projectData.githubUrl}
                  onChange={(e) => setProjectData({ ...projectData, githubUrl: e.target.value })}
                  className="text-black w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label htmlFor="tech" className="block text-sm font-medium text-gray-700 mb-1">
                  Công nghệ sử dụng
                </label>
                <input
                  type="text"
                  id="tech"
                  value = {projectData.tech}
                  onChange={(e) => setProjectData({ ...projectData, tech: e.target.value })}
                  className="text-black w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                  Mô tả
                </label>
                <textarea
                  id="description"
                  value={projectData.description}
                  onChange={(e) => setProjectData({ ...projectData, description: e.target.value })}
                  rows={4}
                  className="text-black w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Hình ảnh dự án
                </label>
                <UploadZone 
                  onUploadComplete={(url) => {
                    setProjectData({ ...projectData, imageUrl: url });
                  }} 
                />
              </div>

              <div className="flex gap-4 pt-4">
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700
                           disabled:bg-blue-400 disabled:cursor-not-allowed transition-colors"
                >
                 {loading ? 'Đang xử lý...' : (editingProject ? 'Cập Nhật' : 'Thêm Mới')}
                </button>
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-6 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300"
                >
                  Hủy
                </button>
              </div>
              
            </form>
          </motion.div>
        </div>
      )}
    </section>
  );
};

