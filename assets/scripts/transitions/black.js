import { gsap } from 'gsap';

const enter = el =>
  new Promise(resolve => {
    const items = el.querySelectorAll('.case li');
    const bg = el.querySelector('.black-bg__inner');

    gsap.fromTo(
      bg,
      {
        scale: 0
      },
      {
        scale: 200,
        duration: 0.9,
        ease: 'power2.inOut',
        onComplete: () => {
          gsap.set(bg, { opacity: 0, delay: 0.6 });
        }
      }
    );

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
    const items = el.querySelectorAll('.case li');
    const nextEl = el.querySelector('.next');
    const h1 = el.querySelector('h1');

    gsap.to([nextEl, h1], { opacity: 0, duration: 0.7, ease: 'power4.inOut' });

    gsap.set(items, { willChange: 'transform, opacity' });
    gsap.fromTo(
      items,
      {
        opacity: 1,
        y: '0%'
      },
      {
        opacity: 0,
        y: '-60%',
        duration: 0.8,
        ease: 'power4.inOut',
        onComplete: () => {
          gsap.set(items, { willChange: '' });
          resolve();
        }
      }
    );
  });

export default { enter, leave };
