import client from '~/api/client';

export const isImage = ({ fields }) =>
  fields.file.contentType.split('/')[0] === 'image';

export const isJPG = img =>
  isImage(img) && img.fields.file.contentType.split('/')[1] === 'jpeg';

export const isVideo = ({ fields }) =>
  fields.file.contentType.split('/')[0] === 'video';

export const getRandomFromRange = (min, max) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

export const getRandomElementFromArray = arr =>
  arr[Math.floor(Math.random() * arr.length)];

export const addItemToArrayAt = (item, i, arr) => {
  const copy = [...arr];
  copy.splice(i, 0, item);
  return copy;
};

// Get image optimized image url (webp, size, progressive jpeg)
const getSupports = () => {
  // FF
  const ffMatch = navigator.userAgent.match(/Firefox\/(.*)$/);
  let ffv = 0;

  if (ffMatch && ffMatch.length > 1) {
    ffv = parseInt(ffMatch[1]);
  }

  // WEBP
  const webp =
    (ffMatch && ffv >= 65) ||
    document
      .createElement('canvas')
      .toDataURL('image/webp')
      .indexOf('data:image/webp') == 0;

  return {
    isMob: window.innerWidth <= 500,
    webp
  };
};

const encodeParams = data => {
  const ret = [];
  for (let d in data)
    ret.push(encodeURIComponent(d) + '=' + encodeURIComponent(data[d]));
  return ret.join('&');
};

export const getImageUrl = (img, useOriginalSizeOnMob = false) => {
  const supports = getSupports();
  const url = img.fields.file.url;

  const fmfl = isJPG(img)
    ? {
        fm: supports.webp ? 'webp' : 'jpg',
        fl: supports.webp ? '' : 'progressive'
      }
    : {};

  const params = {
    ...fmfl,
    w: supports.isMob ? (useOriginalSizeOnMob ? '' : '1125') : '',
    fit: supports.isMob ? 'fill' : ''
  };

  return `${url}?${encodeParams(params)}`;
};

// Cases assets / links
const loadContentItem = item =>
  new Promise(resolve => {
    const isAssetLink =
      item.nodeType === 'embedded-entry-block' &&
      item.data.target.sys.type === 'Link';

    if (!isAssetLink) {
      resolve(item);
    } else {
      client.getEntry(item.data.target.sys.id).then(entry => {
        item.data.target = { ...entry };
        resolve(item);
      });
    }
  });

const processCase = project =>
  new Promise(async resolve => {
    // Rich content
    const contentPromises = project.fields.content.content.map(item =>
      loadContentItem(item)
    );
    const content = await Promise.all(contentPromises);
    project.fields.content.content = [...content];

    resolve(project);
  });

export const loadCasesAssets = cases =>
  new Promise(async resolve => {
    const casesPromises = cases.map(processCase);
    const processedCases = await Promise.all(casesPromises);
    resolve(processedCases);
  });

export const copyObject = obj => JSON.parse(JSON.stringify(obj));

export const getSlidesByHr = fields => {
  let counter = 0;
  const slides = [];

  fields.text.content.forEach(field => {
    if (field.nodeType !== 'hr') {
      const slide = slides[counter];

      if (Array.isArray(slide)) {
        slide.push(field);
      } else {
        slides[counter] = [];
        slides[counter].push(field);
      }
    } else {
      counter++;
    }
  });

  return slides;
};

export const getRandomEntries = (entries, n) => {
  const randomEntries = [];
  const len = Math.min(n, entries.length);

  while (randomEntries.length < len) {
    const randomEl = entries[Math.floor(Math.random() * entries.length)];
    const ids = randomEntries.map(({ sys }) => sys.id);
    if (!ids.includes(randomEl.sys.id)) randomEntries.push(randomEl);
  }

  return randomEntries;
};
