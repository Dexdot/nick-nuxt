import { gsap } from 'gsap';

const enter = ({ el, cb }) =>
  new Promise(resolve => {
    const duration = 0.9;
    const ease = 'power2.inOut';

    gsap.fromTo(
      '.case__title--main span',
      {
        translateY: '100%',
        opacity: 0
      },
      {
        translateY: '0%',
        opacity: 1,
        duration,
        ease
      }
    );

    gsap.fromTo(
      '.case__subtitle, .case__cover',
      {
        opacity: 0
      },
      {
        opacity: 1,
        duration,
        ease,
        onComplete: () => {
          resolve();
          if (cb) cb();
        }
      }
    );
  });

const leave = ({ el, cb }) =>
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
