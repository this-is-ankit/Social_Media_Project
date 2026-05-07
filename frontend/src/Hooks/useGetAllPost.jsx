import { setPosts, setLoading } from "@/redux/postSlice"
import axios from "axios"
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { POST_API_END_POINT } from "@/utils/constant"

const useGetAllPost = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        const fetchAllPost = async () => {
            try {
                dispatch(setLoading(true));
                const res = await axios.get(`${POST_API_END_POINT}/all`, { withCredentials: true });
                if (res.data.success) {
                    console.log(res.data);
                     dispatch(setPosts(res.data.posts));
                }
            } catch (error) {
                console.log(error);
            } finally {
                dispatch(setLoading(false));
            }
        }
        fetchAllPost();
    }, []);
};
export default useGetAllPost;