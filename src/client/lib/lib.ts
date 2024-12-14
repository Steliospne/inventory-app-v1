import { Product } from "../../types/models";

export const dateYearMonthFormatter = (obj: {[key: string]:string}): string => {
  const date = obj.month.split('T')[0];
  const month = date.slice(0, -3);
  return month;
};

export const mapDayOfWeek = (obj: {[key: string]:number}): string => {
  const week = ['Sun', 'Mon', 'Tue', 'Wen', 'Thu', 'Fri', 'Sat'];
  return week[obj.day_of_week];
};
 
 export const productFromFormData = (formDataObj: { [key: string]: FormDataEntryValue }): Product => {
  return {
    id: Number(formDataObj.id),
    name: formDataObj.name as string,
    category: formDataObj.category as string, 
    price: Number(formDataObj.price),
    stock: Number(formDataObj.stock),
    isAvailable: Boolean(formDataObj.isAvailable),
    createdAt: new Date(formDataObj.createdAt as string),
    updatedAt: new Date(formDataObj.updatedAt as string)
  };
 };
 
