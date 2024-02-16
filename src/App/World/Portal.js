import * as THREE from "three";
import App from "../App";
import ModalManager from "../UI/ModalManager";
import CharacterController from "./CharacterController";
import ModalContentProvider from "../UI/ModalContentProvider";

import { inputStore } from "../Utils/Store";

export default class Portal {
  constructor(portalMesh, modalInfo) {
    this.app = new App();
    this.portalMesh = portalMesh;
    this.modalInfo = modalInfo;
    this.modalManager = new ModalManager();
    this.inputStore = inputStore;

    this.prevIsNear = false;
  }

  loop() {
    this.character = this.app.world.character.instance;
    if (this.character) {
      const portalPosition = new THREE.Vector3();
      this.portalMesh.getWorldPosition(portalPosition);
      const distance = this.character.position.distanceTo(portalPosition);
      const isNear = distance < 10;
      if (isNear && this.portalMesh.name === "resume") {
        if (!this.prevIsNear) {
          this.inputStore.setState({
            forward: false,
            backward: false,
            left: false,
            right: false,
          });
          this.modalManager.openResume();
          this.prevIsNear = true;
        }
      } else {
        if (this.prevIsNear) {
          this.prevIsNear = false;
        }
      }

      // if (isNear) {
      //   if (!this.prevIsNear) {
      //     this.modalManager.openModal(
      //       this.modalInfo.title,
      //       this.modalInfo.description
      //     );
      //   }
      //   this.prevIsNear = true;
      // } else {
      //   if (this.prevIsNear) {
      //     this.modalManager.closeModal();
      //     this.prevIsNear = false;
      //   }
      // }
    }
  }
}
