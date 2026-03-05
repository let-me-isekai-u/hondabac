(function () {
  const hero = document.querySelector(".hero");
  const stage = document.querySelector(".hero__stage");
  const asset = document.querySelector(".hero__asset--monument");
  const info = document.querySelector(".hero__info");
  const closeBtn = document.querySelector(".hero__infoClose");

  if (!hero || !stage || !asset || !info || !closeBtn) return;

  function positionInfo() {
    const a = asset.getBoundingClientRect();
    const s = stage.getBoundingClientRect();

    const gap = 16; // khoảng cách kề cạnh (px) - chỉ áp cho card

    // Đo size card (cần offsetWidth/Height)
    const wasHidden = info.getAttribute("aria-hidden") === "true";
    if (wasHidden) {
      // tạm hiển thị để đo, nhưng không cho người dùng thấy
      info.style.visibility = "hidden";
      info.style.opacity = "0";
      info.style.pointerEvents = "none";
      info.style.display = "block";
    }

    const infoW = info.offsetWidth || 360;
    const infoH = info.offsetHeight || 80;

    // Mặc định đặt bên phải asset
    let left = (a.right - s.left) + gap;
    // Canh top theo khoảng 1/4 chiều cao asset để nhìn “kề cạnh” hợp lý
    let top = (a.top - s.top) + Math.max(12, a.height * 0.25);

    // Nếu tràn phải -> chuyển sang trái asset
    if (left + infoW > s.width - 12) {
      left = (a.left - s.left) - gap - infoW;
    }

    // Clamp trong stage
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

  // Enter/Space để mở bằng bàn phím
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

  // Ngăn click trong info bị đóng
  info.addEventListener("click", (e) => e.stopPropagation());

  // Click ra ngoài để đóng
  document.addEventListener("click", () => closeInfo());

  // Bấm ESC để đóng
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeInfo();
  });

  // Resize/scroll: nếu đang mở thì cập nhật vị trí
  window.addEventListener("resize", () => {
    if (hero.classList.contains("is-info-open")) positionInfo();
  });

  window.addEventListener(
    "scroll",
    () => {
      if (hero.classList.contains("is-info-open")) positionInfo();
    },
    { passive: true }
  );
})();
