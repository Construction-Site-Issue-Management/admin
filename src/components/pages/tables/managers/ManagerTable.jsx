import React from "react";
import TableRow from "../managers/TableRow";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

function ManagersTable({ managers }) {
  useMutation({
    mutationKey: "delete_manager",
    mutationFn: async (id) => axios.delete(`users/manager/delete${id}`),
  });

  return (
    <div className="p-6">
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="px-6 py-4 bg-amber-50 border-b border-amber-200">
          <h2 className="text-xl font-semibold text-amber-900">
            managers List
          </h2>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-amber-200">
            <thead className="bg-amber-50">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-medium text-amber-800 uppercase tracking-wider">
                  Username
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium text-amber-800 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium text-amber-800 uppercase tracking-wider">
                  Password
                </th>
                <th className="px-6 py-3 text-right text-sm font-medium text-amber-800 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-amber-100">
              {/* Row 1 */}
              {managers.map((manager) => (
                <TableRow  key={manager._id} {...manager} />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default ManagersTable;
