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
        <div className='flex mb-6' style={{ minHeight: '32px', maxHeight: '32px' }}>
            <p className='text-base'>{item.name}</p>
            <div className='ml-auto flex items-center'>
                {quantity === 0 ? (
                    <>
                        {item.price > 0 && (
                            <button 
                                className='p-2 border-solid border-[#12411B] bg-[#12411B] text-[#F5FFBE] border-1.5 h-max rounded-full ml-2'
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
                            style={buttonStyle}
                        >
                            −
                        </button>
                        <span className='mx-2'>{quantity}</span>
                        <button 
                            onClick={() => handleAddItem(item, menuId)}
                            style={buttonStyle}
                        >
                            +
                        </button>
                    </div>
                )}
                <button className='border-none bg-transparent' onClick={() => toggleSave(item, venueId, menuId)}>
                    {storedSaves?.find((s: any) => s.menu_item_id === item.id) ? 
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
    margin: '0.5em'
};

export default MenuItem;
