import React from 'react';

import {Field, FieldArray, Form, Formik, FormikHelpers} from 'formik';

import { Meta } from '../layout/Meta';
import { Main } from '../templates/Main';
import GiftItem from "../components/GiftItem";
import Api from "../utils/api";
import {Gift} from "../types/GiftTypes";

const Create = () => {

    const handleSubmit = async (values: Gift, helpers: FormikHelpers<Gift>) => {

        try {
            await Api.post('/api/gift', {...values});

            helpers.resetForm();

        } catch
        {

        }


    }

    return (
        <Main meta={<Meta title="Homepage" description="Description" />}>
            <div className="z-20 container px-6 flex flex-col relative py-4 mx-auto">
                <div className="flex flex-col">
                    <Formik initialValues={{
                        id: 0,
                        name: '',
                        items: []
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
                                        className="w-full"
                                        autoComplete="off"
                                    />
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
                </div>
            </div>
        </Main>
    );
};

export default Create;
