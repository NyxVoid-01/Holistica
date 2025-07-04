import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Heart, Zap, Save } from "lucide-react";

interface WellnessData {
  feeling: string;
  energyLevel: number;
  stressLevel: number;
}

interface WellnessFormProps {
  onSave: (data: WellnessData) => void;
}

export function WellnessForm({ onSave }: WellnessFormProps) {
  const [feeling, setFeeling] = useState("");
  const [energyLevel, setEnergyLevel] = useState([3]);
  const [stressLevel, setStressLevel] = useState([3]);

  const handleSave = () => {
    if (feeling.trim()) {
      onSave({
        feeling: feeling.trim(),
        energyLevel: energyLevel[0],
        stressLevel: stressLevel[0],
      });
      
      // Reset form
      setFeeling("");
      setEnergyLevel([3]);
      setStressLevel([3]);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Heart className="h-5 w-5 text-red-500" />
          ¿Cómo te sientes hoy?
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="feeling">Describe cómo te sientes</Label>
          <Textarea
            id="feeling"
            placeholder="Comparte tus pensamientos y emociones del día..."
            value={feeling}
            onChange={(e) => setFeeling(e.target.value)}
            className="min-h-[100px]"
          />
        </div>

        <div className="space-y-4">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label className="flex items-center gap-2">
                <Zap className="h-4 w-4 text-yellow-500" />
                Nivel de Energía
              </Label>
              <span className="text-sm font-medium bg-yellow-100 text-yellow-800 px-2 py-1 rounded">
                {energyLevel[0]}/5
              </span>
            </div>
            <div className="px-3">
              <Slider
                value={energyLevel}
                onValueChange={setEnergyLevel}
                max={5}
                min={1}
                step={1}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-muted-foreground mt-1">
                <span>Muy bajo</span>
                <span>Bajo</span>
                <span>Normal</span>
                <span>Alto</span>
                <span>Muy alto</span>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label className="flex items-center gap-2">
                <Heart className="h-4 w-4 text-red-500" />
                Nivel de Estrés
              </Label>
              <span className="text-sm font-medium bg-red-100 text-red-800 px-2 py-1 rounded">
                {stressLevel[0]}/5
              </span>
            </div>
            <div className="px-3">
              <Slider
                value={stressLevel}
                onValueChange={setStressLevel}
                max={5}
                min={1}
                step={1}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-muted-foreground mt-1">
                <span>Muy bajo</span>
                <span>Bajo</span>
                <span>Normal</span>
                <span>Alto</span>
                <span>Muy alto</span>
              </div>
            </div>
          </div>
        </div>

        <Button 
          onClick={handleSave} 
          className="w-full bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600"
          disabled={!feeling.trim()}
        >
          <Save className="h-4 w-4 mr-2" />
          Guardar Registro
        </Button>
      </CardContent>
    </Card>
  );
}