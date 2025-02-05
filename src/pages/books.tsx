import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import axios from 'axios';
import '../App.css';

interface Book {
  title: string;
  authors: string[];
  publishedDate: string;
  thumbnail: string;
}

function Books() {
  const [books, setBooks] = useState<Book[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    axios.get('http://localhost:8080/searchbygenre/fiction')
      .then(response => {
        console.log('Full response:', response.data); 
        
        if (Array.isArray(response.data)) {
          const booksList = response.data.map((item: any) => ({
            title: item.title,
            authors: item.authors || [],
            publishedDate: item.publishedDate || 'Unknown',
            thumbnail: item.thumbnail,
          }));
          setBooks(booksList);
        } else {
          setError("No books found");
        }
      })
      .catch(error => {
        console.error('Error fetching books:', error);
        setError("An error occurred while fetching books");
      });
  }, []);

  if (error) return <div>{error}</div>;

  return (
    <>
      <h1 className="mb-4"><strong>Fiction Books</strong></h1>
      <ul className="space-y-6">
        {books.map((book, index) => (
          <li key={index} className="mb-6 bg-secondary/20 p-4 rounded-lg">
            <strong>{book.title}</strong> <br />
            Authors: {book.authors.join(", ")} <br />
            Published Date: {book.publishedDate}
            <img src={book.thumbnail} alt={book.title} style={{ width: '100px', height: 'auto' }}/>
          </li>
        ))}
      </ul>
    </>
  );
}

export default Books;