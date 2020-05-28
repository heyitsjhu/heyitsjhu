import { useTranslation } from 'react-i18next';
import i18n from '.';

export const getCopy = (key) => i18n.getResource('en', 'translation', key);

export const useCopy = () => {
  const { t, ...rest } = useTranslation();

  const copy = (key) => {
    return t(key);
  };

  return {
    t: copy,
    ...rest,
  };
};
