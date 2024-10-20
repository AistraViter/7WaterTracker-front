import { Link } from 'react-router-dom';

export default function UserAuth() {
    return (
        <div className="user-auth">
            <Link to="/signin">Sign in</Link>
        </div>
    );
}