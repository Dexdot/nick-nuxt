import client from '~/api/client';

// About
export const fetchAbout = options =>
  new Promise(resolve => {
    client
      .getEntries({
        content_type: 'aboutTest',
        ...options
      })
      .then(({ items }) => {
        resolve(items[0]);
      });
  });

// Vision
export const fetchVision = options =>
  new Promise(resolve => {
    client
      .getEntries({
        content_type: 'visionTest',
        ...options
      })
      .then(({ items }) => {
        resolve(items[0]);
      });
  });
