import React from "react";
import ButtonGroup from "./ButtonGroup";

const Modal = ({ title, message, onConfirm, onCancel }) => (
  <div
    className="fixed z-10 inset-0 overflow-y-auto"
    aria-labelledby="modal-title"
    role="dialog"
    aria-modal="true"
  >
    <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
      <div
        className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
        aria-hidden="true"
      ></div>
      <span
        className="hidden sm:inline-block sm:align-middle sm:h-screen"
        aria-hidden="true"
      >
        &#8203;
      </span>
      <div className="inline-block align-middle bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
        <div className="px-4 pt-5 pb-4 sm:p-6 sm:pb-4"
            style={{
                backgroundColor: "#023064",
                }}        
        >
          <div className="sm:flex sm:items-start">
            <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
              <h3
                className="text-2xl leading-6 font-medium text-white"
                id="modal-title"
              >
                {title}
              </h3>
              <div className="mt-2">
                <p className="text-lg text-gray-300">{message}</p>
              </div>
            </div>
          </div>
        </div>
        <div
          className="sm:px-6 sm:flex"
          style={{
            backgroundColor: "#446BA2",
          }}
        >
          <ButtonGroup
            isActive={false}
            multiActive={{
              reset: false,
              undo: false,
              redo: false,
            }}
            buttons={[
              {
                id: "reset",
                color: "blue",
                onClick: () => {
                  onConfirm();
                },
                label: "Confirm",
              },
              {
                id: "undo",
                color: "grey",
                onClick: () => {
                  onCancel();
                },
                label: "Cancel",
              },
            ]}
          />
        </div>
      </div>
    </div>
  </div>
);

export default Modal;