from fastapi import FastAPI, HTTPException
import httpx

app = FastAPI()

SERPAPI_BASE_URL = "https://serpapi.com/search.json"
SERPAPI_API_KEY = "83d2b840c7bbb4cdaed2f043c1ef74ee888533d35003313516b8e9001f0fb085"

@app.get("/get-events/")
async def get_events(city: str = "San Francisco", event_type: str = "", date: str = "today"):
    params = {
        "engine": "google_events",
        "q": f"Events in {city}",
        "hl": "en",
        "gl": "us",
        "htichips": f"event_type:{event_type},date:{date}",
        "api_key": SERPAPI_API_KEY
    }

    async with httpx.AsyncClient() as client:
        response = await client.get(SERPAPI_BASE_URL, params=params)

    if response.status_code != 200:
        raise HTTPException(status_code=response.status_code, detail=response.text)

    results = response.json()
    events_results = results.get("events_results", [])
    events_dict = {}
    for event in events_results:
        title = event.get('title', 'Unknown Event')
        date = event.get('date', {}).get('start_date', 'Unknown Date')
        time = event.get('date', {}).get('when', 'Unknown Time')
        location = ', '.join(event.get('address', ['Unknown Location']))
        description = event.get('description', 'No description available')
        
        events_dict[title] = {
            'Location': location,
            'Date': date,
            'Time': time,
            'Description': description
        }
    print(events_dict['MAKANO MEMORIAS EN REDWOOD CITY CA']['Location'])
    return events_dict

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
