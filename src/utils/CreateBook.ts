import { Book } from '../models/book';

export function createBook(data: any[]): Book[] {
  return data.map((item: any) => ({
    title: item.title,
    authors: item.authors || [],
    publishedDate: item.publishedDate || 'Unknown',
    thumbnail: item.thumbnail,
    description: item.description,
    id: item.id,
  }));
} 