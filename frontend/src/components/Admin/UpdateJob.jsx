import { Button, Label, Modal, TextInput } from "flowbite-react";
import { useState, useEffect } from "react";
import Api from "../../services/Api";

export function UpdateJob({ job, fetchUpdatedJobs }) {
  const [openModal, setOpenModal] = useState(false);
  const [updatedJobType, setUpdatedJobType] = useState("");

  useEffect(() => {
    if (job) {
      setUpdatedJobType(job.type);
    }
  }, [job]);

  const handleOpenModal = () => {
    setOpenModal(true); 
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setUpdatedJobType("");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

   

    try {
      const updatedJob = {
        ...job,
        type: updatedJobType,
      };

      await Api.UpdateJob(updatedJob, job.id);

      fetchUpdatedJobs();

      handleCloseModal();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Button
        onClick={handleOpenModal}
      >
        <img width="24" height="24" src="https://img.icons8.com/avantgarde/100/edit.png" alt="edit"/>
      </Button>

      <Modal show={openModal} size="md" onClose={handleCloseModal} popup>
        <Modal.Header />
        <Modal.Body>
          <div className="space-y-12">
            <form onSubmit={handleSubmit}>
              <div className="my-2">
                <Label htmlFor="type" value="UPDATE JOB TYPE" />
                <TextInput
                  id="type"
                  placeholder="Job Type"
                  value={updatedJobType}
                  onChange={(event) => setUpdatedJobType(event.target.value)}
                  required
                />
              </div>
              <div className="w-full">
                <Button className="bg-slate-800 my-4" type="submit">
                  Update Job
                </Button>
              </div>
            </form>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}
