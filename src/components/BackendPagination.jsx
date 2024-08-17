import React from "react";
import { useEffect, useState } from "react";

const BackendPagination = () => {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const fetchProducts = async () => {
    const res = await fetch(
      `https://dummyjson.com/products?limit=10&skip=${page * 10 - 10}`
    );

    const data = await res.json();

    if (data && data.products) {
      setProducts(data.products);
      setTotalPages(data.total / 10);
    }
  };

  const selectedPageHandler = (selectedPage) => {
    if (
      selectedPage >= 1 &&
      selectedPage <= totalPages &&
      selectedPage !== page
    )
      setPage(selectedPage);
  };

  useEffect(() => {
    fetchProducts();
  }, [page]);

  return (
    <>
      {products.length > 0 && (
        <div className="products">
          {products.map((product) => {
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
            className={page > 1 ? " " : "pagination__disabled"}
            onClick={() => selectedPageHandler(page - 1)}
          >
            ◀
          </span>
          {Array.from({ length: totalPages }, (_, i) => (
            <span
              className={page === i + 1 ? "pagination__selected" : ""}
              onClick={() => selectedPageHandler(i + 1)}
              key={i}
            >
              {i + 1}
            </span>
          ))}
          <span
            className={page < totalPages ? " " : "pagination__disabled"}
            onClick={() => selectedPageHandler(page + 1)}
          >
            ▶
          </span>
        </div>
      )}
    </>
  );
};

export default BackendPagination;

// import React, { useEffect, useState } from "react";

// const BackendPagination = () => {
//   const [products, setProducts] = useState([]);
//   const [page, setPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(0);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   const fetchProducts = async () => {
//     setLoading(true);
//     setError(null);
//     try {
//       const res = await fetch(
//         `https://dummyjson.com/products?limit=10&skip=${(page - 1) * 10}`
//       );
//       const data = await res.json();

//       if (data && data.products) {
//         setProducts(data.products);
//         setTotalPages(Math.ceil(data.total / 10));
//       }
//     } catch (err) {
//       setError("Failed to fetch products. Please try again later.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const selectedPageHandler = (selectedPage) => {
//     if (selectedPage >= 1 && selectedPage <= totalPages && selectedPage !== page) {
//       setPage(selectedPage);
//     }
//   };

//   useEffect(() => {
//     fetchProducts();
//   }, [page]);

//   return (
//     <>
//       {loading && <div>Loading...</div>}
//       {error && <div>{error}</div>}
//       {products.length > 0 && (
//         <div className="products">
//           {products.map((product) => (
//             <span className="products__single" key={product.id}>
//               <img src={product.thumbnail} alt={product.title} />
//               <span className="title">{product.title}</span>
//             </span>
//           ))}
//         </div>
//       )}
//       {products.length > 0 && (
//         <div className="pagination">
//           <span
//             className={page > 1 ? "" : "pagination__disabled"}
//             onClick={() => selectedPageHandler(page - 1)}
//           >
//             ◀
//           </span>
//           {Array.from({ length: totalPages }, (_, i) => (
//             <span
//               className={page === i + 1 ? "pagination__selected" : ""}
//               onClick={() => selectedPageHandler(i + 1)}
//               key={i}
//             >
//               {i + 1}
//             </span>
//           ))}
//           <span
//             className={page < totalPages ? "" : "pagination__disabled"}
//             onClick={() => selectedPageHandler(page + 1)}
//           >
//             ▶
//           </span>
//         </div>
//       )}
//     </>
//   );
// };

// export default BackendPagination;
