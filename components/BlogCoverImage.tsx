"use client";

import { useState } from "react";

interface BlogCoverImageProps {
  src?: string;
  title: string;
  isCatalog?: boolean;
}

export default function BlogCoverImage({ src, title, isCatalog = false }: BlogCoverImageProps) {
  const [hasError, setHasError] = useState(false);

  if (!src || hasError) {
    return (
      <div className="absolute inset-0 bg-gradient-to-br from-primary via-secondary to-accent flex flex-col items-center justify-center p-6 text-center text-white">
        <span className={isCatalog ? "text-4xl mb-3" : "text-6xl mb-4"}>📰</span>
        <h4 className={`font-bold leading-snug line-clamp-2 ${isCatalog ? "text-lg" : "text-xl max-w-md"}`}>
          {title}
        </h4>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={title}
      className={`w-full h-full object-cover ${
        isCatalog ? "transition-transform duration-500 hover:scale-105" : ""
      }`}
      onError={() => setHasError(true)}
    />
  );
}
