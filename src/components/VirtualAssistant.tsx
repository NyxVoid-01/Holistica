
import { useState } from "react";
import { MessageCircle, X, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Message {
  id: number;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

export function VirtualAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "¡Hola! Soy tu asistente virtual de HOLISTICA. ¿Cómo puedo ayudarte hoy? Puedo ayudarte con tareas académicas, técnicas de estudio, consejos de bienestar, menús saludables y mucho más.",
      isUser: false,
      timestamp: new Date(),
    },
  ]);
  const [inputMessage, setInputMessage] = useState("");

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
          "Entiendo tu consulta. Basándome en tu perfil, te recomiendo que organices tus tareas por prioridad usando la técnica Pomodoro.",
          "Para mejorar tu bienestar emocional, te sugiero practicar 5 minutos de respiración profunda. ¿Te gustaría que te guíe?",
          "He revisado tu progreso académico y noto que has mejorado mucho. ¡Sigue así! ¿Hay alguna materia específica en la que necesites ayuda?",
          "Para mantener una alimentación balanceada, te recomiendo incluir más verduras en tu menú. ¿Te gustaría que te sugiera algunas recetas?",
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

  return (
    <>
      {/* Floating Button */}
      <Button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-lg bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600 transition-all duration-300 ${
          isOpen ? "scale-0" : "scale-100"
        }`}
        size="icon"
      >
        <MessageCircle className="h-6 w-6" />
      </Button>

      {/* Chat Window */}
      <Card
        className={`fixed bottom-6 right-6 w-80 h-96 shadow-xl transition-all duration-300 ${
          isOpen ? "scale-100 opacity-100" : "scale-0 opacity-0"
        }`}
      >
        <CardHeader className="bg-gradient-to-r from-blue-500 to-green-500 text-white rounded-t-lg">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg">Asistente Virtual</CardTitle>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(false)}
              className="text-white hover:bg-white/20"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>

        <CardContent className="p-0 flex flex-col h-full">
          <ScrollArea className="flex-1 p-4">
            <div className="space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.isUser ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[80%] p-3 rounded-lg ${
                      message.isUser
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-foreground"
                    }`}
                  >
                    <p className="text-sm">{message.text}</p>
                    <p className="text-xs opacity-70 mt-1">
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
                placeholder="Escribe tu mensaje..."
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
    </>
  );
}
