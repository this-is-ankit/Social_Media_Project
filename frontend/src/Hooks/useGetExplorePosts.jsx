import { setExplorePosts } from "@/redux/postSlice";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { POST_API_END_POINT } from "@/utils/constant";

const useGetExplorePosts = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        const fetchExplorePosts = async () => {
            try {
                const res = await axios.get(`${POST_API_END_POINT}/explore`, {
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
