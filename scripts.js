document.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll("nav a").forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      const targetId = this.getAttribute("href");
      const targetSection = document.querySelector(targetId);
      targetSection.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    });
  });

  window.addEventListener("scroll", function () {
    const header = document.querySelector("header");
    if (window.scrollY > 100) {
      header.style.padding = "0.7rem 0";
    } else {
      header.style.padding = "1rem 0";
    }
  });
  const form = document.getElementById("contact-form");
  const formMessage = document.getElementById("form-message");

  const showError = (input, message) => {
    const formGroup = input.parentElement;
    const error = formGroup.querySelector(".error-message");
    error.textContent = message;
    error.style.display = "block";
  };

  const clearError = (input) => {
    const formGroup = input.parentElement;
    const error = formGroup.querySelector(".error-message");
    error.textContent = "";
    error.style.display = "none";
  };

  const validateInput = (input) => {
    if (input.id === "name" && input.value.trim().length < 2) {
      showError(input, "Name must be at least 2 characters");
      return false;
    }

    if (input.id === "email" && !/^\S+@\S+\.\S+$/.test(input.value)) {
      showError(input, "Please enter a valid email");
      return false;
    }

    if (input.id === "message" && input.value.trim().length < 10) {
      showError(input, "Message must be at least 10 characters");
      return false;
    }

    clearError(input);
    return true;
  };

  const sanitizeInput = (value) => {
    const div = document.createElement("div");
    div.textContent = value;
    return div.innerHTML;
  };

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    let isValid = true;
    const inputs = Array.from(form.elements).filter(
      (el) => el.tagName !== "BUTTON"
    );

    inputs.forEach((input) => {
      if (!validateInput(input)) isValid = false;
    });

    if (!isValid) return;

    const name = sanitizeInput(form.name.value.trim());
    const email = sanitizeInput(form.email.value.trim());
    const message = sanitizeInput(form.message.value.trim());

    const subject = encodeURIComponent(
      "New message from portfolio contact form"
    );
    const body = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\n\nMessage: ${message}`
    );

    window.location.href = `mailto:asmaarougaibi8@gmail.com?subject=${subject}&body=${body}`;

    formMessage.textContent =
      "✅ Email client opened! Please send your message.";
    formMessage.classList.remove("hidden");
    form.reset();

    setTimeout(() => formMessage.classList.add("hidden"), 5000);
  });

  form.addEventListener("input", (e) => {
    if (e.target.tagName === "INPUT" || e.target.tagName === "TEXTAREA") {
      validateInput(e.target);
    }
  });
  const themeToggle = document.getElementById("theme-toggle");
  const body = document.body;

  themeToggle.addEventListener("click", () => {
    body.classList.toggle("dark-mode");
    const isDark = body.classList.contains("dark-mode");
    localStorage.setItem("darkMode", isDark);
    themeToggle.innerHTML = isDark
      ? '<i class="fas fa-sun"></i>'
      : '<i class="fas fa-moon"></i>';
  });

  if (localStorage.getItem("darkMode") === "true") {
    body.classList.add("dark-mode");
    themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
  }

  const savedDarkMode = localStorage.getItem("darkMode") === "true";
  if (savedDarkMode) {
    body.classList.add("dark-mode");
    themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
  }

  const TypeWriter = function (txtElement, words, wait = 3000) {
    this.txtElement = txtElement;
    this.words = words;
    this.txt = "";
    this.wordIndex = 0;
    this.wait = parseInt(wait, 10);
    this.type();
    this.isDeleting = false;
  };

  TypeWriter.prototype.type = function () {
    const current = this.wordIndex % this.words.length;
    const fullTxt = this.words[current];

    if (this.isDeleting) {
      this.txt = fullTxt.substring(0, this.txt.length - 1);
    } else {
      this.txt = fullTxt.substring(0, this.txt.length + 1);
    }

    this.txtElement.innerHTML = this.txt;

    let typeSpeed = 150;
    if (this.isDeleting) typeSpeed /= 2;

    if (!this.isDeleting && this.txt === fullTxt) {
      typeSpeed = this.wait;
      this.isDeleting = true;
    } else if (this.isDeleting && this.txt === "") {
      this.isDeleting = false;
      this.wordIndex++;
      typeSpeed = 500;
    }

    setTimeout(() => this.type(), typeSpeed);
  };
  const txtElement = document.querySelector(".type-text");
  const words = JSON.parse(txtElement.getAttribute("data-words"));
  const wait = txtElement.getAttribute("data-wait");
  new TypeWriter(txtElement, words, wait);
  document.querySelector(".menu-toggle").addEventListener("click", () => {
    document.body.classList.toggle("nav-active");
  });

  const navLinks = document.querySelectorAll(".nav-links li a");

  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      document.body.classList.remove("nav-active");
    });
  });
});
