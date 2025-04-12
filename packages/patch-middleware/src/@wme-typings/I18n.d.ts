type PluralizationLanguages = 'ja' | 'ko' | 'ms' | 'ru' | 'zh' | 'zh-TW';

interface LanguageTranslations {
  [key: string]: string | LanguageTranslations;
}

export default interface I18n {
  currentTranslationOptions(e: any, t: any): any; // todo inspect this function
  currentLocale(): string;
  defaultLocale: string;
  defaultSeparator: string;
  extend(e: any, t: any): any; // todo inspect this function
  fallbacks: boolean;
  getFullScope(e: any, t: any): any; // todo inspect this function
  initializeOptions(): any; // todo inspect this function
  interpolate(e: any, t: any): any; // todo inspect this function
  isSet(obj: any): boolean;
  l(e: any, t: any, n: any): any; // todo inspect this function
  locale: string;
  locales: {
    default(e: any): any; // todo inspect this function
    get(e: any): any; // todo inspect this function
  };
  lookup(e: any, t: any): any; // todo inspect this function
  meridian(): any; // todo inspect this function
  missingBehaviour: string;
  missingPlaceholder(e: any, t: any, n: any): any; // todo inspect this function
  missingTranslation(e: any, t: any): any; // todo inspect this function
  missingTranslationPrefix: string;
  nullPlaceholder(): any; // todo inspect this function
  p(e: any, t: any, n: any): any; // todo inspect this function
  parseDate(date: string): Date;
  placeholder: RegExp;
  pluralization: {
    [key in PluralizationLanguages | 'default' | 'oneRule']: (e: any) => any; // todo inspect this function
  };
  pluralizationLookup(e: any, t: any, n: any): any; // todo inspect this function
  pluralizationLookupWithoutFallback(e: any, t: any, n: any): any; // todo inspect this function
  pluralize(e: any, t: any, n: any): any; // todo inspect this function
  prepareOptions(): any; // todo inspect this function
  reset(): any; // todo inspect this function
  strftime(e: any, n: any): any; // todo inspect this function
  t(e: any, t?: any): any; // todo inspect this function
  toCurrency(e: any, t: any): any; // todo inspect this function
  toHumanSize(e: any, t: any): any; // todo inspect this function
  toNumber(e: any, t: any): any; // todo inspect this function
  toPercentage(e: any, t: any): any; // todo inspect this function
  toTime(e: any, t: any): any; // todo inspect this function
  translate(e: any, t: any): any; // todo inspect this function
  translations: LanguageTranslations;
}
