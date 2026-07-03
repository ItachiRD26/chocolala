"use client";

import Image from "next/image";
import { useRef, useState } from "react";

type ImageUploaderProps = {
  upload: (file: File) => Promise<string>;
  images: string[];
  onChange: (images: string[]) => void;
};

export default function ImageUploader({
  upload,
  images,
  onChange,
}: ImageUploaderProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleFile(file: File) {
    setUploading(true);
    setError(null);
    try {
      const url = await upload(file);
      onChange([...images, url]);
    } catch {
      setError("No se pudo subir la imagen. Verifica tu conexión.");
    } finally {
      setUploading(false);
    }
  }

  function removeImage(url: string) {
    onChange(images.filter((img) => img !== url));
  }

  return (
    <div>
      <div className="mb-3 flex flex-wrap gap-3">
        {images.map((url) => (
          <div
            key={url}
            className="relative h-20 w-20 overflow-hidden rounded-lg bg-chocolala-brown/5"
          >
            <Image src={url} alt="" fill className="object-cover" />
            <button
              type="button"
              onClick={() => removeImage(url)}
              className="absolute right-0.5 top-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-black/60 text-xs text-white"
              aria-label="Eliminar imagen"
            >
              ×
            </button>
          </div>
        ))}
      </div>

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) handleFile(file);
          e.target.value = "";
        }}
      />
      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        disabled={uploading}
        className="rounded-lg border border-chocolala-brown/20 px-3 py-2 font-sans text-sm text-chocolala-brown transition-colors hover:bg-chocolala-brown/5 disabled:opacity-50"
      >
        {uploading ? "Subiendo..." : "Subir imagen"}
      </button>
      {error && (
        <p className="mt-2 font-sans text-xs text-red-600">{error}</p>
      )}
    </div>
  );
}
