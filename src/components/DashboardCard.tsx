
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface DashboardCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  value?: string;
  trend?: string;
  color?: string;
  onClick?: () => void;
}

export function DashboardCard({
  title,
  description,
  icon: Icon,
  value,
  trend,
  color = "blue",
  onClick,
}: DashboardCardProps) {
  const colorClasses = {
    blue: "from-blue-500 to-blue-600",
    green: "from-green-500 to-green-600",
    purple: "from-purple-500 to-purple-600",
    orange: "from-orange-500 to-orange-600",
    pink: "from-pink-500 to-pink-600",
    indigo: "from-indigo-500 to-indigo-600",
  };

  return (
    <Card 
      className="hover:shadow-lg transition-all duration-300 cursor-pointer transform hover:-translate-y-1"
      onClick={onClick}
    >
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        <div className={`p-2 rounded-lg bg-gradient-to-r ${colorClasses[color as keyof typeof colorClasses]}`}>
          <Icon className="h-4 w-4 text-white" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold mb-2">{value}</div>
        <p className="text-xs text-muted-foreground mb-2">{description}</p>
        {trend && (
          <p className="text-xs text-green-600 font-medium">{trend}</p>
        )}
      </CardContent>
    </Card>
  );
}
