import {FC, PropsWithChildren} from "react";

export const Page: FC<PropsWithChildren> = ({children}) => {
    return (
        <main>
            {children}
        </main>
    )
}