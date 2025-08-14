import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ProductCard from './ProductCard';
import { test, expect, vi } from 'vitest';

const product = {
  id: 1,
  name: 'Banana - 500 G',
  image: '/banana.png',
  price: 1.2
};

test('показывает имя и вес в нижнем регистре', () => {
  render(<ProductCard product={product} />);
  expect(screen.getByText(/banana/i)).toBeInTheDocument();
  expect(screen.getByText(/500 g/i)).toBeInTheDocument();
});

test('меняет локальный счётчик при + и не уходит ниже 1 при -', async () => {
  render(<ProductCard product={product} />);

  // изначально 1
  expect(screen.getByText('1')).toBeInTheDocument();

  await userEvent.click(screen.getByRole('button', { name: '+' }));
  expect(screen.getByText('2')).toBeInTheDocument();

  await userEvent.click(screen.getByRole('button', { name: '-' }));
  expect(screen.getByText('1')).toBeInTheDocument();

  // ещё раз "-" — остаётся 1
  await userEvent.click(screen.getByRole('button', { name: '-' }));
  expect(screen.getByText('1')).toBeInTheDocument();
});

test('по клику AddButton вызывает onAddToCart с текущим количеством и сбрасывает его до 1', async () => {
  const onAddToCart = vi.fn();
  render(<ProductCard product={product} onAddToCart={onAddToCart} />);

  // увеличим до 2
  await userEvent.click(screen.getByRole('button', { name: '+' }));
  expect(screen.getByText('2')).toBeInTheDocument();

  // добавляем
  await userEvent.click(screen.getByRole('button', { name: /добавить в корзину/i }));

  expect(onAddToCart).toHaveBeenCalledWith(product, 2);
  expect(screen.getByText('1')).toBeInTheDocument();
});