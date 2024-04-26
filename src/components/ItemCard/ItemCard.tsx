import { FC } from 'react';

import { PreviewProduct } from '../../helpers/Types';
import { ItemButton } from '../ItemButton/ItemButton';

import './ItemCard.scss';

interface Props {
  cardRef?: { current: HTMLDivElement | null };
  product: PreviewProduct;
}

export const ItemCard: FC<Props> = ({ cardRef, product }) => {
  return (
    <div ref={cardRef} className="product-card">
      <div className="product-card__image-container">
        <img
          className="product-card__image"
          src={`./new/${product.image}`}
          alt={product.name}
        />
      </div>
      <span className="product-card__name">{product.name}</span>
      <div className="product-card__price">
        <span className="product-card__current-price">{`$${product.price}`}</span>
        <span className="product-card__full-price">{`$${product.fullPrice}`}</span>
      </div>
      <div className="break-line" />
      <div className="product-card__brief-description">
        <ul className="product-card__specification-list specs-list">
          <li className="specs-list__item">
            <span className="specs-list__label">Screen</span>
            <span className="specs-list__value">{product.screen}</span>
          </li>
          <li className="specs-list__item">
            <span className="specs-list__label">Capacity</span>
            <span className="specs-list__value">{product.capacity}</span>
          </li>
          <li className="specs-list__item">
            <span className="specs-list__label">RAM</span>
            <span className="specs-list__value">{product.ram}</span>
          </li>
        </ul>
      </div>
      <div className="product-card__buttons">
        <ItemButton
          isAddedToCart={false}
          isLiked={false}
          onLikeClick={() => {}}
          onAddToCartClick={() => {}}
        />
      </div>
    </div>
  );
};

ItemCard.defaultProps = {
  cardRef: { current: null },
};
