import RealFormatter from '../../node_modules/@controleonline/ui-common/src/utils/formatter.js';
import { formatCount, formatDateTime, formatPercent } from '../lib/format';

class FormatterShim extends RealFormatter {
  static formatDateTime(value) {
    return formatDateTime(value);
  }

  static formatCount(value, singular, plural = `${singular}s`) {
    return formatCount(value, singular, plural);
  }

  static formatPercent(value) {
    return formatPercent(value);
  }
}

export default FormatterShim;
