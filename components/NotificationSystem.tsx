
import React, { useState, useEffect } from 'react';

export interface Notification {
  id: string;
  message: string;
  type: 'shop' | 'timeline' | 'info';
  action?: () => void;
}

interface NotificationSystemProps {
  notifications: Notification[];
  removeNotification: (id: string) => void;
}

export const NotificationSystem: React.FC<NotificationSystemProps> = ({ notifications, removeNotification }) => {
  return (
    <div className="fixed top-20 right-4 z-50 flex flex-col gap-2 pointer-events-none">
      {notifications.map(notif => (
        <NotificationToast 
          key={notif.id} 
          notification={notif} 
          onClose={() => removeNotification(notif.id)} 
        />
      ))}
    </div>
  );
};

const NotificationToast: React.FC<{ notification: Notification, onClose: () => void }> = ({ notification, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 7000);
    return () => clearTimeout(timer);
  }, [onClose]);

  const getColors = () => {
    switch(notification.type) {
      case 'shop': return 'bg-amber-900/95 border-amber-500 text-amber-100';
      case 'timeline': return 'bg-purple-900/95 border-purple-500 text-purple-100';
      default: return 'bg-slate-800/95 border-slate-500 text-white';
    }
  };

  const getIcon = () => {
    switch(notification.type) {
      case 'shop': return '🗝️';
      case 'timeline': return '⏳';
      default: return 'ℹ️';
    }
  };

  const handleClick = () => {
    if (notification.action) {
      notification.action();
      onClose();
    }
  };

  return (
    <div 
      onClick={handleClick}
      className={`pointer-events-auto flex items-start gap-3 p-4 rounded-lg border shadow-xl backdrop-blur-md animate-slide-in-right w-80 ${getColors()} ${notification.action ? 'cursor-pointer hover:scale-105 transition-transform' : ''}`}
    >
      <div className="text-xl">{getIcon()}</div>
      <div className="flex-1">
        <div className="flex justify-between items-center mb-1">
          <p className="text-xs font-bold uppercase tracking-wider opacity-70">
            {notification.type === 'shop' ? 'New Item Available' : notification.type === 'timeline' ? 'Timeline Altered' : 'Update'}
          </p>
          {notification.action && <span className="text-[9px] bg-black/20 px-1.5 py-0.5 rounded border border-white/10">CLICK TO VIEW</span>}
        </div>
        <p className="text-sm font-medium leading-snug">{notification.message}</p>
      </div>
      <button 
        onClick={(e) => { e.stopPropagation(); onClose(); }} 
        className="text-white/50 hover:text-white p-1 hover:bg-black/20 rounded"
      >
        &times;
      </button>
    </div>
  );
};
