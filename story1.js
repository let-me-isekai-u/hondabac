(function () {
  const slides = Array.from(document.querySelectorAll(".slide"));
  let index = Math.max(0, slides.findIndex(s => s.classList.contains("is-active")));
  if (index === -1) index = 0;

  const prevBtn = document.getElementById("prevBtn");
  const nextBtn = document.getElementById("nextBtn");

  let isAnimating = false;

  // Durations phải khớp CSS
  const ENTER_MS = 2200;
  const LEAVE_MS = 700;

  function cleanupEnter(slide) {
    slide.classList.remove("is-entering");
  }

  function show(i) {
    if (isAnimating) return;

    if (i < 0) {
      window.location.href = "index.html";
      return;
    }
    if (i >= slides.length) {
      alert("Hết phần story1. Bạn tạo story2 rồi mình nối tiếp nhé.");
      return;
    }

    const current = slides[index];
    const next = slides[i];
    if (!next || next === current) return;

    isAnimating = true;

    // leave current
    current.classList.remove("is-entering");
    current.classList.add("is-leaving");

    // enter next
    next.classList.add("is-active");
    next.classList.remove("is-leaving");
    next.classList.add("is-entering");

    // cleanup
    const doneMs = Math.max(ENTER_MS, LEAVE_MS) + 80;

    window.setTimeout(() => {
      current.classList.remove("is-active");
      current.classList.remove("is-leaving");

      cleanupEnter(next);

      index = i;
      isAnimating = false;
    }, doneMs);
  }

  function goPrev() { show(index - 1); }
  function goNext() { show(index + 1); }

  prevBtn?.addEventListener("click", goPrev);
  nextBtn?.addEventListener("click", goNext);

  document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft") goPrev();
    if (e.key === "ArrowRight") goNext();
  });

  // Khi load trang: slide active chạy animation mở chậm (bg -> card -> ảnh)
  window.addEventListener("load", () => {
    const active = slides[index];
    if (!active) return;

    active.classList.add("is-entering");
    window.setTimeout(() => cleanupEnter(active), ENTER_MS + 100);
  }, { once: true });
})();