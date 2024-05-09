import React from 'react';
import { HeartOutlined, HeartTwoTone, MinusOutlined, PlusOutlined } from '@ant-design/icons';
import { orderStore } from '@/app/store/state';
import { Button } from 'antd';

type MenuItemProps = {
    item: any;
    menuId: string;
    venueId: string;
    toggleSave: (item: any, venueId: string, menuId: string) => void;
    storedSaves: any[];
    orderingSupported: boolean;
};

const MenuItem = (props: MenuItemProps) => {
    const { addToOrder, removeFromOrder, order, increaseQty, decreaseQty } = orderStore()


    const handleAddItem = (item: any, menuId: string) => {
        addToOrder({
            id: item.id,
            name: item.name,
            price: item.price,
            qty: 1
        });
    };

    const getQty = (id: string) => {
        const item = order.find((o: any) => o.id === id);
        return item ? item.qty : 0;
    }

    return (
        <div className='flex mb-6' style={{ minHeight: '32px', maxHeight: '56px' }}>
            <p className='text-base'>{props.item.name}</p>
            <div className='ml-auto flex items-center'>
                {props.orderingSupported ? getQty(props.item.id) === 0 ? (
                    <>
                        {props.item.price > 0 && (
                            <button
                                className='p-2 border-solid border-[#12411B] bg-[#12411B] text-[#F5FFBE] border-1.5 h-max rounded-full ml-2'
                                onClick={() => handleAddItem(props.item, props.menuId)}
                            >
                                ADD €{props.item.price.toFixed(2)}
                            </button>
                        )}
                    </>
                ) : (
                    <div className='flex items-center mb-1'>
                        <p style={{ marginRight: ".5em", fontWeight: "bold" }}>€{props.item.price.toFixed(2)}</p>
                        <button
                            onClick={() => decreaseQty(props.item.id)}
                            style={buttonStyle}
                        >
                            <MinusOutlined />
                        </button>
                        <span className='mx-2'>{getQty(props.item.id)}</span>
                        <button
                            onClick={() => increaseQty(props.item.id)}
                            style={buttonStyle}
                        >
                            <PlusOutlined />
                        </button>
                    </div>
                ) :

                    <>
                        {props.item.price > 0 && (
                            <button
                                className='p-2 border-solid border-[#12411B] bg-[#12411B] text-[#F5FFBE] border-1.5 h-max rounded-full ml-2'
                            >
                                €{props.item.price.toFixed(2)}
                            </button>
                        )}
                    </>
                }
                <button className='border-none bg-transparent' onClick={() => props.toggleSave(props.item, props.venueId, props.menuId)}>
                    {props.storedSaves?.find((s: any) => s.menu_item_id === props.item.id) ?
                        <HeartTwoTone twoToneColor="red" style={{ fontSize: "1.5em", marginLeft: ".5em" }} /> :
                        <HeartOutlined style={{ fontSize: "1.5em", color: "lightgray", marginLeft: ".5em" }} />
                    }
                </button>
            </div>
        </div>
    );
};

const buttonStyle = {
    width: '28px',
    height: '28px',
    borderRadius: '50%',
    border: '1px solid #12411B',
    display: 'inline-flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    fontSize: '1rem',
    color: '#12411B',
    cursor: 'pointer',
    margin: '0.5em 0.1em'
};

export default MenuItem;
