import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { io } from "socket.io-client";
import { setOnlineUsers, pushMessage } from "../redux/chatSlice";

const useGetSocket = () => {
    const { user } = useSelector(store => store.auth);
    const dispatch = useDispatch();

    useEffect(() => {
        let socket;
        if (user) {
            socket = io('http://localhost:8000', {
                query: {
                    userId: user?._id
                },
                transports: ['websocket']
            });

            socket.on('getOnlineUsers', (onlineUsers) => {
                dispatch(setOnlineUsers(onlineUsers));
            });

            socket.on('newMessage', (newMessage) => {
                dispatch(pushMessage(newMessage));
            });

            return () => {
                socket.close();
            }
        } else {
            if (socket) {
                socket.close();
                socket = null;
            }
        }
    }, [user, dispatch]);
};

export default useGetSocket;
