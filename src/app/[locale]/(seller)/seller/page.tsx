import React from 'react'

const BuyerPage = () => {
    return (
        <div className="space-y-12">
            <h1 className="text-3xl font-bold text-primary-500">مرحباً بك في لوحة تحكم المشتري</h1>

            {/* Mock content to enable scrolling */}
            <div className="space-y-6">
                {Array.from({ length: 15 }).map((_, i) => (
                    <div key={i} className="h-64 bg-white rounded-xl border border-neutral-200 shadow-sm flex items-center justify-center text-neutral-400">
                        محتوى تجريبي للتبويب {i + 1} - قم بالسكرول لاختبار الـ Sticky Nav
                    </div>
                ))}
            </div>
        </div>
    )
}

export default BuyerPage