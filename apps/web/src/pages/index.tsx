import { GetStaticPropsContext, InferGetStaticPropsType } from 'next';
import { Fragment } from 'react';
import { Button, TextInput, Textarea } from 'ui';

import { NextPageWithLayout } from './_app';
import { RouterInput, trpc } from '@/utils/trpc';
import { Link } from '@/components/Link';
import { loadNamespaceAsync } from '@/i18n/i18n-util.async';
import { Locales } from '@/i18n/i18n-types';
import { useI18nContext } from '@/i18n/i18n-react';
import { loadedLocales } from '@/i18n/i18n-util';

export async function getStaticProps(context: GetStaticPropsContext) {
  const locale = context.locale as Locales;
  await loadNamespaceAsync(locale, 'homePage');

  return {
    props: {
      i18n: {
        locale: locale,
        dictionary: loadedLocales[locale],
      },
    },
  };
}

const IndexPage: NextPageWithLayout<
  InferGetStaticPropsType<typeof getStaticProps>
> = () => {
  const { LL } = useI18nContext();
  const postsQuery = trpc.post.list.useInfiniteQuery(
    {
      limit: 5,
    },
    {
      getPreviousPageParam(lastPage) {
        return lastPage.nextCursor;
      },
    },
  );

  const addPost = trpc.post.add.useMutation({
    async onSuccess() {
      // refetches posts after a post is added
      await postsQuery.refetch();
    },
  });

  return (
    <div className="flex flex-col bg-gray-800 py-8">
      <h1 className="text-4xl font-bold">{LL.homePage.title()}</h1>
      <p className="text-gray-400">
        If you get stuck, check{' '}
        <Link underline href="https://trpc.io">
          the docs
        </Link>
        , write a message in our{' '}
        <Link underline href="https://trpc.io/discord">
          Discord-channel
        </Link>
        , or write a message in{' '}
        <Link underline href="https://github.com/trpc/trpc/discussions">
          GitHub Discussions
        </Link>
        .
      </p>

      <div className="flex flex-col py-8 items-start gap-y-2">
        <div className="flex flex-col"></div>
        <h2 className="text-3xl font-semibold">
          Latest Posts
          {postsQuery.status === 'loading' && '(loading)'}
        </h2>

        <Button
          onClick={() => postsQuery.fetchPreviousPage()}
          disabled={
            !postsQuery.hasPreviousPage || postsQuery.isFetchingPreviousPage
          }
        >
          {postsQuery.isFetchingPreviousPage
            ? 'Loading more...'
            : postsQuery.hasPreviousPage
            ? 'Load More'
            : 'Nothing more to load'}
        </Button>

        {postsQuery.data?.pages.map((page, index) => (
          <Fragment key={page.items[0]?.id || index}>
            {page.items.map((item) => (
              <article key={item.id}>
                <h3 className="text-2xl font-semibold">{item.title}</h3>
                <Link href={`/post/${item.id}`}>View more</Link>
              </article>
            ))}
          </Fragment>
        ))}
      </div>

      <hr />

      <div className="flex flex-col py-8 items-center">
        <h2 className="text-3xl font-semibold pb-2">Add a Post</h2>

        <form
          className="py-2 w-4/6"
          onSubmit={async (e) => {
            /**
             * In a real app you probably don't want to use this manually
             * Checkout React Hook Form - it works great with tRPC
             * @see https://react-hook-form.com/
             * @see https://kitchen-sink.trpc.io/react-hook-form
             */
            e.preventDefault();
            const $form = e.currentTarget;
            const values = Object.fromEntries(new FormData($form));
            type Input = RouterInput['post']['add'];

            const input: Input = {
              title: values.title as string,
              text: values.text as string,
            };
            try {
              await addPost.mutateAsync(input);

              $form.reset();
            } catch (cause) {
              console.error({ cause }, 'Failed to add post');
            }
          }}
        >
          <div className="flex flex-col gap-y-4 font-semibold">
            <TextInput
              id="title"
              name="title"
              placeholder="Title"
              disabled={addPost.isLoading}
            />
            <Textarea
              id="text"
              name="text"
              placeholder="Text"
              disabled={addPost.isLoading}
              rows={6}
            />

            <div className="flex justify-center">
              <Button type="submit" disabled={addPost.isLoading}>
                Submit
              </Button>
              {addPost.error && (
                <p style={{ color: 'red' }}>{addPost.error.message}</p>
              )}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default IndexPage;
