"use client";

import * as React from "react";
import {
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { RotateCcw, ChevronDown } from "lucide-react";

import { ProcessedPokemon } from "@/hooks/use-pokemons";
import { getColumns } from "./pokemon-table-columns";
import { useUiStore } from "@/store/ui-store";

interface PokemonTableProps {
  data: ProcessedPokemon[];
  onSelectPokemon: (pokemon: ProcessedPokemon) => void;
}

const POKEMON_TYPES = [
  "normal",
  "fire",
  "water",
  "electric",
  "grass",
  "ice",
  "fighting",
  "poison",
  "ground",
  "flying",
  "psychic",
  "bug",
  "rock",
  "ghost",
  "dragon",
  "dark",
  "steel",
  "fairy",
];

// Mapeo para la internacionalización (i18n) de los nombres de columna en el selector.
const columnDisplayNames: Record<string, string> = {
  types: "Tipo",
  weight: "Peso (kg)",
  height: "Altura (m)",
  stats_hp: "Salud",
  stats_attack: "Ataque",
  stats_defense: "Defensa",
  stats_specialAttack: "At. Esp.",
  stats_specialDefense: "Def. Esp.",
  stats_speed: "Velocidad",
};

export function PokemonTable({ data, onSelectPokemon }: PokemonTableProps) {
  // El estado de la tabla (filtros, ordenamiento) se delega al store de Zustand
  // para permitir la persistencia entre sesiones.
  const {
    sorting,
    setSorting,
    columnFilters,
    setColumnFilters,
    resetTableState,
  } = useUiStore();

  // El estado de visibilidad de columnas se mantiene local al componente.
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({
      stats_specialAttack: false,
      stats_specialDefense: false,
    });

  const columns = React.useMemo(
    () => getColumns(onSelectPokemon),
    [onSelectPokemon]
  );

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      columnFilters,
      columnVisibility,
    },
  });

  // Determina si hay algún filtro u ordenamiento activo para mostrar el botón de reinicio.
  const isFiltered = columnFilters.length > 0 || sorting.length > 0;

  return (
    <div className="w-full">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 py-4">
        <div className="flex flex-col sm:flex-row items-center gap-2">
          <Input
            placeholder="Filtrar por nombre..."
            value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
            onChange={(event) =>
              table.getColumn("name")?.setFilterValue(event.target.value)
            }
            className="w-full sm:w-auto sm:max-w-xs"
          />
          <Select
            value={
              (table.getColumn("types")?.getFilterValue() as string) ?? "all"
            }
            onValueChange={(value) => {
              table
                .getColumn("types")
                ?.setFilterValue(value === "all" ? "" : value);
            }}
          >
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Filtrar por tipo" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos los tipos</SelectItem>
              {POKEMON_TYPES.map((type) => (
                <SelectItem key={type} value={type} className="capitalize">
                  {type}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {isFiltered && (
            <Button
              variant="ghost"
              onClick={() => resetTableState()}
              className="text-muted-foreground w-full sm:w-auto"
            >
              <RotateCcw className="h-4 w-4 mr-2" />
              Reiniciar filtros
            </Button>
          )}
        </div>
        <div className="w-full md:w-auto">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className="w-full md:w-auto justify-center"
              >
                Ver Columnas <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {table
                .getAllColumns()
                .filter((column) => column.getCanHide())
                .map((column) => (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {columnDisplayNames[column.id] ||
                      column.id.replace(/_/g, " ")}
                  </DropdownMenuCheckboxItem>
                ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id} className="text-center">
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="text-center p-2">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No se encontraron resultados.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-between flex-wrap gap-4 py-4">
        <div className="text-sm text-muted-foreground">
          {table.getFilteredRowModel().rows.length} de {data.length} Pokémon.
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <p className="text-sm font-medium">Filas por página</p>
            <Select
              value={`${table.getState().pagination.pageSize}`}
              onValueChange={(value) => table.setPageSize(Number(value))}
            >
              <SelectTrigger className="h-8 w-[70px]">
                <SelectValue
                  placeholder={table.getState().pagination.pageSize}
                />
              </SelectTrigger>
              <SelectContent side="top">
                {[10, 20, 30, 50, 100].map((pageSize) => (
                  <SelectItem key={pageSize} value={`${pageSize}`}>
                    {pageSize}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-muted-foreground">
              Página {table.getState().pagination.pageIndex + 1} de{" "}
              {table.getPageCount()}
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              Anterior
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              Siguiente
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
