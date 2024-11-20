import { useState } from 'react';
import './Logout.scss';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'


const Logout = () => {
    const navigate = useNavigate()
    // State to control modal visibility
    const [showModal, setShowModal] = useState(false);

    // Function to open the modal
    const openModal = () => setShowModal(true);

    // Function to close the modal
    const closeModal = () => setShowModal(false);

    // Function to handle logout action
    const handleLogout = async () => {
        try {
            localStorage.removeItem('token');
            // Integrate first
            navigate('/')
            closeModal();
        } catch (error) {
            console.log(error)
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
}

export default Logout
