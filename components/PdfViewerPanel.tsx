
/// <reference path="../global.d.ts" />

import React, { useRef, useEffect, useState } from 'react';
import { Document, Page, pdfjs, Outline } from 'react-pdf';
import './pdf-viewer.css';

// Ensure worker is loaded from CDN with correct protocol and extension
pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

interface PdfViewerPanelProps {
  isOpen: boolean;
  onClose: () => void;
  pageNumber: number;
  pdfUrl: string | null;
  onFilePathChange: (path: string | null) => void; // Changed from onFileChange
  onPageChange: (page: number) => void;
  numPages: number | null;
  setNumPages: (num: number) => void;
  onWidthChange?: (width: number) => void; // New prop
}

export const PdfViewerPanel: React.FC<PdfViewerPanelProps> = ({
  isOpen,
  onClose,
  pageNumber,
  pdfUrl,
  onFilePathChange, // Changed prop name
  onPageChange,
  numPages,
  setNumPages,
  onWidthChange
}) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState<number | null>(null);
  const [showToc, setShowToc] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(800);
  const [pdf, setPdf] = useState<any | null>(null);

  useEffect(() => {
    // Initialize parent width
    if (onWidthChange) onWidthChange(width);
  }, []);

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    const startX = e.clientX;
    const startWidth = width;

    const handleMouseMove = (e: MouseEvent) => {
      const newWidth = startWidth - (e.clientX - startX);
      if (newWidth > 400 && newWidth < window.innerWidth - 200) {
        setWidth(newWidth);
        if (onWidthChange) onWidthChange(newWidth); // Report to parent
      }
    };

    const handleMouseUp = () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      // Trigger a resize recalc after drag ends
      if (contentRef.current) {
        setContainerWidth(contentRef.current.clientWidth);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
  };

  useEffect(() => {
    const handleResize = () => {
      if (contentRef.current) {
        setContainerWidth(contentRef.current.clientWidth);
      }
    };

    // Initial measure and on window resize/panel open
    handleResize();
    // Also trigger when width changes specifically
    if (isOpen) {
        setTimeout(handleResize, 300); // Delay for transition
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isOpen, width]);

  const handleOpenDialog = async () => {
    const filePath = await window.electron.openFileDialog();
    if (filePath) {
      onFilePathChange(filePath);
      setShowToc(false);
    }
  };

  const onDocumentLoadSuccess = (pdfDoc: any) => {
    setPdf(pdfDoc);
    setNumPages(pdfDoc.numPages);
    // Do not force reset page if we are just reloading same doc context, 
    // but here we assume new doc or init. 
    // If preserving page is needed, remove this line or check prev file.
    if (!numPages) onPageChange(1); 
  };

  return (
    <div
      ref={panelRef}
      style={{ width: isOpen ? `${width}px` : '0px' }}
      className={`fixed top-20 right-0 bottom-0 z-40 bg-slate-900 border-l-2 border-termina-accent shadow-2xl transition-all duration-300 ease-in-out flex flex-col overflow-hidden ${
        isOpen ? 'translate-x-0' : 'translate-x-full opacity-0'
      }`}
    >
      <div
        onMouseDown={handleMouseDown}
        className="absolute top-0 left-0 w-2 h-full bg-transparent cursor-col-resize z-10 hover:bg-termina-accent/10 transition-colors"
      />
      <div className="p-3 bg-slate-900 border-b border-slate-700 flex justify-between items-center shrink-0 min-w-[300px]">
        <div className="flex items-center gap-4">
          <h3 className="font-serif font-bold text-termina-gold text-lg whitespace-nowrap">Adventure Book</h3>
          <button
            onClick={handleOpenDialog} // Updated onClick
            className="text-xs bg-slate-800 hover:bg-slate-700 text-slate-300 px-2 py-1 rounded border border-slate-600 transition-colors whitespace-nowrap"
          >
            {pdfUrl ? 'Change PDF' : 'Import PDF'}
          </button>
        </div>
        <div className="flex items-center gap-3">
          {!showToc && (
            <>
                <span className="text-xs font-mono text-slate-400 whitespace-nowrap">
                    {pdfUrl ? `Page ${pageNumber} / ${numPages || '--'}` : 'No File'}
                </span>
                {numPages && numPages > 1 && (
                    <>
                    <button
                        onClick={() => onPageChange(Math.max(1, pageNumber - 1))}
                        disabled={pageNumber <= 1}
                        className="bg-slate-800 hover:bg-slate-700 text-slate-400 p-1 rounded border border-slate-600 text-xs transition-colors disabled:opacity-50"
                    >
                        Prev
                    </button>
                    <button
                        onClick={() => onPageChange(Math.min(numPages, pageNumber + 1))}
                        disabled={pageNumber >= numPages}
                        className="bg-slate-800 hover:bg-slate-700 text-slate-400 p-1 rounded border border-slate-600 text-xs transition-colors disabled:opacity-50"
                    >
                        Next
                    </button>
                    </>
                )}
            </>
          )}
          
          {pdf && (
            <button
              onClick={() => setShowToc(!showToc)}
              className={`px-2 py-1 rounded border text-xs transition-colors whitespace-nowrap flex items-center gap-1 ${
                  showToc 
                  ? 'bg-termina-accent text-black border-termina-accent hover:bg-white' 
                  : 'bg-slate-800 hover:bg-slate-700 text-termina-accent border-slate-600'
              }`}
            >
              {showToc ? (
                  <>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <span>Page</span>
                  </>
              ) : (
                  <>
                    <svg xmlns="http://www.w3.000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                    </svg>
                    <span>Contents</span>
                  </>
              )}
            </button>
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
      <div
        ref={contentRef}
        className="flex-1 bg-slate-800 w-full h-full overflow-auto pdf-panel-content relative"
      >
        {pdfUrl ? (
          <Document
            file={pdfUrl}
            onLoadSuccess={onDocumentLoadSuccess}
            className="react-pdf__Document flex flex-col items-center min-h-full"
            loading={
                <div className="flex items-center justify-center h-64 text-termina-accent">
                    <span className="animate-pulse">Loading PDF...</span>
                </div>
            }
          >
            {showToc ? (
              <div className="w-full text-left bg-slate-900 min-h-full toc-outline">
                  <h4 className="text-termina-gold font-serif font-bold text-xl mb-4 px-2">Table of Contents</h4>
                  <Outline
                    onItemClick={({ pageNumber }) => {
                      onPageChange(pageNumber);
                      setShowToc(false);
                    }}
                  />
              </div>
            ) : (
              <Page
                pageNumber={pageNumber}
                // Fit width logic: use container width minus vertical scrollbar buffer if needed
                width={containerWidth ? containerWidth - 2 : undefined} 
                renderTextLayer={false} // Disable text layer for performance/cleaner look if desired, or keep true
                renderAnnotationLayer={true}
                className="shadow-lg"
              />
            )}
          </Document>
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-500 p-8 text-center min-w-[300px]">
            <p className="mb-4">Please import the PDF to view the guide.</p>
            <button
              onClick={handleOpenDialog} // Updated onClick
              className="bg-termina-accent text-black px-6 py-2 rounded font-bold hover:bg-white transition-colors shadow-[0_0_15px_rgba(216,180,254,0.3)]"
            >
              Select PDF File
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
