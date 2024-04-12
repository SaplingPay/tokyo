import { Modal } from 'antd'
import React from 'react'

type Props = {
    openModal: boolean
    setOpenModal: (open: boolean) => void
}

const SignInModal = (props: Props) => {
    return (
        <Modal
            open={props.openModal}
            onCancel={() => props.setOpenModal(false)}
            footer={null}
            closable={false}
            maskClosable={true}
            centered
            width={300}
        >
            <div className="text-center pb-2">
                <p className="text-lg font-bold">Sign In to Your Account to Save Dishes</p>
                <button className='bg-slate-200 px-14 rounded-full py-2 text-black mt-2 w-42 mb-2' onClick={() => props.setOpenModal(false)}>Sign In</button>

                <p>{`Don't have an account?`}</p>
                <button className='bg-[#12411B] px-8 rounded-full py-2 text-white mt-2 w-42' onClick={() => props.setOpenModal(false)}>Create Account</button>
            </div>
        </Modal>
    )
}

export default SignInModal