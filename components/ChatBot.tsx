import React, { useState, useRef, useEffect } from 'react';
import { sendMessageToGemini } from '../services/geminiService';

export const ChatBot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{role: 'user' | 'ai', text: string}[]>([
    { role: 'ai', text: "I am Tatl. What do you want to know about these people?" }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isOpen]);

  const handleSend = async () => {
    if (!input.trim() || loading) return;
    const userMsg = input;
    setInput("");
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setLoading(true);

    const response = await sendMessageToGemini(userMsg);
    setMessages(prev => [...prev, { role: 'ai', text: response }]);
    setLoading(false);
  };

  return (
    <div className="fixed bottom-4 right-4 z-40 flex flex-col items-end">
      {isOpen && (
        <div className="bg-slate-900 border border-termina-accent w-80 h-96 rounded-lg shadow-2xl flex flex-col mb-4 overflow-hidden">
          <div className="bg-termina-dark p-3 border-b border-slate-700 flex justify-between items-center">
            <h3 className="font-bold text-termina-accent">Termina Guide</h3>
            <button onClick={() => setIsOpen(false)} className="text-slate-400 hover:text-white">&times;</button>
          </div>
          
          <div className="flex-1 overflow-y-auto p-3 space-y-3" ref={scrollRef}>
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] rounded p-2 text-sm ${m.role === 'user' ? 'bg-termina-accent text-black' : 'bg-slate-800 text-slate-200'}`}>
                  {m.text}
                </div>
              </div>
            ))}
            {loading && <div className="text-xs text-slate-500 animate-pulse">Consulting the stars...</div>}
          </div>

          <div className="p-3 border-t border-slate-700 flex gap-2">
            <input 
              type="text" 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Ask about an NPC..."
              className="flex-1 bg-slate-800 border border-slate-700 rounded px-2 py-1 text-sm focus:outline-none focus:border-termina-accent text-white"
            />
            <button 
              onClick={handleSend}
              disabled={loading}
              className="bg-termina-accent text-black px-3 py-1 rounded text-sm font-bold hover:bg-white transition-colors disabled:opacity-50"
            >
              Send
            </button>
          </div>
        </div>
      )}

      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="bg-termina-accent hover:bg-white text-black rounded-full p-4 shadow-lg transition-all transform hover:scale-105 font-bold"
      >
        {isOpen ? 'Close Guide' : 'Ask Guide'}
      </button>
    </div>
  );
};