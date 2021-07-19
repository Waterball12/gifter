import React, {Fragment, useState} from 'react';
import {Field, FieldArray, Form, Formik, FormikHelpers} from 'formik';
import { Meta } from '../layout/Meta';
import { Main } from '../templates/Main';
import GiftItem from "../components/GiftItem";
import Api from "../utils/api";
import {Gift} from "../types/GiftTypes";
import {parseCookies} from "nookies";
import {Dialog, Transition} from "@headlessui/react";
import {useClipboard} from "use-clipboard-copy";

const Create = () => {
    const cookies = parseCookies();
    const token = cookies.token || null;
    const [isOpen, setIsOpen] = useState(false);
    const [created, setCreated] = useState<Gift | null>(null);
    const clipboard = useClipboard();
    const handleSubmit = async (values: Gift, helpers: FormikHelpers<Gift>) => {

        try {
            const rsp = await Api.post<Gift>('/api/gift', {...values}, {headers: {
                'Authorization': 'Bearer ' + token
            }});
            setCreated(rsp.data);
            helpers.resetForm();
            openModal();
        } catch
        {

        }
    }


    const closeModal = () => {
        setIsOpen(false)
    }

    const openModal = () => {
        setIsOpen(true)
    }

    if (token == null) {
        return (<div>Please login in</div>)
    }

    return (
        <Main meta={<Meta title="Homepage" description="Description" />}>
            <div className="z-20 container px-6 flex flex-col relative py-4 mx-auto">
                <div className="flex flex-col">
                    <Formik initialValues={{
                        id: '',
                        name: '',
                        items: [],
                        multiple: false,
                        maxOpening: 0
                    } as Gift} onSubmit={handleSubmit}>
                        {({values}) => (
                            <Form>
                                <h2 className="text-3xl font-bold leading-9 text-gray-900 mb-12">
                                    Create new gift
                                </h2>
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
                                <FieldArray name="items" render={arrayUtils => (
                                    <>
                                        <h2 className="text-3xl font-bold leading-9 text-gray-900 mb-4 mt-3">
                                            Add items
                                        </h2>
                                        <button
                                            type="button"
                                            className="py-4 px-6  bg-blue-600 hover:bg-blue-700 focus:ring-blue-500 focus:ring-offset-blue-200
                                                text-white transition ease-in duration-200 text-base
                                                font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-full text-center"
                                            onClick={() => arrayUtils.insert(values.items.length, {name: '', description: ''})}
                                        >
                                            +
                                        </button>
                                        <div className="grid xs:grid-cols-1 sm:grid-cols-4 gap-4">
                                            {values.items.map((_, key) => (
                                                <GiftItem key={key} index={key} />
                                            ))}
                                        </div>
                                    </>
                                )} />

                                <hr className="mt-10 border-b-2 border-gray-300 mb-4" />
                                <button
                                    className="flex items-center px-6 py-2  transition ease-in duration-200
                                    uppercase rounded-full hover:bg-gray-800
                                     hover:text-white border-2 border-gray-900 focus:outline-none"
                                    type="submit"
                                >
                                    Submit
                                </button>
                            </Form>
                        )}
                    </Formik>

                    <div>
                        <Transition appear show={isOpen} as={Fragment}>
                            <Dialog
                                as="div"
                                className="fixed inset-0 z-50 overflow-y-auto"
                                onClose={closeModal}
                            >
                                <div className="min-h-screen px-4 text-center">
                                    <Transition.Child
                                        as={Fragment}
                                        enter="ease-out duration-300"
                                        enterFrom="opacity-0"
                                        enterTo="opacity-100"
                                        leave="ease-in duration-200"
                                        leaveFrom="opacity-100"
                                        leaveTo="opacity-0"
                                    >
                                        <Dialog.Overlay className="fixed inset-0 bg-gray-600 bg-opacity-75" />
                                    </Transition.Child>
                                    <span
                                        className="inline-block h-screen align-middle"
                                        aria-hidden="true"
                                    >
                                    &#8203;
                                </span>
                                    <Transition.Child
                                        as={Fragment}
                                        enter="ease-out duration-300"
                                        enterFrom="opacity-0 scale-95"
                                        enterTo="opacity-100 scale-100"
                                        leave="ease-in duration-200"
                                        leaveFrom="opacity-100 scale-100"
                                        leaveTo="opacity-0 scale-95"
                                    >
                                        <div className="inline-block w-full max-w-7xl p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                                            <Dialog.Title
                                                as="h3"
                                                className="text-lg font-bold leading-2 text-gray-900"
                                            >
                                                Share link
                                            </Dialog.Title>
                                            <div>
                                                <div className="rounded-xl border-2 border-gray-300 p-2">
                                                    <input
                                                        ref={clipboard.target}
                                                        readOnly
                                                        value={`${window.location.host}/open?id=${created?.id}`}
                                                        className="w-full focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
                                                    />
                                                    <button className="rounded-xl border-2 border-gray-300 p-1" onClick={clipboard.copy}>
                                                        Copy
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </Transition.Child>
                                </div>
                            </Dialog>
                        </Transition>
                    </div>
                </div>
            </div>
        </Main>
    );
};

export default Create;
