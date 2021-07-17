import React, {useEffect, useState} from 'react';
import {parseCookies} from "nookies";
import {Gift} from "../types/GiftTypes";
import {Field, Form, Formik, FormikHelpers} from "formik";
import Api from "../utils/api";
import {Main} from "../templates/Main";
import {Meta} from "../layout/Meta";

const MyGifts = () => {
    const cookies = parseCookies();
    const token = cookies.token || null;

    const [gifts, setGifts] = useState<Gift[]>([]);

    useEffect(() => {

        Api.get('/api/gift', {headers: {
                'Authorization': 'Bearer ' + token
            }})
            .then(rsp => {
                setGifts(rsp.data);
            });
    }, []);

    if (token == null) {
        return (<div>Please login in</div>)
    }

    const handleSubmit = async (values: Gift, _: FormikHelpers<Gift>) => {
        try {
            const rsp = await Api.put<Gift>('/api/gift', {...values}, {headers: {
                'Authorization': 'Bearer ' + token,
            }});
            setGifts(gifts.map(gift => {
                if (gift.id == rsp.data.id) {
                    return rsp.data;
                }
                return gift;
            }))
        } catch (e) {
            console.log(e);
        }

    }

    const handleDelete = async (id: string) => {
        await Api.delete('/api/gift',{data: {id: id}, headers: {
            'Authorization': 'Bearer ' + token,
        }});

        setGifts(gifts.filter(x => x.id != id));
    }

    return (
        <Main meta={<Meta title="Homepage" description="Description" />}>
            <div className="z-20 container px-6 flex flex-col relative py-4 mx-auto">
                <div className="flex flex-col">
                    <h2 className="text-3xl font-bold leading-9 text-gray-900 mb-12">
                        My Gifts
                    </h2>
                    <div className="grid xs:grid-cols-1 sm:grid-cols-4 gap-4">
                        {gifts.length <= 0 ? (
                            <div>
                                No result
                            </div>
                        ) : (
                            gifts.map((gift,key) => (
                                <Formik key={key} initialValues={gift} onSubmit={handleSubmit} enableReinitialize>
                                    {({values}) => (
                                        <Form>
                                            <div className="h-full flex-shrink-0">
                                                <div className="position-relative overflow-hidden block	h-full shadow-xl rounded-3xl">
                                                    <div className="p-4">
                                                        <div className="flex flex-col items-center text-center">
                                                            <div className="rounded-xl border-2 border-gray-300 mt-4 p-2">
                                                                <Field
                                                                    id="name"
                                                                    name="name"
                                                                    placeholder="Name"
                                                                    className="w-full focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
                                                                    autoComplete="off"
                                                                />
                                                            </div>
                                                            <div className="mt-3">
                                                                <label>
                                                                    <Field type="checkbox" name="multiple" className="mr-2 form-checkbox" />
                                                                    Allow multiple opening
                                                                </label>
                                                            </div>
                                                            <h2 className="text-xl font-bold leading-6 text-gray-900">
                                                                Items: <small>{values.items.length} gift/s</small>
                                                            </h2>
                                                            <h2 className="text-xl font-bold leading-6 text-gray-900">
                                                                Consumed: <small>{values.consumed} time/s</small>
                                                            </h2>
                                                            <h2 className="text-lg font-bold leading-2 text-gray-900">
                                                                Share link
                                                            </h2>
                                                            <div className="rounded-xl border-2 border-gray-300 p-2">
                                                                <input readOnly value="..." className="w-full focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75" />
                                                            </div>
                                                            <button
                                                                className="mt-3 px-4 py-2 text-sm font-medium text-white bg-black rounded-md hover:bg-opacity-80 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
                                                                type="submit"
                                                            >
                                                                Edit
                                                            </button>
                                                            <button
                                                                className="mt-3 px-4 py-2 text-sm font-medium text-white bg-red-500 rounded-md hover:bg-opacity-80 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
                                                                onClick={() => handleDelete(gift.id)}
                                                            >
                                                                Delete
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </Form>
                                    )}
                                </Formik>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </Main>
    );
};

export default MyGifts;