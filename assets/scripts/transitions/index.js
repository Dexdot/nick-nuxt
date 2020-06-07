import fade from '~/assets/scripts/transitions/fade';
import main from '~/assets/scripts/transitions/main';
import Case from '~/assets/scripts/transitions/case';
import cases from '~/assets/scripts/transitions/cases';

const transitions = {
  index: { ...main },
  black: { ...main },
  cases: { ...cases },
  'case-id': { ...Case },
  about: { ...fade },
  vision: { ...fade },
  inspire: { ...fade }
};

export default transitions;
