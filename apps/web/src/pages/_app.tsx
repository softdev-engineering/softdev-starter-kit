import type { ReactElement, ReactNode } from 'react';
import type { NextPage } from 'next';
import type { AppType, AppProps } from 'next/app';

import { DefaultLayout } from '../components/DefaultLayout';
import { trpc } from '@/utils/trpc';
import { Locales } from '@/i18n/i18n-types';
import { loadedLocales } from '@/i18n/i18n-util';
import { loadFormatters } from '@/i18n/i18n-util.sync';
import TypesafeI18n from '@/i18n/i18n-react';

import '@/styles/globals.css';
import 'ui/styles.css';

export type NextPageWithLayout<
  TProps = Record<string, unknown>,
  TInitialProps = TProps,
> = NextPage<TProps, TInitialProps> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

const MyApp = (({ Component, pageProps }: AppPropsWithLayout) => {
  if (!pageProps.i18n) return null;

  const locale: Locales = pageProps.i18n.locale;
  const dictionary = pageProps.i18n.dictionary;
  const getLayout =
    Component.getLayout ?? ((page) => <DefaultLayout>{page}</DefaultLayout>);

  loadedLocales[locale] = dictionary;
  loadFormatters(locale);

  return (
    <TypesafeI18n locale={locale}>
      {getLayout(<Component {...pageProps} />)}
    </TypesafeI18n>
  );
}) as AppType;

export default trpc.withTRPC(MyApp);
