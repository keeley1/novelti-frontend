import { apiService } from "./apiService";
import { Book } from "../models/book";

// remember one function, one purpose/concern, how easy to test
/*
to do:
- should functions have return types?
- are errors being handled ideally?
*/

export async function booksService(searchType: string, searchQuery?: string, startIndex?: number) {
    if (!searchQuery) {
        throw new Error("Search query is required");
    }
    try {
        const apiPath = constructApiPath(searchType, searchQuery, startIndex);
        const response = await callBooksApi(apiPath);
        const booksList = createBooksList(response.data);
        return booksList;
    } catch (err) {
        throw new Error("Failed to fetch books from book service")
    }
};

function constructApiPath(searchType: string, searchQuery: string, startIndex?: number) {
    const baseUrl = `/${searchType}/${searchQuery}`;
    return startIndex !== undefined 
        ? `${baseUrl}?startIndex=${startIndex}`
        : baseUrl;
};

async function callBooksApi(apiPath: string) {
    try {
        const baseApi = apiService();
        const apiResponse = await baseApi.get(apiPath);
        return apiResponse;
    } catch (err) {
        throw new Error("Failed to fetch books from API");
    }
};

function createBooksList(data: any[]): Book[] {
    if (!Array.isArray(data)) {
        throw new Error("Invalid data format: expected array");
    }
    return data.map((item: any) => ({
        title: item.title,
        authors: item.authors || [],
        publishedDate: item.publishedDate || 'Unknown',
        thumbnail: item.thumbnail,
        description: item.description,
        id: item.id,
    }));
};