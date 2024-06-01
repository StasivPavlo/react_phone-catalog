export interface CarouselImgData {
  src: string;
  title: string;
}

export enum ProductType {
  PHONE = 'phone',
  TABLET = 'tablet',
  ACCESSORY = 'accessory',
}

export interface PreviewProduct {
  id: string;
  itemId: string;
  type: ProductType;
  image: string;
  name: string;
  snippet: string;
  price: number;
  fullPrice: number;
  discount: number;
  screen: string;
  capacity: string;
  ram: string;
  year: number;
  category: string;
  [key: string]: string | number;
}
