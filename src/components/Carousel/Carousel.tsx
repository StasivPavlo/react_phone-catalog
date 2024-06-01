import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import { getAdjacentImages } from './helpers';
import { Button, CarouselIndicators, List } from './subcomponents';
import { CarouselImgData } from '../../helpers/Types';

import './Carousel.scss';

interface Props {
  display: boolean;
  imagesData: CarouselImgData[];
  autoplayDelay: number;
  animationDuration: number;
  withControls: boolean;
  withIndicators: boolean;
  animationType: string;
}

export function Carousel(props: Props) {
  const {
    display,
    imagesData,
    autoplayDelay,
    animationDuration,
    withControls,
    withIndicators,
    animationType,
  } = props;

  const [imagesList, setImagesList] = useState<CarouselImgData[]>([]);
  const [currentImg, setCurrentImg] = useState(0);
  const [animation, setAnimation] = useState<null | string>(null);
  const [nextCurrentImage, setNextCurrentImage] = useState(0);
  const [isAutoplay, setIsAutoplay] = useState(true);
  const autoplayRef = useRef<NodeJS.Timeout>();

  const { nextImg, prevImg } = useMemo(() => {
    return getAdjacentImages(currentImg, imagesList.length - 1);
  }, [currentImg, imagesList]);

  const isSwipeable = useMemo(() => imagesList.length > 1, [imagesList]);

  useEffect(() => {
    if (imagesData) {
      setImagesList(imagesData);
    }
  }, [imagesData]);

  const goToNextImage = useCallback(() => {
    if (autoplayRef.current) {
      clearTimeout(autoplayRef.current);
    }

    setNextCurrentImage(nextImg);
    setAnimation('next');

    setTimeout(() => {
      setAnimation(null);
      setCurrentImg(nextImg);
    }, animationDuration);
  }, [nextImg, animationDuration]);

  const goToPrevImage = () => {
    if (autoplayRef.current) {
      clearTimeout(autoplayRef.current);
    }

    setNextCurrentImage(prevImg);
    setAnimation('prev');

    setTimeout(() => {
      setAnimation(null);
      setCurrentImg(prevImg);
    }, animationDuration);
  };

  const goToImage = (index: number) => {
    if (autoplayRef.current) {
      clearTimeout(autoplayRef.current);
    }

    setNextCurrentImage(index);

    setAnimation(index > currentImg ? 'next' : 'prev');

    setTimeout(() => {
      setAnimation(null);
      setCurrentImg(index);
    }, animationDuration);
  };

  useEffect(() => {
    if (autoplayDelay && isAutoplay && isSwipeable) {
      autoplayRef.current = setTimeout(() => {
        goToNextImage();
      }, autoplayDelay);
    } else if (autoplayRef.current) {
      clearTimeout(autoplayRef.current);
    }
  }, [currentImg, autoplayDelay, isAutoplay, isSwipeable, goToNextImage]);

  if (!display || !imagesList.length) {
    return null;
  }

  return (
    <div className="carousel-wraper">
      <div className="carousel">
        <div
          className="carousel__inner"
          onMouseEnter={() => setIsAutoplay(false)}
          onMouseLeave={() => setIsAutoplay(true)}
        >
          {withControls && (
            <Button
              disabled={!!animation || !isSwipeable}
              onClick={goToPrevImage}
              type="prev"
            />
          )}

          <List
            imagesList={imagesList}
            currentImg={currentImg}
            nextCurrentImage={nextCurrentImage}
            animationType={animationType}
            animation={animation}
            animationDuration={animationDuration}
          />

          {withControls && (
            <Button
              disabled={!!animation || !isSwipeable}
              onClick={goToNextImage}
              type="next"
            />
          )}
        </div>

        {withIndicators && (
          <CarouselIndicators
            imagesList={imagesList}
            currentImg={currentImg}
            nextCurrentImage={nextCurrentImage}
            isAnimated={!!animation}
            goToImage={goToImage}
          />
        )}
      </div>
    </div>
  );
}
