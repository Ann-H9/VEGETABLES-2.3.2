export type Product = {
  id: number;
  name: string;
  price: number;
  image: string;
  category?: string; 
  quantity?: number; 
};
export type CartItem = Product & {
  quantity: number;
};

export const fetchProduct = async (): Promise<Product[]> => {
 try {
    const response = await fetch('https://res.cloudinary.com/sivadass/raw/upload/v1535817394/json/products.json')

    if (!response.ok) {
    throw new Error ("не удалось получить данные")
    }
    return await response.json()
    } 
    catch (error) {
        console.error('Не работает')
        throw error;
    }
 
}