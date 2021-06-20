import { ACCESS_TOKEN, REFRESH_TOKEN, ME_URL, REFRESH_URL } from '../constants/auth';

/**
 * Stores accessToken and refreshToken in localStorage
 * 
 * @param {string} accessToken 
 * @param {string} refreshToken 
 */
export const storeTokens = (accessToken, refreshToken) => {
  localStorage.setItem(ACCESS_TOKEN, accessToken);
  localStorage.setItem(REFRESH_TOKEN, refreshToken);
};

/**
 * Removes access and refresh tokens from local storage
 */
export const removeTokens = () => {
  localStorage.removeItem(ACCESS_TOKEN);
  localStorage.removeItem(REFRESH_TOKEN);
};

/**
 * Refreshes access and refresh tokens
 *
 * @param {string} refreshToken
 * @returns true if successful or false if not
 */
const refresh = async () => {
  const storedRefreshToken = localStorage.getItem(REFRESH_TOKEN);
  if (!storedRefreshToken) return false;

  const res = await fetch(REFRESH_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ refreshToken: storedRefreshToken }),
  });

  if (res.status !== 200) return false;

  const data = await res.json();
  const { accessToken, refreshToken } = data;

  if (!accessToken || !refreshToken) return false;

  storeTokens(accessToken, refreshToken);
  return true;
};

/**
 * Checks the state is authenticated
 *
 * @returns true if some user is authenticated and false if not
 */
export const authenticate = async () => {
  const accessToken = localStorage.getItem(ACCESS_TOKEN);
  if (!accessToken) return false;

  const res = await fetch(ME_URL, {
    headers: {
      authorization: `Bearer ${accessToken}`,
    },
  });
  const statusCode = res.status;
  if (statusCode === 200) return true;

  const refreshed = refresh();
  if (!refreshed) return false;

  return true;
};

/**
 * Gets access token from the local storage and forms authorization string
 * 
 * @returns authorization string
 */
export const getBearerToken = () => `Bearer ${localStorage.getItem(ACCESS_TOKEN)}`;

/**
 * Runs the function, passed in parameters. If function throws an error,
 * refreshes tokens and runs the function again.
 * 
 * @param {function} fetchFunction 
 */
export const fetchProtectedData = async (fetchFunction) => {
  try {
    await fetchFunction();
  } catch (error) {
    await refresh();
    await fetchFunction();
  }
};
