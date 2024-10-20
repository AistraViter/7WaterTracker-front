
const UserLogoModal = ({ onLogout, onSettings }) => {
    return (
        <div className="modal">
            <button onClick={onSettings}>Settings</button>
            <button onClick={onLogout}>Log out</button>
        </div>
    );
};

export default UserLogoModal;