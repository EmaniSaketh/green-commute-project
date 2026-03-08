    # 🌱 GreenCommute

> **Type your route. See the true cost — in rupees, minutes, and CO₂ — of every way to get there.**

A climate-aware commuting app that compares 11 transport modes side-by-side by emissions, cost, and travel time.

🔗 **GitHub:** https://github.com/EmaniSaketh/green-commute

---

## 📋 Prerequisites

Make sure these are installed before you start:

| Tool | Version | Download |
|------|---------|----------|
| Node.js | v16 or above | https://nodejs.org |
| npm | Comes with Node | Included with Node.js |
| Git | Any version | https://git-scm.com |
| VS Code | Recommended | https://code.visualstudio.com |

Check if Node is installed:
```bash
node -v
npm -v
```

---

## 🚀 Getting Started

### 1. Clone the Repository
```bash
cd Documents
git clone https://github.com/EmaniSaketh/green-commute.git
cd green-commute
```

### 2. Install Dependencies
```bash
npm install
```
> ⏳ Takes 1–3 minutes. Wait for the cursor to return.

If you get an error, try:
```bash
npm install --legacy-peer-deps
```

### 3. Run the App
```bash
npm start
```
✅ Opens automatically at **http://localhost:3000**

If it doesn't open, go to http://localhost:3000 manually in your browser.

---

## 🛠️ Fix: Merge Conflict Errors

If you see `<<<<<<< HEAD` in any file after cloning, run:
```bash
git fetch origin
git reset --hard origin/master
npm install
npm start
```
> ⚠️ This will delete any local changes. Only run if the app fails to compile.

---

## 📁 Project Structure

```
src/
├── App.js                        Main app — connects all components
├── components/
│   ├── CommuteForm.js            Route input with city autocomplete
│   ├── CommuteOptions.js         11 modes + Top 3 rankings
│   ├── Recommendation.js         Smart practical suggestions
│   ├── CarbonScore.js            Green score with mode selector
│   ├── AIAdvisor.js              CO₂ impact advisor
│   ├── Map.js                    Live map (origin → destination)
│   ├── CarbonChart.js            Bar chart comparing all modes
│   ├── SavingsCalculator.js      Monthly & yearly savings
│   ├── CarbonStats.js            Stats summary
│   └── ShareResults.js           Share your carbon stats
└── utils/
    ├── carbonCalculator.js       IPCC CO₂ emission factors
    └── locationsData.js          1167 Indian cities dataset
```

---

## ⚙️ Tech Stack

| Technology | Purpose |
|-----------|---------|
| React.js | Frontend UI and all components |
| Chart.js | CO₂ comparison bar chart |
| React-Leaflet | Interactive map |
| IPCC Emission Factors | Scientific CO₂ data (kg/km per mode) |
| 1167 Cities Dataset | Offline Indian cities with lat/lng |
| Haversine Formula | Distance calculation between cities |

> 100% client-side · No API keys required · Works offline

---

## 🚌 Supported Transport Modes

| Mode | CO₂ (kg/km) |
|------|------------|
| Walking | 0.000 |
| Bicycle | 0.000 |
| E-Scooter | 0.022 |
| Railways | 0.041 |
| EV Car | 0.050 |
| City Bus | 0.089 |
| Petrol Bike | 0.103 |
| Shared Cab | 0.130 |
| CNG Car | 0.130 |
| Diesel Car | 0.171 |
| Petrol Car | 0.192 |

---

## 🐛 Common Errors & Fixes

| Error | Fix |
|-------|-----|
| `<<<<<<< HEAD` in any file | Run `git reset --hard origin/master` |
| `Module not found` | Run `npm install` |
| Port 3000 already in use | Run `npx kill-port 3000` then `npm start` |
| `npm` not recognized | Install Node.js from nodejs.org and restart terminal |
| Blank white page | Open browser console (F12) and check for errors |
| Map not showing | Check internet connection — map uses OpenStreetMap |

---

## 👨‍💻 Built By

**Saketh Emani** — Hackathon Project · Sustainable Development Track

---

## 📄 License

MIT
