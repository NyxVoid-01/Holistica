
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, Plus, CheckCircle, BookOpen, Target } from "lucide-react";
import { TaskDialog } from "@/components/TaskDialog";
import { Progress } from "@/components/ui/progress";

interface Task {
  id: number;
  title: string;
  description: string;
  dueDate: string;
  priority: "alta" | "media" | "baja";
  subject: string;
  completed: boolean;
}

export default function Tasks() {
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: 1,
      title: "Ensayo de Filosofía",
      description: "Redactar ensayo sobre ética kantiana",
      dueDate: "2025-07-08",
      priority: "alta",
      subject: "Filosofía",
      completed: false,
    },
    {
      id: 2,
      title: "Proyecto Final Programación",
      description: "Desarrollo de aplicación web con React",
      dueDate: "2025-07-15",
      priority: "alta",
      subject: "Programación",
      completed: false,
    },
    {
      id: 3,
      title: "Examen Matemáticas",
      description: "Estudiar cálculo diferencial e integral",
      dueDate: "2025-07-10",
      priority: "media",
      subject: "Matemáticas",
      completed: false,
    },
    {
      id: 4,
      title: "Presentación Historia",
      description: "Presentar sobre la Revolución Industrial",
      dueDate: "2025-07-12",
      priority: "baja",
      subject: "Historia",
      completed: true,
    },
  ]);
  
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const toggleTaskComplete = (taskId: number) => {
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, completed: !task.completed } : task
    ));
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "alta": return "bg-red-100 text-red-800 border-red-200";
      case "media": return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "baja": return "bg-green-100 text-green-800 border-green-200";
      default: return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const addNewTask = (taskData: {
    title: string;
    description: string;
    type: string;
    subject: string;
    dueDate: string;
    priority: "alta" | "media" | "baja";
  }) => {
    const newTask: Task = {
      id: tasks.length + 1,
      title: taskData.title,
      description: taskData.description,
      dueDate: taskData.dueDate,
      priority: taskData.priority,
      subject: taskData.subject,
      completed: false,
    };
    setTasks([...tasks, newTask]);
  };

  const pendingTasks = tasks.filter(task => !task.completed);
  const completedTasks = tasks.filter(task => task.completed);
  const completionRate = tasks.length > 0 ? (completedTasks.length / tasks.length) * 100 : 0;

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Tareas Académicas</h1>
          <p className="text-muted-foreground">Gestiona tus actividades académicas y mantente organizado</p>
        </div>
        <Button 
          onClick={() => setIsDialogOpen(true)}
          className="bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600"
        >
          <Plus className="h-4 w-4 mr-2" />
          Nueva Tarea
        </Button>
      </div>

      {/* Enhanced Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-blue-500" />
              <div>
                <p className="text-2xl font-bold">{pendingTasks.length}</p>
                <p className="text-sm text-muted-foreground">Pendientes</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-green-500" />
              <div>
                <p className="text-2xl font-bold">{completedTasks.length}</p>
                <p className="text-sm text-muted-foreground">Completadas</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-red-500" />
              <div>
                <p className="text-2xl font-bold">{pendingTasks.filter(t => t.priority === "alta").length}</p>
                <p className="text-sm text-muted-foreground">Prioridad Alta</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Target className="h-5 w-5 text-purple-500" />
              <div>
                <p className="text-2xl font-bold">{Math.round(completionRate)}%</p>
                <p className="text-sm text-muted-foreground">Completado</p>
              </div>
            </div>
            <Progress value={completionRate} className="mt-2" />
          </CardContent>
        </Card>
      </div>

      {/* Pending Tasks */}
      <Card>
        <CardHeader>
          <CardTitle>Tareas Pendientes</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {pendingTasks.map((task) => (
              <div
                key={task.id}
                className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => toggleTaskComplete(task.id)}
                    className="h-8 w-8 hover:bg-green-100 hover:text-green-600 transition-colors"
                  >
                    <CheckCircle className="h-4 w-4" />
                  </Button>
                  <div className="flex-1">
                    <h3 className="font-medium">{task.title}</h3>
                    <p className="text-sm text-muted-foreground">{task.description}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <Badge variant="outline" className={getPriorityColor(task.priority)}>
                        Prioridad {task.priority}
                      </Badge>
                      <Badge variant="secondary">{task.subject}</Badge>
                    </div>
                  </div>
                </div>
                <div className="text-sm text-muted-foreground">
                  Vence: {new Date(task.dueDate).toLocaleDateString()}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Completed Tasks */}
      {completedTasks.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Tareas Completadas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {completedTasks.map((task) => (
                <div
                  key={task.id}
                  className="flex items-center justify-between p-4 border rounded-lg bg-green-50/50 opacity-75"
                >
                  <div className="flex items-center gap-4">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <div className="flex-1">
                      <h3 className="font-medium line-through">{task.title}</h3>
                      <p className="text-sm text-muted-foreground">{task.description}</p>
                      <Badge variant="secondary" className="mt-2">{task.subject}</Badge>
                    </div>
                  </div>
                  <div className="text-sm text-green-600 font-medium">
                    ✓ Completada
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      <TaskDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        onSave={addNewTask}
      />
    </div>
  );
}
