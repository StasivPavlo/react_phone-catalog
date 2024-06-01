import { FC } from 'react';
import classNames from 'classnames';

import './ItemButton.scss';

interface Props {
  isAddedToCart: boolean;
  isLiked: boolean;
  onLikeClick: () => void;
  onAddToCartClick: () => void;
}

export const ItemButton: FC<Props> = ({
  isAddedToCart,
  isLiked,
  onLikeClick,
  onAddToCartClick,
}) => {
  return (
    <div className="item-button">
      <button
        className={classNames('add-to-cart-button', {
          selected: isAddedToCart,
        })}
        type="button"
        onClick={onAddToCartClick}
      >
        Add to cart
      </button>
      <button
        className="like-button small-button"
        type="button"
        onClick={onLikeClick}
      >
        like {isLiked ? '❤️' : '🤍'}
      </button>
    </div>
  );
};
