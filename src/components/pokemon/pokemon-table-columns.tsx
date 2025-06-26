"use client";
import { type Column, type ColumnDef } from "@tanstack/react-table";
import { ProcessedPokemon } from "@/hooks/use-pokemons";
import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react";
import { PokemonTypeBadge } from "./pokemon-type-badge";
import Image from "next/image";

// Componente de UI reutilizable para estandarizar las cabeceras de columna ordenables.
const SortableHeader = ({
  column,
  children,
}: {
  column: Column<ProcessedPokemon, unknown>;
  children: React.ReactNode;
}) => (
  <Button
    variant="ghost"
    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
  >
    {children}
    <ArrowUpDown className="ml-2 h-4 w-4" />
  </Button>
);

// Define la configuración de las columnas para la tabla de Pokémon.
// Esta función encapsula la lógica de las columnas, permitiendo pasar props como `onSelectPokemon`.
export const getColumns = (
  onSelectPokemon: (pokemon: ProcessedPokemon) => void
): ColumnDef<ProcessedPokemon>[] => [
  {
    accessorKey: "sprites.front_default",
    header: "Imagen",
    cell: ({ row }) => (
      <Image
        src={row.original.sprites.front_default}
        alt={row.original.name}
        width={64}
        height={64}
        className="mx-auto"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "name",
    header: ({ column }) => (
      <SortableHeader column={column}>Nombre</SortableHeader>
    ),
    cell: ({ row }) => (
      <div className="capitalize font-medium">{row.original.name}</div>
    ),
    enableHiding: false, // Se deshabilita la ocultación de columnas esenciales.
  },
  {
    accessorKey: "types",
    header: ({ column }) => (
      <SortableHeader column={column}>Tipo</SortableHeader>
    ),
    cell: ({ row }) => (
      <div className="flex flex-col gap-1 items-center">
        {row.original.types.map((type) => (
          <PokemonTypeBadge key={type} type={type} />
        ))}
      </div>
    ),
    // Función de filtro personalizada para la columna de tipos, que busca la coincidencia dentro de un array.
    filterFn: (row, columnId, value) => {
      return value ? row.original.types.includes(value as string) : true;
    },
    sortingFn: (rowA, rowB) =>
      (rowA.original.types[0] || "").localeCompare(
        rowB.original.types[0] || ""
      ),
  },
  {
    accessorKey: "weight",
    header: ({ column }) => (
      <SortableHeader column={column}>Peso (kg)</SortableHeader>
    ),
    cell: ({ row }) => <div>{row.original.weight}</div>,
  },
  {
    accessorKey: "height",
    header: ({ column }) => (
      <SortableHeader column={column}>Altura (m)</SortableHeader>
    ),
    cell: ({ row }) => <div>{row.original.height}</div>,
  },
  // Se utiliza `accessorFn` para acceder a datos anidados.
  // `id` se mantiene plano para una mejor compatibilidad con el estado de visibilidad.
  {
    id: "stats_hp",
    accessorFn: (row) => row.stats.hp,
    header: ({ column }) => (
      <SortableHeader column={column}>Salud</SortableHeader>
    ),
  },
  {
    id: "stats_attack",
    accessorFn: (row) => row.stats.attack,
    header: ({ column }) => (
      <SortableHeader column={column}>Ataque</SortableHeader>
    ),
  },
  {
    id: "stats_defense",
    accessorFn: (row) => row.stats.defense,
    header: ({ column }) => (
      <SortableHeader column={column}>Defensa</SortableHeader>
    ),
  },
  {
    id: "stats_specialAttack",
    accessorFn: (row) => row.stats.specialAttack,
    header: ({ column }) => (
      <SortableHeader column={column}>At. Esp.</SortableHeader>
    ),
  },
  {
    id: "stats_specialDefense",
    accessorFn: (row) => row.stats.specialDefense,
    header: ({ column }) => (
      <SortableHeader column={column}>Def. Esp.</SortableHeader>
    ),
  },
  {
    id: "stats_speed",
    accessorFn: (row) => row.stats.speed,
    header: ({ column }) => (
      <SortableHeader column={column}>Velocidad</SortableHeader>
    ),
  },
  {
    id: "actions",
    cell: ({ row }) => (
      <Button
        variant="outline"
        size="sm"
        onClick={() => onSelectPokemon(row.original)}
      >
        Detalles
      </Button>
    ),
    enableHiding: false,
  },
];
