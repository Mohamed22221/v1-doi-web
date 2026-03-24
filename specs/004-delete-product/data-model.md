# Data Model: Seller Product Deletion

## Entities

### `SellerProduct` (Existing)
Represents the product being managed by the seller.

| Field | Type | Description |
|-------|------|-------------|
| `id` | `string` | Unique identifier for the product. |
| `effectiveStatus` | `ProductEffectiveStatus` | Current operational state of the product. |

### `ProductEffectiveStatus` (Existing)
Enum-like type defining product states.

**Critical States for Deletion:**
- `auction_live`: Deletion requires specific financial loss warning.
- `auction_scheduled`: Deletion requires specific financial loss warning.
- *Default*: General deletion warning.

## State Transitions

- **Action**: `Delete`
- **Initial State**: Any `ProductEffectiveStatus`
- **Final State**: `Deleted` (Removed from server and local cache)
- **Rollback State**: `Initial State` (Restored if server synchronization fails)
