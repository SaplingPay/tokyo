'use client'
import React from 'react';
import { useRouter } from 'next/navigation';
import { SearchOutlined } from '@ant-design/icons';
import { Avatar } from 'antd';

const SearchButton = () => {
  const { push } = useRouter();

  const navigateToSearch = () => {
    push('/search');
  };

  return (
    <div className="absolute top-6 left-5 z-50 cursor-pointer" onClick={navigateToSearch}>
      {/* <SearchOutlined style={{ fontSize: '24px', color: "#12411B" }} /> */}
      <Avatar icon={<SearchOutlined />} size={"large"} />
    </div>
  );
};

export default SearchButton;
