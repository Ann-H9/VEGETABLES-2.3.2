import styles from './Count.module.scss';
const Count = ({ value, onIncrease, onDecrease, onRemove }) => {
    const handleDecrease = () => {
        if (value > 1) {
            onDecrease();
        }
        else if (onRemove) {
            onRemove();
        }
        else {
            onDecrease();
        }
    };
    return (<div className={styles.flex}>
      <button className={styles.button} onClick={handleDecrease}>-</button>
      
      <span className={styles.counter}>{value}</span>
      
      <button className={styles.button2} onClick={onIncrease}>+</button>
    </div>);
};
export default Count;
