import Box from '@material-ui/core/Box';
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import { makeStyles } from '@material-ui/core/styles';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import React, { useEffect, useState } from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import { euroToChf } from '../redux/reducers/expenses';
import { Expense } from '../types';
import './DateRangePickerStyles.css';
import ShoppingCartOutlinedIcon from '@material-ui/icons/ShoppingCartOutlined';
import LocalMallOutlinedIcon from '@material-ui/icons/LocalMallOutlined';
import EcoOutlinedIcon from '@material-ui/icons/EcoOutlined';
import FastfoodOutlinedIcon from '@material-ui/icons/FastfoodOutlined';
import HomeOutlinedIcon from '@material-ui/icons/HomeOutlined';
import FlightTakeoffOutlinedIcon from '@material-ui/icons/FlightTakeoffOutlined';
import TramOutlinedIcon from '@material-ui/icons/TramOutlined';
import DirectionsCarOutlinedIcon from '@material-ui/icons/DirectionsCarOutlined';
import PetsOutlinedIcon from '@material-ui/icons/PetsOutlined';
import FavoriteOutlinedIcon from '@material-ui/icons/FavoriteOutlined';
import DevicesOtherOutlinedIcon from '@material-ui/icons/DevicesOtherOutlined';
import LocalPharmacyOutlinedIcon from '@material-ui/icons/LocalPharmacyOutlined';
import DashboardOutlinedIcon from '@material-ui/icons/DashboardOutlined';
import LocalFloristOutlinedIcon from '@material-ui/icons/LocalFloristOutlined';

export function CategoryIcon({ category }: { category: string }): JSX.Element {
    let icon;
    switch (category) {
        case 'groceries':
            icon = <ShoppingCartOutlinedIcon style={{ color: '#C03757' }} />;
            break;
        case 'plants':
            icon = <LocalFloristOutlinedIcon style={{ color: '#C03757' }} />;
            break;
        case 'eating-out':
            icon = <FastfoodOutlinedIcon style={{ color: '#C03757' }} />;
            break;
        case 'rent':
            icon = <HomeOutlinedIcon style={{ color: '#C03757' }} />;
            break;
        case 'travel':
            icon = <FlightTakeoffOutlinedIcon style={{ color: '#C03757' }} />;
            break;
        case 'car':
            icon = <DirectionsCarOutlinedIcon style={{ color: '#C03757' }} />;
            break;
        case 'pet':
            icon = <PetsOutlinedIcon style={{ color: '#C03757' }} />;
            break;
        case 'family':
            icon = <FavoriteOutlinedIcon style={{ color: '#C03757' }} />;
            break;
        case 'gadgets':
            icon = <DevicesOtherOutlinedIcon style={{ color: '#C03757' }} />;
            break;
        case 'medical':
            icon = <LocalPharmacyOutlinedIcon style={{ color: '#C03757' }} />;
            break;
        case 'other':
            icon = <DashboardOutlinedIcon style={{ color: '#C03757' }} />;
            break;
        default:
            icon = <DashboardOutlinedIcon style={{ color: '#C03757' }} />;
    }
    return icon;
}
