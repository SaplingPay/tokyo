'use client'
import React, { useEffect, useState } from 'react';
import { Input, Button, Avatar, List } from 'antd';
import { SearchOutlined, UserOutlined, LeftOutlined, ArrowLeftOutlined } from '@ant-design/icons';
import { useRouter } from 'next/navigation';
import { GetUsers } from '../actions';
import Link from 'next/link';

const Search = () => {
  const [searchValue, setSearchValue] = useState('');
  const router = useRouter();
  const [allUsers, setAllUsers] = useState([])
  const [searchedUsers, setSearchedUsers] = useState([])

  // Dummy data for recent searches and suggested users
  const recentSearches = ['eatwithsapling', 'Sapling'];
  const suggestedUsers = [
    { username: 'SaplingPay', handle: '@saplingpay', followers: 4 }
  ];

  const handleSearch = () => {
    // Implement your search logic here
    console.log('Searching for:', searchValue);
    GetUsers()
      .then((res) => {
        console.log('res', res);
      })
  };

  const handleInputChange = (e: any) => {
    setSearchValue(e.target.value);

    if (e.target.value === '') {
      setSearchedUsers(allUsers)
    } else {
      const filteredUsers = allUsers.filter((user: any) => {
        return user.display_name.toLowerCase().includes(e.target.value.toLowerCase());
      });

      setSearchedUsers(filteredUsers)
    }

  };

  const clearSearch = () => {
    setSearchValue('');
  };

  useEffect(() => {
    // Implement your logic to fetch recent searches here
    GetUsers()
      .then((res) => {
        console.log('res', res);
        setSearchedUsers(res)
        setAllUsers(res)
      })
  }, []);



  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', padding: '16px' }}>
        <Button icon={<ArrowLeftOutlined />} onClick={() => router.back()} style={{ border: 'none', background: 'none' }} />
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
          dataSource={searchedUsers}
          renderItem={(item: any) => (
            <Link href={`/profile/${item.user_id}`}>
              <List.Item>
                <List.Item.Meta
                  avatar={<Avatar icon={<UserOutlined />} src={item.profile_pic_url} size={48} />}
                  title={<div>{item.display_name}</div>}
                  description={<div style={{ marginBottom: '2px' }}>@{item.username}</div>}
                />
                <div style={{ display: 'flex', alignItems: 'center', height: '100%' }}>{item.followers.length} followers</div>
              </List.Item>
            </Link>
          )}
        />
      </div>
    </div>
  );
};

export default Search;
