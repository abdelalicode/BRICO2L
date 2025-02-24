import { Button, FileInput, Label, Modal } from "flowbite-react";
import { useState } from "react";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { FcPicture } from "react-icons/fc";
import Api from "./../../services/Api";

export default function ChangeProfilePictureModal({
  workerid,
  worker,
  getUpdatedAuthWorker,
}) {


  const [openModal, setOpenModal] = useState(false);
  const [image, setImage] = useState(null);

  function onCloseModal() {
    setOpenModal(false);
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = {
      "id" : workerid,
      "image" : image
    }; 

    const response = await Api.UpdateProfileAvatar(formData);

    onCloseModal();
    getUpdatedAuthWorker();
  };


  return (
    <>
      <Button className="py-0" onClick={() => setOpenModal(true)}>
        <div class="relative inline-block">

          {worker.profile_image_url ? (
            <img
              src={worker.profile_image_url}
              alt="Profile"
              className="w-32 h-32 object-cover rounded-full transition-all duration-500 delay-500 transform group-hover:w-36 group-hover:h-36"
            />
          ) : (
            <img width="100" height="100" src="https://img.icons8.com/ios-filled/100/EBEBEB/user-male-circle.png" alt="user-male-circle"/>
          )}
        </div>
      </Button>
      <Modal show={openModal} size="md" onClose={onCloseModal} popup>
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <FcPicture className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
            <form onSubmit={handleSubmit}>

            <div className="mx-4 my-4 mb-8">
              <div className="my-2 block">
                <Label htmlFor="file-upload" value="Upload your image" />
              </div>
              <FileInput id="file-upload" onChange={(event) => setImage(event.target.files[0])} />
            </div>
            <div className="flex justify-center gap-4">
              <Button
                className="bg-slate-700"
                type="submit"
              >
                Submit
              </Button>
              <Button color="gray" onClick={() => setOpenModal(false)}>
                No, cancel
              </Button>
            </div>
            </form>

          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}
