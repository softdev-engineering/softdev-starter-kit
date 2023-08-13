import { inferRouterInputs, inferRouterOutputs } from '@trpc/server';
import { httpBatchLink } from '@trpc/client';
import { CreateTRPCNext, createTRPCNext } from '@trpc/next';

import { AppRouter } from '@/server/routers/_app';
import { Context } from '@/server/context';
import { transformer } from './transformer';

function getBaseUrl() {
  if (typeof window !== 'undefined')
    // browser should use relative path
    return '';
  if (process.env.VERCEL_URL)
    // reference for vercel.com
    return `https://${process.env.VERCEL_URL}`;
  if (process.env.RENDER_INTERNAL_HOSTNAME)
    // reference for render.com
    return `http://${process.env.RENDER_INTERNAL_HOSTNAME}:${process.env.PORT}`;
  // assume localhost
  return `http://localhost:${process.env.PORT ?? 3000}`;
}

export const trpc: CreateTRPCNext<AppRouter, Context, null> =
  createTRPCNext<AppRouter>({
    config(opts) {
      const { ctx } = opts;
      if (typeof window !== 'undefined') {
        // during client requests
        return {
          transformer,
          links: [
            httpBatchLink({
              url: '/api/trpc',
            }),
          ],
        };
      }

      return {
        transformer,
        links: [
          httpBatchLink({
            // The server needs to know your app's full url
            url: `${getBaseUrl()}/api/trpc`,
            /**
             * Set custom request headers on every request from tRPC
             * @link https://trpc.io/docs/v10/header
             */
            headers() {
              if (!ctx?.req?.headers) {
                return {};
              }
              // To use SSR properly, you need to forward client headers to the server
              // This is so you can pass through things like cookies when we're server-side rendering
              return {
                cookie: ctx.req.headers.cookie,
              };
            },
          }),
        ],
      };
    },
    ssr: true,
  });

export type RouterInput = inferRouterInputs<AppRouter>;
export type RouterOutput = inferRouterOutputs<AppRouter>;
