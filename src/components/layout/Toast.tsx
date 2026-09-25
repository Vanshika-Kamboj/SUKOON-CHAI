import React from 'react';
import { useShop } from '../../context/ShopContext';
import { CheckCircle2, Info, AlertTriangle } from 'lucide-react';

export const Toast: React.FC = () => {
  const { toast } = useShop();

  if (!toast) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-in fade-in slide-in-from-bottom-5 duration-300 pointer-events-none">
      <div className="bg-[#3E2A20] text-[#FFF9F0] border border-[#B96F4A]/40 px-4 py-3 rounded-2xl shadow-xl flex items-center gap-3 text-xs sm:text-sm font-medium">
        {toast.type === 'warn' ? (
          <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
        ) : toast.type === 'info' ? (
          <Info className="w-4 h-4 text-[#E7D5BA] shrink-0" />
        ) : (
          <CheckCircle2 className="w-4 h-4 text-[#7B8665] shrink-0" />
        )}
        <span className="leading-tight">{toast.message}</span>
      </div>
    </div>
  );
};
