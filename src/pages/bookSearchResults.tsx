import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useSearch } from '../context/searchQueryContext';
import { Book } from '../models/book';
import { booksService } from '../services/booksService';
import BookList from '../components/bookList';

function BookSearchResults() {
  const { searchQuery } = useSearch();
  const [books, setBooks] = useState<Book[]>([]);
  const [startIndex, setStartIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const location = useLocation();

  async function fetchBooks() {
    setIsLoading(true);
    setError(null);
    try {
      const booksList = await booksService("searchbooks", encodeURIComponent(searchQuery), startIndex);
      setBooks(booksList);
    } catch (err) {
      setError('Error fetching books');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, [startIndex, searchQuery]);

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

  return (
    <>
      <h1 className="mb-4"><strong>Books matching: "{(searchQuery ?? 'Unknown').charAt(0).toUpperCase() + (searchQuery ?? 'unknown').slice(1)}" </strong></h1>
      <BookList books={books} onBookClick={handleBookClick} />
      <div className="flex justify-between mt-4">
        <button onClick={handlePreviousPage} disabled={startIndex === 0} className="btn btn-secondary">Back</button>
        <button onClick={handleNextPage} className="btn btn-secondary">Next</button>
      </div>
    </>
  );
};

export default BookSearchResults;