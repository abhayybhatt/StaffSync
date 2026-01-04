import { User } from "lucide-react";
import React from "react";

const StatsCard = ({
  title,
  value,
  icon,
  bgIcon = "bg-gray-700",
  iconColor = "text-white",
  gradient = "from-gray-900 to-gray-800",
  description = "",
}) => {
  return (
    <div className={`rounded-lg shadow-lg p-6 bg-gradient-to-r ${gradient} border border-gray-800 transform hover:scale-105 transition-all`}>
      <div className="flex justify-between items-start">
        <div>
          <p className="text-gray-300 text-sm font-medium">{title}</p>
          <p className="text-3xl font-bold mt-2" style={{color: value.color || "white"}}>{value.number}</p>
          {/* Conditional Rendering */}
          {description && (
            <p className="text-gray-400 text-sm mt-1">{description}</p>
          )}
        </div>
        {/* Icon */}
        <div className={`${bgIcon} p-3 rounded-lg flex items-center justify-center`}>
          {React.cloneElement(icon, { className: `${iconColor}`, size: 22 })}
        </div>
      </div>
    </div>
  );
};

export default StatsCard;
