import { setUserProfile } from "@/redux/authSlice";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { USER_API_END_POINT } from "@/utils/constant";

const useGetUserProfile = (userId) => {
    const dispatch = useDispatch();
    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const res = await axios.get(`${USER_API_END_POINT}/${userId}/profile`, {
                    withCredentials: true
                });
                if (res.data.success) {
                    dispatch(setUserProfile(res.data.user));
                }
            } catch (error) {
                console.log(error);
            }
        }
        if (userId) fetchUserProfile();
    }, [userId, dispatch]);
};

export default useGetUserProfile;
