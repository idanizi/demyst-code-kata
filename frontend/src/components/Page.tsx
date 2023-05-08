import {FC, PropsWithChildren} from "react";

const email = 'idanizi@gmail.com';

export const Page: FC<PropsWithChildren> = ({children}) => {

    return (
        <main>
            <article>
                {children}
            </article>
            <footer>
                Made with ❤️ by Idan Izicovich <a href={'mailto:' + email}>{email}</a>
            </footer>
        </main>
    )
}