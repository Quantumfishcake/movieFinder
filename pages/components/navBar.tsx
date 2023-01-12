import { FunctionComponent } from 'react';
import Link from 'next/link'

interface AuthProps {
    auth:{
        user: {
            username:string
        },
        signOut: Function
    }

}

const NavBar: FunctionComponent<AuthProps> = ({ auth }:AuthProps) => {

    return (
        <>
            <div className="navbar bg-base-100">
                <div className="flex-1">
                    <a className="btn btn-ghost normal-case text-xl">MovieFinder</a>
                </div>
                <div className="flex-none">
                    <ul className="menu menu-horizontal px-1">
                        
                        <li tabIndex={0}>
                            <Link href="/">Home</Link>
                            <Link href="/favourites">Favourites</Link>

                        </li>
                        <li><a>{auth?.user?.username}</a></li>
                        <li onClick={() => auth?.signOut()}><a>Signout</a></li>
                    </ul>
                </div>
            </div>
        </>
    );
};

export default NavBar;