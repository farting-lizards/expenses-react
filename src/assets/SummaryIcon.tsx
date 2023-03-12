import React from 'react';
import { SvgIcon, SvgIconProps } from '@material-ui/core';

export function SummaryIcon(props: { strokecolor: string } & SvgIconProps): JSX.Element {
    return (
        <SvgIcon {...props}>
            <path
                d="M7.79995 7.8H16.1999M7.79995 12.6H16.1999M5.75995 3H18.2399C19.1015 3 19.7999 3.80589 19.7999 4.8V21L17.1999 19.2L14.5999 21L11.9999 19.2L9.39995 21L6.79995 19.2L4.19995 21V4.8C4.19995 3.80589 4.89839 3 5.75995 3Z"
                stroke={props.strokecolor}
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
            />
        </SvgIcon>
    );
}
