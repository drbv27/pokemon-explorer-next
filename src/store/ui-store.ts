import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { SortingState, ColumnFiltersState } from "@tanstack/react-table";

// Alias para el tipo de función de actualización de estado de TanStack Table.
// Esto permite que el store maneje tanto un nuevo valor directo como una función
// que calcula el nuevo estado a partir del anterior.
type Updater<T> = T | ((old: T) => T);

interface UiState {
  view: "grid" | "table";
  sorting: SortingState;
  columnFilters: ColumnFiltersState;
  setView: (view: "grid" | "table") => void;
  setSorting: (updater: Updater<SortingState>) => void;
  setColumnFilters: (updater: Updater<ColumnFiltersState>) => void;
  resetTableState: () => void;
}

// Creación del store de Zustand con el middleware de persistencia.
export const useUiStore = create<UiState>()(
  persist(
    (set) => ({
      // Estado inicial por defecto de la UI.
      view: "grid",
      sorting: [],
      columnFilters: [],

      // Acciones para modificar el estado del store.
      setView: (view) => set({ view }),

      // Acciones que manejan el patrón de 'updater' para ser compatibles con TanStack Table.
      setSorting: (updater) =>
        set((state) => ({
          sorting:
            typeof updater === "function" ? updater(state.sorting) : updater,
        })),

      setColumnFilters: (updater) =>
        set((state) => ({
          columnFilters:
            typeof updater === "function"
              ? updater(state.columnFilters)
              : updater,
        })),

      resetTableState: () => set({ sorting: [], columnFilters: [] }),
    }),
    {
      // Clave única para el almacenamiento en localStorage.
      name: "pokemon-explorer-ui-storage",
      // Define el mecanismo de almacenamiento (en este caso, localStorage).
      storage: createJSONStorage(() => localStorage),
    }
  )
);
