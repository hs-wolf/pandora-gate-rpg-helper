import { ApiError, ResponseCodes } from '@pandora-gate-rpg-helper/models';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const handleError = (error: any) => {
  console.log(error);
  if (error instanceof ApiError) {
    throw error;
  }
  throw new ApiError(
    ResponseCodes.INTERNAL_ERROR,
    error?.message ?? error?.details ?? JSON.stringify(error)
  );
};
