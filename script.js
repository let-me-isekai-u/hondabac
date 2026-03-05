* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: Arial, sans-serif;
}

body {
  line-height: 1.6;
}

/* HERO */
.hero {
  height: 100vh;
  position: relative;
  overflow: hidden;
  background: #dfe7ef;
}

.hero__stage {
  position: relative;
  width: 100%;
  height: 100%;
}

.hero__bg {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
}

.hero__dim {
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.0);
  transition: background 260ms ease;
  pointer-events: none;
  z-index: 1;
}

.hero__asset {
  position: absolute;
  user-select: none;
  pointer-events: none;
  height: auto;
  transform-origin: 50% 100%;
  will-change: transform, filter;
  z-index: 2;
}

.hero__asset--monument {
  left: 27%;
  top: 70%;
  width: min(300px, 35vw);

  --dx: 150px;
  --dy: -10px;

  transform: translate(-50%, -100%) translate(var(--dx), var(--dy));
  transition: transform 260ms ease, filter 260ms ease;

  filter: drop-shadow(0 22px 20px rgba(0, 0, 0, 0.22))
    drop-shadow(0 10px 12px rgba(0, 0, 0, 0.12)) contrast(1.02)
    saturate(1.03);
}

.hero__asset--monument {
  pointer-events: auto;
  cursor: pointer;
}

.hero__asset--monument:hover {
  transform: translate(-50%, -100%) translate(var(--dx), var(--dy))
    translateY(-8px) scale(1.03);

  filter: drop-shadow(0 42px 34px rgba(0, 0, 0, 0.32))
    drop-shadow(0 18px 18px rgba(0, 0, 0, 0.18)) contrast(1.06)
    saturate(1.08);
}

.hero__asset--monument:focus-visible {
  outline: 3px solid rgba(255, 255, 255, 0.9);
  outline-offset: 6px;
}

.hero.is-info-open .hero__dim {
  background: rgba(0, 0, 0, 0.45);
}

.hero.is-info-open .hero__asset--monument {
  transform: translate(-50%, -100%) translate(var(--dx), var(--dy))
    translateY(-8px) scale(1.03);

  filter: drop-shadow(0 42px 34px rgba(0, 0, 0, 0.32))
    drop-shadow(0 18px 18px rgba(0, 0, 0, 0.18)) contrast(1.06)
    saturate(1.08);
}

.hero__info {
  position: absolute;
  z-index: 3;
  left: 0;
  top: 0;

  opacity: 0;
  visibility: hidden;
  pointer-events: none;

  transform: translateY(6px);
  transition: opacity 260ms ease, transform 260ms ease, visibility 0s linear 260ms;

  background: rgba(255, 255, 255, 0.92);
  color: #111;
  padding: 14px 16px;
  border-radius: 12px;
  max-width: 360px;
  box-shadow: 0 18px 40px rgba(0,0,0,0.22);
  backdrop-filter: blur(6px);
}

.hero.is-info-open .hero__info {
  opacity: 1;
  visibility: visible;
  pointer-events: auto;

  transform: translateY(0);
  transition: opacity 260ms ease, transform 260ms ease, visibility 0s;
}

.hero__infoText {
  font-size: 16px;
  line-height: 1.35;
}

.hero__infoClose {
  position: absolute;
  top: 6px;
  right: 8px;
  border: 0;
  background: transparent;
  font-size: 22px;
  line-height: 1;
  cursor: pointer;
  padding: 4px 6px;
}

@media (max-width: 768px) {
  .hero__asset--monument {
    left: 50%;
    top: 74%;
    width: min(280px, 62vw);
  }
}

@media (hover: none) {
  .hero__asset--monument:hover {
    transform: translate(-50%, -100%) translate(var(--dx), var(--dy));
    filter: drop-shadow(0 22px 20px rgba(0, 0, 0, 0.22))
      drop-shadow(0 10px 12px rgba(0, 0, 0, 0.12)) contrast(1.02)
      saturate(1.03);
  }
}

/* INTRO */
.intro {
  padding: 100px 15%;
  text-align: center;
}

/* STORY */
.story {
  min-height: 100vh;
  padding: 120px 8%;
  position: relative;

  background-image: url("images/background.png");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}

/*
  Đây là "container trắng chứa text" như bạn nói:
  bây giờ nó sẽ CHỨA luôn cả ảnh + text nằm cạnh nhau.
*/
.story__content {
  max-width: 1100px;
  margin: 0 auto;

  padding: 22px 24px;
  border-radius: 16px;
  background: rgba(255, 255, 255, 0.72);
  backdrop-filter: blur(6px);
  box-shadow: 0 18px 40px rgba(0,0,0,0.12);
}

.story__contentGrid {
  display: grid;
  grid-template-columns: 1.05fr 0.95fr;
  gap: 24px;
  align-items: center;
}

.story__contentText h2 {
  margin-bottom: 10px;
}

.story__contentMedia img {
  width: 100%;
  height: auto;
  display: block;
  border-radius: 14px;
  box-shadow: 0 14px 30px rgba(0,0,0,0.12);
  user-select: none;
  pointer-events: none;
}

@media (max-width: 900px) {
  .story__contentGrid {
    grid-template-columns: 1fr;
  }
}