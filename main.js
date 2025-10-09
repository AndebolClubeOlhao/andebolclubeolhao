document.addEventListener("DOMContentLoaded", () => {

  // 1. Inicialização do Swiper (corrigido e protegido contra duplicidade)
  const swiperEl = document.querySelector('.mySwiper');
  if (swiperEl) {
    // Evita inicialização duplicada
    if (window.swiperInitialized) return;
    window.swiperInitialized = true;

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

  // 2. Inicialização dos Bootstrap Tooltips (única e correta)
  const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
  tooltipTriggerList.forEach(el => new bootstrap.Tooltip(el));

  // 3. Captcha reload (sem alteração)
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

  // 4. Validação de formulários Bootstrap (sem alteração)
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