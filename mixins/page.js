import transition from '~/assets/scripts/transitions/default';
import locoscroll from '~/mixins/locoscroll';
import Next from '~/components/Next';

export default {
  transition,
  mixins: [locoscroll],
  components: {
    Next
  }
};
