'use client'
import { Avatar, Button, Dropdown, MenuProps, Modal, Spin, Tabs, Tag } from 'antd';
import { UserOutlined, HeartOutlined, SettingOutlined, ArrowLeftOutlined } from '@ant-design/icons';
import Link from 'next/link';
import React, { use, useEffect, useState } from 'react';
import { SignOutButton, UserButton, useClerk, useUser } from '@clerk/nextjs';
import { FollowUser, GetMenu, GetUser, GetUserSaves, GetVenue, UnfollowUser } from '../../actions';
import VenueIcon from '@/components/ui/venueIcon';
import { savedStore, userStore } from '../../store/state';
import { useRouter } from 'next/navigation';

const ProfilePage = ({ params }: any) => {
  // console.log(params)
  const { user: clerkUser } = useUser();
  const { user: loggedInUser, setUser: setLoggedInUser } = userStore()
  const { signOut } = useClerk();
  const router = useRouter()

  const [section, setSection] = useState('restaurants')
  const { storedSaves, allVenues, storeSaves } = savedStore();

  const [loading, setLoading] = useState(true)

  const [profileUser, setProfileUser] = useState({} as any)


  useEffect(() => {
    // console.log("clerkUser", clerkUser)

    // Load user data
    if (clerkUser) {
      GetUser(clerkUser.id)
        .then((res) => {
          // console.log(res)
          setLoggedInUser(res)

        })
        .catch((err) => {
          console.error(err)
        })
    }

  }, [clerkUser])


  // TODO: Error handling
  useEffect(() => {
    GetUser(params.profile_id)
      .then((res) => {
        // console.log(res)
        // Save user data
        setProfileUser(res)

        storeSaves([])
        // Save user saves
        if (res.saves && res.saves.length > 0) {
          GetUserSaves(res.id)
            .then((res) => {
              // console.log(res)
              storeSaves(res)
              setLoading(false)
            })
        } else {
          setLoading(false)
        }
      })
      .catch((err) => {
        console.error(err)
      })
  }, [params.profile_id])

  const signout = () => {
    storeSaves([])
    setLoggedInUser({})
    signOut(() => router.push('/'))
    router.refresh()
  }

  const items: MenuProps['items'] = [
    {
      key: '1',
      label: (
        <button onClick={signout}>
          Sign out
        </button>
      ),
    },
  ];

  const followUser = () => {
    // console.log('follow')
    // console.log(loggedInUser)
    // console.log(profileUser)
    if (!loggedInUser.id || loggedInUser.id === profileUser.id || profileUser.followers.includes(loggedInUser.id)) return
    FollowUser({ userId: loggedInUser.id, followId: profileUser.id })
      .then((res) => {
        // console.log(res)
        setProfileUser(res)
      })
  }

  const unfollowUser = () => {
    // console.log('unfollow')
    // console.log(loggedInUser)
    // console.log(profileUser)
    if (loggedInUser.id === profileUser.id || !profileUser.followers.includes(loggedInUser.id)) return
    UnfollowUser({ userId: loggedInUser.id, followId: profileUser.id })
      .then((res) => {
        // console.log(res)
        setProfileUser(res)
      })
  }


  return (
    <div className="bg-white h-screen overflow-y-scroll p-4">
      <div className="flex justify-between items-center mb-2">
        <Link href="/">
          <ArrowLeftOutlined />
        </Link>
        {/* <UserButton /> */}
        {loggedInUser?.id === profileUser?.id &&
          <Dropdown menu={{ items }}>
            <SettingOutlined />
          </Dropdown>
        }

      </div>
      <div className="text-center mb-5">
        <Avatar size={64} src={profileUser.profile_pic_url} />
        <h1 className="text-xl font-bold mt-2 mb-0">{profileUser?.display_name}</h1>
        <p className="text-gray-600">@{profileUser?.username}</p>
        <p className="text-gray-600">📍 Amsterdam, NL</p>
        <div className="flex justify-center gap-4 my-2">
          <span>{profileUser?.followers?.length} followers</span> | <span>{profileUser?.following?.length}  following</span>
        </div>

        {profileUser?.id === loggedInUser?.id ? (
          // <button className="bg-gray-400 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded w-[80%]">
          //   Edit Profile
          // </button>
          ""
        )
          : (
            profileUser?.followers?.includes(loggedInUser?.id) ? (
              <button className="bg-gray-400 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded w-[80%]" onClick={unfollowUser}>
                Unfollow
              </button>
            ) : (
              <button className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded w-[80%]" onClick={followUser}>
                Follow
              </button>
            )
          )
        }
      </div>
      <div className="flex justify-around mt-4 mb-4">
        <button className="font-semibold text-gray-800">Saves 💚</button>
        <button className="font-semibold text-gray-400">Collections 👷‍♀️🚧</button>
        <button className="font-semibold text-gray-400">Posts 👷‍♀️🚧</button>
      </div>


      <div className='flex justify-around mt-6 mb-4'>
        <button className={`flex-col mr-5 -ml-5 text-center w-30 ${section === 'restaurants' ? 'text-black border-b-2 border-black' : 'text-gray-400'}`} onClick={() => setSection('restaurants')}>
          <p className='font-bold'>Places</p>
        </button>
        <button className={`flex-col text-center w-30 ${section === 'dishes' ? 'text-black border-b-2 border-black' : 'text-gray-400'}`} onClick={() => setSection('dishes')}>
          <p className='font-bold'>Items</p>
        </button>
      </div>

      <hr />

      <div className='mt-4 mx-4 overflow-y-scroll'>
        {section === 'restaurants' && (
          <div className='mt-2'>
            {!loading && storedSaves?.filter((s: any) => s.type == "venue")?.map((item: any, i: number) => {
              return (
                <div className='flex mb-6 w-full' key={i}>
                  <VenueIcon selectedVenue={{ image: item.profile_pic_url, name: item?.venue_name }} />
                  <div className='flex-col ml-5 h-max my-auto w-full'>
                    <p className='font-bold text-base'>{item.name}</p>
                    <div className='flex justify-between'>
                      <p className='text-xs'>{item.location.address}</p>
                      <span className='ml-auto py-1 -mt-2  px-1.5 border-solid border-slate-200 text-black border-2 h-max  rounded-full text-xs bg-slate-100'>
                        {storedSaves?.filter((s: any) => s.type == "menu_item" && s.venue_id == item.venue_id).length} 💚
                      </span>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        )}
        {section === 'dishes' && (
          <div className='mt-2'>
            {!loading && storedSaves?.filter((s: any) => s.type == "menu_item")?.map((item: any, i: number) => {
              return (
                <div className='flex mb-6 w-full' key={i} >
                  <VenueIcon selectedVenue={{ image: item?.profile_pic_url, name: item?.venue_name }} />
                  <div className='flex-col ml-5 h-max my-auto w-full'>
                    <p className='font-bold text-base'>{item.name}</p>
                    <p className='text-xs'>{item.venue_name}</p>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>

    </div>

  );
};

export default ProfilePage;
