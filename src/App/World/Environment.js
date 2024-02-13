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
    this.addWalls();
    this.addHouses();
    this.addLights();
    this.addSigns();
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
    const groundGeometry = new THREE.BoxGeometry(380, 1, 230);

    const sandTexture = this.assetStore.loadedAssets.sand;
    const groundMaterial = new THREE.MeshStandardMaterial();
    groundMaterial.map = sandTexture;
    this.groundMesh = new THREE.Mesh(groundGeometry, groundMaterial);
    this.groundMesh.position.z = -100;
    this.scene.add(this.groundMesh);
    this.physics.add(this.groundMesh, "fixed", "cuboid");
  }

  addWalls() {
    const wallMaterial = new THREE.MeshBasicMaterial({
      color: "lightgreen",
      visible: false,
    });

    const backFrontWallGeometry = new THREE.BoxGeometry(400, 300, 1);

    const backWallMesh = new THREE.Mesh(backFrontWallGeometry, wallMaterial);
    backWallMesh.position.y = 150;
    backWallMesh.position.z = 15;

    this.scene.add(backWallMesh);
    this.physics.add(backWallMesh, "fixed", "cuboid");

    const leftRightWallGeometry = new THREE.BoxGeometry(1, 300, 230);

    const leftWallMesh = new THREE.Mesh(leftRightWallGeometry, wallMaterial);
    leftWallMesh.position.x = -150;
    leftWallMesh.position.y = 150;
    leftWallMesh.position.z = -30;

    this.scene.add(leftWallMesh);
    this.physics.add(leftWallMesh, "fixed", "cuboid");

    const rightWallMesh = new THREE.Mesh(leftRightWallGeometry, wallMaterial);
    rightWallMesh.position.x = 150;
    rightWallMesh.position.y = 150;
    rightWallMesh.position.z = -30;
    this.scene.add(rightWallMesh);
    this.physics.add(rightWallMesh, "fixed", "cuboid");

    const frontWallMesh = new THREE.Mesh(backFrontWallGeometry, wallMaterial);
    frontWallMesh.position.y = 150;
    frontWallMesh.position.z = -110;
    this.scene.add(frontWallMesh);
    this.physics.add(frontWallMesh, "fixed", "cuboid");
  }

  addHouses() {
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

    const ladderScene = this.assetStore.loadedAssets.ladder.scene;
    ladderScene.rotation.x = Math.PI * -0.96;
    ladderScene.scale.setScalar(0.11);
    ladderScene.position.x = -60;
    ladderScene.position.y = 0;
    ladderScene.position.z = -75;
    this.scene.add(ladderScene);

    for (const child of ladderScene.children) {
      child.traverse((obj) => {
        if (obj.isMesh) {
          this.physics.add(obj, "fixed", "trimesh");
        }
      });
    }
  }

  addSigns() {
    // console.log(this.assetStore.loadedAssets.resume.scene);
    const textMaterial = new THREE.MeshPhongMaterial({ color: "#ffffff" });

    const resumeScene = this.assetStore.loadedAssets.resume.scene;
    resumeScene.scale.setScalar(10);
    const resumeText = resumeScene.children[1];
    resumeText.material = textMaterial;
    resumeScene.position.x = -68;
    resumeScene.position.y = 32;
    resumeScene.position.z = -96;
    resumeScene.children[1];
    this.scene.add(resumeScene);
    for (const child of resumeScene.children) {
      child.traverse((obj) => {
        if (obj.isMesh) {
          this.physics.add(obj, "fixed", "trimesh");
        }
      });
    }

    const projectsScene = this.assetStore.loadedAssets.projects.scene;
    projectsScene.scale.setScalar(10);

    const projectsText = projectsScene.children[1];
    projectsText.material = textMaterial;
    projectsScene.position.x = 17;
    projectsScene.position.y = 32;
    projectsScene.position.z = -96;
    this.scene.add(projectsScene);

    for (const child of projectsScene.children) {
      child.traverse((obj) => {
        if (obj.isMesh) {
          this.physics.add(obj, "fixed", "trimesh");
        }
      });
    }

    const skillsScene = this.assetStore.loadedAssets.skills.scene;
    skillsScene.scale.setScalar(9);
    const skillsText = skillsScene.children[1];
    skillsText.material = textMaterial;
    skillsScene.position.x = 111;
    skillsScene.position.y = 62;
    skillsScene.position.z = -96;
    this.scene.add(skillsScene);

    for (const child of skillsScene.children) {
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
