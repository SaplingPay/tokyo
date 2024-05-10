import { Avatar, Badge, Button, Modal, Popconfirm } from 'antd'
import React, { useEffect, useState } from 'react'
import { orderStore, savedStore, userStore } from '@/app/store/state';
import { HeartOutlined, HeartTwoTone } from '@ant-design/icons';
import { useUser } from '@clerk/nextjs';
import { UpdateUser } from '@/app/actions';
import OrderModal from './orderModal';
import posthog from 'posthog-js';

type Props = {
    selectedVenue: any
}

const VenueInfo = (props: Props) => {

    const { user: clerkUser } = useUser();

    const { user, setUser } = userStore()
    const { storedSaves, storeSaves } = savedStore();
    const { addToOrder, removeFromOrder, order, increaseQty, decreaseQty } = orderStore()

    const [isModalVisible, setIsModalVisible] = useState(false);

    const handleViewOrder = () => {
        setIsModalVisible(true);
    };

    const handleCloseModal = () => {
        setIsModalVisible(false);
    };

    const toggleSave = () => {
        const vI = {
            type: "venue",
            venue_id: props.selectedVenue.id,
            name: props.selectedVenue.name,
            profile_pic_url: props.selectedVenue.profile_pic_url,
            location: props.selectedVenue.location
        }

        if (clerkUser) {
            if (storedSaves.find((s: any) => s.venue_id === props.selectedVenue.id)) {
                const data = {
                    id: user.id,
                    data: {
                        saves: user.saves.filter((s: any) => s.venue_id !== props.selectedVenue.id && s.type == "venue")
                    }
                }
                UpdateUser(data)
                    .then((res) => {
                        posthog.capture('UnsavedVenue', {
                            venue_id: props.selectedVenue.id,
                            venue_name: props.selectedVenue.name,
                            user_id: user.id
                        })
                        // console.log('res', res)
                        setUser(res)
                        const storeS = storedSaves.filter((s: any) => s.venue_id !== props.selectedVenue.id && s.type == "venue")
                        // console.log('storeS', storeS)
                        storeSaves(storeS)
                    })
                    .catch((err) => {
                        console.error(err)
                    })
            } else {
                const updatedSaves = [...user.saves, {
                    type: "venue",
                    venue_id: props.selectedVenue.id
                }]

                const data = {
                    id: user.id,
                    data: {
                        saves: updatedSaves
                    }
                }
                UpdateUser(data)
                    .then((res) => {
                        posthog.capture('SavedVenue', {
                            venue_id: props.selectedVenue.id,
                            venue_name: props.selectedVenue.name,
                            user_id: user.id
                        })
                        // console.log('res', res)
                        setUser(res)
                        const storeS = [...storedSaves, vI]
                        // console.log('storeS', storeS)
                        storeSaves(storeS)
                    })
                    .catch((err) => {
                        console.error(err)
                    })
            }

        } else {
            if (storedSaves.find((s: any) => s.venue_id === props.selectedVenue.id)) {
                const storeS = storedSaves.filter((s: any) => s.venue_id !== props.selectedVenue.id && s.type == "venue")
                storeSaves(storeS)
            } else {
                const storeS = [...storedSaves, vI]
                storeSaves(storeS)
            }
        }
    };

    useEffect(() => {
        posthog.capture('SelectedVenue', {
            venue_id: props.selectedVenue.id,
            venue_name: props.selectedVenue.name,
            user_id: user.id
        })
    }, [props.selectedVenue])

    return (
        <div className='flex'>
            <div className='flex'>
                {props.selectedVenue?.profile_pic_url ? (
                    <img
                        src={props.selectedVenue.profile_pic_url}
                        alt={''}
                        style={{
                            width: '60px',
                            height: '60px',
                            marginLeft: '.5em',
                            borderRadius: '50%',
                            objectFit: 'cover',
                        }}
                    />
                ) : (
                    <Avatar
                        style={{
                            backgroundColor: '#12411B',
                            color: '#F5FFBE',
                            marginLeft: '.5em',
                            minWidth: '60px',
                            minHeight: '60px',
                            maxWidth: '90px',
                            maxHeight: '90px',
                        }}
                    >
                        {props.selectedVenue?.name.toUpperCase()[0]}
                    </Avatar>
                )}
                {props.selectedVenue && (
                    <div className='flex-col ml-5 h-max my-auto mx-full'>
                        <div className='flex flex-row'>
                            <p className='font-bold text-lg'>{props.selectedVenue?.name}</p>
                            <button className='border-none bg-transparent mb-2 mr-4'>
                                {storedSaves.find(
                                    (s: any) => s.venue_id === props.selectedVenue.id && s.type == 'venue'
                                ) ? (
                                    <Popconfirm
                                        title='This will also remove all saved items from this place'
                                        onConfirm={toggleSave}
                                        okText='Ok'
                                        cancelText='Cancel'
                                    >
                                        <HeartTwoTone twoToneColor='red' style={{ fontSize: '1.5em', marginLeft: '.5em' }} />
                                    </Popconfirm>
                                ) : (
                                    <HeartOutlined
                                        style={{ fontSize: '1.5em', color: 'lightgray', marginLeft: '.5em' }}
                                        onClick={toggleSave}
                                    />
                                )}
                            </button>
                        </div>
                        <p className='font-bold text-sm'>
                        {props.selectedVenue?.location.address ? (
                            <a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(props.selectedVenue.location.address)}`} target="_blank" rel="noopener noreferrer">
                            {props.selectedVenue.location.address}
                            </a>
                        ) : null}
                        </p>

                        <OrderModal openModal={isModalVisible} setOpenModal={setIsModalVisible} venue_id={props.selectedVenue.id} />

                    </div>
                )}
            </div>
            {props.selectedVenue?.ordering_supported && (
                <div style={{ display: 'flex', justifyContent: 'flex-end', marginRight: '1em', marginLeft: 'auto' }}>
                    <Badge count={order.reduce((a, b) => a + b.qty, 0)}>
                        <Button
                            type='default'
                            onClick={handleViewOrder}
                            style={{
                                borderRadius: '20px',
                                border: '1px solid #12411B',
                                backgroundColor: '#12411B',
                                color: '#F5FFBE',
                                height: '40px',
                                width: '120px',
                                fontSize: '1rem',
                                fontWeight: 'bold',
                            }}
                        >
                            View Order
                        </Button>

                    </Badge>

                </div>
            )
            }
        </div >
    );
};

export default VenueInfo;
