import React from 'react';
import { Skeleton } from '../ui/skeleton';

export default function ModulesSkeleton() {
  return (
    <main className="relative z-10 pt-32 pb-24 px-8 max-w-screen-xl mx-auto">
      {/* Header Section Skeleton */}
      <header className="mb-20">
        <Skeleton className="h-4 w-32 mb-4" />
        <Skeleton className="h-12 md:h-16 w-64 mb-8" />
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          <div className="md:col-span-7">
            <Skeleton className="h-20 w-full" />
          </div>
        </div>
      </header>

      {/* Module List Skeleton */}
      <div className="grid grid-cols-1 gap-12">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={`mod-skel-${i}`} className="bg-surface-container-low p-10 flex flex-col md:flex-row gap-12 border-l border-primary-container/10">
            {/* Left Side: Number and Icon */}
            <div className="flex-none">
              <Skeleton className="h-4 w-12 mb-6" />
              <Skeleton className="w-16 h-16" />
            </div>

            {/* Right Side: Content */}
            <div className="flex-grow">
              <div className="flex justify-between items-start mb-4">
                <Skeleton className="h-8 w-64" />
                <Skeleton className="h-6 w-6" />
              </div>
              <Skeleton className="h-16 w-full max-w-2xl mb-8" />
              
              {/* Topic Tags Placeholder */}
              <div className="flex flex-wrap gap-2 mb-10">
                {[1, 2, 3, 4].map((t) => (
                  <Skeleton key={`tag-${i}-${t}`} className="h-6 w-20" />
                ))}
              </div>

              {/* Calculator Grid Placeholder */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[1, 2, 3].map((c) => (
                  <div key={`calc-${i}-${c}`} className="flex items-center gap-3 p-4 bg-background/50 border-b border-outline-variant/10">
                    <Skeleton className="h-4 w-4 rounded-full" />
                    <Skeleton className="h-4 w-24" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
