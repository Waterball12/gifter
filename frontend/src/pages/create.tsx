import React from 'react';

import {Field, FieldArray, Form, Formik} from 'formik';

import { Meta } from '../layout/Meta';
import { Main } from '../templates/Main';
import GiftItem from "../components/GiftItem";

const Create = () => {
    const handleSubmit = () => {};

    return (
        <Main meta={<Meta title="Homepage" description="Description" />}>
            <div className="flex relative z-20 ">
                <div className="container px-6 flex flex-col relative py-4">
                    <div className="flex flex-col">
                        <Formik initialValues={{}} onSubmit={handleSubmit}>
                            <Form>
                                <h2 className="text-3xl font-bold leading-9 text-gray-900 mb-12">
                                    Create new gift
                                </h2>
                                <label htmlFor="name">Name</label>
                                <Field
                                    id="name"
                                    name="name"
                                    placeholder="Name"
                                />

                                <h2 className="text-3xl font-bold leading-9 text-gray-900 mb-4">
                                    Add items
                                </h2>
                                <FieldArray name="items" component={GiftItem} />
                                <hr className="border-b-2 border-gray-300 mb-4" />
                                <button
                                    className="flex items-center px-6 py-2  transition ease-in duration-200
                                    uppercase rounded-full hover:bg-gray-800
                                     hover:text-white border-2 border-gray-900 focus:outline-none"
                                    type="submit"
                                >
                                    Submit
                                </button>
                            </Form>
                        </Formik>
                    </div>
                </div>
            </div>
        </Main>
    );
};

export default Create;
