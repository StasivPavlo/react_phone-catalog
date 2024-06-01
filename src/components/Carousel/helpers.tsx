import classNames from 'classnames';

export const getClassNamesItem = (
  index: number,
  currentImg: number,
  nextCurrentImage: number,
  animation: string | null,
  typeAnimation: string,
) => {
  const isActiveImage = index === currentImg;

  return classNames('carousel__item', typeAnimation, {
    active: isActiveImage,
    [`carousel-${typeAnimation}-item-next`]:
      nextCurrentImage === index && animation === 'next',
    [`carousel-${typeAnimation}-item-start`]:
      isActiveImage && animation === 'next',
    [`carousel-${typeAnimation}-item-prev`]:
      nextCurrentImage === index && animation === 'prev',
    [`carousel-${typeAnimation}-item-end`]:
      isActiveImage && animation === 'prev',
  });
};

export const getAdjacentImages = (currentImg: number, imagesCount: number) => {
  return {
    nextImg: (currentImg + 1) % (imagesCount + 1),
    prevImg: currentImg ? currentImg - 1 : imagesCount,
  };
};
