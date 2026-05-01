import React, { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from './ui/dialog'
import { Button } from './ui/button'
import { Label } from './ui/label'
import { Textarea } from './ui/textarea'
import { Input } from './ui/input'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { toast } from 'sonner'
import { setAuthUser } from '@/redux/authSlice'
import { Loader2 } from 'lucide-react'

const EditProfile = ({ open, setOpen }) => {
    const { user } = useSelector(store => store.auth);
    const [loading, setLoading] = useState(false);
    const [input, setInput] = useState({
        bio: user?.bio,
        gender: user?.gender,
        profilePicture: user?.profilePicture
    });
    const dispatch = useDispatch();

    const fileChangeHandler = (e) => {
        const file = e.target.files?.[0];
        if (file) setInput({ ...input, profilePicture: file });
    }

    const selectChangeHandler = (value) => {
        setInput({ ...input, gender: value });
    }

    const editProfileHandler = async () => {
        const formData = new FormData();
        formData.append("bio", input.bio);
        formData.append("gender", input.gender);
        if (input.profilePicture) {
            formData.append("profilePicture", input.profilePicture);
        }
        try {
            setLoading(true);
            const res = await axios.post('http://localhost:8000/api/v1/user/profile/edit', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                withCredentials: true
            });
            if (res.data.success) {
                const updatedUserData = {
                    ...user,
                    bio: res.data.user?.bio,
                    gender: res.data.user?.gender,
                    profilePicture: res.data.user?.profilePicture
                };
                dispatch(setAuthUser(updatedUserData));
                toast.success(res.data.message);
                setOpen(false);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        } finally {
            setLoading(false);
        }
    }

    return (
        <Dialog open={open}>
            <DialogContent onInteractOutside={() => setOpen(false)}>
                <DialogHeader>
                    <DialogTitle>Edit Profile</DialogTitle>
                </DialogHeader>
                <div className='flex flex-col gap-4 py-4'>
                    <div>
                        <Label className="font-bold">Bio</Label>
                        <Textarea value={input.bio} onChange={(e) => setInput({ ...input, bio: e.target.value })} name='bio' />
                    </div>
                    <div>
                        <Label className="font-bold">Gender</Label>
                        <select 
                            defaultValue={input.gender} 
                            onChange={(e) => selectChangeHandler(e.target.value)}
                            className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                        </select>
                    </div>
                    <div>
                        <Label className="font-bold">Profile Picture</Label>
                        <Input type='file' onChange={fileChangeHandler} />
                    </div>
                </div>
                <DialogFooter>
                    {
                        loading ? (
                            <Button className='w-full my-4'>
                                <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                                Please wait
                            </Button>
                        ) : (
                            <Button onClick={editProfileHandler} className='w-full my-4'>Submit</Button>
                        )
                    }
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default EditProfile
