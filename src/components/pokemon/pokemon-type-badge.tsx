import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

// Configuración centralizada para el "theming" de los tipos de Pokémon.
// Permite una fácil modificación o extensión de los colores en un solo lugar.
const typeColors: Record<string, string> = {
  normal: "bg-gray-400",
  fire: "bg-red-500",
  water: "bg-blue-500",
  electric: "bg-yellow-400 text-black",
  grass: "bg-green-500",
  ice: "bg-cyan-300 text-black",
  fighting: "bg-orange-700",
  poison: "bg-purple-600",
  ground: "bg-yellow-600",
  flying: "bg-indigo-400",
  psychic: "bg-pink-500",
  bug: "bg-lime-600",
  rock: "bg-stone-500",
  ghost: "bg-indigo-800",
  dragon: "bg-violet-700",
  dark: "bg-zinc-700",
  steel: "bg-slate-500",
  fairy: "bg-pink-300 text-black",
};

interface PokemonTypeBadgeProps {
  type: string;
  className?: string;
}

export const PokemonTypeBadge = ({
  type,
  className,
}: PokemonTypeBadgeProps) => {
  // Se asigna un color por defecto para manejar elegantemente tipos no definidos o futuros.
  const color = typeColors[type] || "bg-gray-500";
  return (
    <Badge className={cn("text-white capitalize", color, className)}>
      {type}
    </Badge>
  );
};
