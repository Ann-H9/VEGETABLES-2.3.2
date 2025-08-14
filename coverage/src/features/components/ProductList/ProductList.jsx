import { useEffect, useState } from 'react';
import styles from './ProductList.module.scss';
import { fetchProduct } from '@/shared/api/ProductService';
import ProductCard from '../ProductCard/ProductCard';
const ProductsList = ({ onAddToCart }) => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    useEffect(() => {
        const loadProducts = async () => {
            try {
                const data = await fetchProduct();
                setProducts(data);
            }
            catch (error) {
                setError(error instanceof Error ? error.message : 'Не удалось загрузить товары');
            }
            finally {
                setLoading(false);
            }
        };
        loadProducts();
    }, []);
    if (loading)
        return <div className={styles.loading}>Загрузка...</div>;
    if (error)
        return <div className={styles.error}>Ошибка: {error}</div>;
    return (<div className={styles.productsGrid}>
    {products.map((product) => (<ProductCard key={product.id} product={product} onAddToCart={onAddToCart}/>))}
  </div>);
};
export default ProductsList;
