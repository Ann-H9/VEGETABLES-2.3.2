import styles from "./CartButton.module.scss";
import { useState } from "react";
import Modal from 'react-modal';
import Count from '../Count/Count';
const CartButton = ({ quantity, cartItems, onUpdateQuantity, total }) => {
    const [modalIsOpen, setModalIsOpen] = useState(false);
    return (<>
      <div>
        <button onClick={() => setModalIsOpen(true)} className={styles.cartButton} aria-label="Корзина">
          {quantity > 0 && <span className={styles.cartButton__quantity}>{quantity}</span>}
        </button>
        <Modal isOpen={modalIsOpen} onRequestClose={() => setModalIsOpen(false)} className={`${styles.modal} ${cartItems.length === 0 ? styles.cartEmpty : ''}`} overlayClassName={styles.overlay}>
          <div className={`${styles.popup}`}>
            {cartItems.length === 0 ? (<p className={styles.cartEmpty__text}>You cart is empty!</p>) : (<>
                <div className={styles.cartItems}>
                  {cartItems.map(item => (<div key={item.id} className={styles.cartItem}>
                      <img src={item.image} alt={item.name} className={styles.cartItemImage} onError={(e) => {
                    e.target.style.display = 'none';
                }}/>
                      <div className={styles.cartItemInfo}>
                        <h4 className={styles.cartItemTitle}>{item.name.split(" - ")[0]}</h4>
                        <p className={styles.cartItemPrice}>${item.price} × {item.quantity} = ${(item.price * item.quantity).toFixed(2)}</p>
                      </div>
                      <Count value={item.quantity} onIncrease={() => onUpdateQuantity(item.id, item.quantity + 1)} onDecrease={() => onUpdateQuantity(item.id, item.quantity - 1)}/>
                    </div>))}
                </div>
                <div className={styles.cartTotal}>
                  <h3>Total: ${total.toFixed(2)}</h3>
                </div>
              </>)}
          </div>
        </Modal>
      </div>
    </>);
};
export default CartButton;
