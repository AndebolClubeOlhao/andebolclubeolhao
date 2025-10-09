document.addEventListener("DOMContentLoaded", () => {
<<<<<<< HEAD
  // Evita inicialização duplicada
  if (window.swiperInitialized) return;
  window.swiperInitialized = true;

  // Inicializar Swiper se existir
  const swiperEl = document.querySelector('.mySwiper');
  if (swiperEl) {
    new Swiper(swiperEl, {
      loop: true,
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
      autoplay: {
        delay: 5000,
        disableOnInteraction: false,
      },
    });
  }

  // Bootstrap Tooltips
  const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
  tooltipTriggerList.forEach(el => new bootstrap.Tooltip(el));
=======
  // Swiper
  if (document.querySelector(".mySwiper")) {
    new Swiper(".mySwiper", {
      loop: true,
      autoplay: { delay: 5000, disableOnInteraction: false },
      pagination: { el: ".swiper-pagination", clickable: true },
    });
  }

  // Tooltips
  const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
  [...tooltipTriggerList].map(el => new bootstrap.Tooltip(el));
>>>>>>> 7a34912c6bcd7176938c7b6dcca05e4fc2c349ea

  // Captcha reload
  const btnReloadCaptcha = document.getElementById("btn-reload-captcha");
  if (btnReloadCaptcha) {
    btnReloadCaptcha.addEventListener("click", async () => {
      try {
        const response = await fetch("/captcha/refresh/");
        if (!response.ok) throw new Error("Erro ao carregar captcha");
        const data = await response.json();
        document.querySelector(".captcha").src = data.image_url;
        document.getElementById("id_captcha_0").value = data.key;
      } catch (err) {
        console.error(err);
      }
    });
  }

<<<<<<< HEAD
  // Validação de formulários Bootstrap
=======
  // Form validation
>>>>>>> 7a34912c6bcd7176938c7b6dcca05e4fc2c349ea
  const forms = document.querySelectorAll("form");
  forms.forEach(form => {
    form.addEventListener("submit", e => {
      if (!form.checkValidity()) {
        e.preventDefault();
        e.stopPropagation();
      }
      form.classList.add("was-validated");
    });
  });
});
