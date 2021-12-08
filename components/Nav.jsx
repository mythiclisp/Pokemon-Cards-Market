import navStyles from '../styles/Nav.module.css'
import Link from 'next/link'

const Nav = () => {
    return (
        <div className={navStyles.nav}>
            <ul>
                <li>
                    <Link href="/">Home</Link>
                </li>
                <li>
                    <Link href="/about">About</Link>
                </li>
                <li data-target='modal-login'>
                    <Link href="/">Log In</Link>
                </li>
                <li data-target='modal-signup'>
                    <Link href="/">Sign up</Link>
                </li>
                <li className='logout-btn'>
                    <Link href="/">Log Out</Link>
                </li>
            </ul>
        </div>
    )
}

export default Nav