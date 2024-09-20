import clsx from 'clsx'
import { TGridRow } from '../../mui/components/AppDataGrid'

import styles from './InfoBlock.module.scss'

type TInfoBlock = {
    rep: TGridRow | null
    isOpen: boolean,
    onModalOpen: () => void
}
export const InfoBlock = ({
    rep,
    isOpen,
    onModalOpen
}: TInfoBlock) => {
    return (
        <section className={clsx(styles.info, isOpen && styles.modal)}>
            <div className={styles.container}>
                {rep ? <div className={styles.info__rep}>
                    <h2 className={styles.info__rep_name}>
                        <span>{rep.name || 'Отсутствует'}</span>
                        {isOpen && <svg onClick={onModalOpen} width="20px" height="20px" viewBox="-0.5 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M3 21.32L21 3.32001" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M3 3.32001L21 21.32" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        }
                    </h2>
                    <p className={styles.info__rep_main}>
                        <span>{rep.primaryLanguage || 'Отсутствует'}</span>
                        <span>{(`⭐ ` + rep.stargazerCount) || 'Отсутствует'}</span>
                    </p>
                    <p className={styles.info__rep_langs}>
                        {rep.languages?.nodes?.map((l, i) => <span key={i}>
                            {l.name}
                        </span>) || 'Отсутствуют'}
                    </p>
                    <p className={styles.info__rep_license}>
                        {rep.license || 'Лицензия отсутствует'}
                    </p>
                    <p className={styles.info__rep_description}>
                        {rep.description || 'Описание отсутствует'}
                    </p>
                </div> : <span className={styles.info__text}>
                    Выберите репозиторий
                </span>}
            </div>
        </section>
    )
}
