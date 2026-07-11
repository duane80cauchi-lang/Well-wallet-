// Joke API configuration
const JOKE_API_BASE = 'https://v2.jokeapi.dev/joke/';

// Store joke history and stats
let jokeHistory = [];
let jokeCount = 0;

// Joke type mappings
const jokeTypeMap = {
    'any': 'Any,Miscellaneous,Knox-Knock,Programming',
    'general': 'General',
    'knock-knock': 'Knock-Knock',
    'programming': 'Programming'
};

let currentJoke = null;

// Load data from localStorage
function loadData() {
    const saved = localStorage.getItem('jokeData');
    if (saved) {
        const data = JSON.parse(saved);
        jokeHistory = data.history || [];
        jokeCount = data.count || 0;
        updateUI();
    }
}

// Save data to localStorage
function saveData() {
    localStorage.setItem('jokeData', JSON.stringify({
        history: jokeHistory,
        count: jokeCount
    }));
}

// Format time
function getTime() {
    const now = new Date();
    return now.toLocaleTimeString('en-US', { 
        hour: '2-digit', 
        minute: '2-digit',
        hour12: true 
    });
}

// Fetch joke from API
async function fetchJoke() {
    const jokeType = document.getElementById('jokeType').value;
    const category = jokeTypeMap[jokeType];
    
    const jokeDisplay = document.getElementById('jokeDisplay');
    const getJokeBtn = document.getElementById('getJokeBtn');
    
    // Show loading state
    jokeDisplay.innerHTML = '<div class="spinner"></div>';
    getJokeBtn.disabled = true;
    
    try {
        const url = `${JOKE_API_BASE}${category}?type=single`;
        const response = await fetch(url);
        
        if (!response.ok) {
            throw new Error('Failed to fetch joke');
        }
        
        const data = await response.json();
        
        if (data.error) {
            throw new Error('Could not retrieve a joke');
        }
        
        currentJoke = data;
        displayJoke(data);
        addToHistory(data);
        jokeCount++;
        updateStats();
        saveData();
        
    } catch (error) {
        showError(`Error fetching joke: ${error.message}`);
        console.error('Joke API Error:', error);
    } finally {
        getJokeBtn.disabled = false;
    }
}

// Display joke on screen
function displayJoke(joke) {
    const jokeDisplay = document.getElementById('jokeDisplay');
    
    let jokeHTML = '';
    
    if (joke.type === 'single') {
        // Single joke
        jokeHTML = `<p>${joke.joke}</p>`;
    } else if (joke.type === 'twopart') {
        // Two-part joke (setup and delivery)
        jokeHTML = `
            <div>
                <p class="joke-setup">${joke.setup}</p>
                <p class="joke-separator">⋮</p>
                <p class="joke-punchline">${joke.delivery}</p>
            </div>
        `;
    }
    
    jokeDisplay.innerHTML = jokeHTML;
    
    // Enable copy and share buttons
    document.getElementById('copyBtn').disabled = false;
    document.getElementById('shareBtn').disabled = false;
}

// Add joke to history
function addToHistory(joke) {
    const jokeText = joke.type === 'single' 
        ? joke.joke 
        : `${joke.setup} ... ${joke.delivery}`;
    
    const historyItem = {
        text: jokeText,
        time: getTime(),
        type: joke.category || 'Unknown'
    };
    
    // Keep only last 20 jokes
    jokeHistory.unshift(historyItem);
    if (jokeHistory.length > 20) {
        jokeHistory.pop();
    }
    
    updateHistory();
}

// Update history display
function updateHistory() {
    const historyList = document.getElementById('historyList');
    const clearBtn = document.getElementById('clearHistoryBtn');
    
    if (jokeHistory.length === 0) {
        historyList.innerHTML = '<li class="empty-history">No jokes yet. Generate one to start!</li>';
        clearBtn.style.display = 'none';
    } else {
        historyList.innerHTML = jokeHistory.map((item, index) => `
            <li onclick="loadHistoryJoke(${index})" title="Click to load this joke">
                <span>${item.text.substring(0, 60)}${item.text.length > 60 ? '...' : ''}</span>
                <span class="history-timestamp">${item.time} • ${item.type}</span>
            </li>
        `).join('');
        clearBtn.style.display = 'block';
    }
}

