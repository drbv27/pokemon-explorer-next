import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ProcessedPokemon } from "@/hooks/use-pokemons";
import { PokemonTypeBadge } from "./pokemon-type-badge";
import { PokemonStatBar } from "./pokemon-stat-bar";
import Image from "next/image";

interface PokemonModalProps {
  pokemon: ProcessedPokemon | null;
  isOpen: boolean;
  onClose: () => void;
}

export function PokemonModal({ pokemon, isOpen, onClose }: PokemonModalProps) {
  // Guard clause para prevenir el renderizado del modal si no hay un Pokémon seleccionado.
  if (!pokemon) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="capitalize text-2xl font-bold text-center">
            {pokemon.name}
            <span className="text-muted-foreground font-normal ml-2">
              #{String(pokemon.id).padStart(3, "0")}
            </span>
          </DialogTitle>
          <DialogDescription className="sr-only">
            Detalles y estadísticas para {pokemon.name}.
          </DialogDescription>
        </DialogHeader>
        <div className="flex justify-center">
          <Image
            src={pokemon.sprites.front_default}
            alt={pokemon.name}
            width={160}
            height={160}
          />
        </div>
        <div className="flex justify-center gap-2 my-2">
          {pokemon.types.map((type) => (
            <PokemonTypeBadge key={type} type={type} />
          ))}
        </div>
        <div className="grid grid-cols-2 gap-2 text-center my-4">
          <div className="p-2 rounded-md bg-gray-100">
            <p className="font-semibold">{pokemon.weight} kg</p>
            <p className="text-sm text-muted-foreground">Peso</p>
          </div>
          <div className="p-2 rounded-md bg-gray-100">
            <p className="font-semibold">{pokemon.height} m</p>
            <p className="text-sm text-muted-foreground">Altura</p>
          </div>
        </div>

        <div>
          <h3 className="font-bold mb-2 text-lg text-center">Estadísticas</h3>
          <PokemonStatBar label="Salud" value={pokemon.stats.hp} />
          <PokemonStatBar label="Ataque" value={pokemon.stats.attack} />
          <PokemonStatBar label="Defensa" value={pokemon.stats.defense} />
          <PokemonStatBar
            label="At. Especial"
            value={pokemon.stats.specialAttack}
          />
          <PokemonStatBar
            label="Def. Especial"
            value={pokemon.stats.specialDefense}
          />
          <PokemonStatBar label="Velocidad" value={pokemon.stats.speed} />
        </div>
      </DialogContent>
    </Dialog>
  );
}
