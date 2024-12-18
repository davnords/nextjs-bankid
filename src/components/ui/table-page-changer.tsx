import React from 'react'
import { IconButton } from '@mui/material'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

export const TablePageChange = ({ currentPage, totalPages, setCurrentPage }: { currentPage: number, totalPages: number, setCurrentPage: (arg0: number) => void }) => {
    return (
        <>
            <div className='flex flex-row items-center ml-2 mb-2'>
                <IconButton size="small" disabled={currentPage === 1} color="primary" aria-label="right arrow" onClick={() => setCurrentPage(currentPage - 1)}>
                    <ArrowBackIosIcon />
                </IconButton>
                <IconButton size="small" disabled={currentPage === totalPages} color="primary" aria-label="add to shopping cart" onClick={() => setCurrentPage(currentPage + 1)}>
                    <ArrowForwardIosIcon />
                </IconButton>
                <div className='flex flex-row w-full ml-2 text-sm'>Page: {`${currentPage} / ${totalPages}`}</div>
            </div>
        </>
    )
}

