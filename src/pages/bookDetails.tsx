import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

interface Book {
  title: string;
  authors: string[];
  publishedDate: string;
  thumbnail: string;
  isbn: string;
  description: string;
}

const BookDetails = () => {
  const { isbn } = useParams<{ isbn: string }>();
  const [books, setBooks] = useState<Book[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    axios.get(`http://localhost:8080/searchbyisbn/${isbn}`)
      .then(response => {
        if (Array.isArray(response.data)) {
          const booksList = response.data.map((item: any) => ({
            title: item.title,
            authors: item.authors || [],
            publishedDate: item.publishedDate || 'Unknown',
            thumbnail: item.thumbnail,
            isbn: item.isbn,
            description: item.description || 'Unknown',
          }));
          setBooks(booksList);
        }
      })
      .finally(() => setIsLoading(false));
  }, [isbn]);

  if (isLoading) return <div className="text-center mt-8">Loading books...</div>;

  return (
    <>
      <ul className="space-y-6">
        {books.map((book, index) => (
            <li className="mb-6">
              <strong>{book.title}</strong> <br />
              Authors: {book.authors.join(", ")} <br />
              Published Date: {book.publishedDate}
              <img src={book.thumbnail} alt={book.title} loading="lazy" style={{ width: '100px', height: 'auto' }}/>
              <p>{book.description}</p>
            </li>
        ))}
      </ul>
    </>
  );
}

export default BookDetails;
