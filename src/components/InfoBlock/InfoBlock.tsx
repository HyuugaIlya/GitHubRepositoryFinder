import { memo } from 'react'

import clsx from 'clsx'

import IconButton from '@mui/material/IconButton'
import { GridCloseIcon } from '@mui/x-data-grid'
import { Chip } from '@mui/material'

import { TGridRow } from '../Content/Content'

import styles from './InfoBlock.module.scss'

type TInfoBlock = {
    rep: TGridRow | null
    isOpen: boolean,
    onModalOpen: () => void
}
export const InfoBlock = memo(({
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
                        <IconButton onClick={onModalOpen} aria-label="close">
                            <GridCloseIcon />
                        </IconButton>
                    </h2>
                    <p className={styles.info__rep_main}>
                        <Chip
                            component={'span'}
                            sx={{
                                backgroundColor: '#2196F3',
                                color: '#F2F2F2'
                            }}
                            label={rep.primaryLanguage || 'Отсутствует'}
                        />
                        <span>{(`⭐ ` + rep.stargazerCount) || 'Отсутствует'}</span>
                    </p>
                    <p className={styles.info__rep_langs}>
                        {rep.languages?.nodes?.map((l, i) => <Chip
                            key={i}
                            component={'span'}
                            label={l.name}
                        />) || 'Отсутствуют'}
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
})
