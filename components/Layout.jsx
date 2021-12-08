import styles from '../styles/Layout.module.css'
import Nav from '../components/Nav'
import SignInModal from './Modals/modals'

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