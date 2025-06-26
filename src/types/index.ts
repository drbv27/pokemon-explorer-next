// src/types/index.ts

export interface PokemonListResult {
  name: string;
  url: string;
}

export interface PokemonStatDetail {
  base_stat: number;
  stat: {
    name: string;
  };
}

export interface PokemonTypeDetail {
  type: {
    name: string;
  };
}

export interface PokemonFromApi {
  id: number;
  name: string;
  height: number; // en decímetros
  weight: number; // en hectogramos
  sprites: {
    front_default: string;
  };
  stats: PokemonStatDetail[];
  types: PokemonTypeDetail[];
  base_experience: number;
}
