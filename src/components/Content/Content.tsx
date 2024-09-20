import { useEffect, useState } from 'react'

import {
    TPageInfo,
    TQuery,
    TRepository
} from '../../store'

import { AppDataGrid, TGridRow } from '../../mui/components/AppDataGrid'
import { InfoBlock } from './../InfoBlock/InfoBlock'

import styles from './Content.module.scss'
import { useMediaQuery } from '@mui/material'

type TContent = {
    reps: TRepository[],
    isResult: boolean,
    isFetching: boolean,
    repositoryCount: number,
    limit: number,
    pageInfo: TPageInfo,
    setParams: React.Dispatch<React.SetStateAction<TQuery | null>>,
}
export const Content = ({
    reps = [] satisfies TRepository[],
    isResult,
    repositoryCount,
    isFetching,
    limit,
    pageInfo,
    setParams
}: TContent) => {
    const [currentRep, setCurrentRep] = useState<TGridRow | null>(null)

    const [openModal, setOpenModal] = useState<boolean>(false)

    const match850 = useMediaQuery('@media (max-width: 850px)')

    const onModalOpen = () => {
        setOpenModal(!openModal)
    }

    useEffect(() => {
        openModal
            ? window.document.body.style.overflowY = 'hidden'
            : window.document.body.style.overflowY = 'auto'
    }, [openModal])

    useEffect(() => {
        if (!match850) setOpenModal(false)
    }, [match850])

    return (
        <main className={styles.content}>
            <div className={styles.container}>
                {
                    isResult
                        ? <div
                            className={styles.content__grid}
                        >
                            {!reps.length ? 'Репозитории не найдены' : <>
                                <AppDataGrid
                                    isFetching={isFetching}
                                    limit={limit}
                                    pageInfo={pageInfo}
                                    repositoryCount={repositoryCount}
                                    reps={reps}
                                    setCurrentRep={setCurrentRep}
                                    setParams={setParams}
                                    onModalOpen={onModalOpen}
                                />
                                <InfoBlock
                                    rep={currentRep}
                                    isOpen={openModal}
                                    onModalOpen={onModalOpen}
                                />
                            </>}
                        </div>
                        : <span className={styles.content__text}>
                            Добро пожаловать
                        </span>
                }
            </div>
        </main>
    )
}
