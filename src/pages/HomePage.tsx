/* eslint-disable @typescript-eslint/indent */
import { FC, useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Carousel } from '../components/Carousel/Carousel';
import { PreviewProduct } from '../helpers/Types';
import { ProductSlider } from '../components/ProductSlider/ProductSlider';
import { PREVIEW_PRODUCTS_URL, getData } from '../helpers/api';
import { CAROUSEL_IMG } from '../helpers/constants';

const HomePage: FC = () => {
  const [products, setProducts] = useState<PreviewProduct[] | null>(null);
  const [hotPriceProducts, setHotPriceProducts] = useState<
    PreviewProduct[] | null
  >(null);
  const [newProducts, setNewProducts] = useState<PreviewProduct[] | null>(null);

  const categoriesCountMoudel = useMemo(
    () => ({
      phone: products?.filter(product => product.category === 'phones').length,
      tablet: products?.filter(product => product.category === 'tablets')
        .length,
      accessory: products?.filter(product => product.category === 'accessories')
        .length,
    }),
    [products],
  );

  useEffect(() => {
    getData<PreviewProduct[]>(PREVIEW_PRODUCTS_URL)?.then(setProducts);
  }, []);

  useEffect(() => {
    if (products) {
      setHotPriceProducts(
        products
          .sort((a, b) => a.fullPrice - a.price - (b.fullPrice - b.price))
          .reverse(),
      );
      setNewProducts(
        products.filter(
          product => product.year === new Date('2019').getFullYear(),
        ),
      );
    }
  }, [products]);

  return (
    <>
      <section className="carousel">
        <Carousel
          display
          imagesData={CAROUSEL_IMG}
          autoplayDelay={5000}
          animationDuration={500}
          withControls
          withIndicators
          animationType="slide"
        />
      </section>

      <section className="hot-price">
        <ProductSlider title="Hot prices" products={hotPriceProducts} />
      </section>

      <section className="categories categories">
        <h1 className="categories__label">Shop by category</h1>
        <div className="categories__body">
          <Link to="/phones" className="categories__link">
            <div className="categories__category">
              <div className="categories__img categories__img--phones" />
              <h3 className="categories__name">Mobile phones</h3>
              <p className="categories__model-count">
                {`${categoriesCountMoudel.phone} models`}
              </p>
            </div>
          </Link>
          <Link to="/tablets" className="categories__link">
            <div className="categories__category">
              <div className="categories__img categories__img--tablets" />
              <h3 className="categories__name">Tablets</h3>
              <p className="categories__model-count">
                {`${categoriesCountMoudel.tablet} models`}
              </p>
            </div>
          </Link>

          <Link to="/accessories" className="categories__link">
            <div className="categories__category">
              <div className="categories__img categories__img--accessories" />
              <h3 className="categories__name">Accessories</h3>
              <p className="categories__model-count">
                {`${categoriesCountMoudel.accessory} models`}
              </p>
            </div>
          </Link>
        </div>
      </section>

      <section className="new-models">
        <ProductSlider title="Brand new models" products={newProducts} />
      </section>
    </>
  );
};

export default HomePage;
