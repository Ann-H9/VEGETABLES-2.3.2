import { render, screen, within } from '@testing-library/react';
import Header from './Header';
import { test, expect } from 'vitest';
test('рендерит логотип и кнопку корзины', () => {
    render(<Header cartCount={0} cartItems={[]} onUpdateQuantity={() => { }} total={0}/>);
    expect(screen.getByAltText(/магазин овощей/i)).toBeInTheDocument();
    const cartBtn = screen.getByRole('button', { name: /корзина/i });
    expect(cartBtn).toBeInTheDocument();
});
test('показывает бейдж количества при cartCount>0', () => {
    render(<Header cartCount={3} cartItems={[]} onUpdateQuantity={() => { }} total={0}/>);
    const cartBtn = screen.getByRole('button', { name: /корзина/i });
    expect(within(cartBtn).getByText('3')).toBeInTheDocument();
});
