import React from 'react';
import { SvgIcon, SvgIconProps } from '@material-ui/core';

export function ImportIcon(props: { strokecolor: string } & SvgIconProps): JSX.Element {
    return (
        <SvgIcon {...props}>
            <path d="M23 13.8333L12 23M12 23L1 13.8333M12 23L12 1" stroke={props.strokecolor} strokeWidth="3" strokeLinecap="round" />
        </SvgIcon>
    );
}
