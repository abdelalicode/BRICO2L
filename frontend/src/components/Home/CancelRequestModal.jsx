import { Button, Modal } from "flowbite-react";
import { useState } from "react";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import Api from "../../services/Api";

export default function CancelRequestModal({requestid, fetchUpdatedClient}) {
  const [openModal, setOpenModal] = useState(false);

  const handleCancelRequest = async () => {
    console.log(requestid);
    await Api.cancelRequest(requestid).then( setOpenModal(false));
    fetchUpdatedClient();
  };

  return (
    <>
      <Button onClick={() => setOpenModal(true)}>
      <img width="24" height="24" src="https://img.icons8.com/fluency/48/cancel.png" alt="cancel"/>
      </Button>
      <Modal show={openModal} size="md" onClose={() => setOpenModal(false)} popup>
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
              Are you sure you want to cancel ?
            </h3>
            <div className="flex justify-center gap-4">
              <Button color="failure" onClick={handleCancelRequest}>
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