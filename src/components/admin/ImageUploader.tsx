"use client";

import Image from "next/image";
import { useRef, useState } from "react";

type ImageUploaderProps = {
  upload: (file: File) => Promise<string>;
  images: string[];
  onChange: (images: string[]) => void;
};

export default function ImageUploader({ upload, images, onChange }: ImageUploaderProps) {
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
      {images.length > 0 && (
        <div className="mb-3 flex flex-wrap gap-2">
          {images.map((url) => (
            <div
              key={url}
              className="group relative h-20 w-20 overflow-hidden rounded-xl border border-slate-700 bg-slate-800"
            >
              <Image src={url} alt="" fill className="object-cover" />
              <button
                type="button"
                onClick={() => removeImage(url)}
                className="absolute inset-0 flex items-center justify-center bg-black/60 opacity-0 transition-opacity group-hover:opacity-100"
                aria-label="Eliminar imagen"
              >
                <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5 text-white" aria-hidden="true">
                  <path d="M18 6 6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </button>
            </div>
          ))}
        </div>
      )}

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
        className="inline-flex items-center gap-2 rounded-lg border border-slate-700 bg-slate-800 px-4 py-2 font-sans text-sm text-slate-300 transition-colors hover:border-slate-500 hover:text-white disabled:opacity-50"
      >
        <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4" aria-hidden="true">
          <path d="M12 16V8m0 0-3 3m3-3 3 3M20 16.7A5 5 0 0 0 18 7h-1.26A8 8 0 1 0 4 15.25" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        {uploading ? "Subiendo..." : "Subir imagen"}
      </button>

      {error && (
        <p className="mt-2 font-sans text-xs text-red-400">{error}</p>
      )}
    </div>
  );
}
