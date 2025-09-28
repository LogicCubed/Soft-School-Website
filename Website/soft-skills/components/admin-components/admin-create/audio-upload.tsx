"use client";

import { useRef, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { Button } from "@/components/ui/button";
import clsx from "clsx";
import { toast } from "sonner";

interface AudioUploadProps {
  audioSrc?: string | null;
  onUpload: (url: string) => void;
}

export default function AudioUpload({ audioSrc, onUpload }: AudioUploadProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [audio, setAudio] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<number>(0);

  const handleFileButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.[0]) return;

    const selectedAudio = e.target.files[0];
    setAudio(selectedAudio);
    setUploading(true);
    setUploadProgress(0);

    try {
      const filePath = `lesson-audios/${Date.now()}-${selectedAudio.name}`;

      const { data, error } = await supabase.storage
        .from("lesson-audios")
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

        xhr.send(selectedAudio);
      });

      const { data: publicData } = supabase.storage
        .from("lesson-audios")
        .getPublicUrl(filePath);

      const audioUrl = publicData.publicUrl;
      onUpload(audioUrl);
      toast.success("Audio Uploaded!");
    } catch (err) {
      console.error("Error uploading audio:", err);
      toast.error("Failed to Upload Audio");
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
        accept="audio/*"
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
          {audio
            ? `Selected: ${audio.name}`
            : audioSrc
            ? "Change Audio"
            : "Upload Audio"}
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