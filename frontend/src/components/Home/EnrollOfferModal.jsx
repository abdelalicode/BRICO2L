import { Button, Modal } from "flowbite-react";
import { useState } from "react";
import { FcApproval } from "react-icons/fc";
import Api from "../../services/Api";
import { Toaster, toast } from 'sonner'
        

export default function EnrollOfferModal({ offerId, fetchOffers }) {
  const [openModal, setOpenModal] = useState(false);
  const [open, setOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');


  const handleEnrollOffer = async () => {   
    const response = await Api.enrollOffer(offerId).then(setOpenModal(false)).catch(({ response }) => {
      Swal.fire(response.data.message)
  });
    fetchOffers();
  };

  return (
    <>
      <Button onClick={() => setOpenModal(true)}>
        <span className="text-xs font-medium text-blue-600 uppercase dark:text-blue-400">
          Enroll Offer
        </span>
      </Button>

      <Modal
        show={openModal}
        size="md"
        onClose={() => setOpenModal(false)}
        popup
      >
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
          <FcApproval className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
              Are you sure you want to enroll this offer ?
            </h3>
            <div className="flex justify-center gap-4">
              <Button color="success" onClick={handleEnrollOffer}>
                {"Yes, I'm sure"}
              </Button>
              <Button color="gray" onClick={() => setOpenModal(false)}>
                No, cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}
