# QueueGod

## Run the full stack

### Backend
cd backend
pip install -r requirements.txt
cp .env.example .env  # add your keys
uvicorn main:app --reload --port 8000

### Frontend
npm install
npm run dev

## API Keys needed
- OPENAI_API_KEY — openai.com
- ONEMAP_ACCESS_TOKEN — onemap.gov.sg
- LTA_API_KEY — datamall.lta.gov.sg (free, instant approval)
- OPENWEATHER_API_KEY — openweathermap.org (free tier)

## Demo mode
All agents fall back to realistic mock data if API keys are missing.
The app is fully demoable without any keys.

## Live behavior
- Browser GPS uses `navigator.geolocation.getCurrentPosition()`.
- Routing uses OneMap public transport routing when available.
- LTA DataMall is used for nearest bus-stop lookup when `LTA_API_KEY` is configured.
- Weather uses OpenWeatherMap at the drop coordinates when `OPENWEATHER_API_KEY` is configured.
- Drop discovery refreshes `backend/data/live_drops.json` every 6 hours with OpenAI Responses API web search when `OPENAI_API_KEY` is configured.
- Slot assignment is persisted in memory per backend process and resets on server restart.
