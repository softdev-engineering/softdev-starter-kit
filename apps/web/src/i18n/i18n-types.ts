// This file was auto-generated by 'typesafe-i18n'. Any manual changes will be overwritten.
/* eslint-disable */
import type {
  BaseTranslation as BaseTranslationType,
  LocalizedString,
  RequiredParams,
} from 'typesafe-i18n';

export type BaseTranslation = BaseTranslationType & DisallowNamespaces;
export type BaseLocale = 'en';

export type Locales = 'en' | 'es';

export type Translation = RootTranslation & DisallowNamespaces;

export type Translations = RootTranslation & {
  homePage: NamespaceHomePageTranslation;
  postPage: NamespacePostPageTranslation;
};

type RootTranslation = {
  /**
   * H​i​ ​{​n​a​m​e​}​!
   * @param {string} name
   */
  HI: RequiredParams<'name'>;
};

export type NamespaceHomePageTranslation = {
  /**
   * W​e​l​c​o​m​e​ ​t​o​ ​y​o​u​r​ ​t​R​P​C​ ​w​i​t​h​ ​P​r​i​s​m​a​ ​s​t​a​r​t​e​r​!
   */
  title: string;
};

export type NamespacePostPageTranslation = {
  /**
   * C​r​e​a​t​e​d​ ​{​d​a​t​e​}
   * @param {unknown} date
   */
  createdAt: RequiredParams<'date'>;
  /**
   * H​o​m​e
   */
  home: string;
};

export type Namespaces = 'homePage' | 'postPage';

type DisallowNamespaces = {
  /**
   * reserved for 'homePage'-namespace\
   * you need to use the `./homePage/index.ts` file instead
   */
  homePage?: "[typesafe-i18n] reserved for 'homePage'-namespace. You need to use the `./homePage/index.ts` file instead.";

  /**
   * reserved for 'postPage'-namespace\
   * you need to use the `./postPage/index.ts` file instead
   */
  postPage?: "[typesafe-i18n] reserved for 'postPage'-namespace. You need to use the `./postPage/index.ts` file instead.";
};

export type TranslationFunctions = {
  /**
   * Hi {name}!
   */
  HI: (arg: { name: string }) => LocalizedString;
  homePage: {
    /**
     * Welcome to your tRPC with Prisma starter!
     */
    title: () => LocalizedString;
  };
  postPage: {
    /**
     * Created {date}
     */
    createdAt: (arg: { date: unknown }) => LocalizedString;
    /**
     * Home
     */
    home: () => LocalizedString;
  };
};

export type Formatters = {};
