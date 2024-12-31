import React, { useContext, useEffect, useState } from "react";
import { ActionContext } from "../../contexts/ActionContext";
import axios from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import SelectBox from "./SelectBox";

const initialValues = {
  employeeName: "",
  employeeEmail: "",
  employeePassword: "",
  employeeId: "",
};

function EditEmployeeForm() {
  // Body OF Component run => useState implemented =>
  // useEffect for Side Effect when component Mounting =>
  // setState Values => rerender body of Component =>
  // setState Values when onChange Event triggered => rerender body of Component

  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationKey: ["edit employee"],
    mutationFn: async ({ values, id }) =>
      await axios.put(`users/employee/update/${id}`, values),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["get_employees"] });
      document.getElementById("employee_modal").close();
    },
    // onError:
  });
  const { mutate: addMutate } = useMutation({
    mutationKey: ["add_employee"],
    mutationFn: async (values) =>
      await axios.post(`users/employee/signup`, values),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["get_employee"] });
      document.getElementById("employee_modal").close();
    },
    // onError:
  });
  const { emp } = useContext(ActionContext);
  const [values, setValues] = useState(null);

  function handleChange(e) {
    const { value, name } = e.target;
    setValues({ ...values, [name]: value });
  }

  async function handlesubmit(e) {
    e.preventDefault();
    try {
      emp ? mutate({ values, id: values?._id }) : addMutate(values);
      setValues(initialValues);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    if (!emp) return setValues(initialValues);
    setValues({ ...emp });
  }, [emp]);

  function handleCancel() {
    { !emp && setValues(initialValues) };
    document.getElementById("employee_modal").close();
  }
  return (
    <div className="bg-orange-50 p-6 rounded-2xl 
    shadow-lg max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold text-amber-900 mb-6 text-center">
        {!emp
          ? "Add Employee"
          : emp?.bySearch
          ? "View Employee"
          : "Edit Employee"}
      </h2>

      <form onSubmit={handlesubmit} className="space-y-6">
        {/* Personal Information Section */}
        <div className="bg-white p-6 rounded-xl shadow-sm space-y-4">
          <h3 className="text-lg font-semibold text-amber-800 mb-4">
            Personal Information
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label
                className="block text-sm font-medium text-amber-700 mb-1"
                htmlFor="employeeName"
              >
                Name
              </label>
              <input
                name="employeeName"
                id="employeeName"
                type="text"
                className="w-full rounded-xl border-2 border-amber-200 bg-amber-50 py-2 px-3 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                placeholder="Enter first name"
                value={values?.employeeName}
                onChange={handleChange}
              />
            </div>

            <div>
              <label
                className="block text-sm font-medium text-amber-700 mb-1"
                htmlFor="employeeEmail"
              >
                Email
              </label>
              <input
                name="employeeEmail"
                id="employeeEmail"
                type="email"
                className="w-full rounded-xl border-2 border-amber-200 bg-amber-50 py-2 px-3 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                placeholder="Enter email address"
                value={values?.employeeEmail}
                onChange={handleChange}
              />
            </div>

            {(!emp)&&
            (<div>
              <label
                className="block text-sm font-medium text-amber-700 mb-1"
                htmlFor="employeePassword"
              >
                Password
              </label>
              <input
                name="employeePassword"
                id="employeePassword"
                type="password"
                className="w-full rounded-xl border-2 border-amber-200 bg-amber-50 py-2 px-3 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                placeholder="Enter your password"
                value={values?.employeePassword}
                onChange={handleChange}
              />
            </div>)}
            <div>
              <label
                className="block text-sm font-medium text-amber-700 mb-1"
                htmlFor="profession"
              >
                Profession
              </label>
              <SelectBox
                value={values?.employeeId?.profession_name}
                handleChange={handleChange}
                placeholder="Select Profession"
                id={"employeeId"}
              />
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end space-x-4">
          <button
            type="button"
            className="px-6 py-2 border-2 border-amber-600 text-amber-600 rounded-xl hover:bg-amber-50 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 transition-colors duration-200"
            onClick={handleCancel}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-6 py-2 bg-amber-600 text-white rounded-xl hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 transition-colors duration-200"
          >
            {!emp
              ? "Add Employee"
              : emp?.bySearch
              ? "Edit Employee"
              : "Edit Employee"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditEmployeeForm;
