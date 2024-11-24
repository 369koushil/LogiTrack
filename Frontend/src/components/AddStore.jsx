import { Fragment, useRef, useState, useContext } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { PlusIcon } from "@heroicons/react/24/outline";
import UploadImage from "./UploadImage";
import AuthContext from "../AuthContext";


export default function AddStore() {
  const authContext = useContext(AuthContext);

  const [form, setForm] = useState({
    userID: authContext.user,
    name: "",
    category: "Electronics",
    address: "",
    city: "",
    image: "",
  });

  const [open, setOpen] = useState(true);
  const cancelButtonRef = useRef(null);

  const addProduct = () => {
    console.log("Form data to send:", form); // Log form data before sending

    fetch(`${process.env.REACT_APP_API_END_POINT}/store/add`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    })
      .then((response) => {
        if (response.ok) {
          alert("STORE ADDED");
          setOpen(false);
        } else {
          return response.json().then((error) => {
            alert("Error: " + error.details);
          });
        }
      })
      .catch((err) => console.error("Fetch error:", err));
  };

  const uploadImage = async (image) => {
    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "inventoryapp");

    await fetch("https://api.cloudinary.com/v1_1/ddhayhptm/image/upload", {
      method: "POST",
      body: data,
    })
      .then((res) => res.json())
      .then((data) => {
        setForm((prevForm) => ({ ...prevForm, image: data.url }));
        alert("Store Image Successfully Uploaded");
      })
      .catch((error) => console.log(error));
  };

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-10" initialFocus={cancelButtonRef} onClose={setOpen}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                <div className="bg-gray-100 px-4 pt-5 pb-4 sm:p-6 sm:pb-4"> {/* Changed to bg-gray-100 */}
                  <div className="sm:flex sm:items-start">
                    <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-blue-100 sm:mx-0 sm:h-10 sm:w-10">
                      <PlusIcon className="h-6 w-6 text-blue-400" aria-hidden="true" />
                    </div>
                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left ">
                      <Dialog.Title as="h3" className="text-lg font-semibold leading-6 text-gray-900 ">
                        Store Information
                      </Dialog.Title>
                      <form>
                        <div className="grid gap-4 mb-4 sm:grid-cols-2">
                          <div>
                            <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900">
                              Name
                            </label>
                            <input
                              type="text"
                              name="name"
                              id="name"
                              value={form.name}
                              onChange={(e) => setForm({ ...form, name: e.target.value })}
                              className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                              placeholder="Enter Store Name"
                            />
                          </div>
                          <div>
                            <label htmlFor="city" className="block mb-2 text-sm font-medium text-gray-900">
                              City
                            </label>
                            <input
                              type="text"
                              name="city"
                              id="city"
                              value={form.city}
                              onChange={(e) => setForm({ ...form, city: e.target.value })}
                              className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                              placeholder="Enter City Name"
                            />
                          </div>
                          <div>
                            <label htmlFor="category" className="block mb-2 text-sm font-medium text-gray-900">
                              Category
                            </label>
                            <select
                              id="category"
                              value={form.category}
                              onChange={(e) => setForm({ ...form, category: e.target.value })}
                              className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5"
                            >
                              <option value="Electronics">Electronics</option>
                              <option value="Groceries">Groceries</option>
                              <option value="Wholesale">Wholesale</option>
                              <option value="SuperMart">SuperMart</option>
                              <option value="Phones">Phones</option>
                            </select>
                          </div>
                          <div className="sm:col-span-2">
                            <label htmlFor="address" className="block mb-2 text-sm font-medium text-gray-900">
                              Address
                            </label>
                            <textarea
                              id="address"
                              rows="5"
                              value={form.address}
                              onChange={(e) => setForm({ ...form, address: e.target.value })}
                              className="block p-2.5 w-full text-sm text-gray-900 bg-white rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500"
                              placeholder="Write an address..."
                            ></textarea>
                          </div>
                        </div>
                        <UploadImage uploadImage={uploadImage} />
                      </form>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                  <button
                    type="button"
                    className="inline-flex w-full justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 sm:ml-3 sm:w-auto"
                    onClick={addProduct}
                  >
                    Add Store
                  </button>
                  <button
                    type="button"
                    className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                    onClick={() => setOpen(false)}
                    ref={cancelButtonRef}
                  >
                    Cancel
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
