import { useQuery } from "@tanstack/react-query";
import { getPokemonList, getPokemonDetails } from "@/lib/api";
import { PokemonFromApi } from "@/types";

/**
 * Procesa los datos crudos de la API de un Pokémon, adaptándolos
 * a una estructura de datos más conveniente para la UI.
 * @param pokemon - El objeto Pokémon directamente de la API.
 * @returns Un objeto Pokémon procesado con unidades corregidas y estadísticas aplanadas.
 */
const processPokemonData = (pokemon: PokemonFromApi) => {
  // Conversión de unidades de la API a estándares (ej. decímetros a metros).
  const weightInKg = pokemon.weight / 10;
  const heightInM = pokemon.height / 10;

  // Aplanamiento del array de estadísticas para un acceso más directo y eficiente.
  const stats = {
    hp: pokemon.stats.find((stat) => stat.stat.name === "hp")?.base_stat || 0,
    attack:
      pokemon.stats.find((stat) => stat.stat.name === "attack")?.base_stat || 0,
    defense:
      pokemon.stats.find((stat) => stat.stat.name === "defense")?.base_stat ||
      0,
    specialAttack:
      pokemon.stats.find((stat) => stat.stat.name === "special-attack")
        ?.base_stat || 0,
    specialDefense:
      pokemon.stats.find((stat) => stat.stat.name === "special-defense")
        ?.base_stat || 0,
    speed:
      pokemon.stats.find((stat) => stat.stat.name === "speed")?.base_stat || 0,
  };

  const types = pokemon.types.map((t) => t.type.name);

  return {
    ...pokemon,
    weight: weightInKg,
    height: heightInM,
    stats,
    types,
  };
};

// Tipo exportado para el Pokémon procesado, para ser usado a través de la aplicación.
export type ProcessedPokemon = ReturnType<typeof processPokemonData>;

/**
 * Custom Hook para obtener y procesar los datos de los 151 Pokémon.
 * Encapsula la lógica de fetching, caching y transformación de datos.
 */
export const usePokemons = () => {
  // Query principal para obtener la lista de Pokémon.
  // Esta data se considera estática y se cachea indefinidamente.
  const {
    data: pokemonList,
    isLoading: isListLoading,
    error: listError,
  } = useQuery({
    queryKey: ["pokemonList"],
    queryFn: getPokemonList,
    staleTime: Infinity,
  });

  // Query dependiente que se ejecuta solo cuando `pokemonList` está disponible.
  // Realiza peticiones en paralelo para obtener los detalles de cada Pokémon.
  const {
    data: detailedPokemons,
    isLoading: areDetailsLoading,
    error: detailsError,
  } = useQuery({
    queryKey: ["detailedPokemons", pokemonList],
    queryFn: async () => {
      if (!pokemonList) return [];

      // Se utiliza `Promise.all` para optimizar el rendimiento, ejecutando
      // todas las peticiones de detalles de forma concurrente.
      const promises = pokemonList.map((p) => getPokemonDetails(p.url));
      const results = await Promise.all(promises);

      return results.map(processPokemonData);
    },
    // Habilita la query solo si la dependencia `pokemonList` tiene datos.
    enabled: !!pokemonList,
    // Los detalles de los Pokémon son datos estáticos; se cachean por 24 horas.
    staleTime: 1000 * 60 * 60 * 24,
  });

  return {
    pokemons: detailedPokemons ?? [],
    isLoading: isListLoading || areDetailsLoading,
    error: listError || detailsError,
  };
};
