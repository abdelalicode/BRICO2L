import React, { useEffect, useState } from "react";
import Api from "../../services/Api";
import { Checkbox, Label, TextInput } from "flowbite-react";
import { Button, Modal } from "flowbite-react";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import "../../App.css";
import { AddJob } from "../../components/Admin/AddJob";
import { UpdateJob } from './../../components/Admin/UpdateJob';

export default function AdminJobs() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const [jobToDelete, setJobToDelete] = useState(null);
  const [jobToUpdate, setJobToUpdate] = useState(null);
  const [updatedJobType, setUpdatedJobType] = useState("");

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await Api.getJobs();
        setJobs(response.data.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchJobs();
    setLoading(false);
  }, []);

  const deleteJob = async (id) => {
    const response = await Api.deleteJob(id);
    setOpenModal(false);
    fetchUpdatedJobs();
  };

  const fetchUpdatedJobs = async () => {
    const response = await Api.getJobs();
    setJobs(response.data.data);
    setLoading(false);
  };

 
  if (loading) {
    return <div className="mx-auto mt-24 spinner"></div>;
  }

  return (
    <div className="p-24">
        <AddJob fetchUpdatedJobs={fetchUpdatedJobs}/>
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 shadow-sm dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              JOB ID
            </th>
            <th scope="col" className="px-6 py-3">
              JOB TYPE
            </th>
            <th scope="col" className="px-6 py-3">
              UPDATE
            </th>
            <th scope="col" className="px-6 py-3">
              DELETE
            </th>
          </tr>
        </thead>
        <tbody className="relative overflow-x-auto shadow-md sm:rounded-lg">
          {jobs.length > 0 ? (
            jobs.map((job) => (
              <tr key={job.id}>
                <td scope="col" className="px-6 py-3">
                  {job.id}
                </td>
                <td scope="col" className="px-6 py-3">
                  {job.type}
                </td>
                <td scope="col" className="px-6 py-3">
                 <UpdateJob job={job} fetchUpdatedJobs={fetchUpdatedJobs}/>
                </td>
                <td scope="col" className="px-6 py-3">
                  <Button
                    onClick={() => {
                      setOpenModal(true);
                      setJobToDelete(job.id);
                    }}
                  >
                    <img
                      width="24"
                      height="24"
                      src="https://img.icons8.com/fluency/48/filled-trash.png"
                      alt="filled-trash"
                    />
                  </Button>
                  <Modal
                    show={jobToDelete === job.id}
                    size="md"
                    onClose={() => setJobToDelete(null)}
                    popup
                  >
                    <Modal.Header />
                    <Modal.Body>
                      <div className="text-center">
                        <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
                        <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                          Are you sure you want to delete this product?
                        </h3>
                        <div className="flex justify-center gap-4">
                          <Button
                            color="failure"
                            onClick={() => deleteJob(job.id)}
                          >
                            {"Yes, I'm sure"}
                          </Button>
                          <Button
                            color="gray"
                            onClick={() => {
                              setOpenModal(false);
                              setJobToDelete(null);
                            }}
                          >
                            No, cancel
                          </Button>
                        </div>
                      </div>
                    </Modal.Body>
                  </Modal>
                </td>
              </tr>
            ))
          ) : (
            <p className="m-8 text-xl">No Jobs There !</p>
          )}
        </tbody>
      </table>
    </div>
  );
}
