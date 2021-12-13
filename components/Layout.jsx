import styles from '../css/Layout.module.css'
import Nav from './Nav'
import SignInModal from './Modals/modals.jsx'

const Layout = ({children}) => {
    return (
        <>
            <Nav/>
            <SignInModal />
            <div className={styles.container}>
                <main className={styles.main}>
                    {children}
                </main>
            </div>
        </>
    )
}

export default Layout