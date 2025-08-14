import Logo from '../Logo/Logo';
import CartButton from '../cartButton/CartButton';
import styles from './Header.module.scss';
import { CartItem } from '@/shared/api/ProductService';

interface HeaderProps {
  cartCount: number;
  cartItems: CartItem[];
  onUpdateQuantity: (id: number, quantity: number) => void;
  total: number;
}

const Header = ({ cartCount, cartItems, onUpdateQuantity, total }: HeaderProps) => {
  return (
    <header className={styles.header}>
      <Logo />
      <CartButton
        quantity={cartCount}
        cartItems={cartItems}
        onUpdateQuantity={onUpdateQuantity}
        total={total}
      />
    </header>
  );
};

export default Header;