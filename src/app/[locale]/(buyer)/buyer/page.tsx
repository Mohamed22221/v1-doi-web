import React from "react";

const BuyerPage = () => {
  return (
    <div className="min-h-screen space-y-12">
      <h1 className="text-3xl font-bold text-primary-500">مرحباً بك في لوحة تحكم المشتري</h1>

      {/* Mock content to enable scrolling */}
      <div className="space-y-6">
        {Array.from({ length: 15 }).map((_, i) => (
          <div
            key={i}
            className="flex h-64 items-center justify-center rounded-xl border border-neutral-200 bg-white text-neutral-400 shadow-sm"
          >
            محتوى تجريبي للتبويب {i + 1} - قم بالسكرول لاختبار الـ Sticky Nav
          </div>
        ))}
      </div>
    </div>
  );
};

export default BuyerPage;
