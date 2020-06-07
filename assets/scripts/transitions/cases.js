import { gsap } from 'gsap';

const duration = 1;
const ease = 'power3.inOut';

const enter = ({ ctx, el, cb }) =>
  new Promise(resolve => {
    resolve();
    if (cb) cb();
  });

const leave = ({ ctx, el, cb }) =>
  new Promise(async resolve => {
    ctx.$store.dispatch('dom/toggleDark', false);
    stopScroll();
    await animate(el);

    resolve();
    if (cb) cb();
  });

export default { enter, leave };

function animate(el) {
  return new Promise(resolve => {
    const caseContent = hideCase(el);
    const title = animateTitle(el);
    const img = animateImage(el);
    Promise.all([title, img]).then(resolve);
  });
}

function hideCase(el) {
  return new Promise(resolve => {
    const caseContent = el.querySelector('.case');
    gsap.to(caseContent, {
      opacity: 0,
      duration: 0.3,
      ease,
      onComplete: resolve
    });
  });
}

function animateTitle(el) {
  return new Promise(resolve => {
    const movableTitle = el.querySelector('.movable-title');
    const fromTitle = el.querySelector('.next-title');
    const toTitle = el.querySelector('.nextcase .case__title');

    const fromSpan = fromTitle.querySelector('span');
    const toSpan = toTitle.querySelector('span');
    const from = getRect(fromTitle);
    const to = getRect(toSpan);

    gsap.set(movableTitle, { translateX: from.x, translateY: from.y });
    gsap.set(movableTitle, { opacity: 1 });
    gsap.set(fromTitle, { opacity: 0 });

    gsap.to(movableTitle, {
      translateX: to.x,
      translateY: to.y,
      onComplete: resolve,
      duration,
      ease
    });
  });
}

function animateImage(el) {
  return new Promise(resolve => {
    const movableImg = el.querySelector('.movable-image');
    const fromImg = el.querySelector('.next-img');
    const toImg = el.querySelector('.nextcase .case__img');

    const src = movableImg.querySelector('img').src;

    const from = getRect(fromImg);
    const to = getRect(toImg);

    gsap.set(movableImg, {
      translateX: from.x,
      translateY: from.y,
      width: from.width,
      height: from.height
    });
    gsap.set(movableImg, { opacity: 1 });
    gsap.set(fromImg, { opacity: 0 });

    gsap.to(movableImg, {
      width: to.width,
      height: to.height,
      translateX: to.x,
      translateY: to.y,
      onComplete: () => {
        createPlaceholder({ src, to, resolve });
      },
      duration,
      ease
    });
  });
}

function createPlaceholder({ src, to, resolve }) {
  const div = document.createElement('div');
  div.classList.add('case-cover-placeholder');
  div.style.width = `${to.width}px`;
  div.style.height = `${to.height}px`;
  div.style.left = `${to.x}px`;
  div.style.top = `${to.y}px`;

  const img = document.createElement('img');
  img.onload = resolve;
  img.src = src;

  div.appendChild(img);
  document.body.appendChild(div);
}

function getRect(title) {
  const { top, left, width, height } = title.getBoundingClientRect();
  return { x: left, y: top, width, height };
}

function stopScroll() {
  if (!window.lmS) return false;
  window.lmS.stop();
  document.body.classList.add('no-scroll');
}
