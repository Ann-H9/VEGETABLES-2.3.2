import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { fetchProduct, type Product } from './ProductService';

const URL =
  'https://res.cloudinary.com/sivadass/raw/upload/v1535817394/json/products.json';

describe('fetchProduct', () => {
  let fetchMock: typeof fetch;

  beforeEach(() => {
    fetchMock = vi.fn() as unknown as typeof fetch;
    globalThis.fetch = fetchMock;
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('возвращает продукты и вызывает правильный URL при ok=true', async () => {
    const mockProducts: Product[] = [
      { id: 1, name: 'Apple - 1 Kg', price: 3, image: '/apple.png', category: 'Fruits', quantity: 1 },
      { id: 2, name: 'Tomato - 1 Kg', price: 2, image: '/tomato.png' }
    ];

    (fetchMock as any).mockResolvedValue({
      ok: true,
      json: vi.fn().mockResolvedValue(mockProducts)
    });

    const result = await fetchProduct();

    expect(fetchMock).toHaveBeenCalledTimes(1);
    expect(fetchMock).toHaveBeenCalledWith(URL);
    expect(result).toEqual(mockProducts);
  });

  it('бросает ошибку с сообщением "не удалось получить данные", когда ok=false', async () => {
    (fetchMock as any).mockResolvedValue({
      ok: false,
      json: vi.fn()
    });

    await expect(fetchProduct()).rejects.toThrow('не удалось получить данные');
    expect(fetchMock).toHaveBeenCalledWith(URL);
  });

  it('пробрасывает сетевую ошибку и логирует "Не работает"', async () => {
    const networkError = new Error('Network down');
    (fetchMock as any).mockRejectedValue(networkError);

    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

    await expect(fetchProduct()).rejects.toBe(networkError);
    expect(consoleSpy).toHaveBeenCalledWith('Не работает');

    consoleSpy.mockRestore();
  });
});