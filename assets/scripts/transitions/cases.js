import { gsap } from 'gsap';

const enter = (el, cb) =>
  new Promise(resolve => {
    const tl = gsap.timeline({
      ease: 'circ.inOut',
      onComplete: () => {
        resolve();
        if (cb) cb();
      }
    });

    tl.fromTo(
      '.cover',
      {
        y: '0%'
      },
      {
        y: '-100%',
        duration: 1
      },
      0
    ).fromTo(
      el,
      {
        y: 200
      },
      {
        y: 0,
        duration: 1
      },
      0
    );
  });

const leave = (el, cb) =>
  new Promise(resolve => {
    gsap.fromTo(
      '.cover',
      {
        y: '100%'
      },
      {
        y: '0%',
        duration: 0.8,
        ease: 'circ.inOut',
        onComplete: () => {
          resolve();
          if (cb) cb();
        }
      }
    );
  });

export default { enter, leave };
