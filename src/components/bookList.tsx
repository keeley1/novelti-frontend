import React from "react";
import { Book } from "../models/book";
import MissingThumbnail from "./missingThumbnail";

interface BookListProps {
    books: Book[];
    onBookClick: (book: Book) => void;
}

function BookList({ books, onBookClick }: BookListProps) {
    return (
        <>
        {books.map((book, index) => (
        <div key={index} className="mb-6 bg-info flex gap-4 items-start">
          {book.thumbnail === "" ? (
                <MissingThumbnail />
              ) : (
              <img 
                onClick={() => onBookClick(book)}
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
                <h1 onClick={() => onBookClick(book)} className="cursor-pointer font-bold text-xl">{book.title}</h1>
                <p onClick={() => onBookClick(book)} className="cursor-pointer text-gray-400 hover:text-secondary">by {book.authors}</p>
                <p onClick={() => onBookClick(book)} className="cursor-pointer text-gray-400 hover:text-secondary">{book.publishedDate}</p>
              </div>
              <div className="mt-auto pt-8 text-right">
                <p className="text-gray-400">***** (4.7)</p>
                <p className="text-gray-400">300 pages</p>
              </div>
            </div>
          </div>
        </div>
        ))}
        </>
    )
};

export default BookList;