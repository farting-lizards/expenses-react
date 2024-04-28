import React from 'react';
import { SvgIcon, SvgIconProps } from '@material-ui/core';

export function AddIcon(props: { strokecolor: string } & SvgIconProps): JSX.Element {
    return (
        <SvgIcon {...props}>
            <path d="M12 1L12 23M23 12L1 12" stroke={props.strokecolor} strokeWidth="3" strokeLinecap="round" />
        </SvgIcon>
    );
}
