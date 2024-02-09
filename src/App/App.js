import * as THREE from "three";
import Camera from "./Camera";
import Renderer from "./Renderer";
import Loop from "./Utils/Loop";
import World from "./World/World";
import Resize from "./Utils/Resize";
import AssetLoader from "./Utils/AssetLoader";
import Preloader from "./UI/Preloader";

let instance = null;

export default class App {
  constructor() {
    if (instance) return instance;
    instance = this;
    this.canvas = document.querySelector("canvas.threejs");
    this.scene = new THREE.Scene();
    this.assetLoader = new AssetLoader();
    this.preLoader = new Preloader();
    this.camera = new Camera();
    this.renderer = new Renderer();
    this.world = new World();
    this.loop = new Loop();
    this.resize = new Resize();
  }
}
