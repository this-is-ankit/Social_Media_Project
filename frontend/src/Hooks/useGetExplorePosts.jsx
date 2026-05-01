import { setExplorePosts } from "@/redux/postSlice";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const useGetExplorePosts = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        const fetchExplorePosts = async () => {
            try {
                const res = await axios.get('http://localhost:8000/api/v1/post/explore', {
                    withCredentials: true
                });
                if (res.data.success) {
                    dispatch(setExplorePosts(res.data.posts));
                }
            } catch (error) {
                console.log(error);
            }
        }
        fetchExplorePosts();
    }, [dispatch]);
};

export default useGetExplorePosts;
