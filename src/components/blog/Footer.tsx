import styles from './Footer.module.css';

export default function Footer() {
    return (
        <footer>
            <div className={styles.footer + " py-4 text-sm"}>
                    &copy; 2025 Tomoneko-Lab. All rights reserved.
            </div>
        </footer>
    );
}