"use client";

import * as React from "react";
import Image from "next/image";
import { usePokemons, ProcessedPokemon } from "@/hooks/use-pokemons";
import { PokemonTable } from "@/components/pokemon/pokemon-table";
import { PokemonGrid } from "@/components/pokemon/pokemon-grid";
import { PokemonModal } from "@/components/pokemon/pokemon-modal";
import { ViewToggle } from "@/components/shared/view-toggle";
import { Skeleton } from "@/components/ui/skeleton";
import { useUiStore } from "@/store/ui-store";
import { Github, Linkedin, Mail } from "lucide-react";

export default function HomePage() {
  // Estado global de la UI (vista, filtros, etc.) gestionado por Zustand.
  const { view, setView } = useUiStore();
  // Estado local para controlar el Pokémon seleccionado y el modal.
  const [selectedPokemon, setSelectedPokemon] =
    React.useState<ProcessedPokemon | null>(null);

  // Patrón para garantizar la hidratación segura del cliente.
  // Evita un mismatch entre el render del servidor (sin estado persistido) y el del cliente.
  const [isClient, setIsClient] = React.useState(false);
  React.useEffect(() => {
    setIsClient(true);
  }, []);

  const { pokemons, isLoading, error } = usePokemons();

  const handleSelectPokemon = (pokemon: ProcessedPokemon) => {
    setSelectedPokemon(pokemon);
  };

  const handleCloseModal = () => {
    setSelectedPokemon(null);
  };

  if (error) {
    return (
      <main className="container mx-auto p-4 text-center">
        <h1 className="text-4xl font-bold text-red-600 mb-4">¡Oh, no!</h1>
        <p>Hubo un error al contactar la PokéAPI.</p>
        <p className="text-sm text-gray-500 mt-2">Detalles: {error.message}</p>
      </main>
    );
  }

  // Muestra el esqueleto de carga hasta que el cliente esté montado y los datos cargados.
  // Esto previene el "flash" de contenido incorrecto antes de que el estado de Zustand se hidrate.
  if (!isClient || isLoading) {
    return (
      <main className="container mx-auto p-4 md:p-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
            Pokémon Explorer
          </h1>
          <p className="text-lg text-muted-foreground mt-2">
            Desafío Técnico para Litsight
          </p>
        </div>
        <Skeleton className="h-10 w-48 mx-auto mb-4" />
        <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {Array.from({ length: 18 }).map((_, i) => (
            <div key={i} className="flex flex-col items-center space-y-4 p-2">
              <Skeleton className="h-32 w-32 rounded-lg" />
              <Skeleton className="h-4 w-24" />
            </div>
          ))}
        </div>
      </main>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <main className="container mx-auto p-4 md:p-8">
        <div className="relative text-center mb-8">
          <div className="hidden md:block absolute left-0 top-1/2 -translate-y-1/2">
            <Image
              src="/pokelogo.png"
              alt="Pokémon Logo"
              width={120}
              height={44}
              priority
            />
          </div>
          <div>
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
              Pokémon Explorer
            </h1>
            <p className="text-lg text-muted-foreground mt-2">
              Desafío Técnico para Litsight
            </p>
          </div>
        </div>

        <ViewToggle view={view} setView={setView} />

        <div className="mt-8">
          {view === "table" ? (
            <PokemonTable
              data={pokemons}
              onSelectPokemon={handleSelectPokemon}
            />
          ) : (
            <PokemonGrid
              pokemons={pokemons}
              onSelectPokemon={handleSelectPokemon}
            />
          )}
        </div>

        {selectedPokemon && (
          <PokemonModal
            pokemon={selectedPokemon}
            isOpen={!!selectedPokemon}
            onClose={handleCloseModal}
          />
        )}
      </main>
      <footer className="py-6 mt-auto border-t bg-background">
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center text-center md:text-left gap-4">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} Diego Bonilla. Todos los derechos
            reservados.
          </p>
          <div className="flex gap-4">
            <a
              href="mailto:drbv27@gmail.com"
              className="text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              <Mail />
            </a>
            <a
              href="https://www.linkedin.com/in/diego-ricardo-bonilla-villa-7179254a/"
              className="text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              <Linkedin />
            </a>
            <a
              href="https://github.com/drbv27"
              className="text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              <Github />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
