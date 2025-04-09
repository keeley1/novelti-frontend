import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate, useLocation } from 'react-router-dom';
import { Book } from '../models/book';
import { booksService } from '../services/booksService';
import BookList from '../components/bookList';

function GenreBooks() {
  const { genre } = useParams<{ genre: string }>();
  const [books, setBooks] = useState<Book[]>([]);
  const [startIndex, setStartIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const location = useLocation();

  const fetchBooks = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const booksList = await booksService("searchbygenre", genre, startIndex);
      setBooks(booksList);
    } catch (err) {
      setError('Error fetching books');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, [startIndex, genre]);

  const handleNextPage = () => {
    setStartIndex((prevIndex) => prevIndex + 20);
  };

  const handlePreviousPage = () => {
    setStartIndex((prevIndex) => Math.max(prevIndex - 20, 0));
  };

  if (isLoading) return <div className="text-center mt-8">Loading books...</div>;
  if (error) return <div>{error}</div>;

  function handleBookClick(book: Book) {
    navigate(`/book/${book.id}`, { state: { from: location.pathname } });
  };

  /* Move book list to be a component */
  return (
    <>
      <h1 className="mb-4 text-bold text-xl"><strong>Browse {genre ?? "Unknown"} Books</strong></h1>
      <BookList books={books} onBookClick={handleBookClick} />
      <div className="flex justify-between mt-4">
        <button onClick={handlePreviousPage} disabled={startIndex === 0} className="btn btn-secondary">Back</button>
        <button onClick={handleNextPage} className="btn btn-secondary">Next</button>
      </div>
    </>
  );
};

export default GenreBooks;