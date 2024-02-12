import { createStore } from "zustand/vanilla";

const assetsToLoad = [
  { id: "avatar", path: "/models/avatar.glb", type: "model" },
  { id: "houses", path: "/models/houses.glb", type: "model" },
  { id: "ladder", path: "/models/ladder.glb", type: "model" },
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
