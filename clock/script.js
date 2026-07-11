// Timezone data with country flags
const timezoneFlags = {
    'America/New_York': '🇺🇸',
    'America/Los_Angeles': '🇺🇸',
    'America/Chicago': '🇺🇸',
    'America/Denver': '🇺🇸',
    'America/Anchorage': '🇺🇸',
    'Pacific/Honolulu': '🇺🇸',
    'Europe/London': '🇬🇧',
    'Europe/Paris': '🇫🇷',
    'Europe/Berlin': '🇩🇪',
    'Europe/Madrid': '🇪🇸',
    'Europe/Rome': '🇮🇹',
    'Europe/Amsterdam': '🇳🇱',
    'Europe/Brussels': '🇧🇪',
    'Europe/Vienna': '🇦🇹',
    'Europe/Prague': '🇨🇿',
    'Europe/Istanbul': '🇹🇷',
    'Europe/Moscow': '🇷🇺',
    'Africa/Cairo': '🇪🇬',
    'Africa/Johannesburg': '🇿🇦',
    'Asia/Dubai': '🇦🇪',
    'Asia/Kolkata': '🇮🇳',
    'Asia/Bangkok': '🇹🇭',
    'Asia/Hong_Kong': '🇭🇰',
    'Asia/Shanghai': '🇨🇳',
    'Asia/Singapore': '🇸🇬',
    'Asia/Tokyo': '🇯🇵',
    'Asia/Seoul': '🇰🇷',
    'Australia/Sydney': '🇦🇺',
    'Australia/Melbourne': '🇦🇺',
    'Australia/Perth': '🇦🇺',
    'Pacific/Auckland': '🇳🇿',
    'Pacific/Fiji': '🇫🇯',
};

// Store active timezones in localStorage
let activeTimezones = [];

// Load timezones from localStorage
function loadTimezones() {
    const saved = localStorage.getItem('activeTimezones');
    if (saved) {
        activeTimezones = JSON.parse(saved);
    }
}

// Save timezones to localStorage
function saveTimezones() {
    localStorage.setItem('activeTimezones', JSON.stringify(activeTimezones));
}

// Get flag emoji for timezone
function getFlag(timezone) {
    return timezoneFlags[timezone] || '🌍';
}

// Format timezone offset
function getTimezoneOffset(timezone) {
    const now = new Date();
    const formatter = new Intl.DateTimeFormat('en-US', {
        timeZone: timezone,
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
    });

    const tzTime = new Date(formatter.format(now));
    const utcTime = new Date(now.toLocaleString('en-US', { timeZone: 'UTC' }));
    const offset = (tzTime - utcTime) / (1000 * 60 * 60);
    
    const sign = offset >= 0 ? '+' : '-';
    const hours = String(Math.floor(Math.abs(offset))).padStart(2, '0');
    const minutes = String(Math.round((Math.abs(offset) % 1) * 60)).padStart(2, '0');
    
    return `UTC ${sign}${hours}:${minutes}`;
}

// Format time for display
function getTimeInTimezone(timezone) {
    const now = new Date();
    const formatter = new Intl.DateTimeFormat('en-US', {
        timeZone: timezone,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
    });
    return formatter.format(now);
}

