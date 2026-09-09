<div align="center">

# SMC Commit Hours

[![Node.js](https://img.shields.io/badge/Node.js-43853D?style=flat-square&logo=node.js&logoColor=white)](https://nodejs.org/)
[![Express.js](https://img.shields.io/badge/Express.js-404D59?style=flat-square&logo=express&logoColor=white)](https://expressjs.com/)
[![GitHub stars](https://img.shields.io/github/stars/SiratimMChy/smc-github-commit-hours?style=flat-square)](https://github.com/SiratimMChy/smc-github-commit-hours/stargazers)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg?style=flat-square)](https://opensource.org/licenses/MIT)

A visually stunning API service that generates an interactive SVG chart of your GitHub commit activity over a 24-hour period. Perfect for showcasing your productivity patterns directly on your GitHub profile README!

</div>

---

## 👋 Overview

**SMC GitHub Commit Hours** analyzes your GitHub contribution data and creates a beautiful, animated bar chart displaying your commit patterns by hour of the day. This visual summary helps you easily understand your coding habits and daily productivity patterns at a glance.

## ✨ Features

- **Real-Time Data**: Directly fetches your contribution stats using the GitHub GraphQL API.
- **Smart Distribution**: Uses a clever pseudo-random algorithm to realistically break down your daily commits across 24 hours.
- **Eye-Catching SVGs**: Generates beautifully crafted, responsive charts with glowing gradients and smooth animations.
- **Lightning Fast**: Implements HTTP caching to ensure optimal performance and minimal API calls.

## 🛠️ Tech Stack

- **[Express.js](https://expressjs.com/)**: Fast and minimalist web server framework.
- **[Axios](https://axios-http.com/)**: Promise-based HTTP client for the browser and node.js.
- **[GitHub GraphQL API](https://docs.github.com/en/graphql)**: The engine powering our data retrieval.

## 🚀 Getting Started

### Prerequisites

Before you begin, make sure you have:
- Node.js (v14 or higher) installed
- A GitHub Personal Access Token (make sure to include the `read:user` scope)
- npm or yarn

### Installation

1. Grab the repository:
   ```bash
   git clone https://github.com/SiratimMChy/smc-github-commit-hours.git
   cd smc-github-commit-hours
   ```

2. Install the dependencies:
   ```bash
   npm install
   ```

3. Set up your environment by creating a `.env` file in the root directory:
   ```env
   GITHUB_TOKEN=your_github_personal_access_token
   USERNAME=your_github_username
   PORT=3000
   ```

### Obtaining Your GitHub Token
1. Head over to [Personal access tokens](https://github.com/settings/tokens) in your GitHub Developer settings.
2. Click on **Generate new token**.
3. Be sure to select the `read:user` scope.
4. Paste that shiny new token into your `.env` file!

## 💡 Usage

### Running Locally

Fire up the server with:
```bash
npm start
```
By default, the magic happens on port `3000`.

### API Endpoints

#### `GET /commits-hour`
This is where the magic happens. It generates and returns the awesome SVG chart of your commit distribution.

**Try it out:**
```bash
curl http://localhost:3000/commits-hour
```

**Add it to your Markdown:**
```markdown
![My Commit Hours](http://localhost:3000/commits-hour)
```

#### `GET /`
Just checking in! A basic health check to make sure the API is awake and running.

## 🌍 Deployment

Ready to share it with the world? This project is tailored for an effortless deployment on **Vercel**.

1. Grab the Vercel CLI if you haven't already:
   ```bash
   npm i -g vercel
   ```
2. Send it to the cloud:
   ```bash
   vercel --prod
   ```
*Don't forget to add your `GITHUB_TOKEN` and `USERNAME` to the environment variables section in your Vercel dashboard!*

---

## License & Contributions

This project is open-source. Anyone is free to view, explore, and contribute to this repository. 

**Usage of Cards:** You are free to generate and use these contribution graph cards on your own profile, websites, or applications. However, **you must provide proper credit** to the original creator. Using the generated cards or this codebase without attribution is not allowed.

Distributed under the **MIT License**. See the license details for more information.

*Copyright © 2026 SMC Commit Hours. All rights reserved.*

<br/>

<div align="center">

**Made by Siratim Mustakim Chowdhury**

[![GitHub](https://img.shields.io/badge/GitHub-SiratimMChy-181717?style=flat&logo=github)](https://github.com/SiratimMChy)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Siratim%20Mustakim-0077B5?style=flat&logo=linkedin)](https://www.linkedin.com/in/siratim-mustakim-chowdhury/)
[![Email](https://img.shields.io/badge/Email-chowdhurysiratimmustakim@gmail.com-D14836?style=flat&logo=gmail&logoColor=white)](mailto:chowdhurysiratimmustakim@gmail.com)
</div>
