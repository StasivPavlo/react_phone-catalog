import React, { FC, useEffect, useState, useMemo } from 'react';
import { PreviewProduct } from '../helpers/Types';
import { getPhones } from '../helpers/api';
import { ItemCard } from '../components/ItemCard/ItemCard';
import { Pagination } from '../components/Pagination/Pagination';

const sortBy = (sort: string, products: PreviewProduct[]) => {
  let arr: PreviewProduct[] = [];

  switch (sort) {
    case 'year':
      arr = [...products].sort((a, b) => b.year - a.year);
      break;
    case 'name':
      arr = [...products].sort((a, b) => a.name.localeCompare(b.name));
      break;
    case 'price':
      arr = [...products].sort((a, b) => a.price - b.price);
      break;
    default:
      break;
  }

  return arr;
};

const PhonesPage: FC = React.memo(function PhonesPage() {
  const [products, setProducts] = useState<PreviewProduct[] | null>(null);
  const [productsSorted, setProductsSorted] = useState<PreviewProduct[] | null>(
    null,
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [sort, setSort] = useState('year');
  const [countProducts, setCountProducts] = useState(16);

  const countPages = useMemo(() => {
    if (products) {
      return Math.ceil(products.length / countProducts);
    }

    return 0;
  }, [products, countProducts]);

  useEffect(() => {
    getPhones()?.then(setProducts);
  }, []);

  const onSortChange = (event: React.ChangeEvent<HTMLSelectElement>) =>
    setSort(event.target.value);
  const onCountProductsChange = (event: React.ChangeEvent<HTMLSelectElement>) =>
    setCountProducts(+event.target.value);

  useEffect(() => {
    if (products) {
      setProductsSorted(sortBy(sort, products));
    }
  }, [sort, products]);

  return (
    <>
      <div className="caption">
        <h1 className="caption__title">Mobile phones</h1>
        {products && (
          <p className="caption__text">{`${products.length} models`}</p>
        )}
      </div>
      <div className="products">
        <div className="products__settings">
          <select name="sort" id="sort" value={sort} onChange={onSortChange}>
            <option value="year">Newest</option>
            <option value="name">Alphabetically</option>
            <option value="price">Cheapest</option>
          </select>
          <select
            name="countProducts"
            id="countProducts"
            value={countProducts}
            onChange={onCountProductsChange}
          >
            <option value="4">4</option>
            <option value="8">8</option>
            <option value="16">16</option>
          </select>
        </div>
        {productsSorted && (
          <>
            <div className="products__grid">
              {[...productsSorted]
                .slice(
                  countProducts * (currentPage - 1),
                  countProducts * (currentPage - 1) + countProducts,
                )
                .map(product => (
                  <ItemCard key={product.itemId} product={product} />
                ))}
            </div>
            <div className="products__pagination">
              <Pagination
                pageCount={countPages}
                siblingCount={4}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
              />
            </div>
          </>
        )}
      </div>
    </>
  );
});

export default PhonesPage;
