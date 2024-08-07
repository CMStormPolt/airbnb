'use client';

import { Range } from 'react-date-range';
import { Calendar } from '../inputs/Calendar';
import { Button } from '../Button';

interface ListingReservationProps {
    price: number;
    totalPrice: number;
    dateRange: Range;
    onChange: (value: Range) => void;
    onSubmit: (value: any) => void;
    disabled: boolean;
    disabledDates: Date[];
}

export const ListingReservation: React.FC<ListingReservationProps> = ({
    price,
    totalPrice,
    dateRange,
    onChange,
    onSubmit,
    disabled,
    disabledDates
}) => {


    return (
        <div className="bg-white border-[1px] border-neutral-200 overflow-hidden rounded-xl">
            <div className='flex flex-row items-center gap-1 p-4'>
                <div className='text-2xl font-semibold '>
                    $ {price}
                </div>
                <div className='font-light text-neutral-600'>
                    night
                </div>
            </div>
            <hr />
            <Calendar 
                value={dateRange}
                disabledDates={disabledDates}
                onChange={(value) => onChange(value.selection)}
            />
            <hr />
            <div className='p-4'>
                <Button 
                    disabled={disabled}
                    label='Reserve'
                    onClick={onSubmit}
                />
            </div>
            <div className='p-4 flex flex-row items-center justify-between font-semibold text-lg'>
                <div>Total</div>
                <div>$ {totalPrice}</div>
            </div>
        </div>
    )
}