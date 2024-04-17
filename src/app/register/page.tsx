'use client'
import { PlusOutlined } from '@ant-design/icons';
import { useUser } from '@clerk/nextjs';
import { Form, Input, Upload } from 'antd';
import Head from 'next/head';
import { useEffect } from 'react';
import { CreateUser, UpdateUser } from '../actions';
import { computeSHA256 } from '@/lib/utils';
import { getSignedURLForProfilePic } from '@/utils/aws/requests';
import { useRouter } from 'next/navigation';
import { savedStore } from '../store/state';

const RegisterPage = () => {
    const { user } = useUser();
    const [form] = Form.useForm();
    const { push } = useRouter();
    const { storedSaves } = savedStore();

    useEffect(() => {
        savedStore.persist.rehydrate()
    }, []);

    useEffect(() => {
        console.log(user);
        form.setFieldValue('email', user?.primaryEmailAddress?.emailAddress);
    }, [user]);

    const handleUpload = async (file: File, userId: string) => {
        const signedURLResult = await getSignedURLForProfilePic({
            fileSize: file.size,
            fileType: file.type,
            checksum: await computeSHA256(file),
            userId: userId
        })
        if (signedURLResult.failure !== undefined) {
            throw new Error(signedURLResult.failure)
        }
        const { url } = signedURLResult.success
        return await fetch(url, {
            method: "PUT",
            headers: {
                "Content-Type": file.type,
            },
            body: file,
        })
    }

    const handleCreateAccount = (value: any) => {
        const values = form.getFieldsValue();

        const savedV = storedSaves.filter((s: any) => s.type === 'venue').map((venue: any) => {
            return {
                type: "venue",
                venue_id: venue.venue_id
            }
        })

        const savedMI = storedSaves.filter((s: any) => s.type === 'menu_item').map((menuItem: any) => {
            return {
                type: "menu_item",
                venue_id: menuItem.venue_id,
                menu_id: menuItem.menu_id,
                menu_item_id: menuItem.menu_item_id
            }
        })

        const saves = savedV.concat(savedMI)

        const data = {
            user_id: user?.id,
            display_name: values.displayName,
            username: values.username,
            email: values.email,
            location: {
                city: 'Amsterdam',
                country: 'Netherlands'
            },
            saves: saves
        }

        CreateUser(data)
            .then((res) => {
                console.log(res);
                const userId = res.InsertedID
                const file = values.upload[0].originFileObj
                handleUpload(file, userId)
                    .then((res) => {
                        console.log(res);
                        const fileUrl = res.url.split("?")[0]
                        const data = {
                            id: userId,
                            data: {
                                profile_pic_url: fileUrl
                            }
                        }
                        UpdateUser(data)
                            .then((res) => {
                                console.log(res);
                                if (res.error) {
                                    console.error(res.error);
                                } else {
                                    console.log("User created successfully");
                                    push("/")
                                }
                            })
                            .catch((err) => {
                                console.error(err);
                            });
                    })
                    .catch((err) => {
                        console.error(err);
                    });
            })
            .catch((err) => {
                console.error(err);
            });
    };

    // TODO: Check if username is available 

    const normFile = (e: any) => {
        if (Array.isArray(e)) {
            return e;
        }
        console.log(e?.fileList)
        return e?.fileList;
    };

    const UploadButton = () => {
        return (<button style={{ border: 0, background: 'none' }} type="button">
            <PlusOutlined />
        </button>)
    }

    return (
        <>
            <Head>
                <title>Sign Up</title>
            </Head>
            <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
                <div className="bg-white p-10 rounded-lg shadow-lg w-full max-w-sm">
                    <h1 className="text-2xl font-semibold text-center mb-8">Create Account</h1>

                    <Form onFinish={handleCreateAccount} form={form} layout='vertical'>
                        <Form.Item
                            name="upload"
                            valuePropName="fileList"
                            getValueFromEvent={normFile}
                            rules={[{ required: true, message: 'Please upload a picture' }]}
                            style={{ display: "flex", justifyContent: "center" }}
                        >
                            <Upload
                                listType="picture-circle"
                                maxCount={1}
                                customRequest={({ onSuccess }) => setTimeout(() => {
                                    if (onSuccess) {
                                        onSuccess("ok", undefined);
                                    }
                                }, 0)}>
                                {form.getFieldValue('upload')?.length > 0 ? "" : <UploadButton />}
                            </Upload>
                        </Form.Item>

                        <Form.Item
                            name="displayName"
                            rules={[{ required: true, message: 'Please enter your display name 😇' }]}
                        >
                            <Input style={{ padding: "1em 2em", borderRadius: "5em", fontSize: "1.125rem" }} placeholder='Display Name' />
                        </Form.Item>
                        <Form.Item
                            name="username"
                            rules={[{ required: true, message: 'Please choose a username 😇' }]}
                        >
                            <Input style={{ padding: "1em 1.5em", borderRadius: "5em", fontSize: "1.125rem" }} placeholder='User Name' />
                        </Form.Item>
                        <Form.Item
                            name="email"
                            rules={[{ required: true, message: 'Please enter your email 😇' }]}
                        >
                            <Input type='email' disabled style={{ padding: "1em 1.5em", borderRadius: "5em", fontSize: "1.125rem" }} placeholder='Email' value={form?.getFieldValue('email')} />
                        </Form.Item>
                        {/* <Form.Item
                            name="city"
                            rules={[{ required: true, message: 'Please enter your city 😇' }]}
                        >
                            <Input type='city' style={{ padding: "1em 1.5em", borderRadius: "5em", fontSize: "1.125rem" }} placeholder='City (Amsterdam)' />
                        </Form.Item>
                        <Form.Item
                            name="country"
                            rules={[{ required: true, message: 'Please enter your country 😇' }]}
                        >
                            <Input type='country' style={{ padding: "1em 1.5em", borderRadius: "5em", fontSize: "1.125rem" }} placeholder='Country (Netherlands)' />
                        </Form.Item> */}
                        <Form.Item>
                            <button
                                className="w-full px-6 py-4 bg-[#12411B] text-white text-base font-semibold rounded-full"
                                type="submit"
                            >
                                Create Account
                            </button>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        </>
    );
};

export default RegisterPage;
