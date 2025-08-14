import Logo from '../Logo/Logo';
import CartButton from '../cartButton/CartButton';
import styles from './Header.module.scss';
const Header = ({ cartCount, cartItems, onUpdateQuantity, total }) => {
    return (<header className={styles.header}>
      <Logo />
      <CartButton quantity={cartCount} cartItems={cartItems} onUpdateQuantity={onUpdateQuantity} total={total}/>
    </header>);
};
export default Header;
