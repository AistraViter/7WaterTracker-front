import { useState } from 'react';
import UserLogoModal from "../Modal/UserLogoModal/UserLogoModal";

export default function UserLogo({ user, handleLogout }) {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const toggleModal = () => setIsModalOpen(!isModalOpen);

    const handleSettings = () => {
        // console.log("Settings");
    };

    return (
        <div className="user-logo" onClick={toggleModal}>
            <img
                src={user.avatar || "user-avatar"}
                alt={user.name || user.email}
            />
            <span>{user.name || user.email}</span>

            {isModalOpen && (
                <UserLogoModal
                    onLogout={handleLogout}
                    onSettings={handleSettings}
                />
            )}
        </div>
    );
}

