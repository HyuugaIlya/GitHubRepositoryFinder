import { SxProps, Theme } from "@mui/material"

export const dataGridStyles: SxProps<Theme> = {
    border: 0,
    // '& .MuiDataGrid-virtualScrollerRenderZone': {
    //     overflowY: 'scroll'
    // },
    '& .MuiDataGrid-columnHeader .MuiDataGrid-columnSeparator': {
        display: 'none',
    },
}

export const typographyStylesResolver = (matches: boolean): SxProps<Theme> => ({
    fontSize: matches ? 24 : 28,
    marginTop: matches ? '4px' : '0px'
})


export const paperStylesResolver = (matches: boolean): SxProps<Theme> => ({
    height: '100%',
    width: '100%',
    boxShadow: 'none',
    padding: matches ? '10px 20px 44px 20px' : '20px 40px 44px 40px',
    overflow: 'hidden'
})

export const textFieldStyles: SxProps<Theme> = {
    width: '912px',
    backgroundColor: '#F2F2F2',
    borderRadius: '4px',
    '& .MuiOutlinedInput-input': {
        '&::placeholder': {
            fontWeight: 500,
            fontStyle: 'italic',
        },
        padding: '9.5px'
    },
}
