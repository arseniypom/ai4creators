"use client";

import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { GeneratedContent, ContentGenerationRequest } from "@/lib/types";

export function useContentGenerator() {
  const [content, setContent] = useState<GeneratedContent | null>(null);
  const [error, setError] = useState<string | null>(null);

  const mutation = useMutation({
    mutationFn: async (request: ContentGenerationRequest) => {
      const response = await fetch("/api/generate-content", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(request),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to generate content");
      }

      return response.json();
    },
    onSuccess: (data) => {
      setContent(data);
      setError(null);
    },
    onError: (error: Error) => {
      setError(error.message);
    },
  });

  const generateContent = (request: ContentGenerationRequest) => {
    mutation.mutate(request);
  };

  const resetContent = () => {
    setContent(null);
    setError(null);
    mutation.reset();
  };

  return {
    content,
    isLoading: mutation.isPending,
    error,
    generateContent,
    resetContent,
  };
}
