import { colors } from '../styles';

const avatar1Image = require('../assets/avatars/avatar1.png');
const defaultAvatar = require('../assets/images/wallettab/account-avatar.png');
const avatars = [avatar1Image];

export default {
  HARDENED_OFFSET: 0x80000000,

  passwordStrengthCheckOption: [
    {
      id: 0,
      value: 'Too weak',
      minDiversity: 0,
      minLength: 0,
    },
    {
      id: 1,
      value: 'Weak',
      minDiversity: 1,
      minLength: 6,
    },
    {
      id: 2,
      value: 'Medium',
      minDiversity: 2,
      minLength: 8,
    },
    {
      id: 3,
      value: 'Strong',
      minDiversity: 4,
      minLength: 10,
    },
  ],
  passwordLevelColor: {
    'Too weak': colors.red5,
    Weak: colors.primary5,
    Medium: colors.blue5,
    Strong: colors.green5,
  },
  saltRound: 10,
  avatars,
  defaultAvatar,
  avatarsCount: 1,
  currencyConversionProps: [
    { label: 'United States Dollar', value: 'USD' },
    { label: 'European Euro', value: 'EUR' },
    { label: 'United Kindom Pound', value: 'GBP' },
    { label: 'Canada Dollar', value: 'CAD' },
    { label: 'Cayman Islands Dollar', value: 'KYD' },
    { label: 'Chile Peso', value: 'CLP' },
    { label: 'China Yuan Renminbi', value: 'CNY' },
    { label: 'Denmark Krone', value: 'DKK' },
    { label: 'Egypt Pound', value: 'EGP' },
    { label: 'India Rupee', value: 'INR' },
    { label: 'Japan Yen', value: 'JPY' },
  ],
  privacyCurrencyProps: [
    { label: 'Native', value: 'native' },
    { label: 'Fiat', value: 'fiat' },
  ],
  autoLockProps: [
    { label: 'Immediately', value: '0' },
    { label: 'After 5 seconds', value: '5' },
    { label: 'After 15 seconds', value: '15' },
    { label: 'After 30 seconds', value: '30' },
    { label: 'After 60 seconds', value: '60' },
    { label: 'After 5 minutes', value: '300' },
    { label: 'After 10 minutes', value: '600' },
    { label: 'Never', value: '-1' },
  ],
  languageProps: [
    { label: 'English', value: 'en' },
    { label: 'French', value: 'fr' },
    { label: 'Chinese', value: 'zh' },
    { label: 'German', value: 'de' },
    { label: 'Spanish', value: 'es' },
    { label: 'Russia', value: 'ru' },
  ],
  searchEngineProps: [
    { label: 'DuckDuckGo', value: 'duckduckgo' },
    { label: 'Google', value: 'google' },
  ],

  deadFunctionConversionProps: [
    {
      label: 'Convert before move.',
      value: true,
      description:
        'Convert all your crypto assets before the dead function executes.\nIf convert failed for some tokens or coins, then they will be moved as they are.',
    },
    {
      label: 'No Conversion',
      value: false,
      description: 'Just move all your crypto assets as they are.',
    },
  ],
};
