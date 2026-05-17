# QueueForMe

## Setup

### 1. Get your free API keys (takes 5 minutes)

**OneMap (routing) - Free, instant:**
1. https://www.onemap.gov.sg/apidocs/ -> Get API -> Register
2. Token arrives immediately in your email

**OpenWeatherMap (weather) - Free, instant:**
1. https://openweathermap.org/api -> Sign Up
2. Go to API Keys tab -> copy default key
3. Wait ~10 min before first use

**OpenAI (AI agents) - Paid:**
1. https://platform.openai.com/api-keys

### 2. Add keys to backend/.env
cp backend/.env.example backend/.env
Then fill in:
OPENAI_API_KEY=sk-...
ONEMAP_ACCESS_TOKEN=eyJ...
OPENWEATHER_API_KEY=abc123...

### 3. Run backend
cd backend
pip install -r requirements.txt
uvicorn main:app --reload --port 8000

### 4. Run frontend (new terminal)
npm install
npm run dev

### 5. Open http://localhost:3000
Click "Secure My Slot" -> allow location -> watch the agent log
Items marked [LIVE] are real API calls. [SIMULATED] means that
key is missing from .env.

## OneMap Token (free, instant)
1. Go to https://www.onemap.gov.sg/apidocs/
2. Click "Get API" -> register with email
3. You get a token immediately
4. Paste it as ONEMAP_ACCESS_TOKEN in .env

## OpenWeatherMap (free, instant)
1. Go to https://openweathermap.org/api
2. Sign up -> go to API Keys tab
3. Copy your default key
4. Paste as OPENWEATHER_API_KEY in .env
Note: new keys take ~10 minutes to activate
