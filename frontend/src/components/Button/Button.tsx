'use client'
import ButtonUnstyled, { ButtonOwnerState, ButtonProps } from '@mui/base/Button'
import * as React from 'react'

export const Button = React.forwardRef(function Button(props: ButtonProps, ref: React.ForwardedRef<HTMLButtonElement>) {
    return <ButtonUnstyled
        {...props}
        slotProps={{
            root: (state: ButtonOwnerState) => ({
                className: `bg-yellow-500 font-semibold px-5 ${state.focusVisible ? 'outline-0 ring-2 ring-cyan-500' : ''}`,
            }),
        }}
        ref={ref}
    />
})