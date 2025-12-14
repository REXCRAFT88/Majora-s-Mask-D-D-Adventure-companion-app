
import React from 'react';

interface WikiViewerPanelProps {
  isOpen: boolean;
  onClose: () => void;
  url: string | null;
  title?: string;
}

export const WikiViewerPanel: React.FC<WikiViewerPanelProps> = ({ 
  isOpen, 
  onClose, 
  url,
  title = "Wiki Reference"
}) => {
  return (
    <div 
      className={`fixed top-20 left-0 bottom-0 z-[50] bg-slate-900 border-r-2 border-termina-accent shadow-2xl transition-all duration-300 ease-in-out flex flex-col overflow-hidden ${
        isOpen ? 'w-full md:w-[600px] lg:w-[800px] translate-x-0' : 'w-0 -translate-x-full opacity-0'
      }`}
    >
      {/* Header */}
      <div className="p-3 bg-slate-900 border-b border-slate-700 flex justify-between items-center shrink-0 min-w-[300px]">
        <div className="flex items-center gap-3">
          <h3 className="font-serif font-bold text-termina-gold text-lg whitespace-nowrap overflow-hidden text-ellipsis max-w-[200px] md:max-w-md">
            {title}
          </h3>
        </div>
        
        <div className="flex items-center gap-2">
          {url && (
            <a 
              href={url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-slate-800 hover:bg-slate-700 text-termina-accent px-3 py-1 rounded border border-slate-600 text-xs transition-colors whitespace-nowrap flex items-center gap-1"
              title="Open in new tab (if blocked)"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
              <span>Open Tab</span>
            </a>
          )}
          <button 
            onClick={onClose}
            className="bg-slate-800 hover:bg-red-900/50 text-slate-400 hover:text-red-200 p-1 rounded transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 bg-white relative w-full h-full">
        {url ? (
          <>
            <div className="absolute inset-0 flex items-center justify-center z-0">
               <span className="text-slate-400 animate-pulse">Loading Scroll...</span>
            </div>
            <iframe 
              src={url}
              className="w-full h-full border-none relative z-10 bg-white"
              title="Wiki Viewer"
              sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
            />
          </>
        ) : (
          <div className="flex items-center justify-center h-full text-slate-500">
            No URL selected.
          </div>
        )}
      </div>
      
      {/* Footer warning for x-frame-options */}
      <div className="bg-slate-900 text-slate-500 text-[10px] p-1 text-center border-t border-slate-800">
        If content does not load, use the "Open Tab" button above. Some scrolls are protected by ancient magic (X-Frame-Options).
      </div>
    </div>
  );
};
