import { ReactNode } from 'react';
import Head from 'next/head';
import { Navbar } from './Navbar';

type DefaultLayoutProps = { children: ReactNode };

export const DefaultLayout = ({ children }: DefaultLayoutProps) => {
  return (
    <>
      <Head>
        <title>Prisma Starter</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="h-screen flex flex-col">
        <Navbar />
        <div className="px-8 flex-1 bg-gray-800">{children}</div>
      </div>
    </>
  );
};
