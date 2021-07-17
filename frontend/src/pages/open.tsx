import React, {Fragment, useEffect, useState} from 'react';
import { useRouter } from 'next/router';
import {Gift} from "../types/GiftTypes";
import {AxiosError} from "axios";
import Api from "../utils/api";
import GiftImage from "../../public/gift.svg";
import Image from "next/image";
import {Dialog, Transition} from "@headlessui/react";
import {FieldArray, Formik} from "formik";
import GiftItem from "../components/GiftItem";
import Link from "next/link";

const Open = () => {
    const router = useRouter();
    const id = router.query.id;
    const [isOpen, setIsOpen] = useState(false)
    const [gift, setGift] = useState<Gift | null>(null);

    useEffect(() => {
        if (!id) return;

        Api.get('/api/gift/open?id=' + id)
            .then(rsp => {
                setGift(rsp.data);
            })
            .catch((error: AxiosError) => {
                console.log(error);
            })
    }, [id]);

    const closeModal = () => {
        setIsOpen(false)
    }

    const openModal = () => {
        setIsOpen(true)
    }

    const handleSubmit = () => {}
    if (!id) {
        return <div>Nothing here...</div>
    }

    if (gift == null) {
        return <div>Loading...</div>
    }

    return (

        <main className="bg-white relative overflow-hidden h-screen relative">
            <header className="absolute top-0 left-0 right-0 z-20">
                <nav className="container mx-auto px-6 md:px-12 py-4">
                    <div className="md:flex justify-between items-center">
                        <div className="hidden md:flex md:items-center md:justify-end space-x-4">
                            <Link href="/" passHref>
                                <button
                                    className="px-6 py-2 w-36 transition ease-in duration-200 uppercase hover:bg-blue-500 text-white border border-blue-400 bg-blue-400 focus:outline-none">
                                    Back
                                </button>
                            </Link>
                        </div>
                    </div>
                </nav>
            </header>
            <div className="container mx-auto px-6 md:px-12 relative z-10 flex items-center py-32">
                <div className="container mx-auto px-6 flex flex-col justify-between items-center relative">
                    <div
                        className="flex w-full items-center justify-center space-x-12 flex-col md:flex-row mb-16 md:mb-8">
                        <h1 className="font-thin text-center text-6xl text-gray-800">
                            Gift: {gift.name}
                        </h1>
                    </div>
                    <div className="block w-full mx-auto mt-6 md:mt-0 relative">
                        <div className="max-w-2xl m-auto">
                            <Image src={GiftImage} />
                        </div>
                    </div>
                    <button
                        type="button"
                        className="py-4 px-6  bg-blue-600 hover:bg-blue-700 focus:ring-blue-500 focus:ring-offset-blue-200
                             text-white transition ease-in duration-200 text-center text-base
                              font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-full"
                        onClick={openModal}
                    >
                        Open
                    </button>

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
                                                className="text-lg font-medium leading-6 text-gray-900"
                                            >
                                                Your gift
                                            </Dialog.Title>
                                            <Formik initialValues={gift} onSubmit={handleSubmit}>
                                                {({values}) => (
                                                    <FieldArray name="items" render={_ => (
                                                        <>
                                                            <div className="grid xs:grid-cols-1 sm:grid-cols-4 gap-4">
                                                                {values.items.map((_, key) => (
                                                                    <GiftItem key={key} index={key} readOnly />
                                                                ))}
                                                            </div>
                                                        </>
                                                    )} />
                                                )}
                                            </Formik>
                                        </div>
                                    </Transition.Child>
                                </div>
                            </Dialog>
                        </Transition>
                    </div>
                </div>
            </div>
        </main>

    );
};

export default Open;