# Google-scraper

This project is a simple web application that allows users to search for a keyword and fetch results from an external API ([SERP API](https://serpapi.com)). The results are then downloaded as a JSON file.

## Project Structure

The project consists of the following files:

- **`index.html`**: The main HTML file that contains the user interface for entering a keyword and triggering the search.
- **`index.js`**: The backend server built with Express.js that handles the search request and fetches results from the [SERP API](https://serpapi.com).
- **`server.test.js`**: Test cases for the backend server using Jest and Supertest.

## Features

- Users can enter a keyword in the input field and click the "Search" button.
- The backend fetches search results from the [SERP API](https://serpapi.com).
- Results are displayed in the console and can be downloaded as a JSON file.

## Prerequisites

Before running the project, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v14 or higher)
- [npm](https://www.npmjs.com/) (usually comes with Node.js)

## Setup and Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/matejhozlar/google-scraper.git
   cd your-repo-name
   ```
2. **Install dependencies**:
   ```bash
   npm install express axios
   ```
3. **Set up your API key**:
   Replace 'YOUR-API-KEY' in index.js with your actual SERP API key or any key.
   You can get an API key by signing up at [SERP API](https://serpapi.com)
   ```js
   20   const apiKey = 'YOUR-API-KEY'; // FILL IN YOUR API-KEY HERE
   21   const apiUrl = `https://serpapi.com/search.json?q=${encodeURIComponent(keyword)}&api_key=${apiKey}`;
   ```
4. **Run the server**:
   ```bash
   node index.js
   ```
5. **Access the application**:
   Open your browser and navigate to [http://localhost:5000](http://localhost:5000)

## Docker Setup

You can also build and run this project inside docker

1. **Build the Docker image**
   ```bash
   docker build -t google-scraper .
   ```
2. **Run the container**
   ```bash
   docker run --rm -p 3000:3000 \
      -e PORT=3000 \
      -e API_KEY=your_serpapi_key_here \
      -e NODE_ENV=production \
      google-scraper
   ```
   - `-p 3000:3000` → Maps container port to 3000 to your local machine.
   - `-e PORT=3000` → Defines which port Express should listen on.
   - `-e API_KEY=...` → Supplies your SerpApi key.
   - `-e NODE_ENV=production` → Runs node in production mode
     Then open http://localhost:3000 or http://127.0.0.1:5000
3. **Environment variable overrides**
   You can override environment variables at runtime. For example:

   ```bash
      # Run on a different port
      docker run --rm -p 3000:3000 \
         -e PORT=3000 \
         -e API_KEY=your_serpapi_key_here \
         -e NODE_ENV=production \
         google-scraper
   ```

   Or use a .env file:

   ```bash
   # .env
   PORT=3000
   API_KEY=your_serpapi_key_here
   NODE_ENV=production
   ```

   Run with:

   ```bash
   docker run --rm -p 3000:3000 --env-file .env google-scraper
   ```

## Running Tests

**To run the tests, ensure you have Jest installed**:<br>
`npm install jest supertest --save-dev`
<br>
**Then, run the tests using**:<br>
`npx jest`

## How It Works

1. The user enters a keword in the input field and clicks the "Search" button.
2. The frontend sends a POST request to the **/fetch-results** endpoint with the keyword.
3. The backend fetches results from the [SERP API](https://serpapi.com) using the provided keyword.
4. The results are processed and sent back to the frontend.
5. The frontend allows the user to download the results as a JSON file.

### Rendered Output

Here’s an example of the JSON response returned by the [SERP API](https://serpapi.com):

```json
{
  "organic_results": [
    {
      "title": "Result 1",
      "link": "https://example.com/1",
      "snippet": "Snippet 1"
    },
    {
      "title": "Result 2",
      "link": "https://example.com/2",
      "snippet": "Snippet 2"
    }
  ]
}
```

## Acknowledgments

- [SERP API](https://serpapi.com) for providing the search results API.
- [Express.js](https://expressjs.com) for the backend server.
- [Jest](https://jestjs.io) and [Supertest](https://github.com/ladjs/supertest) for
  testing.

## ⚠️ Disclaimer & Legal Warning

This project uses SerpApi (or another legal API) to fetch Google search results in compliance with their terms of service. However, scraping Google directly without permission is against Google's Terms of Service (Google ToS).

Important Notes:

- This project is intended for educational use only.
- Do not use this project to scrape Google directly or violate any website’s terms of service.
- If you use an API like SerpApi, make sure to follow their terms and conditions.
- Do not expose your API keys in public repositories. Use environment variables (.env) to keep them secure.
- If you plan to use this project commercially or at scale, consult a legal expert to ensure compliance with relevant laws and policies.
- By using this project, you agree that you are responsible for any actions taken with this code and that the creator assumes no liability for misuse.
