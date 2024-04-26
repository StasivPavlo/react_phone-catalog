import { FC, SetStateAction, useEffect, useRef, useState } from 'react';
import { PreviewProduct } from '../../helpers/Types';

import './ProductSlider.scss';
import { ItemCard } from '../ItemCard/ItemCard';
import { CARD_WIDTH, DEVICE_WIDTH, SLIDER_GAP } from '../../helpers/constants';

interface Props {
  title: string;
  products: PreviewProduct[] | null;
}

const onWindowResize = (setVisibleCard: {
  (value: SetStateAction<number>): void;
  (arg0: number): void;
}): void => {
  const windowWidth = window.innerWidth;

  if (windowWidth < DEVICE_WIDTH.desktop && windowWidth > DEVICE_WIDTH.tablet) {
    setVisibleCard(3);
  } else if (
    windowWidth < DEVICE_WIDTH.tablet &&
    windowWidth > DEVICE_WIDTH.mobile
  ) {
    setVisibleCard(2);
  } else if (windowWidth < DEVICE_WIDTH.mobile) {
    setVisibleCard(1);
  } else {
    setVisibleCard(4);
  }
};

export const ProductSlider: FC<Props> = ({ title, products }) => {
  const [translateX, setTranslateX] = useState(0);
  const [preVisibleCard, setPreVisibleCard] = useState(4);
  const [visibleCard, setVisibleCard] = useState(4);

  const cardRef = useRef<HTMLDivElement | null>(null);
  const sliderRef = useRef<HTMLDivElement | null>(null);

  const step = 1 * (CARD_WIDTH + SLIDER_GAP);
  const lastTranslatePosition = products
    ? (products.length - visibleCard) * step
    : 0;

  useEffect(() => {
    setPreVisibleCard(visibleCard);

    if (translateX > 0) {
      setTranslateX(state => state + step * (preVisibleCard - visibleCard));
    }
  }, [preVisibleCard, step, translateX, visibleCard]);

  useEffect(() => {
    window.addEventListener('resize', () => onWindowResize(setVisibleCard));

    return () =>
      window.removeEventListener('resize', () =>
        onWindowResize(setVisibleCard),
      );
  }, []);

  const onNextButtonClick = () => setTranslateX(state => state + step);
  const onPrevButtonClick = () => setTranslateX(state => state - step);

  return (
    <div className="product-slider">
      <div className="product-slider__header">
        <h1 className="product-slider__title">{title}</h1>
        <div className="product-slider__control-buttons">
          <button
            className="product-slider__button small-button"
            type="button"
            onClick={onPrevButtonClick}
            disabled={translateX <= 0}
          >
            <svg
              className="product-slider__button-icon left"
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="inherit"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M3.52858 10.4712C3.26823 10.2109 3.26823 9.78878 3.52858
                9.52843L7.52858 5.52843C7.78892 5.26808 8.21103 5.26808 8.47138
                5.52843L12.4714 9.52843C12.7317 9.78878 12.7317 10.2109 12.4714
                10.4712C12.211 10.7316 11.7889 10.7316 11.5286 10.4712L7.99998
                6.94265L4.47138 10.4712C4.21103 10.7316 3.78892 10.7316 3.52858
                10.4712Z"
              />
            </svg>
          </button>
          <button
            className="product-slider__button small-button"
            type="button"
            onClick={onNextButtonClick}
            disabled={!!products && translateX + step > lastTranslatePosition}
          >
            <svg
              className="product-slider__button-icon right"
              width="16"
              height="16"
              viewBox="0 0 16 16"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M3.52858 10.4712C3.26823 10.2109 3.26823 9.78878 3.52858
                9.52843L7.52858 5.52843C7.78892 5.26808 8.21103 5.26808 8.47138
                5.52843L12.4714 9.52843C12.7317 9.78878 12.7317 10.2109 12.4714
                10.4712C12.211 10.7316 11.7889 10.7316 11.5286 10.4712L7.99998
                6.94265L4.47138 10.4712C4.21103 10.7316 3.78892 10.7316 3.52858
                10.4712Z"
              />
            </svg>
          </button>
        </div>
      </div>
      <div ref={sliderRef} className="product-slider__slider">
        <div
          className="wrap"
          style={{ transform: `translateX(${-translateX}px)` }}
          data-cy="cardsContainer"
        >
          {products?.map(product => (
            <ItemCard cardRef={cardRef} key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};
