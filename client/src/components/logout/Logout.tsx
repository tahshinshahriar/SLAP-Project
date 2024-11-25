import { useState, useContext } from 'react';
import './Logout.scss';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../../context/userContext'; 

const Logout = () => {
    const navigate = useNavigate();

    // Access logout function from context
    const userContext = useContext(UserContext);

    if (!userContext) {
        console.error('UserContext is not available');
        return null;
    }

    const { logout } = userContext;

    // State to control modal visibility
    const [showModal, setShowModal] = useState(false);

    // Function to open the modal
    const openModal = () => setShowModal(true);

    // Function to close the modal
    const closeModal = () => setShowModal(false);

    // Function to handle logout action
    const handleLogout = async () => {
        try {
            await logout();
            localStorage.removeItem('token');
            navigate('/'); 
            closeModal();
        } catch (error) {
            console.log('Error during logout:', error);
        }
    };

    return (
        <div className="logout__container">
            <button onClick={openModal}>Log Out</button>

            {showModal && (
                <div className="modal__overlay">
                    <div className="modal__content">
                        <h3>Are you sure you want to logout?</h3>
                        <div className="modal__buttons">
                            <button onClick={handleLogout} className="confirm__button">
                                Logout
                            </button>
                            <button onClick={closeModal} className="cancel__button">
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Logout;
