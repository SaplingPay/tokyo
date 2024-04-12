import { Tabs } from 'antd';
import React, { useEffect } from 'react'

type Props = {
    menu: any
}

function VenueMenu(props: Props) {

    const [categories, setCategories] = React.useState<any>([])

    useEffect(() => {
        console.log('props.menu', props.menu)
        const categories = props.menu?.items?.map((item: any) => item.categories[0])
        const catSet = new Set(categories)

        console.log('categories', catSet)
        setCategories(Array.from(catSet))

        return () => {

        }
    }, [props.menu])

    const filterMenu = (category: string) => {
        return props.menu?.items?.filter((mI: any) => mI.categories[0] === category)
    }

    return (
        <Tabs>
            {categories?.map((cat: any, i: number) => {
                const id = String(i + 1);
                return (
                    <Tabs.TabPane key={id} tab={cat}>
                        <div className='px-2 py-4 overflow-y-scroll h-80'>
                            {filterMenu(cat)?.map((item: any, i: number) => {
                                return (
                                    <div className='flex mb-6' key={i}>
                                        <p className='text-base'>{item.name}</p>
                                        <div className='ml-auto'>
                                            <span className='p-1.5 border-solid border-[#12411B] border-2 rounded-full ml-1'>${item.price}</span>
                                            {/* <button className='my-auto h-max align-middle'><HeartIcon className='h-5 w-5' /></button> */}
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </Tabs.TabPane>
                );
            })}
        </Tabs>
    )
}

export default VenueMenu