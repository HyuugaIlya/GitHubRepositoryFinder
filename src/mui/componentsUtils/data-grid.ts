import { GridColDef } from '@mui/x-data-grid'
import { TRepository } from '../../store'

export const columns: GridColDef[] = [
    { field: 'name', headerName: 'Название', width: 220, maxWidth: 250 },
    { field: 'primaryLanguage', headerName: 'Язык', width: 220, maxWidth: 250 },
    {
        field: 'forkCount',
        headerName: 'Число форков',
        type: 'number',
        width: 220,
        maxWidth: 250,
        align: 'left',
        headerAlign: 'left'
    },
    {
        field: 'stargazerCount',
        headerName: 'Число звезд',
        type: 'number',
        width: 220,
        maxWidth: 250,
        align: 'left',
        headerAlign: 'left'
    },
    {
        field: 'updatedAt',
        headerName: 'Дата обновления',
        type: 'date',
        width: 220,
        resizable: false,
    }
]

export const rowsConverter = (reps: TRepository[]) => (reps.map(rep => ({
    id: rep.node.id,
    name: rep.node.name,
    primaryLanguage: rep.node.primaryLanguage?.name,
    forkCount: rep.node.forkCount,
    stargazerCount: rep.node.stargazerCount,
    updatedAt: new Date(Date.parse(rep.node.updatedAt)),
    license: rep.node.licenseInfo?.name,
    description: rep.node.description,
    languages: rep.node.languages
})))