# Data Model

## Entities

### `Product` (Context of Modal View)

This represents the data structure expected by the Product Details Modal. It aligns with the existing product schema in the seller dashboard.

| Field | Type | Description |
|-------|------|-------------|
| `id` | `string` | Unique identifier used for React keys and fetching |
| `title` | `string` | Product name to be displayed prominently |
| `description` | `string` | Full textual description of the product |
| `price` | `number` | Current price or starting bid |
| `status` | `string` | Enum representing the product state (e.g., active, pending, auction_live) |
| `images` | `Array<{ url: string }>` | Array of image objects to be displayed in a gallery or list |

## Validation Rules & Display Constraints

- Missing images should render a styled placeholder fallback.
- `description` should be scrollable independently if it exceeds the vertical limits of the viewport constraint.
- Localization mappings must be applied to the `status` field before display.
