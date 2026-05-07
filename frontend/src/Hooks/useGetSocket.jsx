import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { io } from "socket.io-client";
import { setOnlineUsers, pushMessage } from "../redux/chatSlice";
import { setNotifications } from "../redux/notificationSlice";
import { BASE_URL } from "@/utils/constant";

const useGetSocket = () => {
    const { user } = useSelector(store => store.auth);
    const dispatch = useDispatch();

    useEffect(() => {
        let socket;
        if (user) {
            socket = io(BASE_URL, {
                query: {
                    userId: user?._id
                },
                transports: ['websocket']
            });

            socket.on('connect_error', (error) => {
                console.error('Socket connection error:', error);
            });

            socket.on('getOnlineUsers', (onlineUsers) => {
                dispatch(setOnlineUsers(onlineUsers));
            });

            socket.on('newMessage', (newMessage) => {
                dispatch(pushMessage(newMessage));
            });

            socket.on('notification', (notification) => {
                dispatch(setNotifications(notification));
            });

            return () => {
                socket.close();
            }
        }
    }, [user, dispatch]);
};

export default useGetSocket;