// Format date for display
function getDateInTimezone(timezone) {
    const now = new Date();
    const formatter = new Intl.DateTimeFormat('en-US', {
        timeZone: timezone,
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
    return formatter.format(now);
}

// Create a clock card element
function createClockCard(timezone) {
    const card = document.createElement('div');
    card.className = 'clock-card';
    card.id = `clock-${timezone}`;

    const flag = getFlag(timezone);
    const timezoneName = timezone.replace(/_/g, ' ');
    
    card.innerHTML = `
        <div class="timezone-name">
            <span><span class="flag">${flag}</span>${timezoneName}</span>
            <button class="remove-btn" onclick="removeTimezone('${timezone}')">Remove</button>
        </div>
        <div class="time-display" id="time-${timezone}">--:--:--</div>
        <div class="date-display" id="date-${timezone}">Loading...</div>
        <div class="timezone-info">
            <span class="offset" id="offset-${timezone}">UTC</span>
        </div>
    `;

    return card;
}

// Add a new timezone
function addTimezone(timezone) {
    // Validate timezone
    try {
        new Intl.DateTimeFormat('en-US', { timeZone: timezone });
    } catch (e) {
        showError(`Invalid timezone: ${timezone}`);
        return;
    }

    // Check if timezone already exists
    if (activeTimezones.includes(timezone)) {
        showError(`${timezone} is already added!`);
        return;
    }

    // Add timezone
    activeTimezones.push(timezone);
    saveTimezones();
    
    const container = document.getElementById('clocks-container');
    container.appendChild(createClockCard(timezone));
    
    // Update the time immediately
    updateTime(timezone);
    
    // Clear input
    document.getElementById('timezone-input').value = '';
    
    // Remove error message if any
    const errorMsg = document.querySelector('.error-message');
    if (errorMsg) errorMsg.remove();
}

// Remove a timezone
function removeTimezone(timezone) {
    activeTimezones = activeTimezones.filter(tz => tz !== timezone);
    saveTimezones();
    
    const card = document.getElementById(`clock-${timezone}`);
    if (card) card.remove();
    
    // Show message if no timezones left
    if (activeTimezones.length === 0) {
        document.getElementById('clocks-container').innerHTML = 
            '<div class="no-clocks-message">No timezones added yet. Add one to get started!</div>';
    }
}

// Update time for a specific timezone
function updateTime(timezone) {
    const timeEl = document.getElementById(`time-${timezone}`);
    const dateEl = document.getElementById(`date-${timezone}`);
    const offsetEl = document.getElementById(`offset-${timezone}`);
    
    if (timeEl) timeEl.textContent = getTimeInTimezone(timezone);
    if (dateEl) dateEl.textContent = getDateInTimezone(timezone);
    if (offsetEl) offsetEl.textContent = getTimezoneOffset(timezone);
}

// Update all clock times
function updateAllTimes() {
    activeTimezones.forEach(timezone => {
        updateTime(timezone);
    });
}

// Show error message
function showError(message) {
    let errorEl = document.querySelector('.error-message');
    if (!errorEl) {
        errorEl = document.createElement('div');
        errorEl.className = 'error-message';
        document.querySelector('.timezone-selector').parentElement.insertBefore(errorEl, document.querySelector('.timezone-selector'));
    }
    errorEl.textContent = message;
    
    // Auto-remove after 3 seconds
    setTimeout(() => {
        if (errorEl && errorEl.parentElement) {
            errorEl.remove();
        }
    }, 3000);
}

// Initialize the app
function init() {
    loadTimezones();
    
    const container = document.getElementById('clocks-container');
    
    if (activeTimezones.length === 0) {
        container.innerHTML = '<div class="no-clocks-message">No timezones added yet. Add one to get started!</div>';
    } else {
        activeTimezones.forEach(timezone => {
            container.appendChild(createClockCard(timezone));
        });
    }
    
    // Update times immediately and then every second
    updateAllTimes();
    setInterval(updateAllTimes, 1000);
    
    // Add event listeners
    document.getElementById('add-btn').addEventListener('click', () => {
        const timezone = document.getElementById('timezone-input').value.trim();
        if (timezone) {
            addTimezone(timezone);
        } else {
            showError('Please enter a timezone');
        }
    });
    
    // Add Enter key support
    document.getElementById('timezone-input').addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            document.getElementById('add-btn').click();
        }
    });
    
    // Add preset button listeners
    document.querySelectorAll('.preset-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const timezone = btn.dataset.tz;
            addTimezone(timezone);
        });
    });
}

// Start the app when DOM is loaded
document.addEventListener('DOMContentLoaded', init);
