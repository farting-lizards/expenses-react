import { SvgIcon, SvgIconProps } from '@material-ui/core';
import React from 'react';

export function ReviewIcon(props: SvgIconProps): JSX.Element {
    return (
        <SvgIcon {...props} viewBox="0 0 24 14">
            <path
                d="M11.9906 16.3645C6.48547 16.3645 2.09269 13.1029 0 8.18225C2.11155 3.26159 6.50432 0 11.9906 0C17.4768 0 21.8885 3.26159 24 8.18225C21.8885 13.1029 17.4768 16.3645 11.9906 16.3645ZM11.9906 14.4038C16.3456 14.4038 20.0974 11.8586 21.8507 8.18225C20.0974 4.50589 16.3456 1.96072 11.9906 1.96072C7.65436 1.96072 3.90259 4.50589 2.14925 8.18225C3.88374 11.8586 7.63551 14.4038 11.9906 14.4038ZM7.42812 8.18225C7.42812 5.65593 9.46426 3.6198 11.9717 3.6198C14.498 3.6198 16.5342 5.67478 16.5342 8.18225C16.5342 10.7086 14.4792 12.7447 11.9717 12.7447C9.46426 12.7447 7.42812 10.6897 7.42812 8.18225ZM12.2545 7.03221C12.2545 7.82404 12.8767 8.46504 13.6874 8.46504C14.4603 8.46504 15.1013 7.82404 15.1013 7.03221C15.1013 6.25923 14.4792 5.61822 13.6874 5.61822C12.8955 5.61822 12.2545 6.24038 12.2545 7.03221Z"
                fill="#f2f2f2"
            />
        </SvgIcon>
    );
}
