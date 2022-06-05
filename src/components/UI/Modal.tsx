import React from "react";

type _Modal = {
  header: string,
  body: JSX.Element,
  onCloseClicked: () => void;
  onNegativeActionClicked: () => void;
  onPositiveActionClicked: () => void;
  positiveActionButtonLabel: string,
  negativeActionButtonLabel: string
};

const Modal = ({header, body, onNegativeActionClicked, onPositiveActionClicked, onCloseClicked, positiveActionButtonLabel, negativeActionButtonLabel}: _Modal) => {
  return (
    <div
      className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
    >
      <div className="relative w-auto my-6 mx-auto max-w-3xl ">
        {/*content*/}
        <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
          {/*header*/}
          <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t ">
            <h3 className="text-xl my-auto text-secondary">
              {header}
            </h3>
            <button
              className="p-1 ml-auto bg-transparent border-0 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
              onClick={onCloseClicked}
            >
              <div className="text-secondary text-2xl block outline-none focus:outline-none m-auto ml-8">
                ×
              </div>
            </button>
          </div>
          <div className="relative p-6 flex-auto text-secondary">
            <p className="my-4 text-slate-500 text-m leading-relaxed">
              {body}
            </p>
          </div>
          <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
            <button
              className="background-transparent uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150 text-secondary"
              type="button"
              onClick={onNegativeActionClicked}
            >
              {negativeActionButtonLabel}
            </button>
            <button
              className="bg-primary-700 hover:bg-primary-600 uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150 text-secondary"
              type="button"
              onClick={onPositiveActionClicked}
            >
              {positiveActionButtonLabel}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Modal;