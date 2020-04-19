import { gsap } from 'gsap';

const enter = el =>
  new Promise(resolve => {
    const items = el.querySelectorAll('.case li');

    gsap.set(items, { opacity: 0, willChange: 'transform, opacity' });
    gsap.fromTo(
      items,
      {
        opacity: 0,
        y: '50%'
      },
      {
        opacity: 1,
        y: '0%',
        duration: 0.9,
        ease: 'power2.inOut',
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

    gsap.to([nextEl, h1], { opacity: 0, duration: 0.7, ease: 'power2.inOut' });

    gsap.set(items, { willChange: 'transform, opacity' });
    gsap.fromTo(
      items,
      {
        opacity: 1,
        scale: 1,
        y: '0%'
      },
      {
        opacity: 0,
        scale: 0.96,
        y: '-100%',
        duration: 0.8,
        stagger: 0.05,
        ease: 'circ.inOut',
        onComplete: () => {
          gsap.set(items, { willChange: '' });
          resolve();
        }
      }
    );
  });

export default { enter, leave };
