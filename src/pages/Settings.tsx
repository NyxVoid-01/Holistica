import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { 
  Settings as SettingsIcon,
  Bell,
  Shield,
  Palette,
  Globe,
  Save,
  Trash2,
  Download,
  Upload
} from "lucide-react";

interface NotificationSettings {
  taskReminders: boolean;
  wellnessReminders: boolean;
  mealReminders: boolean;
  courseUpdates: boolean;
  weeklyReports: boolean;
  emailNotifications: boolean;
}

interface PrivacySettings {
  profileVisibility: "public" | "private" | "friends";
  dataSharing: boolean;
  analyticsTracking: boolean;
  locationServices: boolean;
}

interface AppearanceSettings {
  theme: "light" | "dark" | "auto";
  language: string;
  fontSize: "small" | "medium" | "large";
  compactMode: boolean;
}

export default function Settings() {
  const [notifications, setNotifications] = useState<NotificationSettings>({
    taskReminders: true,
    wellnessReminders: true,
    mealReminders: true,
    courseUpdates: true,
    weeklyReports: false,
    emailNotifications: true,
  });

  const [privacy, setPrivacy] = useState<PrivacySettings>({
    profileVisibility: "private",
    dataSharing: false,
    analyticsTracking: true,
    locationServices: false,
  });

  const [appearance, setAppearance] = useState<AppearanceSettings>({
    theme: "light",
    language: "es",
    fontSize: "medium",
    compactMode: false,
  });

  const [wellnessGoals, setWellnessGoals] = useState({
    dailyStudyHours: 6,
    weeklyExercise: 3,
    sleepHours: 8,
    waterIntake: 2000,
  });

  const handleNotificationChange = (key: keyof NotificationSettings, value: boolean) => {
    setNotifications(prev => ({ ...prev, [key]: value }));
  };

  const handlePrivacyChange = (key: keyof PrivacySettings, value: any) => {
    setPrivacy(prev => ({ ...prev, [key]: value }));
  };

  const handleAppearanceChange = (key: keyof AppearanceSettings, value: any) => {
    setAppearance(prev => ({ ...prev, [key]: value }));
  };

  const handleWellnessGoalChange = (key: string, value: number) => {
    setWellnessGoals(prev => ({ ...prev, [key]: value }));
  };

  const handleSaveSettings = () => {
    // Save settings logic here
    console.log("Settings saved:", { notifications, privacy, appearance, wellnessGoals });
  };

  const handleExportData = () => {
    // Export data logic
    console.log("Exporting user data...");
  };

  const handleImportData = () => {
    // Import data logic
    console.log("Importing user data...");
  };

  const handleDeleteAccount = () => {
    // Delete account logic
    if (confirm("¿Estás seguro de que quieres eliminar tu cuenta? Esta acción no se puede deshacer.")) {
      console.log("Account deletion requested");
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Configuraciones</h1>
        <p className="text-muted-foreground">Personaliza tu experiencia en HOLISTICA</p>
      </div>

      <Tabs defaultValue="notifications" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="notifications">Notificaciones</TabsTrigger>
          <TabsTrigger value="privacy">Privacidad</TabsTrigger>
          <TabsTrigger value="appearance">Apariencia</TabsTrigger>
          <TabsTrigger value="wellness">Bienestar</TabsTrigger>
          <TabsTrigger value="account">Cuenta</TabsTrigger>
        </TabsList>

        <TabsContent value="notifications" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5" />
                Configuración de Notificaciones
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="task-reminders">Recordatorios de Tareas</Label>
                    <p className="text-sm text-muted-foreground">
                      Recibe notificaciones sobre tareas próximas a vencer
                    </p>
                  </div>
                  <Switch
                    id="task-reminders"
                    checked={notifications.taskReminders}
                    onCheckedChange={(checked) => handleNotificationChange("taskReminders", checked)}
                  />
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="wellness-reminders">Recordatorios de Bienestar</Label>
                    <p className="text-sm text-muted-foreground">
                      Recordatorios para registrar tu estado emocional
                    </p>
                  </div>
                  <Switch
                    id="wellness-reminders"
                    checked={notifications.wellnessReminders}
                    onCheckedChange={(checked) => handleNotificationChange("wellnessReminders", checked)}
                  />
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="meal-reminders">Recordatorios de Comidas</Label>
                    <p className="text-sm text-muted-foreground">
                      Notificaciones para las horas de comida planificadas
                    </p>
                  </div>
                  <Switch
                    id="meal-reminders"
                    checked={notifications.mealReminders}
                    onCheckedChange={(checked) => handleNotificationChange("mealReminders", checked)}
                  />
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="course-updates">Actualizaciones de Cursos</Label>
                    <p className="text-sm text-muted-foreground">
                      Notificaciones sobre nuevos cursos y oportunidades
                    </p>
                  </div>
                  <Switch
                    id="course-updates"
                    checked={notifications.courseUpdates}
                    onCheckedChange={(checked) => handleNotificationChange("courseUpdates", checked)}
                  />
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="weekly-reports">Reportes Semanales</Label>
                    <p className="text-sm text-muted-foreground">
                      Resumen semanal de tu progreso y estadísticas
                    </p>
                  </div>
                  <Switch
                    id="weekly-reports"
                    checked={notifications.weeklyReports}
                    onCheckedChange={(checked) => handleNotificationChange("weeklyReports", checked)}
                  />
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="email-notifications">Notificaciones por Email</Label>
                    <p className="text-sm text-muted-foreground">
                      Recibir notificaciones importantes por correo electrónico
                    </p>
                  </div>
                  <Switch
                    id="email-notifications"
                    checked={notifications.emailNotifications}
                    onCheckedChange={(checked) => handleNotificationChange("emailNotifications", checked)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="privacy" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Configuración de Privacidad
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="profile-visibility">Visibilidad del Perfil</Label>
                  <Select 
                    value={privacy.profileVisibility} 
                    onValueChange={(value: "public" | "private" | "friends") => 
                      handlePrivacyChange("profileVisibility", value)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="public">Público</SelectItem>
                      <SelectItem value="friends">Solo Amigos</SelectItem>
                      <SelectItem value="private">Privado</SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-sm text-muted-foreground">
                    Controla quién puede ver tu información de perfil
                  </p>
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="data-sharing">Compartir Datos Anónimos</Label>
                    <p className="text-sm text-muted-foreground">
                      Ayuda a mejorar la aplicación compartiendo datos anónimos
                    </p>
                  </div>
                  <Switch
                    id="data-sharing"
                    checked={privacy.dataSharing}
                    onCheckedChange={(checked) => handlePrivacyChange("dataSharing", checked)}
                  />
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="analytics-tracking">Seguimiento de Análisis</Label>
                    <p className="text-sm text-muted-foreground">
                      Permitir el seguimiento para mejorar tu experiencia
                    </p>
                  </div>
                  <Switch
                    id="analytics-tracking"
                    checked={privacy.analyticsTracking}
                    onCheckedChange={(checked) => handlePrivacyChange("analyticsTracking", checked)}
                  />
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="location-services">Servicios de Ubicación</Label>
                    <p className="text-sm text-muted-foreground">
                      Usar ubicación para recomendaciones locales
                    </p>
                  </div>
                  <Switch
                    id="location-services"
                    checked={privacy.locationServices}
                    onCheckedChange={(checked) => handlePrivacyChange("locationServices", checked)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="appearance" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Palette className="h-5 w-5" />
                Configuración de Apariencia
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="theme">Tema</Label>
                  <Select 
                    value={appearance.theme} 
                    onValueChange={(value: "light" | "dark" | "auto") => 
                      handleAppearanceChange("theme", value)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="light">Claro</SelectItem>
                      <SelectItem value="dark">Oscuro</SelectItem>
                      <SelectItem value="auto">Automático</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Separator />

                <div className="space-y-2">
                  <Label htmlFor="language">Idioma</Label>
                  <Select 
                    value={appearance.language} 
                    onValueChange={(value) => handleAppearanceChange("language", value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="es">Español</SelectItem>
                      <SelectItem value="en">English</SelectItem>
                      <SelectItem value="fr">Français</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Separator />

                <div className="space-y-2">
                  <Label htmlFor="font-size">Tamaño de Fuente</Label>
                  <Select 
                    value={appearance.fontSize} 
                    onValueChange={(value: "small" | "medium" | "large") => 
                      handleAppearanceChange("fontSize", value)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="small">Pequeño</SelectItem>
                      <SelectItem value="medium">Mediano</SelectItem>
                      <SelectItem value="large">Grande</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="compact-mode">Modo Compacto</Label>
                    <p className="text-sm text-muted-foreground">
                      Reduce el espaciado para mostrar más contenido
                    </p>
                  </div>
                  <Switch
                    id="compact-mode"
                    checked={appearance.compactMode}
                    onCheckedChange={(checked) => handleAppearanceChange("compactMode", checked)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="wellness" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Metas de Bienestar</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="study-hours">Horas de Estudio Diarias</Label>
                  <Input
                    id="study-hours"
                    type="number"
                    min="1"
                    max="12"
                    value={wellnessGoals.dailyStudyHours}
                    onChange={(e) => handleWellnessGoalChange("dailyStudyHours", Number(e.target.value))}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="weekly-exercise">Días de Ejercicio por Semana</Label>
                  <Input
                    id="weekly-exercise"
                    type="number"
                    min="0"
                    max="7"
                    value={wellnessGoals.weeklyExercise}
                    onChange={(e) => handleWellnessGoalChange("weeklyExercise", Number(e.target.value))}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="sleep-hours">Horas de Sueño</Label>
                  <Input
                    id="sleep-hours"
                    type="number"
                    min="6"
                    max="12"
                    value={wellnessGoals.sleepHours}
                    onChange={(e) => handleWellnessGoalChange("sleepHours", Number(e.target.value))}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="water-intake">Consumo de Agua (ml)</Label>
                  <Input
                    id="water-intake"
                    type="number"
                    min="1000"
                    max="4000"
                    step="250"
                    value={wellnessGoals.waterIntake}
                    onChange={(e) => handleWellnessGoalChange("waterIntake", Number(e.target.value))}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="account" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Gestión de Datos</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-col sm:flex-row gap-4">
                <Button variant="outline" className="gap-2" onClick={handleExportData}>
                  <Download className="h-4 w-4" />
                  Exportar Mis Datos
                </Button>
                <Button variant="outline" className="gap-2" onClick={handleImportData}>
                  <Upload className="h-4 w-4" />
                  Importar Datos
                </Button>
              </div>
              <p className="text-sm text-muted-foreground">
                Descarga todos tus datos o importa información desde otra fuente
              </p>
            </CardContent>
          </Card>

          <Card className="border-destructive">
            <CardHeader>
              <CardTitle className="text-destructive">Zona de Peligro</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-medium mb-2">Eliminar Cuenta</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Una vez que elimines tu cuenta, no hay vuelta atrás. Por favor, asegúrate de tu decisión.
                </p>
                <Button variant="destructive" className="gap-2" onClick={handleDeleteAccount}>
                  <Trash2 className="h-4 w-4" />
                  Eliminar Cuenta
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="flex justify-end">
        <Button onClick={handleSaveSettings} className="gap-2">
          <Save className="h-4 w-4" />
          Guardar Cambios
        </Button>
      </div>
    </div>
  );
}