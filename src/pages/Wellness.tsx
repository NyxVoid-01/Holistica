
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Heart, Smile, Meh, Frown, TrendingUp } from "lucide-react";

const emotions = [
  { icon: Smile, label: "Excelente", value: 5, color: "text-green-500" },
  { icon: Smile, label: "Bueno", value: 4, color: "text-blue-500" },
  { icon: Meh, label: "Regular", value: 3, color: "text-yellow-500" },
  { icon: Frown, label: "Malo", value: 2, color: "text-orange-500" },
  { icon: Frown, label: "Muy Malo", value: 1, color: "text-red-500" },
];

export default function Wellness() {
  const [selectedEmotion, setSelectedEmotion] = useState<number | null>(null);
  const [weeklyProgress] = useState([
    { day: "Lun", value: 4 },
    { day: "Mar", value: 3 },
    { day: "Mié", value: 5 },
    { day: "Jue", value: 4 },
    { day: "Vie", value: 4 },
    { day: "Sáb", value: 5 },
    { day: "Dom", value: 3 },
  ]);

  const handleEmotionSelect = (value: number) => {
    setSelectedEmotion(value);
    // Here you would save to backend/context
    console.log("Estado emocional registrado:", value);
  };

  const averageWeekly = Math.round(weeklyProgress.reduce((acc, day) => acc + day.value, 0) / weeklyProgress.length);

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center gap-4 mb-6">
        <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-purple-500 rounded-full flex items-center justify-center">
          <Heart className="h-6 w-6 text-white" />
        </div>
        <div>
          <h1 className="text-3xl font-bold">Salud y Bienestar</h1>
          <p className="text-muted-foreground">Registra tu estado emocional y recibe recomendaciones personalizadas</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Daily Emotional Check-in */}
        <Card>
          <CardHeader>
            <CardTitle>¿Cómo te sientes hoy?</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-5 gap-3">
              {emotions.map((emotion) => (
                <Button
                  key={emotion.value}
                  variant={selectedEmotion === emotion.value ? "default" : "outline"}
                  className="h-16 flex flex-col gap-1"
                  onClick={() => handleEmotionSelect(emotion.value)}
                >
                  <emotion.icon className={`h-6 w-6 ${emotion.color}`} />
                  <span className="text-xs">{emotion.label}</span>
                </Button>
              ))}
            </div>
            {selectedEmotion && (
              <div className="p-4 bg-muted/50 rounded-lg">
                <p className="text-sm font-medium mb-2">
                  Estado registrado: {emotions.find(e => e.value === selectedEmotion)?.label}
                </p>
                <p className="text-xs text-muted-foreground">
                  ¡Gracias por compartir! El asistente virtual te dará recomendaciones personalizadas.
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Weekly Progress */}
        <Card>
          <CardHeader>
            <CardTitle>Progreso Semanal</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Promedio semanal</span>
                <div className="flex items-center gap-2">
                  <TrendingUp className="h-4 w-4 text-green-500" />
                  <span className="text-lg font-bold">{averageWeekly}/5</span>
                </div>
              </div>
              <Progress value={(averageWeekly / 5) * 100} className="h-3" />
              <div className="grid grid-cols-7 gap-2 mt-4">
                {weeklyProgress.map((day, index) => (
                  <div key={index} className="text-center">
                    <div className="text-xs text-muted-foreground mb-1">{day.day}</div>
                    <div className="h-8 bg-muted rounded flex items-end">
                      <div
                        className="bg-gradient-to-t from-pink-500 to-purple-500 rounded w-full transition-all duration-300"
                        style={{ height: `${(day.value / 5) * 100}%` }}
                      ></div>
                    </div>
                    <div className="text-xs font-medium mt-1">{day.value}</div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recommendations */}
      <Card>
        <CardHeader>
          <CardTitle>Recomendaciones de Bienestar</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-blue-50 rounded-lg">
              <h3 className="font-medium text-blue-800 mb-2">Respiración Consciente</h3>
              <p className="text-sm text-blue-600 mb-3">
                Practica 5 minutos de respiración profunda para reducir el estrés.
              </p>
              <Button size="sm" variant="outline" className="border-blue-300 text-blue-600">
                Comenzar ejercicio
              </Button>
            </div>
            <div className="p-4 bg-green-50 rounded-lg">
              <h3 className="font-medium text-green-800 mb-2">Actividad Física</h3>
              <p className="text-sm text-green-600 mb-3">
                Una caminata de 15 minutos puede mejorar tu estado de ánimo.
              </p>
              <Button size="sm" variant="outline" className="border-green-300 text-green-600">
                Ver rutinas
              </Button>
            </div>
            <div className="p-4 bg-purple-50 rounded-lg">
              <h3 className="font-medium text-purple-800 mb-2">Meditación</h3>
              <p className="text-sm text-purple-600 mb-3">
                Dedica 10 minutos a la meditación para centrar tu mente.
              </p>
              <Button size="sm" variant="outline" className="border-purple-300 text-purple-600">
                Meditar ahora
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
