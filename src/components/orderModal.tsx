import { orderStore } from '@/app/store/state'
import { MinusOutlined, PlusOutlined, ShoppingCartOutlined } from '@ant-design/icons'
import { Badge, Button, List, Modal } from 'antd'
import Link from 'next/link'
import React, { useEffect } from 'react'

type Props = {
    openModal: boolean
    setOpenModal: (open: boolean) => void
}

const OrderModal = (props: Props) => {
    const { order, increaseQty, decreaseQty } = orderStore()

    return (
        <Modal
            open={props.openModal}
            onCancel={() => props.setOpenModal(false)}
            footer={null}
            closable={false}
            maskClosable={true}
            centered
            width={300}
        >
            <div className="text-center pb-2">
                <p className="text-lg font-bold">Your Order</p>
                <p>All transactions contribute to reforestation</p>
                <List
                    itemLayout="horizontal"
                    dataSource={order}
                    style={{ marginBottom: "1.5em" }}
                    renderItem={item => (
                        <List.Item actions={[
                            <Button key={"1"} onClick={() => decreaseQty(item.id)} icon={<MinusOutlined />} />,
                            <Button key={"2"} onClick={() => increaseQty(item.id)} icon={<PlusOutlined />} />
                        ]}>
                            <List.Item.Meta
                                style={{ textAlign: 'left' }}
                                title={item.name}
                                description={`€${item.price}`}
                            />
                            <div>{item.qty}</div>
                        </List.Item>
                    )}
                />

                {/* <p className="font-bold mt-2 mb-2">Total: ${order.reduce((acc, item) => acc + (item.price * item.qty), 0)}</p> */}

                <Badge count={order.reduce((a, b) => a + b.qty, 0)}>
                    <Button type="primary" shape="round" icon={<ShoppingCartOutlined />} size="large">
                        Checkout - €{order.reduce((acc, item) => acc + (item.price * item.qty), 0)}
                    </Button>
                </Badge>
            </div>
        </Modal>
    )
}

export default OrderModal