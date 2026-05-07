import React, { useEffect, useState } from 'react'
import { Dialog, DialogContent, DialogTrigger } from './ui/dialog'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { Link } from 'react-router-dom'
import { Button } from './ui/button'
import { MoreHorizontal, User } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
import Comment from './Comment'
import axios from 'axios'
import { setPosts } from '@/redux/postSlice'
import { toast } from 'sonner'
import { POST_API_END_POINT } from '@/utils/constant'

const CommentDialog = ({ open, setOpen }) => {
  const [text, setText] = useState("");
  const { posts, selectedPost } = useSelector(store => store.post);
  const dispatch = useDispatch();
  const [comment, setComment] = useState([]);
  useEffect(() => {
    if (selectedPost) {
      setComment(selectedPost.comments);
    }
  }, [selectedPost]);
  const changeEventHandler = (e) => {
    const inputText = e.target.value;
    if (inputText.trim()) {
      setText(inputText);
    } else {
      setText("");
    }
  }

  const sendMessageHandler = async () => {
    try {
      const res = await axios.post(`${POST_API_END_POINT}/${selectedPost._id}/comment`, { text }, {
        headers: {
          'Content-Type': 'application/json'
        },
        withCredentials: true
      });
      if (res.data.success && res.data.comment) {
        const updatedCommentData = [...comment, res.data.comment];
        setComment(updatedCommentData);
        const updatedPostData = posts.map(p =>
          p._id == selectedPost._id ? { ...p, comments: updatedCommentData } : p
        );
        dispatch(setPosts(updatedPostData));
        toast.success(res.data.message);
        setText("");
      }
    } catch (error) {


    }
  }

  return (
    <Dialog open={open}>
      <DialogContent onInteractOutside={() => setOpen(false)} className='max-w-5xl p-0 flex flex-col bg-white'>
        <div className='flex flex-1'>
          <div className='w-1/2'>
            <img className='w-full h-full object-cover rounded-l-lg' src={selectedPost?.image} alt="post_immg" />
          </div>
          <div className="w-1/2 flex flex-col justify-between bg-white rounded-r-lg">
            <div className='flex items-center justify-between p-4'>
              <div className="flex gap-3 items-center">
                <Link>
                  <Avatar>
                    <AvatarImage src={selectedPost?.author?.profilePicture} />
                    <AvatarFallback><User className="w-5 h-5 text-gray-500" /></AvatarFallback>
                  </Avatar>
                </Link>
                <Link className='font-semibold text-xs'>{selectedPost?.author?.username}</Link>
              </div>
              <Dialog>
                <DialogTrigger asChild>
                  <MoreHorizontal className='cursor-pointer' />
                </DialogTrigger>
                <DialogContent className='flex flex-col items-center text-sm text-center bg-white'>
                  <div className='cursor-pointer w-full text-[#ED4956] font-bold'>Unfollow</div>
                  <div className='cursor-pointer w-full'>Add to favorites</div>
                </DialogContent>
              </Dialog>
            </div>
            <hr />
            <div className='flex-1 overflow-y-auto max-h-96 p-4'>
              {comment.map((comment) => {
                if (!comment) return null;
                return (
                  <Comment key={comment._id || Math.random()} comment={comment} />
                );
              })}
            </div>
            <div className='p-4'>
              <div className='flex items-center gap-2'>
                <input
                  type="text"
                  value={text}
                  onChange={changeEventHandler}
                  placeholder='Leave a comment ...'
                  className='w-full outline-none border text-sm border-gray-300 p-2 rounded '
                />
                <Button className='cursor-pointer hover:bg-cyan-500' disabled={!text.trim()} onClick={sendMessageHandler} variant="outline">Send</Button>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
export default CommentDialog