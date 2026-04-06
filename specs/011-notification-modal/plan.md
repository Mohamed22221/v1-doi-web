# Implementation Plan: Notification Modal Implementation

**Branch**: `011-notification-modal` | **Date**: 2026-04-06 | **Spec**: `D:\doi-web\specs\011-notification-modal\spec.md`
**Input**: Feature specification from `/specs/011-notification-modal/spec.md`

## Summary

Implement a two-step Notification Modal that triggers automatically for logged-in users with a valid `user_location` and no prior preference. State is persisted via `js-cookie` (for frontend UI rules), and the final submission triggers an API call and native Web Push permission. The UI must match Figma specs precisely and use Tailwind CSS logical properties for bilingual LTR/RTL support.

## Technical Context

**Language/Version**: TypeScript, React 18+  
**Primary Dependencies**: Next.js App Router, Tailwind CSS 4, js-cookie, Zustand (auth-store)  
**Storage**: Client cookies (`notification_prompted`) + Backend API Profile Sync  
**Testing**: Manual Visual Testing (RTL/LTR toggles) + DevTools Network panel  
**Target Platform**: Web Browsers (Mobile + Desktop layouts)  
**Project Type**: Next.js Web Application (React client components)  
**Performance Goals**: Zero hydration mismatches, non-blocking render in server layout.  
**Constraints**: Must conditionally render entirely on the client, must handle `Notification.requestPermission()`.  
**Scale/Scope**: Global singleton modal imported into `src/app/[locale]/layout.tsx`.

## Constitution Check

*GATE: Passed*
- ✅ Uses strict Next.js App Router conventions (Client Component leaf nodes).
- ✅ Tailwind 4 logical properties will be enforced (`ps-4`, `text-start`).
- ✅ All hardcoded Arabic strings from Figma will be extracted to `common.json` i18n keys.

## Project Structure

### Documentation (this feature)

```text
specs/011-notification-modal/
├── plan.md              # This file
├── research.md          # Architecture decisions for state isolation & web push
├── data-model.md        # Cookie schema + API Request payload
├── quickstart.md        # Verification guide
└── tasks.md             # Tasks
```

### Source Code

```text
src/
├── app/[locale]/
│   └── layout.tsx                              # Global layout integration
├── components/template/NotificationModal/
│   ├── index.tsx                               # Wrapper & logic hook consumer
│   ├── NotificationPrompt.tsx                  # UI Step 1 (Figma Content)
│   └── NotificationSettings.tsx                # UI Step 2 (Figma Content)
├── hooks/
│   └── use-notification-modal.ts               # Core logic handling trigger & API calls
└── utils/
    └── notification-cookies.ts                 # Cookie handlers
```

**Structure Decision**: The logic is isolated within the `NotificationModal` template directory to keep the global layout clean. We separate the UI steps into their own files for maintainability.

## Figma Integration Reference

The implementation MUST use these exact copy elements from the Figma design, properly localized:

**Step 1 Component (`NotificationPrompt.tsx`)**:
- Title: `تبغى توصلك التنبيهات المهمة؟` (Do you want to receive important notifications?)
- Description: `بنعلّمك إذا أحد زايد عليك، إذا ربحت المزاد، أو إذا منتجك اتوافق عليه.`

**Step 2 Component (`NotificationSettings.tsx`)**:
- Title: `إعدادات الإشعارات`
- Description: `اختر أنواع الإشعارات اللي تحب توصلك من دُوّي. يمكنك تشغيل أو إيقاف كل إشعار بشكل مستقل.`
- Toggle 1: `إشعارات المزايدات` - `تنبيهات خاصة بالمزادات التي تتابعها أو تشارك فيها.`
- Toggle 2: `إشعارات البيع` - `تنبيهات خاصة بمنتجاتك المعروضة للبيع ومراجعتها وحالتها.`
- Toggle 3: `الإشعارات العامة` - `تنبيهات متعلقة بالتحديثات والعروض وأخبار التطبيق.`

## Complexity Tracking

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| *None* | N/A | N/A |
