import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

export type MetricType = "heat" | "air" | "flood" | "green" | "waste";

interface MetricCardProps {
  type: MetricType;
  icon: LucideIcon;
  title: string;
  value: string;
  status: "good" | "fair" | "poor" | "critical";
  description: string;
  onClick?: () => void;
  className?: string;
}

const getStatusColor = (status: string) => {
  switch (status) {
    case "good": return "text-score-excellent";
    case "fair": return "text-score-fair";
    case "poor": return "text-score-poor";
    case "critical": return "text-score-critical";
    default: return "text-muted-foreground";
  }
};

const getMetricCardClass = (type: MetricType) => {
  return `metric-card-${type}`;
};

const getIconColorClass = (type: MetricType) => {
  return `text-neon-${type}`;
};

export const MetricCard = ({ 
  type, 
  icon: Icon, 
  title, 
  value, 
  status, 
  description, 
  onClick,
  className 
}: MetricCardProps) => {
  const statusColor = getStatusColor(status);
  const cardClass = getMetricCardClass(type);
  const iconClass = getIconColorClass(type);

  return (
    <div
      className={cn(
        "relative p-4 rounded-xl border cursor-pointer transition-all duration-300 hover-scale",
        cardClass,
        "animate-slide-up",
        className
      )}
      onClick={onClick}
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-black/10 rounded-xl" />
      
      {/* Content */}
      <div className="relative z-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2">
            <Icon className={cn("w-5 h-5", iconClass)} />
            <h3 className="font-medium text-foreground">{title}</h3>
          </div>
          <div className={cn("text-xs font-semibold uppercase px-2 py-1 rounded-full", statusColor)}>
            {status}
          </div>
        </div>

        {/* Value */}
        <div className="mb-2">
          <span className={cn("text-2xl font-bold", iconClass)}>
            {value}
          </span>
        </div>

        {/* Description */}
        <p className="text-sm text-muted-foreground leading-relaxed">
          {description}
        </p>

        {/* Pulse indicator for active metrics */}
        <div className="absolute top-2 right-2 w-2 h-2 bg-primary rounded-full animate-pulse-glow" />
      </div>
    </div>
  );
};