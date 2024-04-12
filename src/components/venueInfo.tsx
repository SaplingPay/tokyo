import { Avatar } from 'antd'
import { HeartIcon } from 'lucide-react'
import React from 'react'

type Props = {
    selectedVenue: any
}

const VenueInfo = (props: Props) => {
    return (
        <div className='flex mb-4'>
            {/* <Avatar size={120} src="https://bloximages.newyork1.vip.townnews.com/toronto.com/content/tncms/assets/v3/editorial/6/5d/65d20fbb-9006-50b3-8ab9-8157f27f85c6/63dc14cec1ba1.image.jpg?resize=720%2C480" /> */}
            <Avatar size={90} style={{ backgroundColor: '#12411B', color: '#F5FFBE', marginLeft: ".5em" }}>{props.selectedVenue?.name.toUpperCase()[0]}</Avatar>
            <div className='flex-col ml-5 h-max my-auto mx-full'>
                <div className='flex flex-row'>
                    <p className='font-bold text-lg'>{props.selectedVenue?.name}</p>
                    {/* <button>
                        <HeartIcon className='ml-2' />
                    </button> */}
                </div>

                <p className='font-bold text-s mb-2'>{props.selectedVenue?.location.address}</p>
                {/* <p className='text-xs'>🥐☕️ Cafe Bakery</p> */}
            </div>
        </div>
    )
}

export default VenueInfo