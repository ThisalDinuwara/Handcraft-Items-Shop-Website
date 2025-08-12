import React, { createContext, useContext, useState, ReactNode } from 'react';

interface OrderItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

interface Address {
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

interface Order {
  id: string;
  items: OrderItem[];
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  date: Date;
  address: Address;
  paymentMethod: string;
  canCancel: boolean;
}

interface OrderState {
  orders: Order[];
  createOrder: (items: OrderItem[], address: Address, paymentMethod: string) => string;
  cancelOrder: (orderId: string) => boolean;
}

const OrderContext = createContext<OrderState>({
  orders: [],
  createOrder: () => '',
  cancelOrder: () => false
});

export const OrderProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [orders, setOrders] = useState<Order[]>([]);

  const createOrder = (items: OrderItem[], address: Address, paymentMethod: string): string => {
    const orderId = `ORD-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
    const total = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    const newOrder: Order = {
      id: orderId,
      items: [...items],
      total,
      status: 'pending',
      date: new Date(),
      address: { ...address },
      paymentMethod,
      canCancel: true
    };

    setOrders(prev => [newOrder, ...prev]);
    return orderId;
  };

  const cancelOrder = (orderId: string): boolean => {
    setOrders(prev => prev.map(order => {
      if (order.id === orderId && order.canCancel) {
        const daysSinceOrder = (new Date().getTime() - order.date.getTime()) / (1000 * 60 * 60 * 24);
        if (daysSinceOrder <= 14 && order.status !== 'shipped' && order.status !== 'delivered') {
          return { ...order, status: 'cancelled' as const, canCancel: false };
        }
      }
      return order;
    }));
    return true;
  };

  return (
    <OrderContext.Provider value={{ orders, createOrder, cancelOrder }}>
      {children}
    </OrderContext.Provider>
  );
};

export { OrderContext };