# Quickstart: Verifying the Notification Modal

This guide provides steps for executing and verifying the implementation locally.

## Prerequisite Setup

1. Start the development server: `npm run dev`
2. Open the application (e.g., `http://localhost:3000`).
3. Ensure you are **logged in** to a valid user account.
4. Open Developer Tools -> Application -> Cookies. Ensure `user_location` exists and `notification_prompted` DOES NOT exist.

## Verification Flow

1. **Trigger Check**: Refresh the home page. The Notification Modal (Step 1) should instantly appear.
2. **Deferral Functionality**:
   - Click the "لاحقاً" (Later) button.
   - Verify in DevTools that `notification_prompted=later` is set.
   - Refresh the page and confirm the modal *does not* appear.
   - Delete the cookie to test Step 2.
3. **Configuration Functionality**:
   - Refresh to open Step 1, click "اسمح بالإشعارات" (Allow).
   - In Step 2, toggle preferences (e.g., Auctions ON, Sales OFF).
   - Click "تأكيد الإعدادات" (Confirm).
   - **Crucial Checks:**
     1. Verify the `Notification.requestPermission()` browser popup appears.
     2. Check the Network Tab to ensure an API request (e.g., POST `/user/preferences`) is fired with the selected toggles.
     3. Verify `notification_prompted=configured` cookie is set.
4. **Layout Check**:
   - Change locale to English (`/en`).
   - Open Step 1 and 2.
   - Verify layout direction is LTR, icons are mirrored if necessary, and switches align to the right edge correctly using logical CSS properties.
