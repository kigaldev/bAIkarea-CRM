import React from "react";
import { AlertCircle } from "lucide-react";

interface AlertCircleProps {
  className?: string;
}

const AlertCircleIcon: React.FC<AlertCircleProps> = ({ className }) => {
  return <AlertCircle className={className} />;
};

export default AlertCircleIcon;
