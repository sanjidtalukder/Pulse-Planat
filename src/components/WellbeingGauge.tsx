import { cn } from "@/lib/utils";

interface WellbeingGaugeProps {
  score: number;
  className?: string;
}

const getScoreColor = (score: number) => {
  if (score >= 80) return "text-score-excellent";
  if (score >= 60) return "text-score-good";
  if (score >= 40) return "text-score-fair";
  if (score >= 20) return "text-score-poor";
  return "text-score-critical";
};

const getScoreLabel = (score: number) => {
  if (score >= 80) return "Excellent";
  if (score >= 60) return "Good";
  if (score >= 40) return "Fair";
  if (score >= 20) return "Needs Attention";
  return "Critical";
};

export const WellbeingGauge = ({ score, className }: WellbeingGaugeProps) => {
  const normalizedScore = Math.max(0, Math.min(100, score));
  const scoreColor = getScoreColor(normalizedScore);
  const scoreLabel = getScoreLabel(normalizedScore);

  return (
    <div className={cn("flex flex-col items-center space-y-4", className)}>
      {/* Main Gauge */}
      <div className="relative">
        <div className="wellbeing-gauge animate-breathe w-32 h-32 rounded-full flex items-center justify-center">
          <div className="bg-background rounded-full w-28 h-28 flex flex-col items-center justify-center border border-card-border">
            <span className={cn("text-3xl font-bold", scoreColor)}>
              {normalizedScore}
            </span>
            <span className="text-xs text-muted-foreground uppercase tracking-wider">
              CITY HEALTH
            </span>
          </div>
        </div>
        
        {/* Pulsing Ring */}
        <div className="absolute inset-0 rounded-full border-2 border-primary/30 animate-pulse-glow"></div>
      </div>

      {/* Score Label */}
      <div className="text-center">
        <h2 className={cn("text-lg font-semibold", scoreColor)}>
          {scoreLabel}
        </h2>
        <p className="text-sm text-muted-foreground">
          Your neighborhood's vital signs
        </p>
      </div>

      {/* Status Indicators */}
      <div className="flex space-x-2">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className={cn(
              "w-2 h-2 rounded-full",
              i < Math.floor(normalizedScore / 20) 
                ? "bg-primary animate-pulse-glow" 
                : "bg-muted"
            )}
          />
        ))}
      </div>
    </div>
  );
};