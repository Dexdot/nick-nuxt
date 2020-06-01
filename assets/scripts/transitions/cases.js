import { gsap } from 'gsap';

const enter = (el, cb) =>
  new Promise(resolve => {
    gsap.fromTo(
      el,
      {
        opacity: 0
      },
      {
        opacity: 1,
        duration: 0.8,
        ease: 'power2.inOut',
        onComplete: () => {
          resolve();
          if (cb) cb();
        }
      }
    );
  });

const leave = (el, cb) =>
  new Promise(resolve => {
    gsap.fromTo(
      el,
      {
        opacity: 1
      },
      {
        opacity: 0,
        duration: 0.6,
        ease: 'power2.inOut',
        onComplete: () => {
          resolve();
          if (cb) cb();
        }
      }
    );
  });

export default { enter, leave };
