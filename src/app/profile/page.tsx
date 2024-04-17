'use client'
import { Avatar, Dropdown, MenuProps, Modal, Spin, Tabs, Tag } from 'antd';
import { UserOutlined, HeartOutlined, SettingOutlined, ArrowLeftOutlined } from '@ant-design/icons';
import Link from 'next/link';
import React, { use, useEffect, useState } from 'react';
import { SignOutButton, UserButton, useClerk, useUser } from '@clerk/nextjs';
import { GetMenu, GetUser, GetVenue } from '../actions';
import VenueIcon from '@/components/ui/venueIcon';
import { savedStore, userStore } from '../store/state';
import { useRouter } from 'next/navigation';

const ProfilePage = () => {
  const { user: clerkUser } = useUser();
  const { user, setUser } = userStore()
  const { signOut } = useClerk();
  const router = useRouter()

  const [section, setSection] = useState('restaurants')
  const { storedSaves, allVenues, storeSaves } = savedStore();

  const [loading, setLoading] = useState(true)

  const getSaves = (userSaves: any[]) => {
    console.log('userSaves', userSaves)
    console.log('storedSaves', storedSaves)

    const sTemp = [] as any[]

    for (let i = 0; i < userSaves.length; i++) {

      GetVenue(userSaves[i].venue_id)
        .then((res) => {
          if (userSaves[i].type == 'menu_item') {
            GetMenu(userSaves[i].venue_id, userSaves[i].menu_id)
              .then((r: any) => {
                const sItem = r.items.filter((it: any) => userSaves[i].menu_item_id === it.id)[0]

                const s = {
                  type: 'menu_item',
                  venue_id: userSaves[i].venue_id,
                  menu_id: userSaves[i].menu_id,
                  menu_item_id: userSaves[i].menu_item_id,
                  name: sItem.name,
                  venue_name: res.name,
                  profile_pic_url: res.profile_pic_url,
                  location: res.location
                }
                console.log(s.name)
                const storeS = [...sTemp, s]
                sTemp.push(s)

                storeSaves(storeS)
              })

          } else if (userSaves[i].type == 'venue') {
            const s = {
              type: 'venue',
              venue_id: res.id,
              name: res.name,
              profile_pic_url: res.profile_pic_url,
              location: res.location
            }
            const storeS = [...sTemp, s]
            sTemp.push(s)

            storeSaves(storeS)
          }

          if (i === userSaves.length - 1) {
            console.log('done')
            setLoading(false)
          }
        })
    }
  }


  // TODO: Error handling
  useEffect(() => {
    console.log(clerkUser);
    if (clerkUser) {
      GetUser(clerkUser.id)
        .then((res) => {
          console.log(res)
          // Save user data
          setUser(res)

          storeSaves([])
          // Save user saves
          if (res.saves && res.saves.length > 0) {
            getSaves(res.saves)
          } else {
            setLoading(false)
          }
        })
        .catch((err) => {
          console.error(err)
        })
    } else {
      console.log('no user', clerkUser)
      // timer after 5 seconds go home
      setTimeout(() => {
        router.push('/')
      }, 5000)
    }
  }, [clerkUser])

  const signout = () => {
    storeSaves([])
    setUser({})
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


  return (user && clerkUser && !loading ?
    <div className="bg-white h-screen overflow-y-scroll p-4">
      <div className="flex justify-between items-center mb-2">
        <Link href="/">
          <ArrowLeftOutlined />
        </Link>
        {/* <UserButton /> */}
        <Dropdown menu={{ items }}>
          <SettingOutlined />
        </Dropdown>
      </div>
      <div className="text-center mb-5">
        <Avatar size={64} src={user.profile_pic_url} />
        <h1 className="text-xl font-bold mt-2 mb-0">{user?.display_name}</h1>
        <p className="text-gray-600">@{user?.username}</p>
        <p className="text-gray-600">📍 Amsterdam, NL</p>
        <div className="flex justify-center gap-4 my-2">
          <span>{user?.followers?.length} followers</span> | <span>{user?.following?.length}  following</span>
        </div>
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
            {storedSaves?.filter((s: any) => s.type == "venue")?.map((item: any, i: number) => {
              return (
                <div className='flex mb-6 w-full' key={i}>
                  <VenueIcon selectedVenue={{ image: item.profile_pic_url, name: item?.name }} />
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
            {storedSaves?.filter((s: any) => s.type == "menu_item")?.map((item: any, i: number) => {
              return (
                <div className='flex mb-6 w-full' key={i} >
                  <VenueIcon selectedVenue={{ image: item?.profile_pic_url, name: item?.name }} />
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
    : <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}><Spin /></div>

  );
};

export default ProfilePage;
