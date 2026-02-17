# ✅ حل مشكلة Flash عند تغيير الـ Theme

## الملفات المُعدّلة:

### 1️⃣ `src/lib/store/theme-store.ts`
- ✅ بيحدّث الـ cookie فوراً عند تغيير الـ theme
- ✅ بيطبّق الـ class على `<html>` مباشرة بدون انتظار React
- ✅ بيعمل sync بين cookie و localStorage

### 2️⃣ `src/app/[locale]/layout.tsx`
- ✅ بيستخدم `<Script strategy="beforeInteractive">` من Next.js
- ✅ الـ Script component موجود أول حاجة في `<body>`
- ✅ `suppressHydrationWarning` على `<html>` عشان نتجنب hydration warnings

### 3️⃣ `src/components/shared/scripts/theme-script.tsx`
- ✅ Script component بيقرأ من cookie أو localStorage
- ✅ بيطبّق الـ theme class قبل ما React يعمل hydration
- ✅ بيعمل sync من localStorage للـ cookie لو مش موجود

### 4️⃣ `src/components/providers/theme-provider.tsx`
- ✅ اتبسّط - مش محتاج يعمل حاجة دلوقتي

---

## كيف يشتغل:

```
1. Next.js بيحط الـ Script component أول حاجة في body (beforeInteractive)
2. الـ script بيقرأ theme من cookie/localStorage
3. بيطبّق class على <html> قبل ما React يبدأ
4. User يغيّر theme → يتحدّث فوراً (DOM + cookie + localStorage)
```

---

## اختبار:

1. **غيّر الـ theme** → هتلاقيه اتغيّر smooth
2. **اعمل refresh** → المفروض مفيش flash (أو flash خفيف جداً)
3. **شوف الـ cookie** (DevTools → Application → Cookies) → هتلاقي `theme=dark` أو `theme=light`

---

## ملاحظات:

- ✅ **استخدام `<Script strategy="beforeInteractive">`** من Next.js
- ✅ الـ script موجود أول حاجة في `<body>` عشان ينفذ بدري
- ⚠️ **ممكن يحصل flash خفيف جداً** لأن beforeInteractive مش بيكون blocking 100% زي inline script
- ✅ لو عايز **zero flash مضمون**، استخدم inline script في `<head>` بدل Script component

---

## 🎉 النتيجة:
استخدام **Next.js Script component** مع أقل flash ممكن!
