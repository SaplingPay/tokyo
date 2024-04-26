'use client'
import React, { useState } from 'react';
import { Card, Button, List, Avatar, Badge, Modal } from 'antd';
import {
  MinusOutlined,
  PlusOutlined,
  ShoppingCartOutlined,
  UserOutlined,
} from '@ant-design/icons';

interface MenuItem {
  name: string;
  price: number;
  image: string;
}

const menuItems: MenuItem[] = [
  // Assuming images are hosted and these are the paths
  { name: 'Kombucha', price: 5, image: '' },
  { name: 'Sparkling Water', price: 3, image: '' },
  { name: 'Energy Drink', price: 5, image: '' },
  { name: 'Soda', price: 5, image: '' },
];

const MenuOrder: React.FC = () => {
  const [order, setOrder] = useState<Map<string, number>>(new Map());
  const [total, setTotal] = useState<number>(0);

  const addToOrder = (item: MenuItem) => {
    setOrder(new Map(order.set(item.name, (order.get(item.name) || 0) + 1)));
    setTotal(total + item.price);
  };

  const removeFromOrder = (item: MenuItem) => {
    const currentQty = order.get(item.name) || 0;
    if (currentQty > 0) {
      setOrder(new Map(order.set(item.name, currentQty - 1)));
      setTotal(total - item.price);
    }
  };

  const handleCheckout = () => {
    Modal.info({
      title: 'Checkout',
      content: 'go to checkout page',
    });
  };

  return (
    <div style={{ padding: '1rem' }}>
      <h2>King’s Day Menu</h2>
      <p>All transactions contribute to reforestation</p>
      <List
        itemLayout="horizontal"
        dataSource={menuItems}
        renderItem={item => (
          <List.Item actions={[
            <Button key={"1"} onClick={() => removeFromOrder(item)} icon={<MinusOutlined />} />,
            <Button key={"2"} onClick={() => addToOrder(item)} icon={<PlusOutlined />} />
          ]}>
            <List.Item.Meta
              avatar={<Avatar shape="square" size="large" icon={<UserOutlined />} />}
              title={item.name}
              description={`$${item.price}`}
            />
            <div>{order.get(item.name) || 0}</div>
          </List.Item>
        )}
      />
      <div style={{ position: 'fixed', bottom: 20, width: '100%' }}>
        <Badge count={Array.from(order.values()).reduce((a, b) => a + b, 0)}>
          <Button type="primary" shape="round" icon={<ShoppingCartOutlined />} size="large" onClick={handleCheckout}>
            Checkout - ${total}
          </Button>
        </Badge>
      </div>
    </div>
  );
};

export default MenuOrder;
