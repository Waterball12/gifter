import { Field } from 'formik';
import React from 'react';
import Image from 'next/image';
import GiftImage from '../../public/gift.svg';

export interface GiftItemProps {
    index?: number;
    readOnly?: boolean
}

const GiftItem = (props: GiftItemProps) => {
    const {
        index,
        readOnly = false
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
                                <Image className="w-full h-full text-center object-cover" src={GiftImage} alt="" />
                            </div>
                        </div>
                        <div className="rounded-xl border-2 border-gray-300 mt-4 p-2">
                            <Field
                                name={`items.${index}.name`}
                                placeholder="Name"
                                autoComplete="off"
                                readOnly={readOnly}
                                className="w-full focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
                            />
                        </div>
                        <div className="rounded-xl border-2 border-gray-300 mt-4 p-2">
                            <Field
                                name={`items.${index}.description`}
                                placeholder="Description"
                                autoComplete="off"
                                readOnly={readOnly}
                                className="w-full focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GiftItem;