'use client'
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { GetOrder } from '../actions';
import { useRouter } from 'next/navigation';

const MenuOrder = () => {
  const searchParams = useSearchParams()
  const searchedOrderID = searchParams.get('order_id')
  const [order, setOrder] = useState<any>(null)
  const { push } = useRouter()

  console.log('searchedOrderID', searchedOrderID)

  useEffect(() => {
    // Get order details
    if (searchedOrderID) {
      GetOrder(searchedOrderID)
        .then((res) => {
          console.log('res', res)
          setOrder(res)
        })
        .catch((err) => {
          console.error(err)
        })
    }
  }, [searchedOrderID])


  // Calculate the total number of trees
  let totalTrees = 0;
  if (order?.items) {
    totalTrees = order.items.reduce((sum: any, item: any) => sum + item.quantity, 0);
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-12 bg-[#faf7f5]">
      <div className="rounded-lg px-8 pb-8 mb-4">
        <div className="mb-4">
          <div className="flex items-center justify-center">
            <div className="bg-[#efece9] rounded-full p-2">
              <div className="h-48 w-48 rounded-full flex items-center justify-center">
                <Image src="/tree-icon.png" alt="tree" width={96} height={96} />
              </div>
            </div>
          </div>
          <h1 className="text-2xl text-center font-semibold my-6">Order successfully received</h1>
          {order?.items && (
            <p className="text-center text-gray-700">Your order
              {/* <span className='font-bold'>#{order?.id}</span>  */}
              {" "}has been received and your payment has contributed to planting <span className='font-bold'>{totalTrees} tree{totalTrees !== 1 ? 's' : ''}.</span></p>
          )}

        </div>
        <div className="flex items-center justify-center mt-6">
          <button
            onClick={() => push("/")}
            className="w-full px-12 py-5 rounded-full bg-[#87c1a5] text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
          >
            Continue to Sapling
          </button>
        </div>
      </div>
    </div>
  );
};

export default MenuOrder;
