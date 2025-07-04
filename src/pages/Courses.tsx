import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  BookOpen, 
  GraduationCap, 
  Clock, 
  Calendar,
  User,
  Star,
  Target,
  BarChart3,
  Trophy,
  Eye
} from "lucide-react";

interface UniversityCourse {
  id: number;
  name: string;
  objective: string;
  schedule: string;
  university: string;
  grade: string;
  pendingTasks: number;
  professor: string;
  progress: number;
}

interface ExternalCourse {
  id: number;
  name: string;
  provider: string;
  type: "Curso" | "Taller" | "Certificación";
  duration: string;
  difficulty: "Principiante" | "Intermedio" | "Avanzado";
  progress: number;
  category: string;
  rating: number;
}

interface StudyStats {
  weeklyHours: number;
  completedCourses: number;
  averageGrade: number;
  studyStreak: number;
}

export default function Courses() {
  const [universityCourses] = useState<UniversityCourse[]>([
    {
      id: 1,
      name: "Cálculo Diferencial e Integral",
      objective: "Dominar los conceptos fundamentales del cálculo para aplicaciones en ingeniería",
      schedule: "Lun, Mié, Jue 08:00-10:00",
      university: "Universidad Nacional",
      grade: "A-",
      pendingTasks: 2,
      professor: "Dr. Ana Holística",
      progress: 78
    },
    {
      id: 2,
      name: "Programación Orientada a Objetos",
      objective: "Aprender paradigmas de POO y desarrollo de software escalable",
      schedule: "Mar, Jue 14:00-16:00",
      university: "Universidad Nacional",
      grade: "A",
      pendingTasks: 1,
      professor: "Ing. Carlos López",
      progress: 85
    },
    {
      id: 3,
      name: "Física General II",
      objective: "Comprender electromagnetismo y ondas en sistemas físicos",
      schedule: "Lun, Mié, Vie 10:00-12:00",
      university: "Universidad Nacional",
      grade: "B+",
      pendingTasks: 3,
      professor: "Dr. Miguel Holístico",
      progress: 65
    }
  ]);

  const [externalCourses] = useState<ExternalCourse[]>([
    {
      id: 1,
      name: "Desarrollo Web Full Stack",
      provider: "TechAcademy",
      type: "Curso",
      duration: "12 semanas",
      difficulty: "Intermedio",
      progress: 45,
      category: "Tecnología",
      rating: 4.8
    },
    {
      id: 2,
      name: "Gestión de Proyectos Ágiles",
      provider: "PMI Institute",
      type: "Certificación",
      duration: "8 semanas",
      difficulty: "Intermedio",
      progress: 30,
      category: "Gestión",
      rating: 4.9
    },
    {
      id: 3,
      name: "Diseño UX/UI Avanzado",
      provider: "Design Pro",
      type: "Taller",
      duration: "6 semanas",
      difficulty: "Avanzado",
      progress: 70,
      category: "Diseño",
      rating: 4.7
    },
    {
      id: 4,
      name: "Marketing Digital",
      provider: "MarketingHub",
      type: "Curso",
      duration: "10 semanas",
      difficulty: "Principiante",
      progress: 15,
      category: "Marketing",
      rating: 4.6
    }
  ]);

  const [studyStats] = useState<StudyStats>({
    weeklyHours: 28,
    completedCourses: 12,
    averageGrade: 8.7,
    studyStreak: 15
  });

  const getGradeColor = (grade: string) => {
    if (grade.startsWith('A')) return "bg-green-100 text-green-800 border-green-200";
    if (grade.startsWith('B')) return "bg-blue-100 text-blue-800 border-blue-200";
    if (grade.startsWith('C')) return "bg-yellow-100 text-yellow-800 border-yellow-200";
    return "bg-gray-100 text-gray-800 border-gray-200";
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Principiante": return "bg-green-100 text-green-800";
      case "Intermedio": return "bg-yellow-100 text-yellow-800";
      case "Avanzado": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Tecnología": return "bg-blue-100 text-blue-800";
      case "Gestión": return "bg-purple-100 text-purple-800";
      case "Diseño": return "bg-pink-100 text-pink-800";
      case "Marketing": return "bg-orange-100 text-orange-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Cursos y Oportunidades</h1>
        <p className="text-muted-foreground">Gestiona tu formación académica y profesional</p>
      </div>

      <Tabs defaultValue="university" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="university">Cursos Universitarios</TabsTrigger>
          <TabsTrigger value="external">Formación Externa</TabsTrigger>
          <TabsTrigger value="stats">Estadísticas</TabsTrigger>
        </TabsList>

        <TabsContent value="university" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <GraduationCap className="h-5 w-5 text-blue-500" />
                Cursos Universitarios
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {universityCourses.map((course) => (
                  <Card key={course.id} className="border-l-4 border-l-blue-400">
                    <CardContent className="p-6">
                      <div className="space-y-4">
                        <div className="flex items-start justify-between">
                          <div className="space-y-2">
                            <h3 className="text-lg font-semibold">{course.name}</h3>
                            <p className="text-sm text-muted-foreground">{course.objective}</p>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge variant="outline" className={getGradeColor(course.grade)}>
                              {course.grade}
                            </Badge>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4 text-muted-foreground" />
                            <span>{course.schedule}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <User className="h-4 w-4 text-muted-foreground" />
                            <span>{course.professor}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Target className="h-4 w-4 text-muted-foreground" />
                            <span>{course.pendingTasks} tareas pendientes</span>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>Progreso del curso</span>
                            <span>{course.progress}%</span>
                          </div>
                          <Progress value={course.progress} className="h-2" />
                        </div>

                        <div className="flex items-center justify-between">
                          <Badge variant="secondary">{course.university}</Badge>
                          <Button variant="outline" size="sm" className="gap-2">
                            <Eye className="h-3 w-3" />
                            Ver Más Detalles
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="external" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-green-500" />
                Formación Externa
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {externalCourses.map((course) => (
                  <Card key={course.id} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-6">
                      <div className="space-y-4">
                        <div className="flex items-start justify-between">
                          <div className="space-y-1">
                            <h3 className="font-semibold">{course.name}</h3>
                            <p className="text-sm text-muted-foreground">{course.provider}</p>
                          </div>
                          <div className="flex items-center gap-1">
                            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                            <span className="text-sm font-medium">{course.rating}</span>
                          </div>
                        </div>

                        <div className="flex flex-wrap gap-2">
                          <Badge variant="outline">{course.type}</Badge>
                          <Badge variant="outline" className={getDifficultyColor(course.difficulty)}>
                            {course.difficulty}
                          </Badge>
                          <Badge variant="outline" className={getCategoryColor(course.category)}>
                            {course.category}
                          </Badge>
                        </div>

                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {course.duration}
                          </div>
                        </div>

                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>Progreso</span>
                            <span>{course.progress}%</span>
                          </div>
                          <Progress value={course.progress} className="h-2" />
                        </div>

                        <Button variant="outline" size="sm" className="w-full gap-2">
                          <Eye className="h-3 w-3" />
                          Ver Detalles del Curso
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="stats" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5 text-purple-500" />
                  Resumen de la Semana
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-blue-600">{studyStats.weeklyHours}</p>
                    <p className="text-sm text-muted-foreground">Horas de estudio</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-green-600">{studyStats.studyStreak}</p>
                    <p className="text-sm text-muted-foreground">Días consecutivos</p>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm">Lunes</span>
                    <span className="text-sm font-medium">4 horas</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Martes</span>
                    <span className="text-sm font-medium">3.5 horas</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Miércoles</span>
                    <span className="text-sm font-medium">5 horas</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Jueves</span>
                    <span className="text-sm font-medium text-blue-600">6 horas (hoy)</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Trophy className="h-5 w-5 text-yellow-500" />
                  Logros Académicos
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-yellow-600">{studyStats.completedCourses}</p>
                    <p className="text-sm text-muted-foreground">Cursos completados</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-purple-600">{studyStats.averageGrade}</p>
                    <p className="text-sm text-muted-foreground">Promedio general</p>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="p-3 bg-green-50 rounded-lg border-l-4 border-green-400">
                    <p className="text-sm font-medium text-green-900">Racha de Estudio</p>
                    <p className="text-sm text-green-700">15 días consecutivos estudiando</p>
                  </div>
                  <div className="p-3 bg-blue-50 rounded-lg border-l-4 border-blue-400">
                    <p className="text-sm font-medium text-blue-900">Meta Semanal</p>
                    <p className="text-sm text-blue-700">28/30 horas completadas</p>
                  </div>
                  <div className="p-3 bg-purple-50 rounded-lg border-l-4 border-purple-400">
                    <p className="text-sm font-medium text-purple-900">Mejor Materia</p>
                    <p className="text-sm text-purple-700">Programación (Promedio: A)</p>
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