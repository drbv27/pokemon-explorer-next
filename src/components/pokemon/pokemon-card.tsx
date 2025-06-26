import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ProcessedPokemon } from "@/hooks/use-pokemons";
import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";
import Image from "next/image";

interface PokemonCardProps {
  pokemon: ProcessedPokemon;
  onSelectPokemon: (pokemon: ProcessedPokemon) => void;
}

export function PokemonCard({ pokemon, onSelectPokemon }: PokemonCardProps) {
  return (
    // Se utiliza flex-col y justify-between para asegurar que el footer se alinee
    // en la parte inferior, manteniendo una altura consistente entre tarjetas.
    <Card className="flex flex-col justify-between overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
      {/* El área principal de la tarjeta es clicable para una mayor área de interacción. */}
      <div className="cursor-pointer" onClick={() => onSelectPokemon(pokemon)}>
        <CardContent className="p-4 relative flex flex-col items-center justify-center">
          <Badge variant="secondary" className="absolute top-2 right-2 z-10">
            #{String(pokemon.id).padStart(3, "0")}
          </Badge>
          <Image
            src={pokemon.sprites.front_default}
            alt={pokemon.name}
            width={128}
            height={128}
            className="object-contain"
          />
          <p className="font-semibold capitalize text-center mt-2">
            {pokemon.name}
          </p>
        </CardContent>
      </div>
      {/* El footer contiene un botón explícito para una llamada a la acción clara (CTA). */}
      <CardFooter className="p-2 bg-muted/50 border-t">
        <Button
          variant="ghost"
          className="w-full"
          onClick={() => onSelectPokemon(pokemon)}
        >
          <Eye className="h-4 w-4 mr-2" />
          Ver Detalles
        </Button>
      </CardFooter>
    </Card>
  );
}
