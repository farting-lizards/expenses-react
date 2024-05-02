import 'react-datepicker/dist/react-datepicker.css';
import './DateRangePickerStyles.css';
import ShoppingCartOutlinedIcon from '@material-ui/icons/ShoppingCartOutlined';
import FastfoodOutlinedIcon from '@material-ui/icons/FastfoodOutlined';
import HomeOutlinedIcon from '@material-ui/icons/HomeOutlined';
import FlightTakeoffOutlinedIcon from '@material-ui/icons/FlightTakeoffOutlined';
import DirectionsCarOutlinedIcon from '@material-ui/icons/DirectionsCarOutlined';
import PetsOutlinedIcon from '@material-ui/icons/PetsOutlined';
import FavoriteOutlinedIcon from '@material-ui/icons/FavoriteOutlined';
import DevicesOtherOutlinedIcon from '@material-ui/icons/DevicesOtherOutlined';
import LocalPharmacyOutlinedIcon from '@material-ui/icons/LocalPharmacyOutlined';
import DashboardOutlinedIcon from '@material-ui/icons/DashboardOutlined';
import LocalFloristOutlinedIcon from '@material-ui/icons/LocalFloristOutlined';
import React from 'react';

export function CategoryIcon({ category }: { category: string }): JSX.Element {
    let icon;
    switch (category) {
        case 'groceries':
            icon = <ShoppingCartOutlinedIcon color="secondary" />;
            break;
        case 'plants':
            icon = <LocalFloristOutlinedIcon color="secondary" />;
            break;
        case 'eating-out':
            icon = <FastfoodOutlinedIcon color="secondary" />;
            break;
        case 'rent':
            icon = <HomeOutlinedIcon color="secondary" />;
            break;
        case 'travel':
            icon = <FlightTakeoffOutlinedIcon color="secondary" />;
            break;
        case 'car':
            icon = <DirectionsCarOutlinedIcon color="secondary" />;
            break;
        case 'git ':
            icon = <PetsOutlinedIcon color="secondary" />;
            break;
        case 'family':
            icon = <FavoriteOutlinedIcon color="secondary" />;
            break;
        case 'gadgets':
            icon = <DevicesOtherOutlinedIcon color="secondary" />;
            break;
        case 'medical':
            icon = <LocalPharmacyOutlinedIcon color="secondary" />;
            break;
        case 'other':
            icon = <DashboardOutlinedIcon color="secondary" />;
            break;
        default:
            icon = <DashboardOutlinedIcon color="secondary" />;
    }
    return icon;
}
