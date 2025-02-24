import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import DOMPurify from 'dompurify';

interface Book {
  title: string;
  authors: string[];
  publishedDate: string;
  thumbnail: string;
  id: string;
  description: string;
}

function BookDetails() {
  const { id } = useParams<{ id: string }>();
  const [books, setBooks] = useState<Book[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const location = useLocation();
  const previousLocation = location.state?.from || '/';


  useEffect(() => {
    setIsLoading(true);
    console.log('Fetching book with ISBN:', id);

    axios.get(`http://localhost:8080/searchbyid/${id}`)
      .then(response => {
        console.log('API Response:', response.data);
        if (Array.isArray(response.data)) {
          const booksList = response.data.map((item: any) => ({
            title: item.title || 'Unknown Title',
            authors: item.authors || ['Unknown Author'],
            publishedDate: item.publishedDate || 'Unknown',
            thumbnail: item.thumbnail || '',
            id: item.id || '',
            description: item.description || 'No description available',
          }));
          console.log('Processed Books:', booksList);
          console.log('Description HTML:', booksList[0].description);
          setBooks(booksList);
        } else {
          setError('Invalid data format received');
        }
      })
      .catch(error => {
        console.error('Error fetching book:', error);
        setError('Failed to load book details');
      })
      .finally(() => setIsLoading(false));
  }, [id]);

  function createMarkup(html: string) {
    return { __html: DOMPurify.sanitize(html) };
  };

  function handleBack() {
    navigate(previousLocation);
  };

  if (isLoading) return <div className="text-center mt-8">Loading book details...</div>;
  if (error) return <div className="text-center mt-8 text-red-500">{error}</div>;
  if (books.length === 0) return <div className="text-center mt-8">No book found</div>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <button onClick={handleBack}>Back</button>
      {books.map((book, index) => (
        <div key={index} className="p-6 mb-6">
          <div className="flex flex-row gap-8">
            <div className="flex-shrink-0">
              <img 
                src={book.thumbnail} 
                alt={book.title} 
                className="w-48 h-auto rounded-lg"
                loading="lazy"
                width={200}
              />
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
