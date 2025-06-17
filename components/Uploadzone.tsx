"use client";

import { useState } from "react";
import { UploadDropzone } from "@uploadthing/react";
import Image from "next/image";
import { motion } from "framer-motion";

interface UploadZoneProps {
  onUploadComplete: (url: string) => void;
}

const UploadZone = ({ onUploadComplete }: UploadZoneProps) => {
  const [imageUrl, setImageUrl] = useState<string>("");

  return (
    <div className="w-full">
      {!imageUrl ? (
        <div className="border-2 border-dashed border-blue-200 rounded-lg p-4
                     hover:border-blue-400 transition-colors">
          <UploadDropzone
            endpoint="imageUploader"
            onClientUploadComplete={(res) => {
              if (res?.[0]?.url) {
                setImageUrl(res[0].url);
                onUploadComplete(res[0].url);
              }
            }}
            onUploadError={(error: Error) => {
              console.error(error);
            }}
            config={{ mode: "auto" }}
            appearance={{
              button: "bg-blue-600 hover:bg-blue-700",
              label: "text-blue-600",
              allowedContent: "text-gray-500",
            }}
          />
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="relative w-full h-48 rounded-lg overflow-hidden border-2 border-blue-200"
        >
          <Image
            src={imageUrl}
            alt="Preview"
            fill
            className="object-cover"
          />
          <button
            type="button"
            onClick={() => setImageUrl("")}
            className="absolute top-2 right-2 bg-red-500 text-white w-8 h-8 rounded-full
                     hover:bg-red-600 transition-colors flex items-center justify-center"
          >
            ×
          </button>
        </motion.div>
      )}
    </div>
  );
};

export default UploadZone;