import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { useSearch } from '../context/searchQueryContext';
import { Book } from '../models/book';
import { createBook } from '../utils/CreateBook';
import MissingThumbnail from '../components/missingThumbnail';

function BookSearchResults() {
  const { searchQuery } = useSearch();
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
      const response = await axios.get(`http://localhost:8080/searchbooks/${encodeURIComponent(searchQuery)}?startIndex=${startIndex}`);
      if (Array.isArray(response.data)) {
        const booksList = createBook(response.data);
        setBooks(booksList);
      }
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
      <ul className="space-y-6">
      {books.map((book, index) => (
        <div key={index} className="mb-6 bg-info flex gap-4 items-start">
          {book.thumbnail === "" ? (
                <MissingThumbnail />
              ) : (
              <img 
                onClick={() => handleBookClick(book)}
                src={book.thumbnail} 
                alt={book.title} 
                loading="lazy" 
                className="cursor-pointer"
                style={{ width: "130px", height: "auto" }} 
              />
          )}
          <div className="flex-1">
            <div className="p-4 flex flex-col min-h-[150px]">
              <div>
                <h1 onClick={() => handleBookClick(book)} className="cursor-pointer font-bold text-xl">{book.title}</h1>
                <p onClick={() => handleBookClick(book)} className="cursor-pointer text-gray-400 hover:text-secondary">by {book.authors}</p>
                <p onClick={() => handleBookClick(book)} className="cursor-pointer text-gray-400 hover:text-secondary">{book.publishedDate}</p>
              </div>
              <div className="mt-auto pt-8 text-right">
                <p className="text-gray-400">***** (4.7)</p>
                <p className="text-gray-400">300 pages</p>
              </div>
            </div>
          </div>
        </div>
      ))}
      </ul>
      <div className="flex justify-between mt-4">
        <button onClick={handlePreviousPage} disabled={startIndex === 0} className="btn btn-secondary">Back</button>
        <button onClick={handleNextPage} className="btn btn-secondary">Next</button>
      </div>
    </>
  );
};

export default BookSearchResults;