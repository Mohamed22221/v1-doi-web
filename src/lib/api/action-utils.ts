import { useMutation, type UseMutationOptions } from "@tanstack/react-query";
import { getApiErrorMessage } from "./error";
import type { ActionState } from "./types/api";

/**
 * A higher-order function that wraps a server action function with error handling and logging.
 *
 * @param actionFn - The async function containing the core action logic.
 * @returns An `ActionState<T>` object indicating success or failure.
 */
export async function serverActionWrapper<T>(actionFn: () => Promise<T>): Promise<ActionState<T>> {
  try {
    const data = await actionFn();
    return { success: true, data };
  } catch (error) {
    return {
      success: false,
      error: getApiErrorMessage(error),
    };
  }
}

export function useAppMutation<T, P, C = unknown>(
  action: (payload: P) => Promise<ActionState<T>>,
  options?: UseMutationOptions<T, Error, P, C>,
) {
  return useMutation({
    ...options,
    mutationFn: async (payload: P): Promise<T> => {
      const result = await action(payload);
      if (!result.success) {
        // Automatically throw the error string to trigger onError
        throw new Error(result.error);
      }
      // Return the data directly to onSuccess
      return result.data;
    },
  });
}
