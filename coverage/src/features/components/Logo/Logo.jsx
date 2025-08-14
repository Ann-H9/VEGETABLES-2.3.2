import styles from './Logo.module.scss';
const Logo = () => {
    return (<img className={styles['img']} src='src/shared/assets/icons/logo.svg' alt='Магазин овощей' width={209} height={33}></img>);
};
export default Logo;
