import React from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog'
import { useSelector, useDispatch } from 'react-redux'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { clearNotifications } from '@/redux/notificationSlice'
import { Button } from './ui/button'
import { User } from 'lucide-react'

const Notifications = ({ open, setOpen }) => {
    const { notifications } = useSelector(store => store.realTimeNotification);
    const dispatch = useDispatch();

    return (
        <Dialog open={open}>
            <DialogContent onInteractOutside={() => setOpen(false)}>
                <DialogHeader>
                    <DialogTitle className='flex justify-between items-center'>
                        Notifications
                        {notifications.length > 0 && (
                            <Button variant='ghost' size='sm' onClick={() => dispatch(clearNotifications())}>Clear all</Button>
                        )}
                    </DialogTitle>
                </DialogHeader>
                <div className='max-h-[70vh] overflow-y-auto'>
                    {
                        notifications.length === 0 ? (
                            <div className='p-4 text-center text-gray-500'>No new notifications</div>
                        ) : (
                            notifications.map((notification, index) => (
                                <div key={index} className='flex items-center gap-3 p-3 hover:bg-gray-50 hover:text-slate-900 dark:hover:text-black rounded-lg'>
                                    <Avatar className='h-10 w-10'>
                                        <AvatarImage src={notification.userDetails?.profilePicture} />
                                        <AvatarFallback><User className="w-5 h-5 text-gray-500" /></AvatarFallback>
                                    </Avatar>
                                    <div className='flex flex-col'>
                                        <p className='text-sm'>
                                            <span className='font-bold'>{notification.userDetails?.username}</span> {notification.message}
                                        </p>
                                    </div>
                                </div>
                            ))
                        )
                    }
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default Notifications
