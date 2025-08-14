import { render, screen } from '@testing-library/react';
import { expect, test, vi } from 'vitest';
import ProductsList from './ProductList';
import userEvent from '@testing-library/user-event';

vi.mock('@/shared/api/ProductService', () => {
  return {
    fetchProduct: vi.fn()
  };
});

import { fetchProduct } from '@/shared/api/ProductService';

const fetchMock = fetchProduct as unknown as ReturnType<typeof vi.fn>;

test('показывает "Загрузка..." и затем список продуктов', async () => {
  fetchMock.mockResolvedValueOnce([
    { id: 1, name: 'Tomato - 1 KG', image: '/t.png', price: 2.5 },
    { id: 2, name: 'Cucumber - 500 G', image: '/c.png', price: 1.7 }
  ]);

  render(<ProductsList onAddToCart={() => {}} />);

  expect(screen.getByText(/загрузка/i)).toBeInTheDocument();

  expect(await screen.findByText(/tomato/i)).toBeInTheDocument();
  expect(screen.getByText(/cucumber/i)).toBeInTheDocument();
});

test('показывает ошибку при неудачной загрузке', async () => {
  fetchMock.mockRejectedValueOnce(new Error('Network'));

  render(<ProductsList />);

  expect(await screen.findByText(/ошибка/i)).toBeInTheDocument();
  expect(screen.getByText(/network/i)).toBeInTheDocument();
});