import React from 'react';

const ConfirmationModal = ({ title, message, closeModal, handleDeleteDoctor, modalData }) => {
    return (
        <div>
            <input type="checkbox" id="confirm-modal" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">{title}</h3>
                    <p className="py-4">{message}</p>
                    <div className="modal-action">
                        <label onClick={closeModal} className="btn btn-primary">Cancel</label>
                        <label onClick={() => handleDeleteDoctor(modalData)} htmlFor="confirm-modal" className="btn bg-red-600">Delete</label>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ConfirmationModal;