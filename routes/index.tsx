import { Head } from "$fresh/runtime.ts";
import { Handlers, PageProps } from "$fresh/server.ts";
import InfiniteScrollContainer from "../islands/InfiniteScrollContainer.tsx";

export const handler: Handlers = {
  async GET(_req, ctx) {
    const resp = await fetch("https://dummyjson.com/products?limit=10")
      .then(
        (res) => res.json(),
      );
    return ctx.render(resp);
  },
};

export default function Home({ data: { products } }: PageProps) {
  return (
    <>
      <Head>
        <title>Fresh App</title>
      </Head>
      <div class="max-h-screen flex flex-col">
        <h1 class="text-4xl font-black mb-3">Infinite Scroll Container Demo</h1>
        {/* Scroll container */}
        <InfiniteScrollContainer products={products} page={1} />
      </div>
    </>
  );
}
