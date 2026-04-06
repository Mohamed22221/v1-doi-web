# Data Model & State Schema

## Client State (js-cookie)

The frontend manages user interaction state using a single cookie: `notification_prompted`.

**Schema:**
- Key: `notification_prompted`
- Value Options:
  - `later` (Denotes the user dismissed the modal temporarily).
  - `configured` (Denotes the user completed Step 2).
- Expirations:
  - If `later`: Expires in 15 minutes.
  - If `configured`: Expires in 365 days.

## Preference Entity (API Payload)

When the user completes Step 2, the app will trigger an API call to save preferences to their backend profile.

**Entity:** `NotificationPreferences`
```json
{
  "auctions_notifications": boolean,
  "sales_notifications": boolean,
  "general_notifications": boolean
}
```

## Security & Privacy
No Personally Identifiable Information (PII) is stored in the `notification_prompted` cookie. The backend API request uses the standard user session token.
