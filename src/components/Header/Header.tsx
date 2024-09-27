import {
    SubmitHandler,
    useForm
} from 'react-hook-form'
import { TQuery } from '../../store'

import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'

import styles from './Header.module.scss'
import { textFieldStyles } from '../../mui/styles/mui-styles'
import { memo } from 'react'


type TForm = {
    search: string
}
type THeader = {
    setParams: React.Dispatch<React.SetStateAction<TQuery | null>>
}
export const Header = memo(({
    setParams
}: THeader) => {
    const {
        register,
        handleSubmit,
        formState: {
            isValid,
        },
        reset
    } = useForm<TForm>()

    const onSubmit: SubmitHandler<TForm> = (data) => {
        setParams((prev) => ({ ...prev, search: data.search }))
        reset()
    }

    return (
        <header className={styles.header}>
            <div className={styles.container}>
                <form
                    className={styles.header__form}
                    onSubmit={handleSubmit(onSubmit)}
                >
                    <TextField
                        {...register('search', {
                            required: true,
                            maxLength: 200,
                            pattern: {
                                value: /^[.-\w]+$/,
                                message: 'Значение не может быть пустой строкой'
                            }
                        })}
                        id="input-outlined"
                        variant='outlined'
                        sx={textFieldStyles}

                        placeholder='Введите поисковый запрос'
                    />
                    <Button
                        type='submit'
                        variant="contained"
                        disabled={!isValid}
                        sx={{ backgroundColor: "#2196F3" }}
                    >
                        ИСКАТЬ
                    </Button>
                </form>
            </div>
        </header>
    )
})
