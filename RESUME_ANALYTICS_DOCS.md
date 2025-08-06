# Resume Analytics Dashboard

## Overview

A comprehensive analytics system that tracks and displays resume viewing statistics in your admin dashboard. This system provides insights into who is viewing your resume, where they're coming from, and when they're accessing it.

## Features

### 📊 Analytics Dashboard (`/admin/analytics`)

- **Total Views**: Complete count of resume views
- **Unique Visitors**: Number of unique email addresses
- **30-Day Views**: Views in the last 30 days
- **Top Traffic Source**: Most common referral source
- **Daily Views Chart**: 7-day view trend visualization
- **Source Distribution**: Breakdown of traffic sources with percentages
- **Recent Views Table**: Latest resume access with timestamps
- **Data Export**: JSON and CSV export functionality

### 🏠 Dashboard Quick Stats

- Real-time analytics summary on main admin dashboard
- Today's view count
- 7-day view summary
- Top traffic source
- Quick link to detailed analytics

### 📈 Data Collection

Automatically tracks:

- **Email addresses** (from resume access form)
- **Traffic sources** (LinkedIn, GitHub, Website, etc.)
- **Timestamps** (when resume was accessed)
- **User agents** (browser/device information)
- **View dates** (ISO format for easy filtering)

## Technical Implementation

### Database Structure

```firestore
Collection: resumeViews
Document: {
  email: string (lowercase, trimmed)
  source: string (linkedin, github, website, etc.)
  userAgent: string (browser info)
  timestamp: Timestamp (Firestore timestamp)
  viewDate: string (ISO date string)
  ip: string (optional, for future use)
}
```

### Files Created/Modified

#### New Files:

1. **`src/lib/resumeAnalytics.js`**

   - Functions to fetch and analyze resume view data
   - Date range filtering
   - Summary statistics calculation

2. **`src/hooks/useResumeAnalyticsData.js`**

   - React hooks for analytics data
   - Loading states and error handling
   - Refresh functionality

3. **`src/hooks/useQuickAnalytics.js`**

   - Lightweight hook for dashboard summary
   - Today/yesterday comparison
   - Recent activity stats

4. **`src/app/admin/analytics/page.js`**
   - Complete analytics dashboard page
   - Interactive charts and tables
   - Export functionality

#### Modified Files:

1. **`src/app/admin/dashboard/page.js`**
   - Added analytics card with link to detailed view
   - Integrated quick stats in place of "Recent Activity"
   - Real-time analytics preview

## Analytics Functions

### Core Functions (`resumeAnalytics.js`)

```javascript
// Get all resume views with timestamps
getResumeViews();

// Filter views by date range
getResumeViewsByDateRange(startDate, endDate);

// Get comprehensive analytics summary
getResumeAnalyticsSummary();
```

### Summary Data Structure

```javascript
{
  totalViews: number,
  uniqueEmails: number,
  viewsLast30Days: number,
  sourceStats: { [source]: count },
  dailyViews: { [date]: count },
  latestViews: Array<ViewRecord>,
  topSources: Array<[source, count]>
}
```

## Traffic Sources Tracked

The system recognizes and categorizes these traffic sources:

- **💼 LinkedIn** - Professional network referrals
- **👨‍💻 GitHub** - Developer platform referrals
- **🌐 Website** - Direct website/portfolio visits
- **📺 YouTube** - Video platform referrals
- **🤖 Reddit** - Social media referrals
- **👥 Friends** - Personal referrals
- **🏢 Colleague** - Professional referrals
- **🔗 Other** - Miscellaneous sources

## Visual Components

### Daily Views Chart

- 7-day trend visualization
- Proportional bar chart
- Color-coded with theme colors

### Source Distribution

- Horizontal bar chart with percentages
- Source-specific emoji indicators
- Sorted by popularity

### Recent Views Table

- Sortable by date, email, source
- Hover effects for better UX
- Responsive design

## Export Features

### JSON Export

- Complete analytics data
- Structured format for analysis
- Includes all calculated statistics

### CSV Export

- Raw view data for spreadsheet analysis
- Headers: Date, Email, Source, Timestamp
- Compatible with Excel/Google Sheets

## Security & Privacy

### Data Protection

- Email addresses stored in lowercase
- No sensitive personal information collected
- User agent strings for analytics only
- Optional IP tracking (disabled by default)

### Access Control

- Admin authentication required
- Secure Firebase Firestore rules
- Protected routes with auth checks

## Usage Instructions

### Accessing Analytics

1. Login to admin dashboard (`/admin/login`)
2. Click "Resume Analytics" card on dashboard
3. View comprehensive analytics at `/admin/analytics`

### Quick Dashboard Stats

- View real-time summary on main dashboard
- Today's views highlighted in green
- Click "View detailed analytics →" for full view

### Exporting Data

1. Go to analytics page
2. Scroll to "Export Data" section
3. Choose JSON (for developers) or CSV (for analysis)
4. File downloads automatically

### Refreshing Data

- Click "Refresh Data" button on analytics page
- Data automatically updates on page load
- Quick stats refresh when dashboard loads

## Performance Considerations

### Caching Strategy

- Analytics data cached in React state
- Manual refresh when needed
- Optimized queries with Firestore indexing

### Query Optimization

- Ordered queries for better performance
- Date range filtering for large datasets
- Limited result sets for UI display

### Loading States

- Skeleton loading for better UX
- Error boundaries for failed requests
- Graceful fallbacks for missing data

## Future Enhancements

### Potential Additions

- **Geographic Analytics**: Location-based view tracking
- **Device Analytics**: Mobile vs desktop breakdown
- **Time Analytics**: Peak viewing hours/days
- **Conversion Tracking**: Email to job application funnel
- **A/B Testing**: Different resume versions performance
- **Email Integration**: Automated follow-up capabilities

### Scalability Considerations

- Data archiving for old views
- Pagination for large datasets
- Real-time updates with Firestore listeners
- Advanced filtering and search capabilities

This analytics system provides comprehensive insights into your resume's performance while maintaining user privacy and providing actionable data for career development and networking optimization.
