import { Link } from '@/components/Link';

export default function Custom404() {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-center">
      <Link href="/" underline>
        Home
      </Link>
      <div className="flex flex-col">
        <h1 className="text-9xl font-bold">404</h1>
        <h2 className="text-4xl font-bold">Page not found</h2>
      </div>
    </div>
  );
}
