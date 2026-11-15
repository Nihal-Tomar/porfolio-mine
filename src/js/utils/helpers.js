/**
 * Utility Helpers
 * Reusable helper functions across portfolio modules
 */

/**
 * Clamps a number between a minimum and maximum value.
 * @param {number} val 
 * @param {number} min 
 * @param {number} max 
 * @returns {number}
 */
export function clamp(val, min = 0, max = 100) {
  if (isNaN(val)) return min;
  return Math.max(min, Math.min(max, Math.round(val)));
}

/**
 * Validates whether an email string matches standard email format.
 * @param {string} email 
 * @returns {boolean}
 */
export function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

/**
 * Asynchronous delay utility.
 * @param {number} ms 
 * @returns {Promise<void>}
 */
export function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
