import {
  ModalBio,
  ModalLogin,
  ModalPaymentDetails,
  ModalContact,
  ModalDevice,
} from './';

export default function ProfileModal(props) {
  const { modalProfile, toggleModal } = props;
  return (
    <div
      className="overflow-hidden transition-all transform bg-white rounded-md shadow-xl dialog phone:min-w-full sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-headline"
    >
      <h3 id="modal-headline" className="sr-only">
        Client details
      </h3>
      <div className="px-4 pt-5 pb-4 bg-white sm:p-6 sm:pb-4">
        <div className="flex flex-col sm:items-start">
          <ModalBio modalProfile={modalProfile} />
          <ModalLogin modalProfile={modalProfile} />
          <ModalPaymentDetails modalProfile={modalProfile} />
          <ModalContact modalProfile={modalProfile} />
          <ModalDevice modalProfile={modalProfile} />
          <div className="w-full my-4">
            <button
              onClick={toggleModal}
              className="px-6 py-2 text-xl text-white bg-red-400 rounded-md"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
