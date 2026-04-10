import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRightIcon } from '@radix-ui/react-icons';
import { ArrowUpRight } from 'lucide-react';
import { FlickeringGrid } from '../ui/flickering-grid';

export function useMediaQuery(query) {
  const [value, setValue] = useState(false);

  useEffect(() => {
    function checkQuery() {
      const result = window.matchMedia(query);
      setValue(result.matches);
    }

    checkQuery();
    window.addEventListener('resize', checkQuery);

    const mediaQuery = window.matchMedia(query);
    mediaQuery.addEventListener('change', checkQuery);

    return () => {
      window.removeEventListener('resize', checkQuery);
      mediaQuery.removeEventListener('change', checkQuery);
    };
  }, [query]);

  return value;
}

export default function Footer() {
  const tablet = useMediaQuery('(max-width: 1024px)');
  const mobile = useMediaQuery('(max-width: 640px)');

  const footerLinks = [
    {
      title: 'MODULES',
      links: [
        { id: 1, title: 'TIME VALUE OF MONEY', url: '/modules/tvm' },
        { id: 2, title: 'COST OF CAPITAL', url: '/modules/cost-of-capital' },
        { id: 3, title: 'LEVERAGE', url: '/modules/leverage' },
        { id: 4, title: 'CAPITAL STRUCTURE', url: '/modules/capital-structure' },
        { id: 5, title: 'CAPITAL BUDGETING', url: '/modules/capital-budgeting' },
        { id: 11, title: 'DIVIDEND DECISIONS', url: '/modules/dividend-decisions' },
      ],
    },
    {
      title: 'RESOURCES',
      links: [
        { id: 6, title: 'ALL MODULES', url: '/modules' },
        { id: 7, title: 'ABOUT', url: '/about' },
        { id: 8, title: 'STUDY MATERIALS', url: '/study-materials' },
        { id: 9, title: 'VIDEO COURSE', url: '/video-course' },
      ],
    },
  ];

  return (
    <footer id="footer" className="w-full pb-0 bg-stone-950 border-t border-white/5 relative overflow-hidden">
      <div className="max-w-7xl mx-auto w-full">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between px-10 md:px-16 lg:px-24 pt-32 pb-16 z-20 relative">
          {/* Left Side */}
          <div className="flex flex-col items-start justify-start gap-y-5 max-w-sm mx-0">
            <Link to="/" className="flex items-center gap-2">
              <div className="text-2xl font-bold tracking-[0.2em] text-orange-200 font-headline uppercase">Finagement</div>
            </Link>
            <p className="tracking-widest text-outline font-medium text-sm leading-relaxed font-body">
              Master financial management through interactive tools, visual learning, and real-world problem solving.
            </p>
            <a
              href="https://financial-statement-analyser.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 flex items-center justify-center gap-3 px-6 py-4 border border-primary/30 text-primary font-label font-bold text-xs tracking-[0.2em] hover:bg-surface-container-high hover:border-primary/60 transition-all duration-500 rounded-none uppercase group"
            >
              FINANCIAL STATEMENT ANALYSIS
              <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
            </a>
          </div>

          {/* Right Side */}
          <div className="pt-24 md:pt-0 md:w-[60%] lg:w-1/2">
            <div className="flex flex-col items-start justify-start sm:flex-row sm:items-start sm:justify-between gap-y-16 lg:pl-10">
              {footerLinks.map((column, columnIndex) => (
                <ul key={columnIndex} className="flex flex-col gap-y-6">
                  <li className="mb-2 font-label text-[10px] tracking-[0.3em] text-primary uppercase">
                    {column.title}
                  </li>
                  {column.links.map((link) => (
                    <li
                      key={link.id}
                      className="group inline-flex cursor-pointer items-center justify-start gap-1 font-label text-xs tracking-widest text-outline-variant hover:text-orange-200 transition-colors duration-300 uppercase"
                    >
                      <Link to={link.url}>{link.title}</Link>
                      <div className="flex size-4 items-center justify-center border border-white/10 rounded translate-x-0 transform opacity-0 transition-all duration-300 ease-out group-hover:translate-x-1 group-hover:opacity-100 group-hover:border-orange-200/30 text-orange-200">
                        <ChevronRightIcon className="h-3 w-3" />
                      </div>
                    </li>
                  ))}
                </ul>
              ))}
            </div>
          </div>
        </div>

        {/* Footer Bottom Bar */}
        <div className="px-10 md:px-16 lg:px-24 relative z-20">
          <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center text-[10px] font-label text-outline/30 tracking-[0.3em] uppercase">
            <span>© 2026 FINANCIAL MANAGEMENT.</span>
            <span className="mt-8 md:mt-0 italic tracking-[0.4em]">ABHINAV RAJ MBA F.T.</span>
          </div>
        </div>
      </div>

      {/* Flickering Grid Background Section */}
      <div className="w-full h-80 sm:h-96 md:h-[28rem] relative mt-16 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-t from-transparent to-stone-950 z-10 from-20% md:from-40%" />
        <div className="absolute inset-0 mx-0 overflow-hidden">
          <FlickeringGrid
            text={mobile ? "FINANCE" : tablet ? "Finagement" : "Finagement"}
            fontSize={mobile ? 80 : tablet ? 150 : 220}
            fontWeight="bold"
            className="h-full w-full opacity-70"
            squareSize={3}
            gridGap={4}
            color="#fdba74"
            maxOpacity={0.3}
            flickerChance={0.08}
          />
        </div>
      </div>
    </footer>
  );
}
