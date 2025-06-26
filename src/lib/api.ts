import axios from "axios";
import { PokemonFromApi, PokemonListResult } from "@/types";

// Instancia pre-configurada de Axios para centralizar la baseURL de la PokéAPI.
const apiClient = axios.create({
  baseURL: "https://pokeapi.co/api/v2",
});

/**
 * Obtiene la lista inicial de los 151 Pokémon.
 * @returns Una promesa que resuelve a un array de resultados de la lista de Pokémon.
 */
export const getPokemonList = async (): Promise<PokemonListResult[]> => {
  const response = await apiClient.get("/pokemon?limit=151");
  return response.data.results;
};

/**
 * Obtiene los detalles completos de un Pokémon específico a partir de su URL.
 * @param url - La URL completa del recurso del Pokémon.
 * @returns Una promesa que resuelve al objeto de datos completo del Pokémon.
 */
export const getPokemonDetails = async (
  url: string
): Promise<PokemonFromApi> => {
  // Se utiliza `axios.get` directamente, ya que la API proporciona la URL completa,
  // evitando así la duplicación de la baseURL de `apiClient`.
  const response = await axios.get(url);
  return response.data;
};
