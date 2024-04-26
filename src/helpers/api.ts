import { PreviewProduct } from './Types';

const BASE_URL = 'https://mate-academy.github.io/react_phone-catalog';

export const PREVIEW_PRODUCTS_URL = '/_new/products.json';

export const getData = async <T>(data: string): Promise<T> => {
  const response = await fetch(`${BASE_URL}${data}`);

  return response.json();
};

export const getPhones = async (): Promise<PreviewProduct[]> => {
  const data = await getData<PreviewProduct[]>(PREVIEW_PRODUCTS_URL);

  return data.filter(item => item.category === 'phones');
};
