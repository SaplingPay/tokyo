'use client'
import React, { useState } from 'react';
import { Input, Button, Avatar, List } from 'antd';
import { SearchOutlined, UserOutlined, LeftOutlined } from '@ant-design/icons';
import { useRouter } from 'next/navigation';

const Search = () => {
  const [searchValue, setSearchValue] = useState('');
  const router = useRouter();

  // Dummy data for recent searches and suggested users
  const recentSearches = ['eatwithsapling', 'Sapling'];
  const suggestedUsers = [
    { username: 'SaplingPay', handle: '@saplingpay', followers: 4 }
  ];

  const handleSearch = () => {
    // Implement your search logic here
    console.log('Searching for:', searchValue);
  };

  const handleInputChange = (e) => {
    setSearchValue(e.target.value);
  };

  const clearSearch = () => {
    setSearchValue('');
  };

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', padding: '16px' }}>
    <Button icon={<LeftOutlined />} onClick={() => router.back()} style={{ border: 'none', background: 'none' }} />
        <Input
          placeholder="Search for a user"
          prefix={<SearchOutlined />}
          value={searchValue}
          onChange={handleInputChange}
          style={{ margin: '0 12px' }}
        />
        <Button type="primary" onClick={handleSearch}>Search</Button>
      </div>
      <div style={{ padding: '0 16px' }}>
        <List
          header={<div>Suggested Users for You</div>}
          dataSource={suggestedUsers}
          renderItem={(item) => (
            <List.Item>
            <List.Item.Meta
             avatar={<Avatar style={{ marginTop: '8px' }} icon={<UserOutlined />} />}
              title={<div style={{ marginTop: '2px' }}>{item.username}</div>} 
              description={<div style={{ marginBottom: '2px' }}>{item.handle}</div>}
            />
            <div style={{ display: 'flex', alignItems: 'center', height: '100%' }}>{item.followers} followers</div>
          </List.Item>
          )}
        />
      </div>
    </div>
  );
};

export default Search;
