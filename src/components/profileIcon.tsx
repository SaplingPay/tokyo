import { Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import React from 'react';
import Link from 'next/link';

const ProfileIcon = () => {
  return (
    <div className="absolute top-5 right-5">
      <Link href="/profile">
        <Avatar icon={<UserOutlined />} />
      </Link>
    </div>
  );
};

export default ProfileIcon;
