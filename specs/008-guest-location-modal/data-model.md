# Data Model: Guest Location Selection Modal

## Entity: UserLocation (Cookie-based)
Representation of the user's regional preference, stored in a client-side cookie (`user_location`).

| Property    | Type      | Description                                      |
| ----------- | --------- | ------------------------------------------------ |
| `id`        | `string`  | Predefined city code or raw localized name.      |
| `name`      | `string`  | Arabic localized name (e.g., "الرياض").          |
| `lat`       | `number?` | Latitude (if resolved via Geolocation).          |
| `lng`       | `number?` | Longitude (if resolved via Geolocation).         |
| `isDefault` | `boolean` | Set to true if fallback "الرياض" was used.       |

## Collection: Predefined Cities
Static list of Saudi regions used for selection.

| Name    | Code (ID) |
| ------- | --------- |
| الرياض  | riyadh    |
| جدة     | jeddah    |
| الدمام  | dammam    |
| مكة     | mecca     |
| المدينة | medina    |
| أبها    | abha      |
| تبوك    | tabuk     |
| القصيم  | qassim    |
| حائل    | hail      |
| جازان   | jazan     |
| نجران   | najran    |
| الباحة  | baha      |

## Validation Logic
- **City Selection**: MUST exist in the predefined collection.
- **Geolocation**: MUST be successfully resolved before being persisted.
- **Dismissal**: If the modal is closed without any valid state, the cookie MUST be set to `riyadh`.
