import fade from '~/assets/scripts/transitions/fade';
import main from '~/assets/scripts/transitions/main';
import black from '~/assets/scripts/transitions/black';
import cases from '~/assets/scripts/transitions/cases';

const transitions = {
  index: { ...main },
  black: { ...black },
  cases: { ...cases },
  'case-id': { ...fade },
  about: { ...fade },
  vision: { ...fade },
  inspire: { ...fade }
};

export default transitions;
