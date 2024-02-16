import App from "../App";

export default class ModalManager {
  constructor() {
    this.app = new App();
    this.modal = document.getElementById("myModal");
    this.close = document.getElementsByClassName("close")[0];
    this.close.onclick = () => {
      this.closeModal();
    };
  }

  openResume() {
    window
      .open("https://resume.creddle.io/resume/f4fsgrd8a7v", "_blank")
      .focus();
  }

  openModal(title, description) {
    document.getElementById("modalTitle").innerHTML = title;
    document.getElementById("modalDescription").innerHTML = description;
    this.modal.style.display = "block";
    this.modal.classList.remove("fadeOut");
    this.modal.classList.add("fadeIn");
  }

  closeModal() {
    this.modal.classList.remove("fadeIn");
    this.modal.classList.add("fadeOut");
    setTimeout(() => {
      this.modal.style.display = "none";
    }, 600);
  }
}
