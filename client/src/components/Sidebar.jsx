import React, { useContext, useEffect, useState } from "react";
import assets from "../assets/assets";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { ChatContext } from "../../context/ChatContext";

const SideBar = () => {
    const {
        getUsers,
        getMessages,
        users,
        selectedUser,
        setSelectedUser,
        unseenMessages,
        setUnseenMessages,
    } = useContext(ChatContext);

    const { logout, onlineUsers } = useContext(AuthContext);

    const [input, setInput] = useState("");
    const navigate = useNavigate();

    // Filter users
    const filteredUsers = input.trim()
        ? users.filter((user) =>
            user.fullName
                ?.toLowerCase()
                .includes(input.toLowerCase())
        )
        : users;

    // Fetch users
    useEffect(() => {
        getUsers();
    }, [onlineUsers]);

    // Handle selecting user
    const handleSelectUser = async (user) => {
        setSelectedUser(user);

        // Fetch messages for selected user
        await getMessages(user._id || user.id);

        // Reset unseen messages count
        setUnseenMessages((prev) => ({
            ...prev,
            [user._id || user.id]: 0,
        }));
    };

    return (
        <div
            className={`bg-[#8185B2]/10 h-full p-5 rounded-r-xl overflow-y-scroll text-white ${selectedUser ? "max-md:hidden" : ""
                }`}
        >
            {/* Header */}
            <div className="pb-5">
                <div className="flex justify-between items-center">
                    <img
                        src={assets.logo}
                        alt="logo"
                        className="max-w-40"
                    />

                    <div className="relative py-2 group">
                        <img
                            src={assets.menu_icon}
                            alt="menu"
                            className="max-h-5 cursor-pointer"
                        />

                        {/* Dropdown */}
                        <div className="absolute top-full right-0 z-20 w-32 p-5 rounded-md bg-[#282142] border border-gray-600 text-gray-100 hidden group-hover:block">
                            <p
                                onClick={() => navigate("/profile")}
                                className="cursor-pointer text-sm"
                            >
                                Edit Profile
                            </p>

                            <hr className="my-2 border-t border-gray-500" />

                            <p
                                onClick={logout}
                                className="cursor-pointer text-sm"
                            >
                                Logout
                            </p>
                        </div>
                    </div>
                </div>

                {/* Search */}
                <div className="bg-[#282142] rounded-full flex items-center gap-2 py-3 px-4 mt-5">
                    <img
                        src={assets.search_icon}
                        alt="search"
                        className="w-3"
                    />

                    <input
                        value={input}
                        onChange={(e) =>
                            setInput(e.target.value)
                        }
                        type="text"
                        placeholder="Search User..."
                        className="bg-transparent border-none outline-none text-white text-xs placeholder-[#c8c8c8] flex-1"
                    />
                </div>
            </div>

            {/* Users List */}
            <div className="flex flex-col gap-2">
                {filteredUsers.length > 0 ? (
                    filteredUsers.map((user, index) => (
                        <div
                            key={index}
                            onClick={() =>
                                handleSelectUser(user)
                            }
                            className={`relative flex items-center gap-3 p-3 rounded-lg cursor-pointer hover:bg-[#282142]/40 transition ${(selectedUser?._id ||
                                    selectedUser?.id) ===
                                    (user._id || user.id)
                                    ? "bg-[#282142]/50"
                                    : ""
                                }`}
                        >
                            {/* Profile Image */}
                            <img
                                src={
                                    user?.profilePic
                                        ? user.profilePic
                                        : assets.avatar_icon
                                }
                                alt="profile"
                                className="w-10 h-10 rounded-full object-cover"
                            />

                            {/* User Info */}
                            <div className="flex flex-col">
                                <p className="font-medium">
                                    {user.fullName}
                                </p>

                                {onlineUsers?.includes(
                                    user._id || user.id
                                ) ? (
                                    <span className="text-green-400 text-xs">
                                        Online
                                    </span>
                                ) : (
                                    <span className="text-gray-400 text-xs">
                                        Offline
                                    </span>
                                )}
                            </div>

                            {/* Unseen Messages */}
                            {unseenMessages?.[
                                user._id || user.id
                            ] > 0 && (
                                    <p className="absolute right-4 top-4 text-xs h-5 w-5 flex justify-center items-center rounded-full bg-violet-500 text-white">
                                        {
                                            unseenMessages[
                                            user._id || user.id
                                            ]
                                        }
                                    </p>
                                )}
                        </div>
                    ))
                ) : (
                    <p className="text-sm text-gray-400 text-center mt-5">
                        No users found
                    </p>
                )}
            </div>
        </div>
    );
};

export default SideBar;