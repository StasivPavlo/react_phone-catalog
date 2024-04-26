import { useMemo } from 'react';

import classNames from 'classnames';
import { getClassNamesItem } from './helpers';
import { CarouselImgData } from '../../helpers/Types';

interface ItemProps {
  classes: string;
  style: { height: number; animationDuration: string; transition: string } | {};
  url: string;
  title: string;
  animationDuration: number;
}

function Item({ classes, style, url, title, animationDuration }: ItemProps) {
  return (
    <div className={classes} style={style}>
      <img
        alt={title}
        src={url}
        className="carousel__image"
        style={{ transitionDuration: `${animationDuration}ms` }}
      />
    </div>
  );
}

interface ListProps {
  imagesList: CarouselImgData[];
  currentImg: number;
  nextCurrentImage: number;
  animation: null | string;
  animationDuration: number;
  animationType: string;
}

export function List(props: ListProps) {
  const {
    imagesList,
    currentImg,
    nextCurrentImage,
    animation,
    animationDuration,
    animationType,
  } = props;

  const style: { animationDuration: string; transition: string } | {} =
    useMemo(() => {
      if (animationType === 'slide') {
        return {
          animationDuration: `${animationDuration}ms`,
          transition: `transform ${animationDuration}ms ease-in-out`,
        };
      }

      return {};
    }, [animationDuration, animationType]);

  return (
    <div className="carousel__list">
      {imagesList.map((image, index) => {
        const classes = getClassNamesItem(
          index,
          currentImg,
          nextCurrentImage,
          animation,
          animationType,
        );

        return (
          <Item
            key={image.src}
            classes={classes}
            url={image.src}
            animationDuration={animationDuration}
            style={style}
            title={image.title}
          />
        );
      })}
    </div>
  );
}

interface CarouselControlsProps {
  imagesList: CarouselImgData[];
  currentImg: number;
  nextCurrentImage: number;
  isAnimated: boolean;
  goToImage: (index: number) => void;
}

export function CarouselIndicators(props: CarouselControlsProps) {
  const { imagesList, currentImg, nextCurrentImage, isAnimated, goToImage } =
    props;

  return (
    <div className="carousel__indicator-list">
      {imagesList.map((imageData: CarouselImgData, index: number) => (
        <button
          key={imageData.src}
          type="button"
          className={classNames('carousel__indicator-item', {
            active: index === nextCurrentImage,
          })}
          onClick={() => goToImage(index)}
          disabled={isAnimated || index === currentImg}
          aria-label={`Go to slide ${index + 1}`}
        />
      ))}
    </div>
  );
}

export const NextButtonIcon = () => (
  <svg className="carousel__next-icon" viewBox="0 0 16 16">
    <path
      d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6
      6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"
    />
  </svg>
);

export const PrevButtonIcon = () => (
  <svg className="carousel__prev-icon" viewBox="0 0 16 16">
    <path
      d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647
      5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"
    />
  </svg>
);

const ButtonIcons = {
  next: <NextButtonIcon />,
  prev: <PrevButtonIcon />,
};

interface ButtonProps {
  disabled: boolean;
  onClick: () => void;
  type: 'next' | 'prev';
}

export function Button({ disabled, onClick, type }: ButtonProps) {
  return (
    <button
      type="button"
      className={classNames(`carousel__${type}-button`, { disabled })}
      onClick={onClick}
    >
      {ButtonIcons[type]}
    </button>
  );
}
