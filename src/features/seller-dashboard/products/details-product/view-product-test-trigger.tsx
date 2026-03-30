"use client";

import * as React from "react";
import { ViewProductModal } from "./view-product-modal";
import type { Locale } from "@lib/i18n/config";
import type { ProductDetails } from "./types";

const MOCK_PRODUCT: ProductDetails = {
  id: "test-001",
  title: "iPhone 15 Pro Max",
  description: "آيفون 15 برو ماكس، سعة 256GB، شبه جديد مع الضمان.",
  price: 2000,
  effectiveStatus: "pending_approval",
  images: [
    { url: "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=800" },
    { url: "https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=800" },
    { url: "https://images.unsplash.com/photo-1574944985070-8f3ebc6b79d2?w=800" },
  ],
};

export function ViewProductTestTrigger({ locale }: { locale: Locale }) {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="inline-flex items-center gap-2 rounded-xl bg-primary-500 px-5 py-3 text-sm font-bold text-white shadow-md transition hover:bg-primary-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-400"
      >
        🧪 Test — View Product Modal
      </button>

      <ViewProductModal
        product={MOCK_PRODUCT}
        isOpen={isOpen}
        onOpenChange={setIsOpen}
        locale={locale}
      />
    </>
  );
}
