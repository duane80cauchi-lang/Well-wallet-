# Multi-Timezone Digital Clock

A beautiful, responsive web application that displays the current time in multiple time zones simultaneously. Perfect for tracking time across different countries and managing global schedules.

## Features

✨ **Key Features:**
- 🕐 Real-time digital clock display for multiple time zones
- 🌍 Support for all IANA time zones (400+ zones)
- 🎨 Beautiful gradient UI with smooth animations
- 📱 Fully responsive design (desktop, tablet, mobile)
- 💾 Persistent storage using localStorage
- 🏙️ 10 preset city buttons for quick access
- 🚀 Custom timezone input validation
- 🔄 Updates every second automatically
- 🗑️ Easy remove button for each timezone
- 🌐 Country flags for visual identification

## Quick Start

### Option 1: Open Directly in Browser
1. Navigate to the `clock/` directory
2. Open `index.html` in your web browser
3. Start adding time zones!

### Option 2: Using a Local Server
```bash
cd clock
python -m http.server 8000
# Visit http://localhost:8000 in your browser
```

## How to Use

### Adding a Timezone
1. **Using Quick Add Buttons:** Click any city button (New York, London, Tokyo, etc.)
2. **Custom Timezone:** 
   - Type a timezone code (e.g., `America/New_York`, `Europe/Paris`)
   - Press Enter or click "Add Timezone"
   - Valid timezone codes follow IANA format: `Region/City`

### Removing a Timezone
- Click the "Remove" button on any clock card

### Finding Valid Timezone Names
Common timezone format examples:
- **Americas:** `America/New_York`, `America/Los_Angeles`, `America/Chicago`
- **Europe:** `Europe/London`, `Europe/Paris`, `Europe/Berlin`, `Europe/Moscow`
- **Asia:** `Asia/Tokyo`, `Asia/Shanghai`, `Asia/Hong_Kong`, `Asia/Bangkok`
- **Australia:** `Australia/Sydney`, `Australia/Melbourne`, `Australia/Perth`
- **Africa:** `Africa/Cairo`, `Africa/Johannesburg`
- **Pacific:** `Pacific/Auckland`, `Pacific/Fiji`, `Pacific/Honolulu`

**Full list:** [IANA Time Zone Database](https://en.wikipedia.org/wiki/List_of_tz_database_time_zones)

## Features Explained

### Real-Time Updates
- Clock updates every second automatically
- Shows current time, date, and UTC offset for each timezone

### Data Persistence
- Selected timezones are saved in browser's localStorage
- Your clock configuration persists across browser sessions

### Responsive Design
- Works seamlessly on desktop, tablet, and mobile devices
- Adaptive grid layout that adjusts to screen size
- Touch-friendly buttons and inputs

### Visual Design
- Gradient purple background
- Clean card-based layout
- Smooth hover animations
- Country flag emojis for timezone identification
- Color-coded time display

## Preset Timezones

Quick-access buttons for popular timezones:
- 🇺🇸 New York (America/New_York)
- 🇬🇧 London (Europe/London)
- 🇫🇷 Paris (Europe/Paris)
- 🇯🇵 Tokyo (Asia/Tokyo)
- 🇨🇳 Shanghai (Asia/Shanghai)
- 🇦🇺 Sydney (Australia/Sydney)
- 🇦🇪 Dubai (Asia/Dubai)
- 🇸🇬 Singapore (Asia/Singapore)
- 🇺🇸 Los Angeles (America/Los_Angeles)
- 🇮🇳 India (Asia/Kolkata)

## File Structure

```
clock/
├── index.html      # HTML structure
├── styles.css      # Styling and layout
├── script.js       # JavaScript functionality
└── README.md       # This file
```

## Technical Details

### Technologies Used
- **HTML5:** Semantic markup
- **CSS3:** Flexbox, Grid, Gradients, Animations
- **JavaScript (ES6+):** Intl API for timezone handling
- **LocalStorage API:** For data persistence

### Browser Compatibility
- Chrome/Edge (Latest)
- Firefox (Latest)
- Safari (Latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

### Key JavaScript Functions

| Function | Purpose |
|----------|---------|
| `addTimezone()` | Add a new timezone to the clock |
| `removeTimezone()` | Remove a timezone from display |
| `updateAllTimes()` | Update all clock displays (called every second) |
| `getTimeInTimezone()` | Get formatted time for a specific timezone |
| `getDateInTimezone()` | Get formatted date for a specific timezone |
| `loadTimezones()` | Load saved timezones from localStorage |
| `saveTimezones()` | Save current timezones to localStorage |

## Tips & Tricks

### Manage Global Teams
Perfect for remote teams across different time zones. Add each team member's timezone for quick reference during meetings.

### Travel Planning
Add timezones of your travel destinations to stay aware of local time while planning.

### Business Hours
Monitor business hours in multiple countries - great for customer support and global operations.

### Error Handling
- Invalid timezone inputs show an error message
- Duplicate timezone additions are prevented
- Helpful error messages guide the user

## Customization

### Adding More Preset Buttons
Edit `index.html` and add new buttons in the `.preset-timezones` section:
```html
<button class="preset-btn" data-tz="Your/Timezone">Label</button>
```

### Changing Colors
Modify the CSS gradient in `styles.css`:
```css
background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
```

### Adjusting Update Frequency
In `script.js`, change the interval (currently 1000ms = 1 second):
```javascript
setInterval(updateAllTimes, 1000); // Change 1000 to desired milliseconds
```

## Known Limitations

- Requires JavaScript enabled
- Uses browser localStorage (limited by browser storage policies)
- Daylight Saving Time changes handled automatically by the browser

## Troubleshooting

### Clock not updating?
- Ensure JavaScript is enabled
- Check browser console for errors (F12)
- Refresh the page

### Timezone not found?
- Verify the exact IANA timezone name
- Use the format: `Region/City` (case-sensitive)
- Check the [IANA database](https://en.wikipedia.org/wiki/List_of_tz_database_time_zones)

### Data not persisting?
- Check if localStorage is enabled
- Clear browser cache and try again
- Private/Incognito mode may not persist data

## Future Enhancements

Potential features to add:
- ⏰ Alarm functionality for specific timezones
- 📊 Meeting planner showing all timezones
- 🎯 Timezone converter
- 🌙 Dark mode toggle
- 📤 Export/Import timezone presets
- 🔔 Notifications for specific times
- 📍 Location-based timezone detection

## License

Open source - feel free to use, modify, and distribute!

## Support

Found a bug or have a suggestion?
- Check existing issues on GitHub
- Create a new issue with details
- Submit a pull request with improvements

---

**Enjoy tracking time across the globe!** 🌍🕐
