import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

function logOut() {
    const [cookies, removeCookie] = useCookies(["token"]);
    const navigate = useNavigate();

    const handleLogout = () => {
        removeCookie("token");
        console.log('Logging out...');
        navigate('/', { replace: true });
        alert('Logged out successfully!');
    }

    useEffect(() => {
        window.onpopstate = () => {
            navigate('/', { replace: true });
        }
    }, [navigate]);

    return (
        <button onClick={handleLogout}>Log Out</button>
    );
}

export default logOut;
