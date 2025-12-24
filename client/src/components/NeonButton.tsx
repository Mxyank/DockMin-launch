import React from "react";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import { motion } from "framer-motion";

interface NeonButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  isLoading?: boolean;
  variant?: "primary" | "secondary";
}

export function NeonButton({ 
  children, 
  className, 
  isLoading, 
  variant = "primary",
  ...props 
}: NeonButtonProps) {
  const baseStyles = "relative inline-flex items-center justify-center px-8 py-4 text-lg font-bold uppercase tracking-wider transition-all duration-300 rounded-lg overflow-hidden group";
  
  const variants = {
    primary: "bg-primary text-primary-foreground hover:bg-primary/90 hover:shadow-[0_0_30px_rgba(6,182,212,0.6)] border border-primary/50",
    secondary: "bg-transparent text-primary border border-primary hover:bg-primary/10 hover:shadow-[0_0_20px_rgba(6,182,212,0.4)]",
  };

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={cn(baseStyles, variants[variant], className)}
      disabled={isLoading || props.disabled}
      {...props}
    >
      {isLoading ? (
        <Loader2 className="w-5 h-5 mr-2 animate-spin" />
      ) : null}
      
      <span className="relative z-10 flex items-center gap-2">
        {children}
      </span>
      
      {/* Glint effect */}
      <div className="absolute inset-0 -translate-x-full group-hover:animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent z-0" />
    </motion.button>
  );
}
