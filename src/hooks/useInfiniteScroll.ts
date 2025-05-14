import { useState, useEffect, useRef, useCallback } from "react";
import { Video } from "../types";
import { getVideoBatch, BATCH_SIZE, OBSERVER_OPTIONS } from "../constants";

// Custom hook to handle infinite scrolling of videos
const useInfiniteScroll = (): {
  videos: Video[];
  loadMore: () => void;
  currentIndex: number;
  setCurrentIndex: (index: number) => void;
  observerRef: React.RefObject<IntersectionObserver>;
  lastVideoRef: (node: HTMLDivElement) => void;
} => {
  const [videos, setVideos] = useState<Video[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const lastVideoElementRef = useRef<HTMLDivElement | null>(null);

  // Initialize with first batch of videos
  useEffect(() => {
    setVideos(getVideoBatch(0, BATCH_SIZE * 2));
  }, []);

  // Load more videos
  const loadMore = useCallback(() => {
    const newVideos = getVideoBatch(videos.length % 9, BATCH_SIZE);
    setVideos(prev => [...prev, ...newVideos]);
  }, [videos.length]);

  // Set up intersection observer for infinite scrolling
  useEffect(() => {
    if (observerRef.current) {
      observerRef.current.disconnect();
    }

    observerRef.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        loadMore();
      }
    }, OBSERVER_OPTIONS);

    if (lastVideoElementRef.current) {
      observerRef.current.observe(lastVideoElementRef.current);
    }

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [loadMore]);

  // Callback ref for the last video element
  const lastVideoRef = useCallback((node: HTMLDivElement) => {
    lastVideoElementRef.current = node;
    
    if (observerRef.current && node) {
      observerRef.current.disconnect();
      observerRef.current.observe(node);
    }
  }, []);

  return {
    videos,
    loadMore,
    currentIndex,
    setCurrentIndex,
    observerRef: observerRef as React.RefObject<IntersectionObserver>,
    lastVideoRef,
  };
};

export default useInfiniteScroll;