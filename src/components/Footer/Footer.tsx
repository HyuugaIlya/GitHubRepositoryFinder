import { memo } from 'react'
import styles from './Footer.module.scss'

export const Footer = memo(() => {
    return (
        <footer className={styles.footer}>
            <div className={styles.container}></div>
        </footer>
    )
})