import { Meta } from '../layout/Meta';
import { Main } from '../templates/Main';

export default function Home() {
    return (
        <Main meta={<Meta title="Homepage" description="Description" />}>
            <div className="flex relative z-20 items-center">
                <div className="container mx-auto px-6 flex flex-col justify-between items-center relative py-4">
                    <div className="flex flex-col">
                        <img
                            src="gift_opener.svg"
                            className="rounded-full w-100 mx-auto"
                            style={{ height: '400px' }}
                            alt=""
                        />
                        <p className="text-3xl my-6 text-center dark:text-white">
                            Create and share gift
                        </p>
                        <button
                            type="button"
                            className="py-4 px-6  bg-blue-600 hover:bg-blue-700 focus:ring-blue-500 focus:ring-offset-blue-200
                             text-white w-full transition ease-in duration-200 text-center text-base
                              font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-full"
                        >
                            Create gift
                        </button>
                    </div>
                </div>
            </div>
        </Main>
    );
}
