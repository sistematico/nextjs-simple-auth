import React, { useState } from "react";
import { EyeOff, Eye } from "lucide-react";

const PasswordField = () => {
  const [showPassword, setShowPassword] = useState(false);

  const handleToggle = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="relative">
      <input
        type={showPassword ? "text" : "password"}
        className="pr-10" // Add padding to the right for the icon
        placeholder="Password"
      />
      <button
        type="button"
        onClick={handleToggle}
        className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
      >
        {showPassword ? (
          <EyeOff className="h-5 w-5 text-gray-500" />
        ) : (
          <Eye className="h-5 w-5 text-gray-500" />
        )}
      </button>
    </div>
  );
};

export default PasswordField;
