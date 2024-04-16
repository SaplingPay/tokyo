import React from 'react';
import { Avatar } from 'antd';

type VenueIconProps = {
  selectedVenue?: {
    name: string;
    image?: string;
  };
};

const VenueIcon: React.FC<VenueIconProps> = ({ selectedVenue }) => {
  const firstLetter = selectedVenue?.name ? selectedVenue.name.toUpperCase()[0] : '';

  return (
    <Avatar
      style={{
        backgroundColor: '#12411B',
        color: '#F5FFBE',
        minWidth: '60px',
        minHeight: '60px',
        maxWidth: '90px',
        maxHeight: '90px',
        paddingLeft: '0', 
        border: 'none',
      }}
      src={selectedVenue?.image} // Conditionally set src attribute for the image
    >
      {selectedVenue?.image ? null : firstLetter} {/* Render first letter if image is not provided */}
    </Avatar>
  );
};

export default VenueIcon;
