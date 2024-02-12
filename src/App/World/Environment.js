import * as THREE from "three";
import assetStore from "../Utils/AssetStore.js";

import App from "../App.js";

export default class Environment {
  constructor() {
    this.app = new App();
    this.scene = this.app.scene;
    this.physics = this.app.world.physics;
    this.assetStore = assetStore.getState();

    this.loadEnvironment();
    this.addGround();
    // this.addWalls();
    this.addHouses();
    this.addLights();
  }

  loadEnvironment() {
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    this.scene.add(ambientLight);

    this.directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
    this.directionalLight.position.set(1, 1, 1);
    this.directionalLight.castShadow = true;
    this.scene.add(this.directionalLight);
    this.assetStore = assetStore.getState();
  }

  addGround() {
    const groundGeometry = new THREE.BoxGeometry(1000, 1, 1000);
    const groundMaterial = new THREE.MeshStandardMaterial({
      color: "turquoise",
    });
    this.groundMesh = new THREE.Mesh(groundGeometry, groundMaterial);
    this.scene.add(this.groundMesh);
    this.physics.add(this.groundMesh, "fixed", "cuboid");
  }

  addWalls() {
    const wallMaterial = new THREE.MeshStandardMaterial({
      color: "lightgreen",
    });

    const wallGeometry = new THREE.BoxGeometry(100, 10, 1);

    const wallPositions = [
      { x: 0, y: 5, z: 50 },
      { x: 0, y: 5, z: -50 },
      { x: 50, y: 5, z: 0, rotation: { y: Math.PI / 2 } },
      { x: -50, y: 5, z: 0, rotation: { y: Math.PI / 2 } },
    ];

    wallPositions.forEach((position) => {
      const wallMesh = new THREE.Mesh(wallGeometry, wallMaterial);
      wallMesh.position.set(position.x, position.y, position.z);
      if (position.rotation)
        wallMesh.rotation.set(
          position.rotation.x || 0,
          position.rotation.y || 0,
          position.rotation.z || 0
        );
      this.scene.add(wallMesh);
      this.physics.add(wallMesh, "fixed", "cuboid");
    });
  }

  addHouses() {
    this.assetStore = assetStore.getState();
    const housesScene = this.assetStore.loadedAssets.houses.scene;
    housesScene.scale.setScalar(0.1);
    housesScene.position.z = -100;
    housesScene.position.y = 10;
    housesScene.rotation.y = 0.5 * Math.PI;
    this.scene.add(housesScene);

    for (const child of housesScene.children) {
      child.traverse((obj) => {
        if (obj.isMesh) {
          this.physics.add(obj, "fixed", "trimesh");
        }
      });
    }
  }

  addLights() {
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    this.scene.add(ambientLight);

    this.directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
    this.directionalLight.position.set(1, 1, 1);
    this.directionalLight.castShadow = true;
    this.directionalLight.shadow.camera.top = 30;
    this.directionalLight.shadow.camera.right = 30;
    this.directionalLight.shadow.camera.left = -30;
    this.directionalLight.shadow.camera.bottom = -30;
    this.directionalLight.shadow.bias = -0.002;
    this.directionalLight.shadow.normalBias = 0.072;
    this.scene.add(this.directionalLight);
  }
}
