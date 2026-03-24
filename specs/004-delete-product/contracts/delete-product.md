# API Contract: Delete Product

## Endpoint Details

- **Protocol**: HTTPS
- **Method**: `DELETE`
- **Endpoint**: `/api/v1/seller/products/{id}`
- **Authentication**: Required (Bearer Token via `apiClient`)

## Request

### Path Parameters
| Name | Type | Description |
|------|------|-------------|
| `id` | `string` | The ID of the product to delete. |

## Response

### Success (200 OK / 204 No Content)
Standardized response handled by `apiClient`.

```json
{
  "success": true,
  "data": null
}
```

### Error (4xx/5xx)
Standardized error format from `ApiErrorClass`.

```json
{
  "success": false,
  "error": "Error message from server (e.g., unauthorized, not found)"
}
```
