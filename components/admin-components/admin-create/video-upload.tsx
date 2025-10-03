"use client";

import { useRef, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { Button } from "@/components/ui/button";
import clsx from "clsx";
import { toast } from "sonner";

interface VideoUploadProps {
  videoSrc?: string | null;
  onUpload: (url: string) => void;
}

export default function VideoUpload({ videoSrc, onUpload }: VideoUploadProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [video, setVideo] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<number>(0);

  const handleFileButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.[0]) return;

    const selectedVideo = e.target.files[0];
    setVideo(selectedVideo);
    setUploading(true);
    setUploadProgress(0);

    try {
      const filePath = `lesson-videos/${Date.now()}-${selectedVideo.name}`;

      const { data, error } = await supabase.storage
        .from("lesson-videos")
        .createSignedUploadUrl(filePath);

      if (error) throw new Error(error.message);

      const { signedUrl } = data;

      await new Promise<void>((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open("PUT", signedUrl);

        xhr.upload.onprogress = (event) => {
          if (event.lengthComputable) {
            const percent = Math.round((event.loaded / event.total) * 100);
            setUploadProgress(percent);
          }
        };

        xhr.onload = () => {
          if (xhr.status === 200) resolve();
          else reject(new Error(`Upload failed: ${xhr.status}`));
        };

        xhr.onerror = () => reject(new Error("Upload failed: network error"));

        xhr.send(selectedVideo);
      });

      const { data: publicData } = supabase.storage
        .from("lesson-videos")
        .getPublicUrl(filePath);

      const videoUrl = publicData.publicUrl;
      onUpload(videoUrl);
      toast.success("Video Uploaded!");
    } catch (err) {
      console.error("Error uploading video:", err);
      toast.error("Failed to Upload Video");
    } finally {
      setUploading(false);
      setUploadProgress(0);
    }
  };

  return (
    <div className="flex flex-col items-center w-full">
      <input
        ref={fileInputRef}
        type="file"
        accept="video/*"
        onChange={handleFileChange}
        className="hidden"
      />

      <div className="flex justify-center w-full">
        <Button
          variant="ghost"
          onClick={handleFileButtonClick}
          disabled={uploading}
          className={clsx(
            "font-semibold px-6 py-2",
            uploading
              ? "bg-gray-200 text-gray-500 font-extrabold cursor-not-allowed"
              : "bg-sky-500 hover:bg-sky-600 text-white font-extrabold cursor-pointer"
          )}
        >
          {video
            ? `Selected: ${video.name}`
            : videoSrc
            ? "Change Video"
            : "Upload Video"}
        </Button>
      </div>

      {uploading && (
        <div className="w-2/3 mt-2 bg-gray-200 rounded h-2 overflow-hidden">
          <div
            className="bg-sky-500 h-2 transition-all duration-200"
            style={{ width: `${uploadProgress}%` }}
          />
        </div>
      )}
    </div>
  );
}