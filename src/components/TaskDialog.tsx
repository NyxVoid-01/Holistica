import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface TaskDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (task: {
    title: string;
    description: string;
    type: string;
    subject: string;
    dueDate: string;
    priority: "alta" | "media" | "baja";
  }) => void;
}

export function TaskDialog({ open, onOpenChange, onSave }: TaskDialogProps) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    type: "",
    subject: "",
    dueDate: "",
    priority: "media" as "alta" | "media" | "baja"
  });

  const handleSave = () => {
    if (formData.title && formData.subject && formData.dueDate) {
      onSave(formData);
      setFormData({
        title: "",
        description: "",
        type: "",
        subject: "",
        dueDate: "",
        priority: "media"
      });
      onOpenChange(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Nueva Tarea Académica</DialogTitle>
          <DialogDescription>
            Crea una nueva tarea para organizar mejor tu tiempo de estudio.
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Título de la Tarea</Label>
            <Input
              id="title"
              placeholder="Ej: Ensayo de Literatura"
              value={formData.title}
              onChange={(e) => handleInputChange("title", e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Descripción</Label>
            <Textarea
              id="description"
              placeholder="Describe los detalles de la tarea..."
              value={formData.description}
              onChange={(e) => handleInputChange("description", e.target.value)}
            />
          </div>

          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="details">
              <AccordionTrigger>Detalles Adicionales</AccordionTrigger>
              <AccordionContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="type">Tipo de Tarea</Label>
                    <Select value={formData.type} onValueChange={(value) => handleInputChange("type", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccionar tipo" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="ensayo">Ensayo</SelectItem>
                        <SelectItem value="examen">Examen</SelectItem>
                        <SelectItem value="proyecto">Proyecto</SelectItem>
                        <SelectItem value="presentacion">Presentación</SelectItem>
                        <SelectItem value="tarea">Tarea</SelectItem>
                        <SelectItem value="investigacion">Investigación</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="subject">Materia</Label>
                    <Select value={formData.subject} onValueChange={(value) => handleInputChange("subject", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccionar materia" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Matemáticas">Matemáticas</SelectItem>
                        <SelectItem value="Física">Física</SelectItem>
                        <SelectItem value="Química">Química</SelectItem>
                        <SelectItem value="Literatura">Literatura</SelectItem>
                        <SelectItem value="Historia">Historia</SelectItem>
                        <SelectItem value="Filosofía">Filosofía</SelectItem>
                        <SelectItem value="Programación">Programación</SelectItem>
                        <SelectItem value="Inglés">Inglés</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="dueDate">Fecha de Entrega</Label>
                    <Input
                      id="dueDate"
                      type="date"
                      value={formData.dueDate}
                      onChange={(e) => handleInputChange("dueDate", e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="priority">Prioridad</Label>
                    <Select 
                      value={formData.priority} 
                      onValueChange={(value: "alta" | "media" | "baja") => handleInputChange("priority", value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccionar prioridad" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="alta">Alta</SelectItem>
                        <SelectItem value="media">Media</SelectItem>
                        <SelectItem value="baja">Baja</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancelar
          </Button>
          <Button onClick={handleSave} className="bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600">
            Guardar Tarea
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}