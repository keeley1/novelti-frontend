import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import DOMPurify from 'dompurify';
import { Book } from '../models/book';
import MissingThumbnail from '../components/missingThumbnail';
import { booksService } from '../services/booksService';

function BookDetails() {
  const { id } = useParams<{ id: string }>();
  const [books, setBooks] = useState<Book[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const location = useLocation();
  const previousLocation = location.state?.from || '/';
  const [showImageInput, setShowImageInput] = useState(false);
  const [thumbnailUrl, setThumbnailUrl] = useState('');

  const fetchBook = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const booksList = await booksService("searchbyid", id);
      setBooks(booksList);
    } catch (err) {
      setError('Error fetching books');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchBook();
  }, [id]);

  function createMarkup(html: string) {
    return { __html: DOMPurify.sanitize(html) };
  };

  function handleBack() {
    navigate(previousLocation);
  };

  const handleAddThumbnail = async (bookId: string, thumbnail: string) => {
    try {
      const payload = JSON.stringify({
        book_id: bookId,
        thumbnail: thumbnail
      });

      await axios.post('http://localhost:8080/addthumbnail', payload, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      
      setBooks(books.map(book => ({
        ...book,
        thumbnail: thumbnailUrl
      })));
      
      setThumbnailUrl('');
      setShowImageInput(false);
    } catch (error) {
      console.error('Error updating thumbnail:', error);
    }
  };

  if (isLoading) return <div className="text-center mt-8">Loading book details...</div>;
  if (error) return <div className="text-center mt-8 text-red-500">{error}</div>;
  if (books.length === 0) return <div className="text-center mt-8">No book found</div>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <button onClick={handleBack}>Back</button>
      {books[0]?.thumbnail === "" && (
        <div>
          <div className="flex justify-end mb-2">
            <button onClick={() => setShowImageInput(!showImageInput)} className="btn btn-secondary">
              {showImageInput ? 'Cancel' : '+ Add Thumbnail'}
            </button>
          </div>
          
          {showImageInput && (
            <div className="w-full flex gap-2">
              <input 
                type="text" 
                value={thumbnailUrl}
                onChange={(e) => setThumbnailUrl(e.target.value)}
                placeholder="Enter image URL"
                className="input input-bordered flex-grow"
              />
              <button 
                onClick={() => handleAddThumbnail(books[0]?.id || '', thumbnailUrl)}
                className="btn btn-primary"
              >
                Submit
              </button>
            </div>
          )}
        </div>
      )}
      {books.map((book, index) => (
        <div key={index} className="p-6 mb-6">
          <div className="flex flex-row gap-8">
            <div className="flex-shrink-0">
              {book.thumbnail === "" ? (
                <MissingThumbnail />
              ) : (
                <img 
                  src={book.thumbnail} 
                  alt={book.title} 
                  className="w-48 h-auto rounded-lg"
                  loading="lazy"
                  width={200}
                />
              )}
            </div>
            <div className="flex-grow">
              <h1 className="text-2xl font-bold mb-4">{book.title}</h1>
              <p className="mb-2">By: {book.authors.join(", ")}</p>
              <p className="mb-2">Published: {book.publishedDate}</p>
              <div className="mt-4">
                <h2 className="text-xl font-bold mb-2">Description</h2>
                <div 
                  dangerouslySetInnerHTML={createMarkup(book.description)}
                  className="prose prose-invert max-w-none [&_p]:!text-white [&_*]:!text-white"
                />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BookDetails;
