import React, {ReactNode, useState, Fragment} from 'react';
import Link from 'next/link';
import { parseCookies, setCookie } from 'nookies';
import { Dialog, Transition } from '@headlessui/react';
import {Field, Form, Formik, FormikHelpers} from "formik";
import Api from "../utils/api";
import {UserAuth} from "../types/UserAuth";

type IMainProps = {
    meta: ReactNode;
    children: ReactNode;
};

type CookieStore = {
    token?: string;
    username?: string;
}

const Main = (props: IMainProps) => {
    const cookies = parseCookies();
    let [isOpen, setIsOpen] = useState(false)

    const closeModal = () => {
        setIsOpen(false)
    }

    const openModal = () => {
        setIsOpen(true)
    }

    const token = (cookies as CookieStore).token || null;

    const handleSubmit = async (values: {username: string}, helpers: FormikHelpers<{ username: string }>) => {

        try {
            const response = await Api.post<UserAuth>('/api/user/sign-in', {username: values.username});

            setCookie(null, 'token', response.data.token);
            setCookie(null, 'username', response.data.username);

        } catch (e) {
            console.log(e);
        }

        closeModal();
        helpers.resetForm();
    }

    return (
        <div className="w-full h-full text-gray-700">
            {props.meta}

            <div className="flex flex-col h-full">
                <header className="h-24 sm:h-32 flex items-center z-30 w-full bg-blue-300">
                    <div className="container mx-auto px-6 flex items-center justify-between">
                        <div className="uppercase text-gray-800 dark:text-white font-black text-3xl flex items-center">
                            <Link href="/">
                                Gifter
                            </Link>
                        </div>
                        <div className="flex items-center">
                            <nav
                                className="font-sen text-gray-800 dark:text-white uppercase text-lg lg:flex items-center hidden">
                                {token && (
                                    <>
                                        <Link href="/create" passHref>
                                            <a
                                                className="py-2 px-6 flex hover:text-black"
                                            >
                                                Create
                                            </a>
                                        </Link>
                                        <Link href="/mygifts" passHref>
                                            <a
                                                className="py-2 px-6 flex hover:text-black"
                                            >
                                                My Gift
                                            </a>
                                        </Link>
                                    </>
                                )}

                                {!token ? (
                                    <button
                                        className="px-4 py-2 text-sm font-medium text-white bg-black rounded-md bg-opacity-20 hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
                                        onClick={openModal}>
                                        Login
                                    </button>
                                ) : null}
                            </nav>
                        </div>
                    </div>
                </header>

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
                                    <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                                        <Dialog.Title
                                            as="h3"
                                            className="text-lg font-medium leading-6 text-gray-900"
                                        >
                                            Login
                                        </Dialog.Title>
                                        <div className="mt-2">
                                            <Formik
                                                initialValues={{username: ''}}
                                                onSubmit={handleSubmit}
                                            >
                                                {() => (
                                                    <Form>
                                                        <div className="rounded-xl border-2 border-gray-300 mt-4 p-2">
                                                            <Field
                                                                name="username"
                                                                placeholder="Username"
                                                                className="w-full"
                                                                autoComplete="off"
                                                            />
                                                        </div>
                                                        <div className="mt-4">
                                                            <button
                                                                type="button"
                                                                className="inline-flex justify-center px-4 py-2 text-sm font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                                                                onClick={closeModal}
                                                            >
                                                                Cancel
                                                            </button>
                                                            <button
                                                                type="submit"
                                                                className="ml-2 inline-flex justify-center px-4 py-2 text-sm font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                                                            >
                                                                Submit
                                                            </button>
                                                        </div>
                                                    </Form>
                                                )}
                                            </Formik>
                                        </div>
                                    </div>
                                </Transition.Child>
                            </div>
                        </Dialog>
                    </Transition>
                </div>

                <div className="py-5 text-xl content h-full">{props.children}</div>

                <div className="border-t border-gray-300 text-center py-8 text-sm">
                    © Copyright {new Date().getFullYear()} Gifter Powered with{' '}
                    <span role="img" aria-label="Love">
                    ♥
                </span>{' '}
                    by <a href="https://creativedesignsguru.com">Waterball</a>
                    {/*
                 * PLEASE READ THIS SECTION
                 * We'll really appreciate if you could have a link to our website
                 * The link doesn't need to appear on every pages, one link on one page is enough.
                 * Thank you for your support it'll mean a lot for us.
                 */}
                </div>
            </div>
        </div>
    )
};

export { Main };
