# VulcanoTracker

VulcanoTracker is a user-friendly web application that collects and manages a comprehensive collection of torrent trackers to optimize download speeds.

![VulcanoTracker](https://img.shields.io/badge/VulcanoTracker-1.0-orange)
![Bootstrap](https://img.shields.io/badge/Bootstrap-5.3.2-purple)
![License](https://img.shields.io/badge/License-MIT-blue)

## Features

- **Automatically updated tracker list**: Collects and combines trackers from multiple sources to provide a comprehensive collection.
- **Advanced filtering**: Automatically filters out invalid trackers, including non-working URLs and incorrect formats.
- **Manual additions**: Ability to add your own trackers through a user-friendly interface.
- **One-click copying**: Copy all trackers to your clipboard with one click to easily add them to your torrent client.
- **Responsive interface**: Fully responsive design that works on both desktop and mobile devices.
- **Real-time updates**: Displays when the list was last updated.
- **Tracker counter**: Shows the number of active trackers in the list.

## Installation

VulcanoTracker is a client-side web application that doesn't require server-side installation. You can use the project in various ways:

### Local use

1. Download or clone the repository:
   ```
   git clone https://github.com/your-username/VulcanoTracker.git
   ```

2. Open `index.html` in your web browser.

### Hosting on a web server

Simply upload the following files to your web server:
- `index.html`
- `/css/styles.css`
- `/js/app.js`

## Usage

1. **View trackers**: Open the application to automatically load the latest trackers.
2. **Refresh**: Click the "Refresh" button to fetch the latest trackers from the sources.
3. **Add your own trackers**:
   - Enter your trackers in the text box (separated by commas or new lines).
   - Click "Add" or use Ctrl+Enter to add them to the list.
4. **Copy all trackers**: Click "Copy All" to copy all trackers to your clipboard.

## Tracker Formats

VulcanoTracker supports the following tracker formats:
- UDP: `udp://...`
- HTTP: `http://...`
- HTTPS: `https://...`
- WebSocket: `ws://...`
- Secure WebSocket: `wss://...`

## Supported Torrent Clients

The trackers from VulcanoTracker can be used with various torrent clients, including:
- qBittorrent
- Deluge
- Transmission
- µTorrent
- BitTorrent
- rTorrent
- Aria2

## Contributing

Contributions are welcome! If you have a suggestion for new features, improvements, or bug fixes, feel free to:
1. Create an issue
2. Submit a pull request

## Sources

VulcanoTracker retrieves trackers from various sources, including:
- ngosang/trackerslist
- XIU2/TrackersListCollection
- DeSireFire/animeTrackerList
- newtrackon.com
- trackerslist.com
- And many others...

## License

This project is licensed under the MIT license. 