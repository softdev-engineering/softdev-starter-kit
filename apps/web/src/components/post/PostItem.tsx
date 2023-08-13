import { RouterOutput } from '@/utils/trpc';
import { Link } from '@/components/Link';
import { useI18nContext } from '@/i18n/i18n-react';

type PostByIdOutput = RouterOutput['post']['byId'];

export function PostItem({ post }: { post: PostByIdOutput }) {
  const { LL } = useI18nContext();
  return (
    <div className="flex flex-col justify-center h-full px-8 ">
      <div className="w-full mb-4">
        <Link href="/" underline>
          Home
        </Link>
      </div>
      <h1 className="text-4xl font-bold">{post.title}</h1>
      <em className="text-gray-400">
        {LL.postPage.createdAt({
          date: post.createdAt.toLocaleDateString('en-us'),
        })}
      </em>

      <p className="py-4 break-all">{post.text}</p>

      <h2 className="text-2xl font-semibold py-2">Raw data:</h2>
      <pre className="bg-gray-900 p-4 rounded-xl overflow-x-scroll">
        {JSON.stringify(post, null, 4)}
      </pre>
    </div>
  );
}
