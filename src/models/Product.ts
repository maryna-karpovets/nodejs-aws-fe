import * as Yup from 'yup';

export type Product = {
  id: string;
  title: string;
  description: string;
  price: number;
  image_url?: string;
  count?: number;
};

export const ProductSchema = Yup.object().shape({
  title: Yup.string().required(),
  description: Yup.string(),
  price: Yup.number().required(),
  image_url: Yup.string(),
  count: Yup.number(),
});
