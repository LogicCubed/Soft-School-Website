"use client";

import { useRef, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

interface VideoUploadProps {
  videoSrc?: string | null;
  onUpload: (url: string) => void;
}

export default function VideoUpload({ videoSrc, onUpload }: VideoUploadProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [video, setVideo] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadedUrl, setUploadedUrl] = useState<string | null>(videoSrc || null);

  const handleFileButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.[0]) return;

    const selectedVideo = e.target.files[0];
    setVideo(selectedVideo);
    setUploading(true);

    try {
      const filePath = `lesson-videos/${Date.now()}-${selectedVideo.name}`;
      const { error: uploadError } = await supabase.storage
        .from("lesson-videos")
        .upload(filePath, selectedVideo);

      if (uploadError) {
        console.error("Upload failed:", uploadError.message);
        return;
      }

      const { data } = supabase.storage
        .from("lesson-videos")
        .getPublicUrl(filePath);

      const videoUrl = data.publicUrl;
      setUploadedUrl(videoUrl);
      onUpload(videoUrl);
    } catch (err) {
      console.error("Error uploading video:", err);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="flex flex-col items-center gap-2">
      <input
        ref={fileInputRef}
        type="file"
        accept="video/*"
        onChange={handleFileChange}
        className="hidden"
      />

      <button
        type="button"
        onClick={handleFileButtonClick}
        className="px-4 py-2 rounded border border-gray-300 hover:bg-gray-100 transition cursor-pointer w-max"
        disabled={uploading}
      >
        {video ? `Selected: ${video.name}` : "Choose Video"}
      </button>

      {uploadedUrl && (
        <div className="text-sm text-gray-600 break-all text-center">
          Uploaded: {uploadedUrl}
        </div>
      )}

      {uploadedUrl && (
        <video
          key={uploadedUrl}
          src={uploadedUrl}
          controls
          className="rounded-lg max-h-[300px] mt-2"
        />
      )}
    </div>
  );
}