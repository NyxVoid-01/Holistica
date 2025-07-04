
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { User, BookOpen, Heart, Apple, Calendar } from "lucide-react";

export default function Profile() {
  const userProfile = {
    name: "Ana Holística",
    age: 22,
    career: "Ingeniería en Sistemas",
    semester: "7mo semestre",
    goals: [
      "Mantener promedio superior a 8.5",
      "Mejorar gestión del estrés",
      "Alimentación más balanceada",
      "Completar curso de React",
    ],
  };

  const progressData = [
    {
      title: "Progreso Académico",
      value: 85,
      description: "Excelente rendimiento este semestre",
      icon: BookOpen,
      color: "bg-blue-500",
    },
    {
      title: "Bienestar Emocional",
      value: 78,
      description: "Mejorando manejo del estrés",
      icon: Heart,
      color: "bg-pink-500",
    },
    {
      title: "Salud Física",
      value: 70,
      description: "Actividad física moderada",
      icon: Calendar,
      color: "bg-green-500",
    },
    {
      title: "Alimentación Saludable",
      value: 82,
      description: "Buenos hábitos alimenticios",
      icon: Apple,
      color: "bg-orange-500",
    },
  ];

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center gap-4 mb-6">
        <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
          <User className="h-8 w-8 text-white" />
        </div>
        <div>
          <h1 className="text-3xl font-bold">Mi Perfil</h1>
          <p className="text-muted-foreground">Gestiona tu información y revisa tu progreso</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Personal Information */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>Información Personal</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium text-muted-foreground">Nombre</label>
              <p className="text-lg font-semibold">{userProfile.name}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">Edad</label>
              <p className="text-lg">{userProfile.age} años</p>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">Carrera</label>
              <p className="text-lg">{userProfile.career}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">Semestre</label>
              <Badge variant="secondary" className="text-sm">
                {userProfile.semester}
              </Badge>
            </div>
          </CardContent>
        </Card>

        {/* Progress Overview */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Estado de Progreso</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {progressData.map((item, index) => (
                <div key={index} className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${item.color}`}>
                      <item.icon className="h-4 w-4 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h3 className="font-medium">{item.title}</h3>
                        <span className="text-sm font-semibold">{item.value}%</span>
                      </div>
                      <p className="text-xs text-muted-foreground">{item.description}</p>
                    </div>
                  </div>
                  <Progress value={item.value} className="h-2" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Goals Section */}
      <Card>
        <CardHeader>
          <CardTitle>Metas de Bienestar</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {userProfile.goals.map((goal, index) => (
              <div
                key={index}
                className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg"
              >
                <div className="w-2 h-2 bg-primary rounded-full"></div>
                <p className="text-sm">{goal}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
