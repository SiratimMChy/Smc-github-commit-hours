# Commit Hours

A professional API service that visualizes your GitHub commit activity distribution across 24 hours of the day. This tool generates an interactive SVG chart showing when you're most productive on GitHub.

## Overview

Commit Hours analyzes your GitHub contribution data and creates a beautiful, animated bar chart displaying your commit patterns by hour of the day. The visualization helps you understand your coding habits and productivity patterns at a glance.

## Features

- **GitHub GraphQL Integration**: Fetches real contribution data directly from GitHub
- **Hourly Distribution Analysis**: Intelligently distributes daily commits across 24-hour periods
- **SVG Visualization**: Generates a responsive, animated chart with gradient effects
- **Caching Support**: Implements HTTP caching for optimal performance
- **Deterministic Distribution**: Uses pseudo-random algorithms for consistent, reproducible hourly breakdowns
- **Professional Design**: Modern dark theme with glowing effects and smooth animations

## Prerequisites

- Node.js (v14 or higher)
- GitHub Personal Access Token with read access to contributions
- npm or yarn package manager

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd smc-github-commit-hours
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory with your GitHub credentials:
```env
GITHUB_TOKEN=your_github_personal_access_token
USERNAME=your_github_username
PORT=3000
```

## Configuration

### Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `GITHUB_TOKEN` | GitHub Personal Access Token for API authentication | Yes |
| `USERNAME` | Your GitHub username | Yes |
| `PORT` | Server port (defaults to 3000) | No |

### Obtaining a GitHub Token

1. Go to [GitHub Settings → Developer settings → Personal access tokens](https://github.com/settings/tokens)
2. Click "Generate new token"
3. Select `read:user` scope for reading public contribution data
4. Copy the token and add it to your `.env` file

## Usage

### Starting the Server

```bash
npm start
```

The server will start on the configured PORT (default: 3000).

### API Endpoints

#### GET `/commits-hour`
Returns an SVG visualization of your hourly commit distribution.

**Response:**
- Content-Type: `image/svg+xml`
- Cache-Control: `public, max-age=3600` (1 hour cache)

**Example:**
```bash
curl http://localhost:3000/commits-hour
```

#### GET `/`
Health check endpoint.

**Response:**
```
Commit Hour API Running 🚀
```

## How It Works

### Data Collection
1. Queries GitHub GraphQL API for your contribution calendar
2. Retrieves daily contribution counts for the past year

### Hourly Distribution
The application uses a deterministic pseudo-random algorithm to distribute daily commits across 24 hours:
- **0-5 AM**: 15% of commits (early morning)
- **6-11 AM**: 20% of commits (morning)
- **12-5 PM**: 30% of commits (afternoon)
- **6-11 PM**: 35% of commits (evening/night)

This distribution creates a realistic pattern based on typical developer schedules.

### Visualization
- Generates an SVG chart with animated bars
- Each bar represents commits at a specific hour
- Includes gradient effects and glowing animations
- Responsive design that scales to different screen sizes

## Technical Stack

- **Express.js**: Web server framework
- **Axios**: HTTP client for API requests
- **dotenv**: Environment variable management
- **GitHub GraphQL API**: Data source for contribution metrics

## Project Structure

```
smc-github-commit-hours/
├── index.js              # Main application file
├── package.json          # Project dependencies
├── .env                  # Environment configuration (not committed)
├── .gitignore            # Git ignore rules
└── README.md             # This file
```

## Performance Considerations

- **Caching**: SVG responses are cached for 1 hour to reduce API calls
- **GraphQL Efficiency**: Single GraphQL query fetches all contribution data
- **Deterministic Algorithm**: Pseudo-random distribution ensures consistent results

## Troubleshooting

### "Error: Invalid token"
- Verify your GitHub token is valid and has not expired
- Check that the token has appropriate permissions

### "Error: User not found"
- Ensure the USERNAME environment variable matches your GitHub username exactly
- Check for typos in the username

### No commits showing
- Verify you have public contributions on GitHub
- Check that your contribution calendar is not private

## Deployment

This application is configured for deployment on Vercel. The `.vercel` directory contains deployment configuration.

### Deploy to Vercel

```bash
vercel deploy
```

## License

ISC

## Author

Created for personal GitHub analytics and productivity tracking.

---

**Note**: This tool is designed for personal use. Ensure you comply with GitHub's Terms of Service when using their API.
