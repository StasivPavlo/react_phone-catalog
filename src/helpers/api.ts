import { PreviewProduct } from './Types';

const BASE_URL = 'http://localhost:3000/api/';

export const PREVIEW_PRODUCTS_URL = 'products.json';

export const getData = async <T>(data: string): Promise<T> => {
  const response = await fetch(`${BASE_URL}${data}`);

  return response.json();
};

export const getPhones = async (): Promise<PreviewProduct[]> => {
  const data = await getData<PreviewProduct[]>(PREVIEW_PRODUCTS_URL);

  return data.filter(item => item.category === 'phones');
};
