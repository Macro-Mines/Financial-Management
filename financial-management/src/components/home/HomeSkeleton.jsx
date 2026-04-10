import React from 'react';
import { Skeleton } from '../ui/skeleton';

export default function HomeSkeleton() {
  return (
    <div className="flex-grow flex flex-col bg-surface-container-lowest">
      {/* Hero Section Skeleton */}
      <section className="relative min-h-screen flex items-center px-10 md:px-16 lg:px-24 pt-40 pb-32 overflow-hidden">
        <div className="grid grid-cols-12 w-full gap-12 items-center relative z-10">
          <div className="col-span-12 lg:col-span-9 xl:col-span-8">
            {/* Tagline */}
            <div className="mb-10">
              <Skeleton className="h-4 w-48" />
            </div>
            
            {/* Heading Lines */}
            <div className="space-y-4 mb-16">
              <Skeleton className="h-16 md:h-24 w-full md:w-[600px]" />
              <Skeleton className="h-16 md:h-24 w-full md:w-[700px]" />
            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row items-start gap-6 sm:gap-10">
              <Skeleton className="h-16 w-[280px] sm:w-[300px]" />
              <Skeleton className="h-16 w-[280px] sm:w-[300px]" />
            </div>
          </div>

          {/* Technical Offset Label Skeleton */}
          <div className="hidden lg:block lg:col-span-3 xl:col-span-4 mt-auto">
            <div className="text-right max-w-[280px] ml-auto">
              <div className="mb-6 h-px w-32 bg-outline-variant/30 ml-auto"></div>
              <Skeleton className="h-20 w-full" />
            </div>
          </div>
        </div>

        {/* Visual Element Placeholder */}
        <div className="absolute right-0 bottom-0 w-2/5 h-4/5 bg-surface-container-low z-[-1] translate-x-12 translate-y-12 border-l border-t border-white/5">
          <Skeleton className="w-full h-full opacity-20" />
        </div>
      </section>

      {/* Marquee Section Skeleton */}
      <section className="py-32 bg-stone-950 border-t border-white/5 relative">
        <div className="flex flex-col space-y-8">
          <div className="flex gap-8 overflow-hidden px-10">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <Skeleton key={`mq1-${i}`} className="h-20 md:h-32 w-48 flex-shrink-0" />
            ))}
          </div>
          <div className="flex gap-8 overflow-hidden px-10 justify-end">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <Skeleton key={`mq2-${i}`} className="h-20 md:h-32 w-48 flex-shrink-0" />
            ))}
          </div>
        </div>
      </section>

      {/* Curriculum Grid Section Skeleton */}
      <section className="px-10 md:px-16 lg:px-24 py-40 bg-stone-950 border-t border-white/5">
        <div className="mb-24">
          <div className="flex items-center gap-4 mb-6">
            <div className="h-px w-12 bg-primary/20"></div>
            <Skeleton className="h-4 w-32" />
          </div>
          <Skeleton className="h-12 w-64 mb-10" />
          <Skeleton className="h-20 w-full max-w-2xl" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={`card-${i}`} className="bg-surface-container-low p-12 border border-white/5 min-h-[400px] flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-start mb-12">
                  <Skeleton className="h-8 w-8 rounded-full" />
                  <Skeleton className="h-8 w-12" />
                </div>
                <Skeleton className="h-8 w-48 mb-6" />
                <Skeleton className="h-16 w-full mb-10" />
              </div>
              <div className="flex gap-4">
                <Skeleton className="h-6 w-20" />
                <Skeleton className="h-6 w-24" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Functional Areas Skeleton */}
      <section className="py-50 bg-stone-950 border-t border-white/5 flex flex-col items-center justify-center">
        <div className="mb-20 text-center px-6">
          <Skeleton className="h-4 w-32 mx-auto mb-6" />
          <Skeleton className="h-10 w-64 mx-auto mb-4" />
          <Skeleton className="h-16 w-full max-w-2xl mx-auto" />
        </div>
        <div className="w-full max-w-4xl h-[600px] flex items-center justify-center relative">
          <Skeleton className="w-[500px] h-[500px] rounded-full opacity-10" />
          <div className="absolute inset-0 flex items-center justify-center">
             <Skeleton className="h-20 w-20 rounded-full" />
          </div>
        </div>
      </section>

      {/* CTA Section Skeleton */}
      <section className="py-48 px-10 md:px-16 lg:px-24 text-center bg-stone-950 border-t border-white/5">
        <div className="max-w-4xl mx-auto">
          <Skeleton className="h-16 md:h-24 w-full max-w-3xl mx-auto mb-16" />
          <Skeleton className="h-12 w-full max-w-xl mx-auto mb-20" />
          <div className="flex justify-center">
            <Skeleton className="h-20 w-64" />
          </div>
        </div>
      </section>
    </div>
  );
}
