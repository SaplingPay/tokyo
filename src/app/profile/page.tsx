import { Avatar } from 'antd';
import { UserOutlined, HeartOutlined, SettingOutlined } from '@ant-design/icons';
import Link from 'next/link';
import React from 'react';

const ProfilePage = () => {
  // Dummy data for the user's saved restaurants
  const savedRestaurants = [
    { name: 'Lourens Amsterdam', address: 'Oude Leliestraat 15' },
    { name: 'PLUK', address: 'Berenstraat 19' },
    { name: 'Cafe Garcon', address: 'Johannes Verhulststraat 105' }
  ];

  return (
    <div className="bg-white h-screen overflow-y-scroll p-4">
      <div className="flex justify-between items-center mb-4">
        <Link href="/">
          <i className="text-xl">&#x3C;</i> Back
        </Link>
        <SettingOutlined className="text-xl" />
      </div>
      <div className="text-center">
        <Avatar size={64} icon={<UserOutlined />} className="mb-2" />
        <h2 className="text-xl font-bold">Sapling</h2>
        <p className="text-gray-600">@eatwithsapling</p>
        <p className="text-gray-600">Amsterdam, NL</p>
        <div className="flex justify-center gap-4 my-2">
          <span>4 followers</span> | <span>5 following</span>
        </div>
      </div>
      <div className="flex justify-around my-4">
        <button className="font-semibold text-gray-800">Saved</button>
        <button className="font-semibold text-gray-400">Collections</button>
        <button className="font-semibold text-gray-400">Posts</button>
      </div>
      <div>
        <h3 className="text-lg font-semibold mb-2">Restaurants</h3>
        {savedRestaurants.map((restaurant, index) => (
          <div key={index} className="flex justify-between items-center mb-4">
            <div className="flex items-center">
              {/* Placeholder for restaurant image */}
              <div className="w-14 h-14 bg-gray-200 mr-3 rounded-full" />
              <div>
                <h4 className="text-md font-semibold">{restaurant.name}</h4>
                <p className="text-sm text-gray-600">{restaurant.address}</p>
              </div>
            </div>
            <HeartOutlined className="text-red-500 text-xl" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProfilePage;
