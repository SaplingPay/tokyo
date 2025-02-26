'use client'
import { Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import React, { useState } from 'react';
import SignInModal from './signInModal';
import { useRouter } from 'next/navigation';
import { useUser } from '@clerk/nextjs';
import { userStore } from '@/app/store/state';

type Props = {
}

const ProfileIcon = (props: Props) => {
  const [openSignInModal, setOpenSignInModal] = useState(false);
  const { push } = useRouter()
  const { user: clerkUser } = useUser();
  const { user } = userStore()

  const goToProfile = () => {
    if (clerkUser) {
      push('/profile/' + clerkUser.id);
    } else {
      setOpenSignInModal(true);
    }
  }

  return (
    <>
      <div className="absolute top-6 right-5 z-50" onClick={goToProfile}>
        {user?.profile_pic_url ? <Avatar src={user?.profile_pic_url} size={"large"} /> : <Avatar icon={<UserOutlined />} size={"large"} />}
      </div>
      <SignInModal openModal={openSignInModal} setOpenModal={setOpenSignInModal} />
    </>
  );
};

export default ProfileIcon;
