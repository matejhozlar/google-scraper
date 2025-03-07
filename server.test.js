const request = require('supertest');
const app = require('./index'); 
const axios = require('axios');
jest.mock('axios'); 

describe('POST /fetch-results', () => {
    it('should return 400 if no keyword is provided', async () => {
        const response = await request(app)
            .post('/fetch-results')
            .send({}); 
        
        expect(response.status).toBe(400);
        expect(response.body.error).toBe('Keyword is required');
    });

    it('should return 500 if an error occurs when fetching results', async () => {
        axios.get.mockRejectedValue(new Error('API error'));

        const response = await request(app)
            .post('/fetch-results')
            .send({ keyword: 'test' });

        expect(response.status).toBe(500);
        expect(response.body.error).toBe('Failed to fetch results');
    });

    it('should return search results when the API is successful', async () => {
        axios.get.mockResolvedValue({
            data: {
                organic_results: [
                    { title: 'Result 1', link: 'https://example.com/1', snippet: 'Snippet 1' },
                    { title: 'Result 2', link: 'https://example.com/2', snippet: 'Snippet 2' },
                ]
            }
        });

        const response = await request(app)
            .post('/fetch-results')
            .send({ keyword: 'test' }); 
        
        expect(response.status).toBe(200);
        expect(response.body.results).toEqual([
            { title: 'Result 1', link: 'https://example.com/1', snippet: 'Snippet 1' },
            { title: 'Result 2', link: 'https://example.com/2', snippet: 'Snippet 2' }
        ]);
    });
});
