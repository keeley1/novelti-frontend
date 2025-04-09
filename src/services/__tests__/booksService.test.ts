import { apiService } from "../apiService";
import { booksService, __constructApiPath as constructApiPath } from "../booksService";

// mock the apiService
jest.mock("../apiService", () => ({
    apiService: jest.fn()
}));

describe("bookService", () => {
    describe("constructApiPath", () => {
        test("construct correct path with start index", () => {
            const result = constructApiPath('genre', 'fantasy', 0);
            expect(result).toBe("/genre/fantasy?startIndex=0");
        });

        test("construct correct api path without start index", () => {
            const result = constructApiPath('searchbyid', 'hUZWAAAAcAAJ');
            expect(result).toBe("/searchbyid/hUZWAAAAcAAJ");
        });
    });
});