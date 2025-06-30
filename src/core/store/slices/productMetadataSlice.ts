import {
  createSelector,
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";
import type { RootState } from "@core/store/store.ts";

interface ProductMetadata {
  id: number;
  isHidden?: boolean;
  customPrice?: number;
  modifiedAt?: string;
}

interface ProductMetadataState {
  metadata: Record<number, ProductMetadata>;
  version: number;
}

const loadFromLocalStorage = (): ProductMetadataState => {
  try {
    const saved = localStorage.getItem("productMetadata");
    if (!saved) {
      console.log("No saved metadata, using initial state");
      return { metadata: {}, version: 1 };
    }

    const parsed = JSON.parse(saved);
    console.log("Loaded from localStorage:", parsed);
    return parsed.version === 1 ? parsed : { metadata: {}, version: 1 };
  } catch (error) {
    console.error("Load from localStorage error:", error);
    return { metadata: {}, version: 1 };
  }
};

const saveToLocalStorage = (state: ProductMetadataState) => {
  try {
    const data = JSON.stringify({
      ...state,
      version: 1,
      savedAt: new Date().toISOString(),
    });
    localStorage.setItem("productMetadata", data);
    console.log("Saved to localStorage:", data); // Добавим лог
  } catch (error) {
    console.error("LocalStorage save error:", error);
  }
};

const initialState: ProductMetadataState = loadFromLocalStorage();

const productMetadataSlice = createSlice({
  name: "productMetadata",
  initialState,
  reducers: {
    toggleVisibility: (state, action: PayloadAction<number>) => {
      const id = action.payload;
      state.metadata[id] = {
        ...state.metadata[id],
        isHidden: !state.metadata[id]?.isHidden,
        modifiedAt: new Date().toISOString(),
      };
      saveToLocalStorage(state);
    },
    updatePrice: (
      state,
      action: PayloadAction<{ id: number; price: number }>,
    ) => {
      const { id, price } = action.payload;
      state.metadata[id] = {
        ...state.metadata[id],
        id,
        customPrice: price > 0 ? price : undefined,
        modifiedAt: new Date().toISOString(),
      };
      saveToLocalStorage(state);
    },
    resetMetadata: (state, action: PayloadAction<number>) => {
      const id = action.payload;
      if (state.metadata[id]) {
        delete state.metadata[id];
        saveToLocalStorage(state);
      }
    },
    importMetadata: (
      state,
      action: PayloadAction<Record<number, Omit<ProductMetadata, "id">>>,
    ) => {
      state.metadata = Object.entries(action.payload).reduce(
        (acc, [id, data]) => {
          const numId = Number(id);
          if (!isNaN(numId)) {
            acc[numId] = { ...data, id: numId };
          }
          return acc;
        },
        {} as Record<number, ProductMetadata>,
      );
      saveToLocalStorage(state);
    },
  },
});

export const { toggleVisibility, updatePrice, resetMetadata, importMetadata } =
  productMetadataSlice.actions;

export const selectProductMetadata = (state: RootState) =>
  state.productMetadata.metadata;

export const selectProductMetadataById = createSelector(
  [selectProductMetadata, (_, id: number) => id],
  (metadata, id) => metadata[id] ?? { id, isHidden: false },
);
export default productMetadataSlice.reducer;
