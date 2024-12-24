import React from "react";
import TableRow from "./TableRow";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { SortDesc } from "lucide-react";

function EmployeesTable({ employees }) {
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationKey: "delete_employee",
    mutationFn: async (id) => axios.delete(`users/employee/delete/${id}`),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["get_employees"] });
    },
  });
  return (
    <div className="bg-white  rounded-xl shadow-lg overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-amber-200">
          <thead>
            <tr className="bg-gradient-to-r from-amber-100 to-orange-100">
              <th className="px-6 py-4 text-left text-amber-900 font-semibold">
                <div className="flex items-center gap-2 cursor-pointer hover:text-amber-700">
                  USERNAME
                  <SortDesc className="w-4 h-4" />
                </div>
              </th>
              <th className="px-6 py-4 text-left text-amber-900 font-semibold">
                EMAIL
              </th>
              <th className="px-6 py-4 text-left text-amber-900 font-semibold">
                PASSWORD
              </th>
              <th className="px-6 py-4 text-left text-amber-900 font-semibold">
                PROFESSION
              </th>
              <th className="px-6 py-4 text-right text-amber-900 font-semibold">
                ACTIONS
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-amber-100">
            {/* Row 1 */}
            {employees.map((employee) => (
              <TableRow employee={employee} mutate={mutate} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
    //   {/* {isLoading && <div>Loading...</div>}
    //   {isError && <div>{error}</div>} */}
  );
}

export default EmployeesTable;
