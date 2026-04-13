/**
 * Standardizes API responses across the backend a.
 * 
 * @param {Object} res - Express response object
 * @param {number} statusCode - HTTP status code
 * @param {string} message - User-friendly message
 * @param {any} data - The actual payload
 * @param {string} key - The action-specific key (e.g., 'getUserProfile', 'login')
 */
const sendResponse = (res, statusCode, message, data, key) => {
    return res.status(statusCode).json({
        data: {
            [key]: {
                success: statusCode >= 200 && statusCode < 300,
                message,
                code: statusCode,
                data: data || null
            }
        }
    });
};

export default sendResponse;
