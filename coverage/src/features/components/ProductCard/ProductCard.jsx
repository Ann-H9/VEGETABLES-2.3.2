import { useState } from 'react';
import { AddButton } from "../AddButton";
import Count from "../Count/Count";
import styles from './ProductCard.module.scss';
const ProductCard = ({ product, onAddToCart }) => {
    const [quantity, setQuantity] = useState(1);
    const [productName, weight] = product.name.split(" - ");
    const handleIncrease = () => {
        setQuantity(prev => prev + 1);
    };
    const handleDecrease = () => {
        if (quantity > 1) {
            setQuantity(prev => prev - 1);
        }
    };
    const handleAddToCart = () => {
        if (onAddToCart) {
            onAddToCart(product, quantity);
            setQuantity(1);
        }
    };
    return (<div className={styles.card}>
      <img className={styles.img} src={product.image} alt={productName} onError={(e) => {
            e.target.style.display = 'none';
        }}/>

      <div className={styles.flex}>
        <span className={styles.productName}>
          {productName}
          {weight && <span className={styles.weight}> {weight.toLowerCase()}</span>}
        </span>
        <Count value={quantity} onIncrease={handleIncrease} onDecrease={handleDecrease}/>
      </div>

      <div className={styles.flex2}>
        <span>${product.price}</span>
        <AddButton onClick={handleAddToCart} quantity={quantity}/>
      </div>
    </div>);
};
export default ProductCard;
