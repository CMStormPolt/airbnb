'use client'

import { PuffLoader } from 'react-spinners';

export const Loader: React.FC = ({

}) => {
    return (
        <div className="h-[70v] flex flex-col justify-center items-center">
            <PuffLoader size={100}/>
        </div>
    )
}