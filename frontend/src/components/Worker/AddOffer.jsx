import { Button, Label, Modal, TextInput } from "flowbite-react";
import { useState } from "react";
import Api from "../../services/Api";
import { z } from "zod";

export function AddOffer({fetchUpdatedOffers}) {
  const [openModal, setOpenModal] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [hourlyRate, setHourlyRate] = useState("");
  const [errors, setErrors] = useState({});

  function onCloseModal() {
    setOpenModal(false);
    setTitle("");
    setDescription("");
    setStartDate("");
    setEndDate("");
    setHourlyRate("");
  }

  const offerSchema = z.object({
    title: z.string().min(1, "Le titre est requis"),
    description: z.string().min(1, "La description est requise"),
    start_date: z.string().min(1, "La date de début est requise"),
    end_date: z.string().min(1, "La date de fin est requise"),
    hourly_rate: z.string().min(1, "Le taux horaire est requis")
  }).refine((data) => {
    return new Date(data.end_date) >= new Date(data.start_date);
  }, {
    message: "La date de fin ne peut pas être antérieure à la date de début",
    path: ["end_date"]
  });

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formValues = {
      title,
      description,
      start_date: startDate,
      end_date: endDate,
      hourly_rate: hourlyRate
    };

    try {
      offerSchema.parse(formValues);

      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("start_date", startDate);
      formData.append("end_date", endDate);
      formData.append("hourly_rate", hourlyRate);

      const response = await Api.AddOffer(formData);
      fetchUpdatedOffers();
      onCloseModal();
    } catch (error) {
      if (error instanceof z.ZodError) {
        const errorMap = {};
        error.errors.forEach(err => {
          errorMap[err.path[0]] = err.message;
        });
        setErrors(errorMap);
      }
    }
  }

  return (
    <>
      <Button
        className="focus:ring-0 bg-yellow-300 text-slate-800 bg-opacity-80"
        onClick={() => setOpenModal(true)}
      >
        ADD OFFER
      </Button>
      <Modal show={openModal} size="md" onClose={onCloseModal} popup>
        <Modal.Header />
        <Modal.Body>
          <div className="space-y-12">
            <form onSubmit={handleSubmit}>
              <div className="my-2">
                <Label htmlFor="title" value="Your Offer Title" />
                <TextInput
                  id="title"
                  placeholder="Your Title"
                  value={title}
                  onChange={(event) => setTitle(event.target.value)}
                  required
                />
                {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}

              </div>
              <div className="my-2">
                <Label htmlFor="description" value="Your Offer Description" />
                <TextInput
                  id="description"
                  placeholder="description"
                  value={description}
                  onChange={(event) => setDescription(event.target.value)}
                  required
                />
                {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
              </div>
              <div className="flex space-x-4">
                <div>
                  <Label htmlFor="start_date" value="Start Date" />
                  <input
                    name="start_date"
                    type="date"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    value={startDate}
                    onChange={(event) => setStartDate(event.target.value)}
                    placeholder="Select date start"
                    min={new Date().toISOString().split('T')[0]} 
                  />
                  {errors.start_date && <p className="text-red-500 text-sm mt-1">{errors.start_date}</p>}
                </div>
                <div>
                  <Label htmlFor="end_date" value="End Date" />
                  <input
                    name="end_date"
                    type="date"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    value={endDate}
                    onChange={(event) => setEndDate(event.target.value)}
                    placeholder="Select date end"
                    min={new Date().toISOString().split('T')[0]} 
                  />
                  {errors.end_date && <p className="text-red-500 text-sm mt-1">{errors.end_date}</p>}
                </div>
              </div>
              <div className="mt-2">
                <Label htmlFor="hourly_rate" value="Your Offer Hourly Rate" />

                <input
                  name="hourly_rate"
                  value={hourlyRate}
                  onChange={(event) => setHourlyRate(event.target.value)}
                  type="number"
                  id="number-input"
                  aria-describedby="helper-text-explanation"
                  className="w-1/2 mb-4 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  min={1}
                  placeholder="50.00"
                  required
                />
                {errors.hourly_rate && <p className="text-red-500 text-sm mt-1">{errors.hourly_rate}</p>}
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
