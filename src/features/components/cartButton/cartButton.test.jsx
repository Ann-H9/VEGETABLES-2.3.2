import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { expect, test, vi } from 'vitest';
vi.mock('react-modal', () => ({
    default: ({ isOpen, children }) => isOpen ? <div data-testid="modal">{children}</div> : null
}));
import CartButton from './CartButton';
const makeItem = (overrides) => ({
    id: 1,
    name: 'Apple - 1 KG',
    image: '/apple.png',
    price: 3,
    quantity: 2,
    ...overrides
});
test('открывает модалку и показывает пустую корзину', async () => {
    render(<CartButton quantity={0} cartItems={[]} onUpdateQuantity={() => { }} total={0}/>);
    await userEvent.click(screen.getByRole('button', { name: /корзина/i }));
    expect(screen.getByTestId('modal')).toBeInTheDocument();
    expect(screen.getByText(/you cart is empty!/i)).toBeInTheDocument();
});
test('показывает товары и итого, плюс вызывает onUpdateQuantity при +', async () => {
    const onUpdateQuantity = vi.fn();
    const items = [makeItem()];
    const total = items.reduce((s, i) => s + i.price * i.quantity, 0);
    render(<CartButton quantity={items.reduce((s, i) => s + i.quantity, 0)} cartItems={items} onUpdateQuantity={onUpdateQuantity} total={total}/>);
    await userEvent.click(screen.getByRole('button', { name: /корзина/i }));
    expect(screen.getByText(/^Apple$/)).toBeInTheDocument();
    expect(screen.getByText(/Total: \$6\.00/)).toBeInTheDocument();
    const plusBtn = screen.getAllByRole('button', { name: '+' })[0];
    await userEvent.click(plusBtn);
    expect(onUpdateQuantity).toHaveBeenCalledWith(items[0].id, items[0].quantity + 1);
});
