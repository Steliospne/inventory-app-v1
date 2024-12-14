export type Category = {
  id?: string,
  name: string,
  createdAt?: Date,
  updatedAt?: Date,
}

export type Categories = Category[];

export type Product = {
  id?: string | number,
  name: string,
  category: string,
  price: number,
  stock: number,
  isAvailable?: boolean,
  createdAt?: Date,
  updatedAt?: Date,
}

export type Products = Product[];


export type Supplier = {
  id: string | number,
  name: string,
  email: string,
  phone: string,
  createdAt: Date,
  updatedAt: Date,
  address: string,
  contactPerson: string,
}

export type Suppliers = Supplier[];

export type ValidationErrors = {
  [fieldName: string]: string[];
};