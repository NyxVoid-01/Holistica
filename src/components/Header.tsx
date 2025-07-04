import { useState } from "react";
import { Bell, MessageCircle, User, Settings, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SidebarTrigger } from "@/components/ui/sidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";

export function Header() {
  const navigate = useNavigate();
  const [notifications] = useState(3); // Mock notification count

  const handleProfileClick = () => {
    navigate("/perfil");
  };

  const handleSettingsClick = () => {
    navigate("/configuracion");
  };

  const handleAssistantClick = () => {
    navigate("/asistente");
  };

  const handleLogout = () => {
    // Handle logout logic here
    console.log("Logout clicked");
  };

  return (
    <header className="flex h-16 items-center justify-between border-b bg-background px-6">
      <div className="flex items-center gap-4">
        <SidebarTrigger />
        <div>
          <h1 className="text-xl font-semibold">HOLISTICA</h1>
          <p className="text-sm text-muted-foreground">Tu asistente integral de bienestar</p>
        </div>
      </div>

      <div className="flex items-center gap-4">
        {/* AI Assistant Button */}
        <Button
          variant="outline"
          size="sm"
          onClick={handleAssistantClick}
          className="gap-2 bg-gradient-to-r from-blue-500 to-green-500 text-white hover:from-blue-600 hover:to-green-600 border-0"
        >
          <MessageCircle className="h-4 w-4" />
          Asistente IA
        </Button>

        {/* Notifications */}
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          {notifications > 0 && (
            <Badge
              variant="destructive"
              className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 text-xs"
            >
              {notifications}
            </Badge>
          )}
        </Button>

        {/* User Menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="gap-2 px-3">
              <Avatar className="h-8 w-8">
                <AvatarImage src="/placeholder-avatar.jpg" alt="Usuario" />
                <AvatarFallback>AH</AvatarFallback>
              </Avatar>
              <div className="hidden md:block text-left">
                <p className="text-sm font-medium">Ana Holística</p>
                <p className="text-xs text-muted-foreground">Estudiante</p>
              </div>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuItem onClick={handleProfileClick} className="gap-2">
              <User className="h-4 w-4" />
              Mi Perfil
            </DropdownMenuItem>
            <DropdownMenuItem onClick={handleSettingsClick} className="gap-2">
              <Settings className="h-4 w-4" />
              Configuraciones
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout} className="gap-2 text-destructive">
              <LogOut className="h-4 w-4" />
              Cerrar Sesión
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}