// Load joke from history
function loadHistoryJoke(index) {
    if (jokeHistory[index]) {
        const item = jokeHistory[index];
        // Note: We're just displaying the text, not the full object
        // For actual reload functionality, we'd need to store full joke data
        const jokeDisplay = document.getElementById('jokeDisplay');
        jokeDisplay.innerHTML = `<p>${item.text}</p>`;
        document.getElementById('copyBtn').disabled = false;
        document.getElementById('shareBtn').disabled = false;
    }
}

// Update statistics
function updateStats() {
    document.getElementById('jokeCount').textContent = jokeCount;
    const jokeType = document.getElementById('jokeType').value;
    const typeLabel = document.querySelector(`option[value="${jokeType}"]`).textContent;
    document.getElementById('currentType').textContent = typeLabel;
}

// Copy joke to clipboard
async function copyJoke() {
    if (!currentJoke) return;
    
    let jokeText = '';
    if (currentJoke.type === 'single') {
        jokeText = currentJoke.joke;
    } else if (currentJoke.type === 'twopart') {
        jokeText = `${currentJoke.setup}\n\n${currentJoke.delivery}`;
    }
    
    try {
        await navigator.clipboard.writeText(jokeText);
        showSuccess('Joke copied to clipboard! 📋');
    } catch (error) {
        showError('Failed to copy joke');
        console.error('Copy error:', error);
    }
}

// Share joke
function shareJoke() {
    if (!currentJoke) return;
    
    let jokeText = '';
    if (currentJoke.type === 'single') {
        jokeText = currentJoke.joke;
    } else if (currentJoke.type === 'twopart') {
        jokeText = `${currentJoke.setup}\n\n${currentJoke.delivery}`;
    }
    
    // Check if Web Share API is available
    if (navigator.share) {
        navigator.share({
            title: '😂 Check out this joke!',
            text: jokeText,
            url: window.location.href
        }).catch(err => console.log('Share cancelled:', err));
    } else {
        // Fallback: copy to clipboard and show message
        navigator.clipboard.writeText(jokeText).then(() => {
            showSuccess('Joke copied! Share it wherever you like. 🎉');
        }).catch(() => {
            showError('Unable to share joke');
        });
    }
}

// Clear history
function clearHistory() {
    if (confirm('Are you sure you want to clear all joke history?')) {
        jokeHistory = [];
        updateHistory();
        saveData();
        showSuccess('History cleared! 🗑️');
    }
}

// Show success message
function showSuccess(message) {
    showNotification(message, 'success');
}

// Show error message
function showError(message) {
    showNotification(message, 'error');
}

// Show notification
function showNotification(message, type) {
    const jokeCard = document.querySelector('.joke-card');
    const messageEl = document.createElement('div');
    messageEl.className = `${type}-message`;
    messageEl.textContent = message;
    
    jokeCard.insertBefore(messageEl, jokeCard.firstChild);
    
    // Auto-remove after 3 seconds
    setTimeout(() => {
        messageEl.remove();
    }, 3000);
}

// Update UI
function updateUI() {
    updateHistory();
    updateStats();
}

// Event listeners
document.addEventListener('DOMContentLoaded', () => {
    loadData();
    
    // Get Joke button
    document.getElementById('getJokeBtn').addEventListener('click', fetchJoke);
    
    // Copy button
    document.getElementById('copyBtn').addEventListener('click', copyJoke);
    
    // Share button
    document.getElementById('shareBtn').addEventListener('click', shareJoke);
    
    // Clear History button
    document.getElementById('clearHistoryBtn').addEventListener('click', clearHistory);
    
    // Allow Enter key to fetch joke
    document.getElementById('jokeType').addEventListener('change', () => {
        updateStats();
    });
    
    // Keyboard shortcuts
    document.addEventListener('keydown', (e) => {
        // Spacebar to fetch joke (when not in an input field)
        if (e.code === 'Space' && e.target === document.body) {
            e.preventDefault();
            document.getElementById('getJokeBtn').click();
        }
    });
});
