import React, { useEffect, useState } from "react";

const FrontendPagination = () => {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);

  const fetchProducts = async () => {
    const res = await fetch("https://dummyjson.com/products?limit=100");
    const data = await res.json();

    if (data && data.products) {
      setProducts(data.products);
    }
  };

  const selectedPageHandler = (selectedPage) => {
    const totalPages = Math.ceil(products.length / 10);
    if (
      selectedPage >= 1 &&
      selectedPage <= totalPages &&
      selectedPage !== page
    ) {
      setPage(selectedPage);
      setTimeout(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }, 0);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const totalPages = Math.ceil(products.length / 10);

  return (
    <>
      {products.length > 0 && (
        <div className="products">
          {products.slice((page - 1) * 10, page * 10).map((product) => {
            return (
              <span className="products__single" key={product.id}>
                <img src={product.thumbnail} alt={product.title} />
                <span className="title">{product.title}</span>
              </span>
            );
          })}
        </div>
      )}
      {products.length > 0 && (
        <div className="pagination">
          <span
            className={page > 1 ? "" : "pagination__disabled"}
            onClick={() => selectedPageHandler(page - 1)}
            aria-label="Previous Page"
          >
            ◀
          </span>
          {[...Array(totalPages)].map((_, i) => {
            return (
              <span
                className={page === i + 1 ? "pagination__selected" : ""}
                onClick={() => selectedPageHandler(i + 1)}
                key={i}
                aria-label={`Page ${i + 1}`}
              >
                {i + 1}
              </span>
            );
          })}
          <span
            className={page < totalPages ? "" : "pagination__disabled"}
            onClick={() => selectedPageHandler(page + 1)}
            aria-label="Next Page"
          >
            ▶
          </span>
        </div>
      )}
    </>
  );
};

export default FrontendPagination;
