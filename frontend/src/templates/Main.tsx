import { ReactNode } from 'react';

type IMainProps = {
    meta: ReactNode;
    children: ReactNode;
};

const Main = (props: IMainProps) => (
    <div className="antialiased w-full h-full text-gray-700">
        {props.meta}

        <div className="flex flex-col h-full">
            <header className="h-24 sm:h-32 flex items-center z-30 w-full bg-blue-300">
                <div className="container mx-auto px-6 flex items-center justify-between">
                    <div className="uppercase text-gray-800 dark:text-white font-black text-3xl flex items-center">
                        <span className="text-xs ml-3 mt-1">
                            github/Waterball12
                        </span>
                    </div>
                    <div className="flex items-center">
                        <nav className="font-sen text-gray-800 dark:text-white uppercase text-lg lg:flex items-center hidden">
                            <a
                                href="/create"
                                className="py-2 px-6 flex hover:text-black"
                            >
                                Create
                            </a>
                            <a
                                href="/gifts"
                                className="py-2 px-6 flex hover:text-black"
                            >
                                My Gift
                            </a>
                        </nav>
                    </div>
                </div>
            </header>

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
);

export { Main };
