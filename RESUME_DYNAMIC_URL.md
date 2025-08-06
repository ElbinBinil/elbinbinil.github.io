# Dynamic Resume URL Implementation

## Overview

The portfolio now dynamically fetches the resume URL from Firebase Firestore profile data instead of using hardcoded URLs. This allows you to update your resume link through the admin panel without touching the code.

## How It Works

### 1. Profile Data Structure

Your Firestore profile document (`profile/main`) should include a `resumeUrl` field:

```json
{
  "name": "Your Name",
  "bio": "Your bio...",
  "resumeUrl": "https://drive.google.com/file/d/YOUR_FILE_ID/view",
  "socialLinks": {
    // ... other fields
  }
}
```

### 2. Admin Configuration

1. Go to `/admin/profile` in your application
2. Update the "Resume URL" field with your Google Drive link or any PDF URL
3. Save the changes

### 3. Supported URL Formats

The system automatically handles various Google Drive URL formats and converts them to preview format:

- **Sharing URLs**: `https://drive.google.com/file/d/FILE_ID/view`
- **Preview URLs**: `https://drive.google.com/file/d/FILE_ID/preview` (preferred)
- **Direct URLs**: Any direct HTTPS link to a PDF

### 4. URL Processing

The `resumeUtils.js` utility functions:

- **Validate URLs**: Ensure the URL is properly formatted
- **Format Google Drive URLs**: Convert sharing URLs to preview format
- **Error Handling**: Provide fallback messages when URLs are invalid

## Components Updated

### Resume.js

- Fetches profile data using `useProfile()` hook
- Processes resume URL before storing in sessionStorage
- Includes validation and error handling

### resume/page.js

- Uses dynamic resume URL from sessionStorage or profile data
- Enhanced error display with fallback messages
- Graceful handling of missing or invalid URLs

## Error Handling

### When Resume URL is Missing

- Shows professional error message
- Provides contact button for direct communication
- Uses fallback message from utility functions

### When Resume URL is Invalid

- Validates URL format before display
- Converts Google Drive URLs to proper preview format
- Displays appropriate error messages

## Benefits

1. **No Code Changes**: Update resume URL through admin panel
2. **URL Validation**: Automatically validates and formats URLs
3. **Error Handling**: Graceful fallbacks when URLs are unavailable
4. **Google Drive Support**: Automatic conversion to preview format
5. **Analytics Integration**: Maintains existing resume view tracking

## Usage Examples

### Setting a Google Drive Resume URL

1. Share your PDF from Google Drive
2. Copy the sharing URL: `https://drive.google.com/file/d/1ABC123.../view`
3. Paste in admin panel - the system converts to preview format automatically

### Using a Direct PDF URL

1. Upload PDF to any hosting service
2. Get direct HTTPS URL to PDF
3. Add to admin panel

### Fallback Behavior

- If no URL is configured, shows "Resume Not Available" message
- Provides contact button for direct communication
- Maintains professional appearance even without resume URL

## Testing

1. **With Valid URL**: Resume displays in iframe
2. **With Invalid URL**: Shows error message with contact option
3. **Without URL**: Shows professional fallback message
4. **Google Drive URLs**: Automatically converted to preview format

This implementation ensures your resume is always accessible while maintaining professional presentation and providing multiple fallback options.
