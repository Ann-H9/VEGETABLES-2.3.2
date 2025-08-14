import { useState } from 'react';
import './App.module.scss';
import Header from '@/features/components/Header/Header';
import ProductsList from '@/features/components/ProductList/ProductList';
import Title from '@/features/components/Title/Title';
import { Product } from '@/shared/api/ProductService';

type CartItem = Product & { quantity: number };

function App() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const addToCart = (product: Product, quantity: number) => {
    setCartItems(prev => {
      const existingItem = prev.find(item => item.id === product.id);
      return existingItem
        ? prev.map(item =>
            item.id === product.id
              ? { ...item, quantity: item.quantity + quantity }
              : item
          )
        : [...prev, { ...product, quantity }];
    });
  };

  const updateQuantity = (id: number, quantity: number) => {
    setCartItems(prev =>
      quantity <= 0
        ? prev.filter(item => item.id !== id)
        : prev.map(item =>
            item.id === id ? { ...item, quantity } : item
          )
    );
  };

  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const cartTotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <>
      <Header
        cartCount={cartCount}
        cartItems={cartItems}
        onUpdateQuantity={updateQuantity}
        total={cartTotal}
      />
      <Title />
      <ProductsList onAddToCart={addToCart} />
  </>
  );
}

export default App;