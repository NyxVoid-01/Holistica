import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Apple, 
  Clock, 
  CheckCircle, 
  Star, 
  TrendingUp, 
  Utensils,
  Eye 
} from "lucide-react";

interface Meal {
  id: number;
  name: string;
  type: "desayuno" | "almuerzo" | "cena" | "snack";
  calories: number;
  description: string;
  completed: boolean;
  time: string;
}

interface Recipe {
  id: number;
  name: string;
  image: string;
  cookTime: string;
  difficulty: "Fácil" | "Medio" | "Difícil";
  calories: number;
  ingredients: number;
  rating: number;
  description: string;
}

export default function Nutrition() {
  const [todayMeals, setTodayMeals] = useState<Meal[]>([
    {
      id: 1,
      name: "Avena con frutas y nueces",
      type: "desayuno",
      calories: 350,
      description: "Avena integral con plátano, arándanos y almendras",
      completed: true,
      time: "07:00"
    },
    {
      id: 2,
      name: "Ensalada mediterránea con pollo",
      type: "almuerzo",
      calories: 480,
      description: "Pechuga de pollo, tomate, pepino, aceitunas y queso feta",
      completed: false,
      time: "13:00"
    },
    {
      id: 3,
      name: "Salmón al horno con verduras",
      type: "cena",
      calories: 420,
      description: "Filete de salmón con brócoli, zanahorias y quinoa",
      completed: false,
      time: "19:30"
    },
    {
      id: 4,
      name: "Yogur griego con miel",
      type: "snack",
      calories: 150,
      description: "Yogur natural con miel y granola casera",
      completed: false,
      time: "16:00"
    }
  ]);

  const [recipes] = useState<Recipe[]>([
    {
      id: 1,
      name: "Bowl de Quinoa y Vegetales",
      image: "🥗",
      cookTime: "25 min",
      difficulty: "Fácil",
      calories: 380,
      ingredients: 8,
      rating: 4.8,
      description: "Un bowl nutritivo y colorido perfecto para el almuerzo"
    },
    {
      id: 2,
      name: "Smoothie Verde Energizante",
      image: "🥤",
      cookTime: "5 min",
      difficulty: "Fácil",
      calories: 180,
      ingredients: 5,
      rating: 4.6,
      description: "Combinación perfecta de espinacas, mango y proteína"
    },
    {
      id: 3,
      name: "Tacos de Pescado Saludables",
      image: "🌮",
      cookTime: "20 min",
      difficulty: "Medio",
      calories: 320,
      ingredients: 10,
      rating: 4.9,
      description: "Tacos frescos con pescado blanco y salsa de aguacate"
    },
    {
      id: 4,
      name: "Curry de Lentejas",
      image: "🍛",
      cookTime: "35 min",
      difficulty: "Medio",
      calories: 290,
      ingredients: 12,
      rating: 4.7,
      description: "Curry cremoso y especiado rico en proteínas"
    }
  ]);

  const toggleMealComplete = (mealId: number) => {
    setTodayMeals(meals => 
      meals.map(meal => 
        meal.id === mealId ? { ...meal, completed: !meal.completed } : meal
      )
    );
  };

  const completedMeals = todayMeals.filter(meal => meal.completed);
  const totalCalories = completedMeals.reduce((sum, meal) => sum + meal.calories, 0);
  const targetCalories = 2000;
  const calorieProgress = (totalCalories / targetCalories) * 100;

  const getMealTypeColor = (type: string) => {
    switch (type) {
      case "desayuno": return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "almuerzo": return "bg-orange-100 text-orange-800 border-orange-200";
      case "cena": return "bg-purple-100 text-purple-800 border-purple-200";
      case "snack": return "bg-green-100 text-green-800 border-green-200";
      default: return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Fácil": return "bg-green-100 text-green-800";
      case "Medio": return "bg-yellow-100 text-yellow-800";
      case "Difícil": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Alimentación Saludable</h1>
        <p className="text-muted-foreground">Gestiona tu nutrición y descubre recetas saludables</p>
      </div>

      <Tabs defaultValue="today" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="today">Menú del Día</TabsTrigger>
          <TabsTrigger value="recipes">Recetas Recomendadas</TabsTrigger>
          <TabsTrigger value="stats">Estadísticas</TabsTrigger>
        </TabsList>

        <TabsContent value="today" className="space-y-6">
          {/* Daily Progress */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-green-500" />
                Progreso del Día
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <p className="text-2xl font-bold text-green-600">{totalCalories}</p>
                  <p className="text-sm text-muted-foreground">Calorías consumidas</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-blue-600">{completedMeals.length}/4</p>
                  <p className="text-sm text-muted-foreground">Comidas completadas</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-purple-600">{Math.round(calorieProgress)}%</p>
                  <p className="text-sm text-muted-foreground">Meta diaria</p>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Progreso calórico</span>
                  <span>{totalCalories} / {targetCalories} kcal</span>
                </div>
                <Progress value={calorieProgress} className="h-2" />
              </div>
            </CardContent>
          </Card>

          {/* Today's Meals */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Utensils className="h-5 w-5 text-orange-500" />
                Menú de Hoy
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {todayMeals.map((meal) => (
                  <div
                    key={meal.id}
                    className={`p-4 border rounded-lg transition-colors ${
                      meal.completed
                        ? "bg-green-50 border-green-200"
                        : "hover:bg-muted/50"
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-4 flex-1">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => toggleMealComplete(meal.id)}
                          className={`h-8 w-8 transition-colors ${
                            meal.completed 
                              ? "text-green-600 hover:bg-green-100" 
                              : "hover:bg-green-100 hover:text-green-600"
                          }`}
                        >
                          <CheckCircle className="h-4 w-4" />
                        </Button>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className={`font-medium ${meal.completed ? "line-through text-muted-foreground" : ""}`}>
                              {meal.name}
                            </h3>
                            <Badge variant="outline" className={getMealTypeColor(meal.type)}>
                              {meal.type}
                            </Badge>
                            <Badge variant="secondary">{meal.calories} kcal</Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">{meal.description}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                          <Clock className="h-3 w-3" />
                          {meal.time}
                        </div>
                        <Button variant="outline" size="sm" className="mt-2">
                          Ver Detalles
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="recipes" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Apple className="h-5 w-5 text-red-500" />
                Recetas Recomendadas
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {recipes.map((recipe) => (
                  <Card key={recipe.id} className="overflow-hidden hover:shadow-md transition-shadow">
                    <CardContent className="p-0">
                      <div className="p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div className="text-4xl">{recipe.image}</div>
                          <div className="flex items-center gap-1">
                            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                            <span className="text-sm font-medium">{recipe.rating}</span>
                          </div>
                        </div>
                        
                        <h3 className="font-semibold text-lg mb-2">{recipe.name}</h3>
                        <p className="text-sm text-muted-foreground mb-4">{recipe.description}</p>
                        
                        <div className="flex items-center gap-4 mb-4 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {recipe.cookTime}
                          </div>
                          <div>{recipe.ingredients} ingredientes</div>
                          <div>{recipe.calories} kcal</div>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <Badge variant="outline" className={getDifficultyColor(recipe.difficulty)}>
                            {recipe.difficulty}
                          </Badge>
                          <Button size="sm" className="gap-2">
                            <Eye className="h-3 w-3" />
                            Ver Receta Completa
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

        <TabsContent value="stats" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Progreso Semanal</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm">Lunes</span>
                    <span className="text-sm font-medium">1,850 kcal</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Martes</span>
                    <span className="text-sm font-medium">2,100 kcal</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Miércoles</span>
                    <span className="text-sm font-medium">1,950 kcal</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Jueves</span>
                    <span className="text-sm font-medium text-green-600">{totalCalories} kcal (hoy)</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Distribución de Macronutrientes</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span>Proteínas</span>
                      <span>30%</span>
                    </div>
                    <Progress value={30} className="h-2" />
                  </div>
                  <div className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span>Carbohidratos</span>
                      <span>45%</span>
                    </div>
                    <Progress value={45} className="h-2" />
                  </div>
                  <div className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span>Grasas</span>
                      <span>25%</span>
                    </div>
                    <Progress value={25} className="h-2" />
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