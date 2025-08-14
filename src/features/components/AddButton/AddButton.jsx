import styles from './AddButton.module.scss';
const AddButton = ({ onClick, disabled = false }) => {
    return (<button className={styles.addButton} onClick={onClick} disabled={disabled} aria-label={"Добавить в корзину"}>
      
    </button>);
};
export default AddButton;
