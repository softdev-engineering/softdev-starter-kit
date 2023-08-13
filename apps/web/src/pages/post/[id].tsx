import NextError from 'next/error';
import { useRouter } from 'next/router';
import { GetStaticPaths, GetStaticProps } from 'next';
import { createServerSideHelpers } from '@trpc/react-query/server';

import { trpc } from '@/utils/trpc';
import { appRouter } from '@/server/routers/_app';
import { createContext } from '@/server/context';
import { transformer } from '@/utils/transformer';
import { prisma } from '@/server/prisma';
import { Locales } from '@/i18n/i18n-types';
import { loadNamespaceAsync } from '@/i18n/i18n-util.async';
import { loadedLocales } from '@/i18n/i18n-util';
import { PostItem } from '@/components/post/PostItem';

export const getStaticProps: GetStaticProps = async (context) => {
  const locale = context.locale as Locales;
  await loadNamespaceAsync(locale, 'postPage');
  const ssg = createServerSideHelpers({
    router: appRouter,
    ctx: await createContext(),
    transformer,
  });

  ssg.post.byId.prefetch({ id: context.params?.id as string });

  return {
    props: {
      trpcState: ssg.dehydrate(),
      i18n: {
        locale: locale,
        dictionary: loadedLocales[locale],
      },
    },
    revalidate: 1,
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = await prisma.post.findMany({
    select: {
      id: true,
    },
  });
  return {
    paths: posts.map((post) => ({
      params: {
        id: post.id,
      },
    })),
    // https://nextjs.org/docs/pages/api-reference/functions/get-static-paths#fallback-blocking
    fallback: 'blocking',
  };
};

function PostPage() {
  const id = useRouter().query.id as string;
  const postQuery = trpc.post.byId.useQuery(
    { id },
    { refetchOnMount: false, refetchOnWindowFocus: false },
  );

  if (postQuery.error) {
    return (
      <NextError
        title={postQuery.error.message}
        statusCode={postQuery.error.data?.httpStatus ?? 500}
      />
    );
  }

  if (postQuery.status !== 'success') {
    return (
      <div className="flex flex-col justify-center h-full px-8 ">
        <div className="w-full bg-zinc-900/70 rounded-md h-10 animate-pulse mb-2"></div>
        <div className="w-2/6 bg-zinc-900/70 rounded-md h-5 animate-pulse mb-8"></div>

        <div className="w-full bg-zinc-900/70 rounded-md h-40 animate-pulse"></div>
      </div>
    );
  }

  return <PostItem post={postQuery.data} />;
}

export default PostPage;
