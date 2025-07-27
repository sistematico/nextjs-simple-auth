"use client";

import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Input } from "@/components/ui/input";

export function InputPassword({ className = "", showStrength = false, ...props }) {
  const [isVisible, setIsVisible] = useState(false);
  const toggleVisibility = () => setIsVisible(prevState => !prevState);

  return (
    <div className="relative">
      <Input
        type={isVisible ? "text" : "password"}
        className={`pr-10 ${className || ""}`}
        {...props}
      />
      <button
        className="absolute inset-y-0 end-0 flex items-center z-20 px-3 cursor-pointer text-gray-400 rounded-e-md focus:outline-none focus-visible:text-foreground/80 hover:text-foreground/80 transition-colors"
        type="button"
        onClick={toggleVisibility}
        aria-label={isVisible ? "Ocultar senha" : "Mostrar senha"}
        aria-pressed={isVisible}
      >
        {isVisible ? (
          <EyeOff size={18} aria-hidden="true" />
        ) : (
          <Eye size={18} aria-hidden="true" />
        )}
      </button>
    </div>
  );
}