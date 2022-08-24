export const API_GET_USER_BY_ID = (id: string) => `/users/${id}`;
export const API_USER_REGISTER = '/auth/register';

export const API_GET_CHARACTERS_BY_USER_ID = (userId: string) =>
  `/characters/users/${userId}`;
export const API_POST_CREATE_CHARACTER = '/characters';

export const API_GET_ALL_ELEMENTS = '/elements';
export const API_GET_ELEMENT_BY_ID = (elementId: string) =>
  `/elements/${elementId}`;
export const API_POST_CREATE_ELEMENT = '/elements';
export const API_PUT_UPDATE_ELEMENT = (elementId: string) =>
  `/elements/${elementId}`;
export const API_DELETE_DELETE_ELEMENT = (elementId: string) =>
  `/elements/${elementId}`;
