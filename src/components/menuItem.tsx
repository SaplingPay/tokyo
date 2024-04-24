import React from 'react';
import { HeartOutlined, HeartTwoTone } from '@ant-design/icons';

type MenuItemProps = {
    item: any;
    menuId: string;
    venueId: string;
    quantity: number;
    handleAddItem: (item: any, menuId: string) => void;
    handleRemoveItem: (item: any, menuId: string) => void;
    toggleSave: (item: any, venueId: string, menuId: string) => void;
    storedSaves: any[];
};

const MenuItem: React.FC<MenuItemProps> = ({
    item,
    menuId,
    venueId,
    quantity,
    handleAddItem,
    handleRemoveItem,
    toggleSave,
    storedSaves
}) => {
    return (
        <div className='flex mb-6'>
            <p className='text-base'>{item.name}</p>
            <div className='ml-auto flex items-center h-max'>
                {quantity === 0 ? (
                    <>
                        {item.price > 0 && (
                            <button 
                                className='p-1.5 border-solid border-[#12411B] bg-[#12411B] text-[#F5FFBE] border-1.5 h-max rounded-full ml-2'
                                onClick={() => handleAddItem(item, menuId)}
                            >
                                ADD €{item.price.toFixed(2)}
                            </button>
                        )}
                    </>
                ) : (
<div className='flex items-center'>
    <button 
        onClick={() => handleRemoveItem(item, menuId)}
        style={{
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
        }}
    >
        −
    </button>
    <span 
        className='mx-2'
        style={{
            display: 'inline-block',
            minWidth: '18px', 
            textAlign: 'center',
            fontSize: '1rem', 
        }}
    >
        {quantity}
    </span>
    <button 
        onClick={() => handleAddItem(item, menuId)}
        style={{
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
        }}
    >
        +
    </button>
</div>

                )}
                <button className='border-none bg-transparent' onClick={() => toggleSave(item, venueId, menuId)}>
                    {storedSaves?.find((s: any) => s.menu_item_id === item.id) ? 
                        <HeartTwoTone twoToneColor="red" style={{ fontSize: "1.5em", marginLeft: ".5em", }} /> : 
                        <HeartOutlined style={{ fontSize: "1.5em", color: "lightgray", marginLeft: ".5em", }} />
                    }
                </button>
            </div>
        </div>
    );
};

export default MenuItem;
