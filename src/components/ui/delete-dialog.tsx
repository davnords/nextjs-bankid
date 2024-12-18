import { CircularProgress, Dialog, DialogActions, DialogContent } from '@mui/material'
import React from 'react'
import { Button } from "@/components/ui/button"


export const DeleteDialog = ({ title, subtitle, loading, handleDelete, dialogOpen, setDialogOpen }: { title: string, subtitle: string, loading: boolean, handleDelete: () => void, dialogOpen: boolean, setDialogOpen: (arg0: boolean) => void }) => {
    return (
        <Dialog
            open={dialogOpen}
            onClose={() => setDialogOpen(false)}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogContent>
                <div className='space-y-4'>
                    <h1 className="font-semibold text-lg md:text-2xl">{title}</h1>
                    <h4 className="text-sm md:text-md">{subtitle}</h4>
                </div>
                <span className="block text-sm font-medium"></span>
            </DialogContent>
            <DialogActions>
                <Button className="border border-black bg-white hover:bg-gray-200" size="sm" onClick={() => setDialogOpen(false)}>
                    Cancel
                </Button>
                <Button disabled={loading} onClick={handleDelete} className="ml-2 bg-red-500 hover:bg-red-900 text-white" size="sm">
                    {loading ? <CircularProgress size={14} /> : 'Delete'}
                </Button>
            </DialogActions>
        </Dialog>
    )
}
