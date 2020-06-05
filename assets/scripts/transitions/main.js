import { gsap } from 'gsap';

const enter = el =>
  new Promise(resolve => {
    const items = el.querySelectorAll('.case li');

    gsap.set(items, { opacity: 0, willChange: 'transform, opacity' });
    gsap.fromTo(
      items,
      {
        opacity: 0,
        y: '60%'
      },
      {
        opacity: 1,
        y: '0%',
        duration: 1.2,
        ease: 'power4.inOut',
        onComplete: () => {
          gsap.set(items, { willChange: '' });
          resolve();
        }
      }
    );
  });

const leave = el =>
  new Promise(resolve => {
    const h1 = el.querySelector('h1');
    const nextEl = el.querySelector('.next');
    const cases = el.querySelector('.cases');
    const toggler = el.querySelector('.toggler').parentElement;
    const elements = [h1, nextEl, cases, toggler];

    gsap.to(elements, { opacity: 0, duration: 1, ease: 'power1.inOut' });

    const cover = el.querySelector('.main-cover');
    gsap.to(cover, {
      backdropFilter: 'blur(16px)',
      duration: 1,
      ease: 'power1.inOut'
    });
    setTimeout(resolve, 900);
  });

export default { enter, leave };
