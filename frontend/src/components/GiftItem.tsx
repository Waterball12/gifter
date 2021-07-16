import { Field } from 'formik';
import React from 'react';

export interface GiftItemProps {
    index?: number;
}

const GiftItem = (props: GiftItemProps) => {
    const {
        index
    } = props;

    return (
        <div className="h-full flex-shrink-0">
            <div className="position-relative overflow-hidden block	h-full shadow-xl rounded-3xl">
                <div className="p-4">
                    <div className="flex flex-col items-center text-center">
                        <div className="p-3 border-2 rounded-full border-gray-400 border-dashed">
                            <div
                                className="relative flex items-center justify-center flex-shrink-0 text-lg rounded-full overflow-hidden"
                                style={{width: '100px', height: '100px'}}
                            >
                                <img className="w-full h-full text-center object-cover" src="/gift.svg" alt="" />
                            </div>
                        </div>
                        <div className="rounded-xl border-2 border-gray-300 mt-4 p-2">
                            <Field name={`items.${index}.name`} placeholder="Name" autoComplete="off"/>
                        </div>
                        <div className="rounded-xl border-2 border-gray-300 mt-4 p-2">
                            <Field name={`items.${index}.description`} placeholder="Description"  autoComplete="off"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GiftItem;