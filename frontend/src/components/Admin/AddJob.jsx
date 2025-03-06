import { Button, Label, Modal, TextInput } from "flowbite-react";
import { useState } from "react";
import Api from "../../services/Api";
import { FileInput} from "flowbite-react";

export function AddJob({fetchUpdatedJobs}) {
  const [openModal, setOpenModal] = useState(false);
  const [type, setType] = useState("");
 

  function onCloseModal() {
    setOpenModal(false);
    setType("");
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("type", type);
    console.log(formData);

    const response = await Api.AddJob(formData);
    
    fetchUpdatedJobs();

    onCloseModal();
  };

  return (
    <>
      <Button
        className="focus:ring-0 bg-slate-800 text-slate-50 bg-opacity-80"
        onClick={() => setOpenModal(true)}
      >
        ADD JOB
      </Button>
      <Modal show={openModal} size="md" onClose={onCloseModal} popup>
        <Modal.Header />
        <Modal.Body>
          <div className="space-y-12">
            <form onSubmit={handleSubmit}>
              <div className="my-2">
                <Label htmlFor="type" value="ADD JOB TYPE" />
                <TextInput
                  id="type"
                  placeholder="Job Type"
                  value={type}
                  onChange={(event) => setType(event.target.value)}
                  required
                />
              </div>
               

              <div className="w-full">
                <Button className="bg-slate-800 my-4" type="submit">
                  Submit
                </Button>
              </div>
            </form>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}
