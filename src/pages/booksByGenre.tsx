import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';

interface Book {
  title: string;
  authors: string[];
  publishedDate: string;
  thumbnail: string;
  id: string;
}

function GenreBooks() {
  const { genre } = useParams<{ genre: string }>();
  const [books, setBooks] = useState<Book[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    setIsLoading(true);
    axios.get(`http://localhost:8080/searchbygenre/${genre}`)
      .then(response => {
        if (Array.isArray(response.data)) {
          const booksList = response.data.map((item: any) => ({
            title: item.title,
            authors: item.authors || [],
            publishedDate: item.publishedDate || 'Unknown',
            thumbnail: item.thumbnail,
            id: item.id,
          }));
          setBooks(booksList);
        }
      })
      .finally(() => setIsLoading(false));
  }, [genre]);

  if (isLoading) return <div className="text-center mt-8">Loading books...</div>;

  function handleBookClick(book: Book) {
    navigate(`/book/${book.id}`, { state: { from: location.pathname } });
  };

  return (
    <>
      <h1 className="mb-4"><strong>{(genre ?? 'Unknown').charAt(0).toUpperCase() + (genre ?? 'unknown').slice(1)} Books</strong></h1>
      <ul className="space-y-6">
        {books.map((book, index) => (
            <li 
            key = {index}
            className="mb-6 bg-secondary/20 p-4 rounded-lg hover:bg-secondary/30 transition-colors"
            onClick={() => handleBookClick(book)}
            >
              <strong>{book.title}</strong> <br />
              Authors: {book.authors.join(", ")} <br />
              Published Date: {book.publishedDate}
              <img src={book.thumbnail} alt={book.title} loading="lazy" style={{ width: '100px', height: 'auto' }}/>
            </li>
        ))}
      </ul>
    </>
  );
};

export default GenreBooks;