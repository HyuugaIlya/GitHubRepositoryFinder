import {
    useCallback,
    useEffect,
    useMemo,
    useRef,
    useState
} from 'react'

import {
    TPageInfo,
    TQuery,
    TRepository
} from '../../store'

// import { AppDataGrid } from '../../mui/components/AppDataGrid'
import { InfoBlock } from './../InfoBlock/InfoBlock'

import {
    DataGrid,
    GridEventListener,
    GridPaginationMeta,
    GridPaginationModel,
    GridRowId,
    GridRowParams,
    GridRowSelectionModel,
} from '@mui/x-data-grid'
import Paper from '@mui/material/Paper'
import { Typography, useMediaQuery } from '@mui/material'

import {
    dataGridStyles,
    paperStylesResolver,
    typographyStylesResolver
} from '../../mui/styles/mui-styles'
import { columns, rowsConverter } from '../../mui/componentsUtils/data-grid'

import styles from './Content.module.scss'

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

    const [rowCountState, setRowCountState] = useState(repositoryCount || 0)

    const [rowSelectionModel, setRowSelectionModel] =
        useState<GridRowSelectionModel>([]);

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
        if (match850) setOpenModal(true)

        setCurrentRep(p.row)
    }

    useEffect(() => {
        setOpenModal((match850 && currentRep) ? true : false)
    }, [match850, currentRep])

    const handleRep = useCallback(() => {
        if (match850) setOpenModal(false)
        setRowSelectionModel([])
        setCurrentRep(null)
    }, [match850])

    const handleRowSelection = (newRowSelectionModel: GridRowSelectionModel) => {
        if (!newRowSelectionModel.length) {
            setCurrentRep(null)
            if (match850) setOpenModal(false)
        }
        setRowSelectionModel(newRowSelectionModel)
    }

    return (
        <main className={styles.content}>
            <div className={styles.container}>
                {
                    isResult
                        ? <div
                            className={styles.content__grid}
                        >
                            {!reps.length ? 'Репозитории не найдены' : <>
                                <Paper sx={paperGridStyles}>
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
                                        disableMultipleRowSelection
                                        onRowSelectionModelChange={handleRowSelection}
                                        rowSelectionModel={rowSelectionModel}
                                        sx={dataGridStyles}
                                    />
                                </Paper>
                                <InfoBlock
                                    rep={currentRep}
                                    isOpen={openModal}
                                    onModalOpen={handleRep}
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
