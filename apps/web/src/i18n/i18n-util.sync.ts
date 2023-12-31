// This file was auto-generated by 'typesafe-i18n'. Any manual changes will be overwritten.
/* eslint-disable */

import { initFormatters } from './formatters';
import type { Locales, Translations } from './i18n-types';
import { loadedFormatters, loadedLocales, locales } from './i18n-util';

import en from './en';
import es from './es';

import en_homePage from './en/homePage';
import en_postPage from './en/postPage';
import es_homePage from './es/homePage';
import es_postPage from './es/postPage';

const localeTranslations = {
  en: {
    ...en,
    homePage: en_homePage,
    postPage: en_postPage,
  },
  es: {
    ...es,
    homePage: es_homePage,
    postPage: es_postPage,
  },
};

export const loadLocale = (locale: Locales): void => {
  if (loadedLocales[locale]) return;

  loadedLocales[locale] = localeTranslations[locale] as unknown as Translations;
  loadFormatters(locale);
};

export const loadAllLocales = (): void => locales.forEach(loadLocale);

export const loadFormatters = (locale: Locales): void =>
  void (loadedFormatters[locale] = initFormatters(locale));
