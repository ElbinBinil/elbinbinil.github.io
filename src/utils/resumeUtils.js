/**
 * Utility functions for resume URL handling
 */

/**
 * Validates if a resume URL is properly formatted for viewing
 * @param {string} url - The resume URL to validate
 * @returns {boolean} - Whether the URL is valid
 */
export const isValidResumeUrl = (url) => {
  if (!url || typeof url !== "string") return false;

  try {
    const urlObj = new URL(url);
    // Check if it's a valid URL
    return urlObj.protocol === "http:" || urlObj.protocol === "https:";
  } catch {
    return false;
  }
};

/**
 * Formats a Google Drive sharing URL to a preview URL
 * @param {string} url - The Google Drive URL
 * @returns {string} - The formatted preview URL
 */
export const formatGoogleDriveUrl = (url) => {
  if (!url) return "";

  // If it's already a preview URL, return as is
  if (url.includes("/preview")) return url;

  // Extract file ID from various Google Drive URL formats
  const fileIdMatch = url.match(/\/d\/([a-zA-Z0-9-_]+)/);
  if (fileIdMatch) {
    const fileId = fileIdMatch[1];
    return `https://drive.google.com/file/d/${fileId}/preview`;
  }

  // If it's not a Google Drive URL, return as is
  return url;
};

/**
 * Gets a fallback message when resume URL is not available
 * @returns {string} - Fallback message
 */
export const getResumeFallbackMessage = () => {
  return "Resume is currently being updated. Please check back later or contact me directly for my latest resume.";
};

/**
 * Validates and formats a resume URL for viewing
 * @param {string} url - The resume URL
 * @returns {object} - Object with formatted URL and validity status
 */
export const processResumeUrl = (url) => {
  if (!isValidResumeUrl(url)) {
    return {
      isValid: false,
      url: "",
      message: getResumeFallbackMessage(),
    };
  }

  const formattedUrl = formatGoogleDriveUrl(url);

  return {
    isValid: true,
    url: formattedUrl,
    message: "",
  };
};
