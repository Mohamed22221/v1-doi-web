import Image from "next/image";

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

/**
 * EmptyProductsState
 *
 * Displayed when the seller has no products yet.
 * Server Component — no interactivity or client-side state needed.
 */
export default function EmptyProductsState() {
  return (
    <section
      aria-label="لا توجد منتجات"
      className="flex flex-col items-center justify-center gap-4 py-16 text-center rtl"
    >
      <Image
        src="/img/empty-products.png"
        alt="لا توجد منتجات"
        width={200}
        height={200}
        className="size-[150px] md:size-[200px]"
        priority
      />

      <h2 className="mt-4 text-h3 font-bold text-primary-500 md:text-h2 dark:text-primary-200">
        لم تقم بإضافة أي منتجات بعد
      </h2>

      <p className="mt-2 max-w-sm text-body text-neutral-600 md:text-h5 dark:text-neutral-300">
        ابدأ ببيع منتجاتك الآن وأضف أول منتج لك ليعرضه أمام آلاف المشترين المحتملين.
      </p>
    </section>
  );
}
