import { Link } from 'react-router-dom';
import { useState } from 'react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <nav className="fixed top-0 w-full z-50 bg-[#0a0a0a]/50 backdrop-blur-lg border-b border-white/[0.08] shadow-[0_4px_30px_rgba(0,0,0,0.1)] flex justify-between items-center px-10 md:px-16 py-8">
        <div className="text-xl font-bold tracking-tighter text-orange-200 font-headline">
          Finagement
        </div>
        <div className="hidden md:flex items-center space-x-16">
          <Link className="text-orange-200 font-bold font-label text-xs tracking-widest hover:text-orange-100 transition-colors duration-300" to="/">HOME</Link>
          <Link className="text-stone-500 font-medium font-label text-xs tracking-widest hover:text-orange-100 transition-colors duration-300" to="/about">ABOUT</Link>
          <Link className="text-stone-500 font-medium font-label text-xs tracking-widest hover:text-orange-100 transition-colors duration-300" to="/modules">MODULES</Link>
        </div>
        <div className="flex items-center space-x-10">
          <Link to="/modules/tvm" className="hidden md:block">
            <button className="font-label text-xs tracking-widest text-orange-200 hover:text-orange-100 transition-colors duration-300 font-bold">
              START LEARNING
            </button>
          </Link>
          {isOpen ? (
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-x text-orange-200 cursor-pointer md:hidden" onClick={() => setIsOpen(false)}>
              <line x1="18" x2="6" y1="6" y2="18"></line>
              <line x1="6" x2="18" y1="6" y2="18"></line>
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-menu text-orange-200 cursor-pointer md:hidden" onClick={() => setIsOpen(true)}>
              <line x1="4" x2="20" y1="12" y2="12"></line>
              <line x1="4" x2="20" y1="6" y2="6"></line>
              <line x1="4" x2="20" y1="18" y2="18"></line>
            </svg>
          )}
        </div>
      </nav>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="fixed top-[100px] left-0 w-full z-40 bg-[#0a0a0a]/70 backdrop-blur-lg border-b border-t border-white/[0.08] shadow-[0_4px_30px_rgba(0,0,0,0.1)] flex flex-col items-center py-10 space-y-8 md:hidden">
          <Link onClick={() => setIsOpen(false)} className="text-orange-200 font-bold font-label text-xs tracking-widest hover:text-orange-100 transition-colors duration-300 uppercase" to="/">HOME</Link>
          <Link onClick={() => setIsOpen(false)} className="text-stone-500 font-medium font-label text-xs tracking-widest hover:text-orange-100 transition-colors duration-300 uppercase" to="/about">ABOUT</Link>
          <Link onClick={() => setIsOpen(false)} className="text-stone-500 font-medium font-label text-xs tracking-widest hover:text-orange-100 transition-colors duration-300 uppercase" to="/modules">MODULES</Link>
          <Link onClick={() => setIsOpen(false)} to="/modules/tvm">
            <button className="font-label text-xs tracking-widest text-orange-200 hover:text-orange-100 transition-colors duration-300 font-bold mt-2">LEARN</button>
          </Link>
        </div>
      )}
    </>
  );
}
