(function () {
  const hero = document.querySelector(".hero");
  const stage = document.querySelector(".hero__stage");
  const asset = document.querySelector(".hero__asset--monument");
  const info = document.querySelector(".hero__info");
  const closeBtn = document.querySelector(".hero__infoClose");

  const toStoryBtn = document.getElementById("toStoryBtn");
  const toStoryArrow = document.getElementById("toStoryArrow");

  if (!hero || !stage || !asset || !info || !closeBtn) {
    console.warn("Missing required elements", { hero, stage, asset, info, closeBtn });
    return;
  }

  /* =========================================================
     0) Viewport vh fix
     ========================================================= */
  function setAppVh() {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty("--app-vh", `${vh}px`);
  }
  setAppVh();
  window.addEventListener("resize", setAppVh);

  /* =========================================================
     1) HERO INTRO: chạy khi:
        - F5/reload
        - quay về từ story1 (link/click back)
     => Giải pháp: dùng sessionStorage flag "suppress" chỉ để
        tắt intro khi bạn KHÔNG muốn (hiện tại: luôn muốn chạy)
     ========================================================= */

  // Luôn chạy intro mỗi lần vào trang hero (index.html)
  hero.classList.add("is-booting");
  window.addEventListener(
    "load",
    () => {
      setTimeout(() => hero.classList.remove("is-booting"), 2600);
    },
    { once: true }
  );

  /* =========================================================
     1b) Điều hướng sang story1
     ========================================================= */
  function goStory1() {
    window.location.href = "story1.html";
  }
  toStoryBtn?.addEventListener("click", goStory1);
  toStoryArrow?.addEventListener("click", goStory1);

  document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowRight") goStory1();
  });

  /* =========================================================
     2) INFO POPUP (click asset)
     ========================================================= */
  function positionInfo() {
    const a = asset.getBoundingClientRect();
    const s = stage.getBoundingClientRect();
    const gap = 16;

    const wasHidden = info.getAttribute("aria-hidden") === "true";
    if (wasHidden) {
      info.style.visibility = "hidden";
      info.style.opacity = "0";
      info.style.pointerEvents = "none";
      info.style.display = "block";
    }

    const infoW = info.offsetWidth || 360;
    const infoH = info.offsetHeight || 80;

    let left = (a.right - s.left) + gap;
    let top = (a.top - s.top) + Math.max(12, a.height * 0.25);

    if (left + infoW > s.width - 12) {
      left = (a.left - s.left) - gap - infoW;
    }

    left = Math.max(12, Math.min(left, s.width - infoW - 12));
    top = Math.max(12, Math.min(top, s.height - infoH - 12));

    info.style.left = left + "px";
    info.style.top = top + "px";

    if (wasHidden) {
      info.style.display = "";
      info.style.visibility = "";
      info.style.opacity = "";
      info.style.pointerEvents = "";
    }
  }

  function openInfo() {
    hero.classList.add("is-info-open");
    asset.setAttribute("aria-expanded", "true");
    info.setAttribute("aria-hidden", "false");
    positionInfo();
  }

  function closeInfo() {
    hero.classList.remove("is-info-open");
    asset.setAttribute("aria-expanded", "false");
    info.setAttribute("aria-hidden", "true");
  }

  asset.addEventListener("click", (e) => {
    e.stopPropagation();
    hero.classList.contains("is-info-open") ? closeInfo() : openInfo();
  });

  asset.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      asset.click();
    }
    if (e.key === "Escape") closeInfo();
  });

  closeBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    closeInfo();
  });

  info.addEventListener("click", (e) => e.stopPropagation());
  document.addEventListener("click", () => closeInfo());
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeInfo();
  });

  window.addEventListener("resize", () => {
    if (hero.classList.contains("is-info-open")) positionInfo();
  });
})();
