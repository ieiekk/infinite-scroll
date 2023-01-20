import { useSignal } from "@preact/signals";
import { useEffect, useRef } from "preact/hooks";

export default function InfiniteScrollContainer(
  { products, page }: {
    products: Record<string, string | number>[];
    page: number;
  },
) {
  const loadingElementRef = useRef(null);
  const productsSignal = useSignal(products);
  const pageSignal = useSignal(page);

  useEffect(() => {
    const intersectionObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          displayMoreProducts();
        });
      },
    );
    intersectionObserver.observe(
      loadingElementRef.current as unknown as Element,
    );
  }, [loadingElementRef.current]);

  async function displayMoreProducts() {
    // Fetch more
    const resp = await fetch(
      `https://dummyjson.com/products?limit=10&skip=${page * 10}`,
    ).then((res) => res.json());
    // Add 1 page
    pageSignal.value = pageSignal.value + 1;
    // Append products
    productsSignal.value = productsSignal.value.concat(resp.products);
  }

  return (
    <div
      id="infinite-scroll-container"
      class="flex flex-col gap-4 overflow-y-scroll flex-grow bg-gray-100"
    >
      {productsSignal.value.map((prod: Record<string, string | number>) => {
        return (
          <div class="border-2">
            <h1 class="text-2xl font-bold">{prod.title}</h1>
            <p>{prod.description}</p>
          </div>
        );
      })}
      <span ref={loadingElementRef} class="text-center text-xl">
        Loading...
      </span>
    </div>
  );
}
