import React from 'react';
import { format } from 'date-fns';
import { Calendar as CalendarIcon, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { cn } from '@/lib/utils';

interface ReportFiltersProps {
  onFilterChange: (filters: {
    startDate: Date | null;
    endDate: Date | null;
    type: string;
    status: string;
  }) => void;
  onExport?: () => void;
}

const ReportFilters: React.FC<ReportFiltersProps> = ({
  onFilterChange,
  onExport,
}) => {
  const [startDate, setStartDate] = React.useState<Date | null>(null);
  const [endDate, setEndDate] = React.useState<Date | null>(null);
  const [type, setType] = React.useState<string>('all');
  const [status, setStatus] = React.useState<string>('all');

  React.useEffect(() => {
    onFilterChange({
      startDate,
      endDate,
      type,
      status,
    });
  }, [startDate, endDate, type, status, onFilterChange]);

  return (
    <div className="flex flex-col md:flex-row gap-4 mb-6 justify-between">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium">Fecha Inicio</label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-full justify-start text-left font-normal",
                  !startDate && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {startDate ? format(startDate, "PPP") : "Seleccionar fecha"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={startDate}
                onSelect={(date) => setStartDate(date || null)}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium">Fecha Fin</label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-full justify-start text-left font-normal",
                  !endDate && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {endDate ? format(endDate, "PPP") : "Seleccionar fecha"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={endDate}
                onSelect={(date) => setEndDate(date || null)}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium">Tipo</label>
          <Select value={type} onValueChange={setType}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Seleccionar tipo" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Tipo de reparación</SelectLabel>
                <SelectItem value="all">Todos</SelectItem>
                <SelectItem value="corrective">Correctiva</SelectItem>
                <SelectItem value="preventive">Preventiva</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium">Estado</label>
          <Select value={status} onValueChange={setStatus}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Seleccionar estado" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Estado de reparación</SelectLabel>
                <SelectItem value="all">Todos</SelectItem>
                <SelectItem value="pending">Pendiente</SelectItem>
                <SelectItem value="in_progress">En progreso</SelectItem>
                <SelectItem value="completed">Completado</SelectItem>
                <SelectItem value="cancelled">Cancelado</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>

      {onExport && (
        <Button onClick={onExport}>
          Exportar <Download className="ml-2 h-4 w-4" />
        </Button>
      )}
    </div>
  );
};

export default ReportFilters;
