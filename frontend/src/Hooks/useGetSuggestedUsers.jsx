import { useEffect } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import { setSuggestedUsers } from "../redux/authSlice";
import { USER_API_END_POINT } from "@/utils/constant";

const useGetSuggestedUsers = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchSuggestedUsers = async () => {
            try {
                const res = await axios.get(`${USER_API_END_POINT}/suggested`, { withCredentials: true });
                if (res.data.success) {
                    dispatch(setSuggestedUsers(res.data.users));
                }
            } catch (error) {
                console.error("Error fetching suggested users:", error);
            }
        };

        fetchSuggestedUsers();
    }, [dispatch]);
};

export default useGetSuggestedUsers;
