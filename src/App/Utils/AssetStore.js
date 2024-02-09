import { createStore } from "zustand/vanilla";

const assetsToLoad = [
  { path: "/textures/desert.jpg", id: "desert", type: "texture" },
];

const assetStore = createStore((set) => ({
  assetsToLoad,
  loadedAssets: {},
  addLoadedAsset: (asset, id) =>
    set((state) => ({
      loadedAssets: {
        ...state.loadedAssets,
        [id]: asset,
      },
    })),
}));

export default assetStore;
