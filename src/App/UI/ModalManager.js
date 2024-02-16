import App from "../App";

export default class ModalManager {
  constructor() {
    this.app = new App();
  }

  openResume() {
    window
      .open("https://resume.creddle.io/resume/f4fsgrd8a7v", "_blank")
      .focus();
  }

  openProjectsModal() {
    this.projectModal = document.getElementById("projectsModal");
    this.projectModalClose =
      document.getElementsByClassName("projects-close")[0];
    this.projectModalClose.onclick = () => {
      this.projectModal.classList.remove("fadeIn");
      this.projectModal.classList.add("fadeOut");
      setTimeout(() => {
        this.projectModal.style.display = "none";
      }, 600);
    };
    this.projectModal.style.display = "block";
    this.projectModal.classList.remove("fadeOut");
    this.projectModal.classList.add("fadeIn");
  }

  openSkillsModal() {
    this.skillsModal = document.getElementById("skillsModal");
    this.skillsModalClose = document.getElementsByClassName("skills-close")[0];
    this.skillsModalClose.onclick = () => {
      this.skillsModal.classList.remove("fadeIn");
      this.skillsModal.classList.add("fadeOut");
      setTimeout(() => {
        this.skillsModal.style.display = "none";
      }, 600);
    };
    this.skillsModal.style.display = "block";
    this.skillsModal.classList.remove("fadeOut");
    this.skillsModal.classList.add("fadeIn");
  }
  closeModal(lastOpened) {
    if (lastOpened === "projects") {
      this.projectModal.classList.remove("fadeIn");
      this.projectModal.classList.add("fadeOut");
      setTimeout(() => {
        this.projectModal.style.display = "none";
      }, 600);
    } else if (lastOpened === "skills") {
      this.skillsModal.classList.remove("fadeIn");
      this.skillsModal.classList.add("fadeOut");
      setTimeout(() => {
        this.skillsModal.style.display = "none";
      }, 600);
    }
  }
}
