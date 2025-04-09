import { apiService } from '../apiService';
import axios from 'axios';

// mock the entire axios module
jest.mock('axios', () => ({
    create: jest.fn()
}));

describe('apiService', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('should create axios instance with correct base URL', () => {
        apiService();
        expect(axios.create).toHaveBeenCalledWith({
            baseURL: 'http://localhost:8080',
            headers: {
                'Content-Type': 'application/json'
            }
        });
    });

    test('should return axios instance', () => {
        const mockAxiosInstance = {
            get: jest.fn(),
            post: jest.fn(),
        };
        
        // tell mocked module to return the mocked instance
        (axios.create as jest.Mock).mockReturnValue(mockAxiosInstance);

        const result = apiService();
        expect(result).toBe(mockAxiosInstance);
    });
});