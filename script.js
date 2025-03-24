document.addEventListener('DOMContentLoaded', function() {
    const trackersList = document.getElementById('trackersList');
    const copyAllBtn = document.getElementById('copyAllBtn');
    const refreshBtn = document.getElementById('refreshBtn');
    const loadingIndicator = document.getElementById('loadingIndicator');
    const trackerContent = document.getElementById('trackerContent');
    const updateTime = document.getElementById('updateTime');
    const copiedToast = document.getElementById('copiedToast');
    const customTrackers = document.getElementById('customTrackers');
    const addCustomTrackersBtn = document.getElementById('addCustomTrackersBtn');
    const trackerCounter = document.getElementById('trackerCounter');
    const currentYearElement = document.getElementById('currentYear');
    
    // Set the current year for the copyright text
    currentYearElement.textContent = new Date().getFullYear();
    
    // Function to check if a string is a valid tracker URL
    function isValidTracker(url) {
        return url.trim() !== '' && 
               !url.includes('404: Not Found') &&
               !url.startsWith('<!DOCTYPE') && 
               !url.startsWith('<html') && 
               !url.startsWith('<head') && 
               !url.startsWith('<title') && 
               !url.startsWith('<body') && 
               !url.startsWith('<div') && 
               !url.startsWith('<meta') && 
               !url.startsWith('<link') && 
               !url.startsWith('<script') && 
               !url.startsWith('<style') && 
               !url.includes('failure reason') &&
               (url.startsWith('udp://') || 
                url.startsWith('http://') || 
                url.startsWith('https://') || 
                url.startsWith('ws://') || 
                url.startsWith('wss://'));
    }
    
    // Function to update tracker counter
    function updateTrackerCounter() {
        const count = trackersList.querySelectorAll('.tracker-item').length;
        trackerCounter.textContent = count;
        
        if (count > 0) {
            trackerCounter.classList.remove('d-none');
        } else {
            trackerCounter.classList.add('d-none');
        }
    }
    
    // Function to add custom trackers
    function addCustomTrackers() {
        const text = customTrackers.value;
        let newTrackers = [];
        
        // Process both comma-separated and new lines
        if (text.includes(',')) {
            newTrackers = text.split(',');
        } else {
            newTrackers = text.split('\n');
        }
        
        let validTrackers = 0;
        
        newTrackers.forEach(tracker => {
            tracker = tracker.trim();
            if (isValidTracker(tracker)) {
                const existingTracker = Array.from(trackersList.querySelectorAll('.tracker-item'))
                    .find(item => item.textContent === tracker);
                    
                if (!existingTracker) {
                    const trackerItem = document.createElement('div');
                    trackerItem.className = 'tracker-item';
                    trackerItem.textContent = tracker;
                    trackersList.appendChild(trackerItem);
                    validTrackers++;
                }
            }
        });
        
        // Show a notification about the number of added trackers
        if (validTrackers > 0) {
            const now = new Date();
            updateTime.textContent = `Last updated: ${now.toLocaleTimeString()} ${now.toLocaleDateString()} (${validTrackers} manually added)`;
            
            // Clear textarea
            customTrackers.value = '';
            
            // Update tracker counter
            updateTrackerCounter();
            
            // Show toast notification
            copiedToast.innerHTML = `<i class="bi bi-check-circle-fill me-2"></i>${validTrackers} tracker(s) added!`;
            copiedToast.style.display = 'block';
            setTimeout(() => {
                copiedToast.style.display = 'none';
            }, 2000);
        } else {
            // Show toast notification when no valid trackers
            copiedToast.innerHTML = '<i class="bi bi-exclamation-circle-fill me-2"></i>No valid trackers found!';
            copiedToast.style.display = 'block';
            setTimeout(() => {
                copiedToast.style.display = 'none';
            }, 2000);
        }
    }
    
    // Event listener for adding custom trackers
    addCustomTrackersBtn.addEventListener('click', addCustomTrackers);
    
    // Enter key for adding custom trackers
    customTrackers.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' && e.ctrlKey) {
            addCustomTrackers();
        }
    });
    
    // Function to fetch trackers
    async function fetchTrackers() {
        loadingIndicator.style.display = 'block';
        trackerContent.style.display = 'none';
        
        try {
            // Sources for trackers
            const sources = [
                'https://ngosang.github.io/trackerslist/trackers_best.txt',
                'https://raw.githubusercontent.com/XIU2/TrackersListCollection/master/best.txt',
                'https://raw.githubusercontent.com/DeSireFire/animeTrackerList/master/best.txt',
                'https://raw.githubusercontent.com/ngosang/trackerslist/master/trackers_all.txt',
                'https://raw.githubusercontent.com/XIU2/TrackersListCollection/master/all.txt',
                'https://raw.githubusercontent.com/CHEF-KOCH/RasPi-List/master/ips.txt',
                'https://newtrackon.com/api/stable',
                'https://trackerslist.com/all.txt',
                'https://raw.githubusercontent.com/hezhijie0327/Trackerslist/main/trackerslist.txt',
                'https://raw.githubusercontent.com/abumalick/trackerslist/master/best.txt',
                'https://raw.githubusercontent.com/ngosang/trackerslist/master/trackers_all_udp.txt',
                'https://raw.githubusercontent.com/ngosang/trackerslist/master/trackers_best_ip.txt',
                'https://raw.githubusercontent.com/XIU2/TrackersListCollection/master/best_aria2.txt',
                'https://raw.githubusercontent.com/WDaan/trackerslist/master/trackers.txt',
                'https://opentrackr.org/announce',
                'https://raw.githubusercontent.com/nkoneill/trackerslist/master/TrackerList.txt',
                'https://torrentgalaxy.to/announcetest',
                'https://raw.githubusercontent.com/torrentykr/NYH/main/tracker.txt',
                'https://raw.githubusercontent.com/ngosang/trackerslist/master/trackers_all_http.txt',
                'https://raw.githubusercontent.com/ngosang/trackerslist/master/trackers_all_https.txt',
                'https://raw.githubusercontent.com/ngosang/trackerslist/master/trackers_all_ws.txt',
                'https://raw.githubusercontent.com/divideee/trackerslist/release/all.txt',
                'https://raw.githubusercontent.com/Jorman/trackerslist/master/trackers.txt',
                'https://tracker.bt4g.com/announce',
                'https://1337.abcvg.info/announce',
                'https://tracker.foreverpirates.co/announce',
                'https://tracker.tamersunion.org/announce',
                'https://tracker.nitrix.me/announce',
                'https://tracker.lelux.fi/announce',
                'https://tracker.blazing.de/announce'
            ];
            
            let allTrackers = new Set();
            
            // Parallel fetching of trackers from all sources
            await Promise.all(sources.map(async (source) => {
                try {
                    const response = await fetch('https://api.allorigins.win/raw?url=' + encodeURIComponent(source));
                    if (response.ok) {
                        const text = await response.text();
                        const trackers = text.split('\n')
                            .filter(line => isValidTracker(line.trim()))
                            .map(line => line.trim());
                        trackers.forEach(tracker => allTrackers.add(tracker));
                    }
                } catch (error) {
                    console.error(`Error fetching from ${source}:`, error);
                }
            }));
            
            // Display trackers in the list
            trackersList.innerHTML = '';
            const trackersArray = Array.from(allTrackers);
            
            trackersArray.forEach((tracker, index) => {
                const trackerItem = document.createElement('div');
                trackerItem.className = 'tracker-item';
                trackerItem.textContent = tracker;
                trackersList.appendChild(trackerItem);
            });
            
            // Update the time
            const now = new Date();
            updateTime.textContent = `Last updated: ${now.toLocaleTimeString()} ${now.toLocaleDateString()}`;
            
            // Update tracker counter
            updateTrackerCounter();
            
            loadingIndicator.style.display = 'none';
            trackerContent.style.display = 'block';
        } catch (error) {
            console.error('Error fetching trackers:', error);
            trackersList.innerHTML = '<div class="alert alert-danger">Error fetching trackers. Please try again later.</div>';
            
            loadingIndicator.style.display = 'none';
            trackerContent.style.display = 'block';
        }
    }
    
    // Copy all trackers to clipboard
    copyAllBtn.addEventListener('click', () => {
        const trackers = Array.from(trackersList.querySelectorAll('.tracker-item'))
            .map(item => item.textContent)
            .join('\n');
        
        navigator.clipboard.writeText(trackers).then(() => {
            // Show toast notification
            copiedToast.innerHTML = '<i class="bi bi-clipboard-check-fill me-2"></i>Copied to clipboard!';
            copiedToast.style.display = 'block';
            setTimeout(() => {
                copiedToast.style.display = 'none';
            }, 2000);
        });
    });
    
    // Refresh trackers
    refreshBtn.addEventListener('click', fetchTrackers);
    
    // Initial fetching of trackers
    fetchTrackers();
}); 