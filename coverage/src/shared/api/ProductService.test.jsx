import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { fetchProduct } from './ProductService';
const URL = 'https://res.cloudinary.com/sivadass/raw/upload/v1535817394/json/products.json';
describe('fetchProduct', () => {
    let fetchMock;
    beforeEach(() => {
        fetchMock = vi.fn();
        globalThis.fetch = fetchMock;
    });
    afterEach(() => {
        vi.restoreAllMocks();
    });
    it('возвращает продукты и вызывает правильный URL при ok=true', async () => {
        const mockProducts = [
            { id: 1, name: 'Apple - 1 Kg', price: 3, image: '/apple.png', category: 'Fruits', quantity: 1 },
            { id: 2, name: 'Tomato - 1 Kg', price: 2, image: '/tomato.png' }
        ];
        fetchMock.mockResolvedValue({
            ok: true,
            json: vi.fn().mockResolvedValue(mockProducts)
        });
        const result = await fetchProduct();
        expect(fetchMock).toHaveBeenCalledTimes(1);
        expect(fetchMock).toHaveBeenCalledWith(URL);
        expect(result).toEqual(mockProducts);
    });
    it('бросает ошибку с сообщением "не удалось получить данные", когда ok=false', async () => {
        fetchMock.mockResolvedValue({
            ok: false,
            json: vi.fn() // не должен вызываться
        });
        await expect(fetchProduct()).rejects.toThrow('не удалось получить данные');
        expect(fetchMock).toHaveBeenCalledWith(URL);
    });
    it('пробрасывает сетевую ошибку и логирует "Не работает"', async () => {
        const networkError = new Error('Network down');
        fetchMock.mockRejectedValue(networkError);
        const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => { });
        await expect(fetchProduct()).rejects.toBe(networkError);
        expect(consoleSpy).toHaveBeenCalledWith('Не работает');
        consoleSpy.mockRestore();
    });
});
