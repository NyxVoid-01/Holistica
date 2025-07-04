
import { DashboardCard } from "@/components/DashboardCard";
import { Calendar, Heart, Apple, BookOpen, Bell, User } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();
  const userName = "Ana"; // This would come from user context/auth

  const dashboardData = [
    {
      title: "Tareas Pendientes",
      description: "Tienes 3 tareas por completar esta semana",
      icon: Calendar,
      value: "3",
      trend: "2 con prioridad alta",
      color: "blue",
      onClick: () => navigate("/tareas"),
    },
    {
      title: "Estado Emocional",
      description: "Tu bienestar emocional hoy",
      icon: Heart,
      value: "Bueno",
      trend: "Mejora del 20% esta semana",
      color: "pink",
      onClick: () => navigate("/bienestar"),
    },
    {
      title: "Alimentación",
      description: "Menú saludable personalizado",
      icon: Apple,
      value: "85%",
      trend: "Objetivos nutricionales al día",
      color: "green",
      onClick: () => navigate("/alimentacion"),
    },
    {
      title: "Cursos Recomendados",
      description: "Nuevas oportunidades disponibles",
      icon: BookOpen,
      value: "5",
      trend: "2 cursos destacados para ti",
      color: "purple",
      onClick: () => navigate("/cursos"),
    },
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-blue-500 to-green-500 rounded-xl p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold mb-2">
              ¡Hola {userName}! 👋
            </h1>
            <p className="text-blue-100">
              Bienvenida a tu espacio de bienestar y productividad
            </p>
          </div>
          <div className="hidden md:block">
            <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4">
              <User className="h-12 w-12 text-white" />
            </div>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {dashboardData.map((card, index) => (
          <DashboardCard
            key={index}
            title={card.title}
            description={card.description}
            icon={card.icon}
            value={card.value}
            trend={card.trend}
            color={card.color}
            onClick={card.onClick}
          />
        ))}
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-xl p-6 shadow-sm">
        <h2 className="text-xl font-semibold mb-4">Actividad Reciente</h2>
        <div className="space-y-4">
          <div className="flex items-center gap-4 p-3 bg-blue-50 rounded-lg">
            <Bell className="h-5 w-5 text-blue-500" />
            <div>
              <p className="font-medium">Nueva tarea agregada</p>
              <p className="text-sm text-muted-foreground">
                "Ensayo de Filosofía" - Vence el viernes
              </p>
            </div>
          </div>
          <div className="flex items-center gap-4 p-3 bg-green-50 rounded-lg">
            <Heart className="h-5 w-5 text-green-500" />
            <div>
              <p className="font-medium">Estado emocional registrado</p>
              <p className="text-sm text-muted-foreground">
                Te sientes motivada hoy - ¡Excelente!
              </p>
            </div>
          </div>
          <div className="flex items-center gap-4 p-3 bg-orange-50 rounded-lg">
            <Apple className="h-5 w-5 text-orange-500" />
            <div>
              <p className="font-medium">Menú actualizado</p>
              <p className="text-sm text-muted-foreground">
                Nuevas recetas saludables disponibles
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
