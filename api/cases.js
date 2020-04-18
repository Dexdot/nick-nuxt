import client from '~/api/client';
import { loadCasesAssets } from '~/assets/scripts/helpers';

const fetchCases = options =>
  new Promise(resolve => {
    client
      .getEntries({
        content_type: 'cases',
        ...options
      })
      .then(async res => {
        const cases = res.items[0].fields.list;
        const proccessedCases = await loadCasesAssets(cases);
        resolve(proccessedCases);
      });
  });

// Main cases (index)
export const fetchMain = () => fetchCases({ 'fields.name': 'main' });

// Black cases
export const fetchBlack = () => fetchCases({ 'fields.name': 'black' });

// Case
export const fetchCase = slug =>
  new Promise((resolve, reject) => {
    client
      .getEntries({
        content_type: 'case',
        'fields.slug': slug
      })
      .then(({ items }) => {
        const project = items[0] ? items[0].fields : null;

        if (project) {
          resolve(project);
        } else {
          reject();
        }
      });
  });
