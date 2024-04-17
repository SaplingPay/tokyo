// SearchButton.tsx
'use client'
import React from 'react';
import { useRouter } from 'next/navigation'; 
import { SearchOutlined } from '@ant-design/icons';

const SearchButton = () => {
  const { push } = useRouter();

  const navigateToSearch = () => {
    push('/search'); 
  };

  return (
    <div className="absolute top-6 left-5 z-50 cursor-pointer" onClick={navigateToSearch}>
      <SearchOutlined style={{ fontSize: '24px' }} /> 
    </div>
  );
};

export default SearchButton;
