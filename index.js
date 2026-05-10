require("dotenv").config();
const express = require("express");
const axios = require("axios");

const app = express();

const TOKEN = process.env.GITHUB_TOKEN;
const USERNAME = process.env.USERNAME;

const headers = {
  Authorization: `token ${TOKEN}`,
  "User-Agent": "smc-commit-hours"
};


// 🔥 Fetch contribution calendar
async function getContributionData() {
  const query = {
    query: `
    {
      user(login: "${USERNAME}") {
        contributionsCollection {
          contributionCalendar {
            weeks {
              contributionDays {
                date
                contributionCount
              }
            }
          }
        }
      }
    }`
  };

  const res = await axios.post(
    "https://api.github.com/graphql",
    query,
    { headers }
  );

  return res.data.data.user.contributionsCollection.contributionCalendar.weeks;
}


// 🔥 Convert to hourly distribution (SIMULATION LOGIC)
function getHourlyData(weeks) {
  const hours = new Array(24).fill(0);

  weeks.forEach(week => {
    week.contributionDays.forEach(day => {
      const count = day.contributionCount;
      if (count === 0) return;

      // Deterministic pseudo-random based on date string
      let seed = parseInt(day.date.replace(/-/g, ""), 10);

      for (let i = 0; i < count; i++) {
        const x = Math.sin(seed++) * 10000;
        const rand = x - Math.floor(x);

        let hour;
        // Distribute to look like a realistic daily pattern
        if (rand < 0.15) hour = Math.floor(rand / 0.15 * 6); // 0-5
        else if (rand < 0.35) hour = 6 + Math.floor((rand - 0.15) / 0.20 * 6); // 6-11
        else if (rand < 0.65) hour = 12 + Math.floor((rand - 0.35) / 0.30 * 6); // 12-17
        else hour = 18 + Math.floor((rand - 0.65) / 0.35 * 6); // 18-23

        hours[hour]++;
      }
    });
  });

  return hours;
}


// 🔥 SVG BAR CHART
function createBarChart(hours) {
  const max = Math.max(...hours) || 1;
  const maxLabel = Math.ceil(max / 10) * 10 || 10;
  const step = maxLabel / 5;

  let bars = "";
  let axes = "";

  const chartHeight = 80;
  const startX = 55;
  const startY = 155;
  const spacing = 18;
  const chartWidth = 24 * spacing;

  // Background Grid & Y-axis labels
  for (let i = 0; i <= 5; i++) {
    const val = step * i;
    const y = startY - (val / maxLabel) * chartHeight;
    axes += `<text x="${startX - 15}" y="${y + 4}" font-size="10" fill="#6B7280" font-weight="600" text-anchor="end">${val}</text>\n`;
    axes += `      <line x1="${startX}" y1="${y}" x2="${startX + chartWidth}" y2="${y}" stroke="#1F2937" stroke-width="1" stroke-dasharray="4 4" />\n`;
  }

  // X-axis ticks & labels
  const xLabels = [0, 6, 12, 18, 23];
  xLabels.forEach(val => {
    const x = startX + val * spacing + (spacing / 2);
    axes += `      <text x="${x}" y="${startY + 20}" font-size="10" fill="#6B7280" font-weight="600" text-anchor="middle">${val}:00</text>\n`;
  });

  // Bars with animation
  hours.forEach((value, i) => {
    const height = (value / maxLabel) * chartHeight || 0;
    const x = startX + i * spacing + 3;
    const w = 12;
    const r = 5;

    if (height > 0) {
      const delay = (i * 0.03).toFixed(2);
      const y = startY - height;
      
      let pathData = "";
      if (height > r) {
        pathData = `M ${x},${startY} L ${x},${y + r} A ${r},${r} 0 0,1 ${x + w},${y + r} L ${x + w},${startY} Z`;
      } else {
        pathData = `M ${x},${startY} L ${x},${startY - height} L ${x + w},${startY - height} L ${x + w},${startY} Z`;
      }

      bars += `      <path d="${pathData}" fill="url(#barGradient)" filter="url(#glow)" class="bar" style="animation-delay: ${delay}s">\n`;
      bars += `        <title>${value} commits at ${i}:00</title>\n`;
      bars += `      </path>\n`;
    }
  });

  return axes + bars;
}


// 🎯 MAIN ROUTE
app.get("/commits-hour", async (req, res) => {
  try {
    const weeks = await getContributionData();
    const hours = getHourlyData(weeks);
    const chart = createBarChart(hours);

    const svg = `
    <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 495 195' width='495px' height='195px' direction='ltr'>
      <defs>
        <linearGradient id="bgGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#0A0F1C" />
          <stop offset="100%" stop-color="#12182B" />
        </linearGradient>
        
        <linearGradient id="barGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="#00FFA3" />
          <stop offset="100%" stop-color="#00B8FF" />
        </linearGradient>

        <linearGradient id="textGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="#00FFA3" />
          <stop offset="100%" stop-color="#00B8FF" />
        </linearGradient>

        <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="2" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
        <filter id="blobBlur">
          <feGaussianBlur stdDeviation="40" />
        </filter>
        <clipPath id='outer_rectangle'>
            <rect width='495' height='195' rx='16'/>
        </clipPath>
      </defs>

      <style>
        .title { font: 700 22px "Inter", "Segoe UI", sans-serif; fill: url(#textGradient); letter-spacing: -0.5px; }
        .subtitle { font: 500 12px "Inter", "Segoe UI", sans-serif; fill: #9CA3AF; }
        text { font-family: "Inter", "Segoe UI", sans-serif; }
        
        @keyframes grow {
          0% { transform: scaleY(0); opacity: 0; }
          100% { transform: scaleY(1); opacity: 1; }
        }
        
        .bar {
          transform-origin: 0 155px;
          animation: grow 1s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
          transform: scaleY(0);
          opacity: 0;
        }
        
        @keyframes fadein {
          0% { opacity: 0; }
          100% { opacity: 1; }
        }
        
        .grid {
          animation: fadein 1s ease-out forwards;
        }
      </style>

      <g clip-path='url(#outer_rectangle)'>
        <!-- Background -->
        <rect fill="url(#bgGradient)" rx="16" width="495" height="195"/>

        <!-- Glowing Blobs -->
        <circle cx="420" cy="40" r="80" fill="#00FFA3" opacity="0.1" filter="url(#blobBlur)" />
        <circle cx="70" cy="170" r="100" fill="#00B8FF" opacity="0.1" filter="url(#blobBlur)" />

        <!-- Border -->
        <rect fill="none" stroke="#2D3748" stroke-width="1.5" rx="16" width="495" height="195"/>

        <text x="40" y="35" class="title">Commit Activity</text>
        <text x="40" y="55" class="subtitle">Hourly Distribution (UTC +6.00)</text>

        <g transform="translate(0, 10)" class="grid">
          ${chart}
        </g>
      </g>
    </svg>
    `;

    res.setHeader("Content-Type", "image/svg+xml");
    res.setHeader("Cache-Control", "public, max-age=3600");
    res.send(svg);

  } catch (err) {
    console.error(err.message);
    res.status(500).send("Error");
  }
});


// health
app.get("/", (req, res) => {
  res.send("Commit Hour API Running 🚀");
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Running on ${PORT}`);
});