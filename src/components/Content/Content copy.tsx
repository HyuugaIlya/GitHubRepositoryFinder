import { useEffect, useMemo, useRef, useState } from 'react'

import {
    TPageInfo,
    TQuery,
    TRepository
} from '../../store'

import { AppDataGrid } from '../../mui/components/AppDataGrid'
import { InfoBlock } from './../InfoBlock/InfoBlock'

import styles from './Content.module.scss'

import {
    DataGrid,
    GridEventListener,
    GridPaginationMeta,
    GridPaginationModel,
    GridRowId,
    GridRowParams,
} from '@mui/x-data-grid'
import Paper from '@mui/material/Paper'
import { Typography, useMediaQuery } from '@mui/material'

import {
    dataGridStyles,
    paperStylesResolver,
    typographyStylesResolver
} from '../../mui/styles/mui-styles'
import { columns, rowsConverter } from '../../mui/componentsUtils/data-grid'

export type TGridRow = {
    id: string,
    name: string,
    primaryLanguage: string,
    forkCount: string,
    stargazerCount: string,
    updatedAt: Date,
    license: string,
    description: string,
    languages: {
        nodes: {
            name: string;
        }[];
    }
}
type TAppDataGrid = {
    reps: TRepository[],
    isFetching: boolean,
    repositoryCount: number,
    limit: number,
    pageInfo: TPageInfo,
    onModalOpen: () => void,
    setParams: React.Dispatch<React.SetStateAction<TQuery | null>>,
    setCurrentRep: React.Dispatch<React.SetStateAction<TGridRow | null>>,
}
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

    const onModalOpen = () => {
        setOpenModal(!openModal)
    }
    const [rowCountState, setRowCountState] = useState(repositoryCount || 0)

    const mapPageToNextCursor = useRef<{ [page: number]: GridRowId }>({})

    const [paginationModel, setPaginationModel] = useState({
        page: 0,
        pageSize: limit,
    })

    const handlePaginationModelChange = (newPaginationModel: GridPaginationModel) => {
        if (newPaginationModel.pageSize !== paginationModel.pageSize) {
            setParams((prev) => ({
                ...prev,
                first: newPaginationModel.pageSize,
                before: null,
                after: null,
                last: null
            }))
            setPaginationModel({ ...newPaginationModel, page: 0 })
            mapPageToNextCursor.current = {}
            return
        }

        if (
            newPaginationModel.page === 0 ||
            mapPageToNextCursor.current[newPaginationModel.page - 1]
        ) {
            if (pageInfo?.endCursor !== mapPageToNextCursor.current[newPaginationModel.page - 1]) {
                setParams((prev) => ({
                    ...prev,
                    before: pageInfo?.startCursor,
                    last: newPaginationModel.pageSize,
                    first: null,
                    after: null
                }))
            } else {
                setParams((prev) => ({
                    ...prev,
                    after: pageInfo?.endCursor,
                    first: newPaginationModel.pageSize,
                    last: null,
                    before: null
                }))
            }
            setPaginationModel(newPaginationModel)
        }
    }

    const paginationMetaRef = useRef<GridPaginationMeta>()

    const paginationMeta = useMemo(() => {
        if (
            pageInfo?.hasNextPage !== undefined &&
            paginationMetaRef.current?.hasNextPage !== pageInfo?.hasNextPage
        ) {
            paginationMetaRef.current = { hasNextPage: pageInfo?.hasNextPage };
        }
        return paginationMetaRef.current
    }, [pageInfo?.hasNextPage])

    useEffect(() => {
        if (!isFetching && pageInfo?.hasNextPage) {
            mapPageToNextCursor.current[paginationModel.page] = pageInfo?.endCursor
        }
    }, [paginationModel.page, isFetching, pageInfo])

    useEffect(() => {
        setRowCountState((prevRowCountState) =>
            repositoryCount !== undefined ? repositoryCount : prevRowCountState,
        )
    }, [repositoryCount])

    const match600 = useMediaQuery('@media (max-width: 600px)')
    const match850 = useMediaQuery('@media (max-width: 850px)')

    const paperGridStyles = paperStylesResolver(match850)
    const typographyGridStyles = typographyStylesResolver(match600)

    const handleRowClick: GridEventListener<'rowClick'> = (
        p: GridRowParams<TGridRow>
    ) => {
        if (match850) onModalOpen()

        setCurrentRep(p.row)
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
                                {/* <Paper sx={paperGridStyles}>
                                    <Typography component={'h2'} sx={typographyGridStyles}>
                                        Результат поиска
                                    </Typography>
                                    <DataGrid
                                        rows={rowsConverter(reps)}
                                        onRowClick={handleRowClick}
                                        onRowCountChange={(newRowCount) => setRowCountState(newRowCount)}
                                        columns={columns}
                                        rowCount={rowCountState}
                                        paginationMode="server"
                                        loading={isFetching}
                                        paginationMeta={paginationMeta}
                                        onPaginationModelChange={handlePaginationModelChange}
                                        paginationModel={paginationModel}
                                        pageSizeOptions={[10, 20, 50]}
                                        sx={dataGridStyles}
                                    />
                                </Paper> */}
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
