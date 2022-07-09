import { Request } from 'express';
import { auth } from 'firebase-admin';
import { DecodedIdToken } from 'firebase-admin/auth';
import { SECURITY_NAME_BEARER } from './constants';
import { ApiError, ResponseCodes } from '@pandora-gate-rpg-helper/models';
import { handleError } from '@pandora-gate-rpg-helper/utilities';

/**
 * This is called by tsoa's auto generated routes.
 *
 * @param request - The request object sent by express.
 * @param securityName - The security name sent by the controller.
 * @param scopes - The array of scopes sent by the controller.
 * @returns {Promise<DecodedIdToken | undefined>} Undefined or the decoded token from `bearerAuth`.
 */
export const expressAuthentication = async (
  request: Request,
  securityName: string,
  scopes: string[]
): Promise<DecodedIdToken | undefined> => {
  if (securityName === SECURITY_NAME_BEARER) {
    return bearerAuth(request, scopes);
  }
};

/**
 * Scan the `request` token locations and get the first existing one.
 * Remove the `Bearer` prefix from the token and return it verified and decoded.
 *
 * @param {Request} request - The request object sent by express.
 * @param {string[]} scopes - The array of scopes sent by the controller.
 * @return {Promise<DecodedIdToken>} The decoded token from firebase.
 */
const bearerAuth = async (
  request: Request,
  scopes: string[]
): Promise<DecodedIdToken> => {
  try {
    const rawToken: string =
      request.body.token ||
      request.query.token ||
      request.headers['x-access-token'] ||
      request.get('Authorization');
    const cleanToken = rawToken
      ? rawToken.replace(`${SECURITY_NAME_BEARER} `, '')
      : '';
    if (!cleanToken) {
      throw new ApiError(
        ResponseCodes.UNAUTHORIZED,
        'Unauthorized due missing token.'
      );
    }
    const claims = await auth().verifyIdToken(cleanToken);
    if (!scopes.includes(claims.role)) {
      throw new ApiError(
        ResponseCodes.UNAUTHORIZED,
        'Unauthorized to access this route.'
      );
    }
    return claims;
  } catch (error) {
    handleError(error);
  }
};
