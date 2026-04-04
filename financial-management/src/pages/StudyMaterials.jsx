import { motion } from 'framer-motion';
import { FileText, FileSpreadsheet, Download, Eye } from 'lucide-react';

export default function StudyMaterials() {
  // Import all PDF and PPT files from the StudyMaterial directory
  const rawFiles = import.meta.glob('/src/StudyMaterial/*.{pdf,ppt,pptx}', { query: '?url', eager: true });

  const files = Object.entries(rawFiles).map(([path, module]) => {
    const fileName = path.split('/').pop();
    const extension = fileName.split('.').pop().toLowerCase();
    return {
      id: path,
      name: fileName,
      url: module.default,
      type: extension === 'pdf' ? 'PDF Document' : 'PowerPoint Presentation',
      icon: extension === 'pdf' ? <FileText className="w-6 h-6" /> : <FileSpreadsheet className="w-6 h-6" />
    };
  });

  return (
    <main className="relative z-10 pt-32 pb-24 px-8 max-w-screen-xl mx-auto min-h-screen">
      <motion.header 
        className="mb-20"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-primary-container mb-4">
          RESOURCES
        </p>
        <h1 className="text-6xl md:text-8xl font-headline font-bold tracking-tight text-primary leading-none mb-8">
          Study Materials
        </h1>
        <p className="text-xl md:text-2xl font-light leading-relaxed text-on-surface-variant font-body max-w-2xl">
          Access comprehensive PDFs and presentations covering all modules of financial management.
        </p>
      </motion.header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {files.length > 0 ? (
          files.map((file, idx) => (
            <motion.div
              key={file.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              className="group relative bg-surface-container-low p-8 border border-white/5 hover:bg-surface-container-high transition-all duration-300 flex flex-col justify-between h-full"
            >
              <div>
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-3 bg-surface-container-highest border border-white/5 text-primary-container">
                    {file.icon}
                  </div>
                  <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-outline/50">{file.type}</span>
                </div>
                <h3 className="text-lg font-headline font-bold text-on-surface mb-8 group-hover:text-primary transition-colors line-clamp-2">
                  {file.name}
                </h3>
              </div>

              <div className="flex gap-4">
                <a 
                  href={file.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 py-3 bg-surface-container-highest border border-white/10 font-label text-[10px] tracking-[0.2em] uppercase hover:bg-primary hover:text-on-primary transition-all duration-300"
                >
                  <Eye className="w-4 h-4" />
                  VIEW
                </a>
                <a 
                  href={file.url} 
                  download={file.name}
                  className="flex-1 flex items-center justify-center gap-2 py-3 border border-white/10 font-label text-[10px] tracking-[0.2em] uppercase hover:border-primary/50 hover:text-primary transition-all duration-300"
                >
                  <Download className="w-4 h-4" />
                  DOWNLOAD
                </a>
              </div>
            </motion.div>
          ))
        ) : (
          <div className="col-span-full py-20 text-center border border-dashed border-white/10">
            <p className="text-on-surface-variant font-body">No study materials found in src/StudyMaterial.</p>
          </div>
        )}
      </div>
    </main>
  );
}
