import {NavBar} from "./NavBar"
import { WrapperVariant, Wrapper } from "./Wrapper"
import { Children } from "react"

interface LayoutProps{
    variant?: WrapperVariant;
}

export const Layout: React.FC<LayoutProps> = ({children, variant}) => {
    return(
        <>
        <NavBar />
        <Wrapper variant = {variant}>

            {children}
        </Wrapper>
        </>
    );
}