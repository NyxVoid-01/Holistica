import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Send, Activity, BarChart3, Calendar, Heart, Apple, BookOpen } from "lucide-react";

interface Message {
  id: number;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

interface ActivityLog {
  id: number;
  action: string;
  category: string;
  timestamp: Date;
  details: string;
}

export default function Assistant() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "¡Hola! Soy tu asistente virtual de HOLISTICA. Puedo ayudarte con todas las funcionalidades de la plataforma: tareas académicas, bienestar emocional, alimentación, cursos y más. ¿En qué puedo asistirte hoy?",
      isUser: false,
      timestamp: new Date(),
    },
  ]);
  const [inputMessage, setInputMessage] = useState("");

  const [activityLogs] = useState<ActivityLog[]>([
    {
      id: 1,
      action: "Tarea completada",
      category: "Académico",
      timestamp: new Date(Date.now() - 3600000),
      details: "Ensayo de Filosofía marcado como completado",
    },
    {
      id: 2,
      action: "Estado emocional registrado",
      category: "Bienestar",
      timestamp: new Date(Date.now() - 7200000),
      details: "Nivel de estrés: 3/5, Energía: 4/5",
    },
    {
      id: 3,
      action: "Receta guardada",
      category: "Alimentación",
      timestamp: new Date(Date.now() - 10800000),
      details: "Ensalada mediterránea añadida a favoritos",
    },
  ]);

  const handleSendMessage = () => {
    if (inputMessage.trim()) {
      const newMessage: Message = {
        id: messages.length + 1,
        text: inputMessage,
        isUser: true,
        timestamp: new Date(),
      };

      setMessages([...messages, newMessage]);
      setInputMessage("");

      // Simulate assistant response
      setTimeout(() => {
        const responses = [
          "Entiendo tu consulta. Basándome en tu actividad reciente, te recomiendo priorizar las tareas académicas pendientes. ¿Te gustaría que te ayude a organizar tu cronograma?",
          "He analizado tu progreso en bienestar y noto que has mantenido un buen equilibrio. Para optimizar tu energía, te sugiero incorporar 10 minutos de meditación matutina.",
          "Según tus preferencias alimentarias, he preparado una lista de recetas saludables que se adaptan a tu horario. ¿Te gustaría ver las opciones para esta semana?",
          "Veo que tienes interés en mejorar profesionalmente. Te recomiendo 3 cursos que complementan tu perfil académico actual. ¿Quieres conocer los detalles?",
        ];

        const assistantMessage: Message = {
          id: messages.length + 2,
          text: responses[Math.floor(Math.random() * responses.length)],
          isUser: false,
          timestamp: new Date(),
        };

        setMessages(prev => [...prev, assistantMessage]);
      }, 1000);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "Académico": return <Calendar className="h-4 w-4" />;
      case "Bienestar": return <Heart className="h-4 w-4" />;
      case "Alimentación": return <Apple className="h-4 w-4" />;
      case "Cursos": return <BookOpen className="h-4 w-4" />;
      default: return <Activity className="h-4 w-4" />;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Académico": return "bg-blue-100 text-blue-800 border-blue-200";
      case "Bienestar": return "bg-green-100 text-green-800 border-green-200";
      case "Alimentación": return "bg-orange-100 text-orange-800 border-orange-200";
      case "Cursos": return "bg-purple-100 text-purple-800 border-purple-200";
      default: return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Asistente Virtual IA</h1>
        <p className="text-muted-foreground">Tu compañero inteligente para el bienestar estudiantil</p>
      </div>

      <Tabs defaultValue="chat" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="chat">Chat General</TabsTrigger>
          <TabsTrigger value="activity">Registro de Actividad</TabsTrigger>
          <TabsTrigger value="analysis">Análisis</TabsTrigger>
        </TabsList>

        <TabsContent value="chat" className="space-y-6">
          <Card className="h-[600px] flex flex-col">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                Conversación General
              </CardTitle>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col p-0">
              <ScrollArea className="flex-1 p-4">
                <div className="space-y-4">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.isUser ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`max-w-[80%] p-4 rounded-lg ${
                          message.isUser
                            ? "bg-primary text-primary-foreground"
                            : "bg-muted text-foreground"
                        }`}
                      >
                        <p className="text-sm">{message.text}</p>
                        <p className="text-xs opacity-70 mt-2">
                          {message.timestamp.toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>

              <div className="p-4 border-t">
                <div className="flex gap-2">
                  <Input
                    placeholder="Pregúntame sobre tareas, bienestar, alimentación, cursos..."
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    className="flex-1"
                  />
                  <Button onClick={handleSendMessage} size="icon">
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="activity" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5" />
                Registro de Actividad
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {activityLogs.map((log) => (
                  <div key={log.id} className="flex items-start gap-4 p-4 border rounded-lg">
                    <div className="flex items-center gap-2">
                      {getCategoryIcon(log.category)}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="font-medium">{log.action}</h3>
                        <Badge variant="outline" className={getCategoryColor(log.category)}>
                          {log.category}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{log.details}</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {log.timestamp.toLocaleString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analysis" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5" />
                  Resumen Semanal
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Tareas Completadas</span>
                    <span className="font-bold">12/15</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Registros de Bienestar</span>
                    <span className="font-bold">6/7</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Comidas Registradas</span>
                    <span className="font-bold">18/21</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Horas de Estudio</span>
                    <span className="font-bold">28 hrs</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Recomendaciones IA</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="p-3 bg-blue-50 rounded-lg">
                    <p className="text-sm font-medium text-blue-900">Académico</p>
                    <p className="text-sm text-blue-700">Dedicar más tiempo a Matemáticas</p>
                  </div>
                  <div className="p-3 bg-green-50 rounded-lg">
                    <p className="text-sm font-medium text-green-900">Bienestar</p>
                    <p className="text-sm text-green-700">Incorporar ejercicio matutino</p>
                  </div>
                  <div className="p-3 bg-orange-50 rounded-lg">
                    <p className="text-sm font-medium text-orange-900">Alimentación</p>
                    <p className="text-sm text-orange-700">Aumentar ingesta de proteínas</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}