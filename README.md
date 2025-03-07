# Google-scraper

This project is a simple web application that allows users to search for a keyword and fetch results from an external API (SERP API). The results are then downloaded as a JSON file.

## Project Structure

The project consists of the following files:

- **`index.html`**: The main HTML file that contains the user interface for entering a keyword and triggering the search.
- **`index.js`**: The backend server built with Express.js that handles the search request and fetches results from the SERP API.
- **`server.test.js`**: Test cases for the backend server using Jest and Supertest.

## Features

- Users can enter a keyword in the input field and click the "Search" button.
- The backend fetches search results from the SERP API.
- Results are displayed in the console and can be downloaded as a JSON file.

## Prerequisites

Before running the project, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v14 or higher)
- [npm](https://www.npmjs.com/) (usually comes with Node.js)

## Setup and Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-username/your-repo-name.git
   cd your-repo-name
2. **Install dependencies**:
   npm install express axios
3. **Set up your API key**:
   Replace 'YOUR-API-KEY' in index.js with your actual SERP API key or any key.
   You can get an API key by signing up at [SERP API](https://serpapi.com)
   ```js
   20   const apiKey = 'YOUR-API-KEY'; // FILL IN YOUR API-KEY HERE
   21   const apiUrl = `https://serpapi.com/search.json?q=${encodeURIComponent(keyword)}&api_key=${apiKey}`;
   ```
5. **Run the server**:
   node index.js
6. **Access the application**:
   Open your browser and navigate to http://localhost:5000

## Running Tests

   **To run the tests, ensure you have Jest installed:**
   npm install jest supertest --save-dev
   **Then, run the tests using:**
   npx jest

  ## How It Works
  1. The user enters a keword in the input field and clicks the "Search" button.
  2. The frontend sends a POST request to the **/fetch-results** endpoint with the keyword.
  3. The backend fetches results from the SERP API using the provided keyword.
  4. The results are processed and sent back to the frontend.
  5. The frontend allows the user to download the results as a JSON file.


### Rendered Output
Here’s an example of the JSON response returned by the SERP API:

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
- [Jest](https://jestjs.io) and [Supertest](https://github.com/ladjs/supertest) for testing.
## License
MIT
