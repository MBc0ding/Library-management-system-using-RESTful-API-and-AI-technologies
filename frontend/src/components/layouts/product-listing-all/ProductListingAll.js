import React, { useState } from "react";
import "./productListingAll.styles.css";
import ProductListingCard from "../../cards/product-listing-card/ProductListingCard";

const ProductListingAll = ({ books }) => {
  const genres = Array.from(new Set(books.map((book) => book.genre)));
  const [currentIndices, setCurrentIndices] = useState(
    genres.reduce((acc, genre) => {
      acc[genre] = 0;
      return acc;
    }, {})
  );

  const scrollGenre = (genre, direction) => {
    setCurrentIndices((prevIndices) => {
      const newIndices = { ...prevIndices };
      const genreBooksCount = books.filter((book) => book.genre === genre).length;
      newIndices[genre] += direction * 5;  // Change to 5 instead of 4
      if (newIndices[genre] < 0) newIndices[genre] = 0;
      if (newIndices[genre] >= genreBooksCount) newIndices[genre] = genreBooksCount - 5;
      if (newIndices[genre] < 0) newIndices[genre] = 0;
      return newIndices;
    });
  };

  return (
    <div className="product-listing-all-container">
      {genres.map((genre) => (
        <div className="genre-section" key={genre}>
          <h2 className="genre-title">{genre}</h2>
          <div className="genre-books-wrapper">
            <button
              className="arrow-button arrow-left"
              onClick={() => scrollGenre(genre, -1)}
              disabled={currentIndices[genre] === 0}
            >
              &lt;
            </button>
            <div className="genre-books-container" data-genre={genre}>
              {books
                .filter((book) => book.genre === genre)
                .slice(currentIndices[genre], currentIndices[genre] + 5)  // Change to 5 instead of 4
                .map((book) => (
                  <ProductListingCard key={book.id} bookData={book} />
                ))}
            </div>
            <button
              className="arrow-button arrow-right"
              onClick={() => scrollGenre(genre, 1)}
              disabled={currentIndices[genre] + 5 >= books.filter((book) => book.genre === genre).length}  // Change to 5 instead of 4
            >
              &gt;
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductListingAll;
