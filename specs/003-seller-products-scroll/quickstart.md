# Quickstart: Infinite Scroll Verification

## Local Development
1. Ensure the development server is running: `npm run dev`
2. Navigate to the Seller Products page: `http://localhost:3000/[locale]/seller/products`

## Verification Steps
1. **Initial Load**: Verify the first 10 products appear.
2. **Early Fetch**: Scroll down slowly. Monitor the "Network" tab; a new fetch should trigger when the bottom of the list is ~400px away.
3. **Seamless Loading**: Notice skeletons appearing at the bottom while fetching.
4. **Filtering**: Change the product status filter. Verify the list resets and infinite scroll continues to work for the filtered set.
5. **No Jump**: Ensure adding new items does not cause the scroll position to jump unexpectedly.
