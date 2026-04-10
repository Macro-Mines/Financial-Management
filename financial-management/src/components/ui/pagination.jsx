import * as React from "react"
import { Link } from "react-router-dom"
import { motion } from "framer-motion"

const Pagination = ({ className, ...props }) => (
  <nav
    role="navigation"
    aria-label="pagination"
    className={`mx-auto flex w-full justify-center ${className}`}
    {...props}
  />
)

const PaginationContent = React.forwardRef(({ className, ...props }, ref) => (
  <ul
    ref={ref}
    className={`flex flex-row items-center gap-1 ${className}`}
    {...props}
  />
))

/**
 * PaginationList - Dynamic scrollable container for page indices.
 * Displays ~3 items at a time with premium masked edges.
 */
const PaginationList = React.forwardRef(({ className, children, ...props }, ref) => (
  <div className="relative flex items-center">
    {/* Left Fade Mask */}
    <div className="absolute left-0 top-0 bottom-0 w-8 z-10 pointer-events-none bg-gradient-to-r from-[var(--color-surface-container-low)] to-transparent opacity-0 transition-opacity" />
    
    <div 
      className={`
        flex items-center overflow-x-auto scrollbar-hide snap-x snap-mandatory 
        max-w-[132px] md:max-w-[144px] px-1 gap-1
        [mask-image:linear-gradient(to_right,transparent,black_20%,black_80%,transparent)]
        ${className}
      `}
      style={{ scrollBehavior: 'smooth' }}
      {...props}
    >
      <div className="flex gap-1 py-1">
        {children}
      </div>
    </div>

    {/* Right Fade Mask - Handled by the mask-image above for a cleaner look */}
  </div>
))

const PaginationItem = React.forwardRef(({ className, ...props }, ref) => (
  <li ref={ref} className={`snap-center ${className}`} {...props} />
))

const PaginationLink = ({
  className,
  isActive,
  size = "icon",
  ...props
}) => {
  const ref = React.useRef(null)

  React.useEffect(() => {
    if (isActive && ref.current) {
      ref.current.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "center",
      })
    }
  }, [isActive])

  return (
    <Link
      ref={ref}
      aria-current={isActive ? "page" : undefined}
      className={`
        inline-flex items-center justify-center rounded-md text-sm font-medium transition-all duration-300
        ${size === "default" ? "h-10 px-4 py-2" : "h-10 w-10"}
        ${isActive 
          ? "bg-gold/20 text-gold border border-gold/30 shadow-[0_0_15px_rgba(201,169,110,0.1)] scale-110" 
          : "text-on-surface-variant hover:bg-surface-container-high hover:text-primary"}
        ${className}
      `}
      {...props}
    />
  )
}

const PaginationPrevious = ({
  className,
  ...props
}) => (
  <PaginationLink
    aria-label="Go to previous page"
    size="default"
    className={`gap-1 pl-2.5 hover:-translate-x-0.5 ${className}`}
    {...props}
  >
    <span className="material-symbols-outlined text-[20px]">chevron_left</span>
    <span className="hidden sm:inline">Previous</span>
  </PaginationLink>
)

const PaginationNext = ({
  className,
  ...props
}) => (
  <PaginationLink
    aria-label="Go to next page"
    size="default"
    className={`gap-1 pr-2.5 hover:translate-x-0.5 ${className}`}
    {...props}
  >
    <span className="hidden sm:inline">Next</span>
    <span className="material-symbols-outlined text-[20px]">chevron_right</span>
  </PaginationLink>
)

const PaginationEllipsis = ({
  className,
  ...props
}) => (
  <span
    aria-hidden
    className={`flex h-9 w-9 items-center justify-center ${className}`}
    {...props}
  >
    <span className="material-symbols-outlined text-[20px]">more_horiz</span>
    <span className="sr-only">More pages</span>
  </span>
)

export {
  Pagination,
  PaginationContent,
  PaginationList,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
}
