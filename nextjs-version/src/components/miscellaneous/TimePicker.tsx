import * as React from 'react';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { MobileTimePicker } from '@mui/x-date-pickers/MobileTimePicker';
import moment from 'moment';
import dayjs from 'dayjs';

export default function TimePicker({
    value = "",
    label = 'Select Time',
    name = "",
    day = "",
    handleChange = (value: any, name: string, day: string) => { }
}) {

    const onChange = (value: any) => {
        handleChange(value, name, day)
    }
    value = value ? `${moment().format('YYYY-MM-DD')} ${value}` : moment().format('YYYY-MM-DD h:i A');

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={['MobileTimePicker', 'MobileTimePicker']}>
                <MobileTimePicker value={dayjs(value)} onChange={onChange} label={label} />
            </DemoContainer>
        </LocalizationProvider>
    );
}