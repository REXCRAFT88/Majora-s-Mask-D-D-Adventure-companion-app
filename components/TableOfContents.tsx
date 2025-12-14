import React from 'react';
import { PdfOutline, OutlineItem } from '../types';

interface TableOfContentsProps {
  outline: PdfOutline;
  onItemClick: (dest: any) => void;
}

const TableOfContents: React.FC<TableOfContentsProps> = ({ outline, onItemClick }) => {
  const handleItemClick = (dest: any) => {
    onItemClick(dest);
  };

  const renderOutline = (items: OutlineItem[], level = 0) => {
    const isChapter = level === 0;

    return (
      <ul className="text-white">
        {items.map((item, index) => (
          <li key={index} className="my-1">
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                handleItemClick(item.dest);
              }}
              className={`hover:underline ${
                isChapter
                  ? 'text-xl font-bold text-termina-gold'
                  : 'text-base text-slate-300'
              }`}
              style={{ paddingLeft: `${level * 1}rem` }}
            >
              {item.title}
            </a>
            {item.items.length > 0 && renderOutline(item.items, level + 1)}
          </li>
        ))}
      </ul>
    );
  };

  return (
    <div className="p-4 bg-slate-800 border-b border-slate-700 h-full overflow-y-auto">
      <h4 className="font-bold text-xl text-white mb-4">Table of Contents</h4>
      {outline.length > 0 ? (
        renderOutline(outline)
      ) : (
        <p className="text-slate-400">No table of contents found in this PDF.</p>
      )}
    </div>
  );
};

export default TableOfContents;
