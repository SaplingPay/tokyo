import { Avatar } from 'antd'
import { HeartIcon } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import filledHeart from './assets/filledheart.png';
import heart from './assets/heart.png';
import Image from 'next/image';
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

        console.log('props.selectedVenue', props.selectedVenue)
        console.log('savedVenues', savedVenues)
        return () => {

        }
    }, [])

    return (
        <div className='flex mb-4'>
            {/* <Avatar size={120} src="https://bloximages.newyork1.vip.townnews.com/toronto.com/content/tncms/assets/v3/editorial/6/5d/65d20fbb-9006-50b3-8ab9-8157f27f85c6/63dc14cec1ba1.image.jpg?resize=720%2C480" /> */}
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
            <div className='flex-col ml-5 h-max my-auto mx-full'>
                <div className='flex flex-row'>
                    <p className='font-bold text-lg'>{props.selectedVenue?.name}</p>
                    <button className='border-none bg-transparent mb-2 mr-4' onClick={toggleSave}>
                        {/* <Image
                            src={saves[props.selectedVenue.id] ? filledHeart : heart}
                            alt="Like Icon"
                            width={22}
                            height={22}
                            style={{ marginLeft: ".5em", minWidth: "22px", minHeight: "22px", marginTop: '.1em' }}
                        /> */}
                        {saves[props.selectedVenue.id] ? <HeartTwoTone twoToneColor="red" style={{ fontSize: "1.5em", marginLeft: ".5em", }} /> : <HeartOutlined style={{ fontSize: "1.5em", color: "lightgray", marginLeft: ".5em", }} />}
                    </button>
                </div>

                <p className='font-bold text-s mb-2'>{props.selectedVenue?.location.address}</p>
                {/* <p className='text-xs'>🥐☕️ Cafe Bakery</p> */}
            </div>
        </div>
    )
}

export default VenueInfo