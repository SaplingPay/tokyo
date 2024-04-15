import { Avatar } from 'antd'
import React, { useEffect, useState } from 'react'
import { savedStore } from '@/app/store/state';
import { HeartOutlined, HeartTwoTone } from '@ant-design/icons';

type Props = {
    selectedVenue: any
}

const VenueInfo = (props: Props) => {

    const [saves, setSaves] = useState<{ [key: string]: boolean }>({});
    const { saveVenue, removeVenue, savedVenues } = savedStore();

    const toggleSave = () => {

        if (saves[props.selectedVenue.id]) {
            removeVenue(props.selectedVenue);
        } else {
            saveVenue(props.selectedVenue);
        }
        setSaves(prev => ({
            ...prev,
            [props.selectedVenue.id]: !prev[props.selectedVenue.id]
        }));
    };

    useEffect(() => {

        const saves = {} as { [key: string]: boolean };
        savedVenues.forEach((venue: any) => {
            if (venue.id === props.selectedVenue.id) {
                saves[venue.id] = true;
            } else {
                saves[venue.id] = false;
            }
        });
        setSaves(saves);

        return () => {

        }
    }, [])

    return (
        <div className='flex'>
            {props.selectedVenue?.profile_pic_url ?
                <img src={props.selectedVenue.profile_pic_url} alt={""} style={{
                    width: '60px',
                    height: '60px',
                    marginLeft: ".5em",
                    borderRadius: '50%',
                    objectFit: 'cover'
                }} />
                :
                <Avatar
                    style={{
                        backgroundColor: '#12411B',
                        color: '#F5FFBE',
                        marginLeft: ".5em",
                        minWidth: "60px",
                        minHeight: "60px",
                        maxWidth: "90px",
                        maxHeight: "90px",
                    }}>{props.selectedVenue?.name.toUpperCase()[0]}
                </Avatar>
            }
            <div className='flex-col ml-5 h-max my-auto mx-full'>
                <div className='flex flex-row'>
                    <p className='font-bold text-lg'>{props.selectedVenue?.name}</p>
                    <button className='border-none bg-transparent mb-2 mr-4' onClick={toggleSave}>
                        {saves[props.selectedVenue.id] ? <HeartTwoTone twoToneColor="red" style={{ fontSize: "1.5em", marginLeft: ".5em", }} /> : <HeartOutlined style={{ fontSize: "1.5em", color: "lightgray", marginLeft: ".5em", }} />}
                    </button>
                </div>

                <p className='font-bold text-sm'>{props.selectedVenue?.location.address}</p>
            </div>
        </div>
    )
}

export default VenueInfo