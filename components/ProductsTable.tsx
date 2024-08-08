"use client";
import { UserProps } from "@/types";
import React, { useState } from "react";
import * as XLSX from "xlsx";
import { Button } from "./ui/button";
export default function UsersTable() {
  // file
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [jsonData, setJsonData] = useState("");
  // const { mutate } = useBulkCreate();
  // json stringified (purpose of previewing)
  function previewData() {
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const data = e.target?.result;
        if (data) {
          const workbook = XLSX.read(data, { type: "binary" });
          // SheetName
          const sheetName = workbook.SheetNames[0];
          // Worksheet
          const workSheet = workbook.Sheets[sheetName];
          // Json
          const json = XLSX.utils.sheet_to_json(workSheet);
          setJsonData(JSON.stringify(json, null, 2));
        }
      };
      reader.readAsBinaryString(file);
    }
  }
  function saveData() {
    if (file) {
      setLoading(true);
      const reader = new FileReader();
      reader.onload = async (e) => {
        const data = e.target?.result;
        if (data) {
          const workbook = XLSX.read(data, { type: "binary" });
          const sheetName = workbook.SheetNames[0];
          const workSheet = workbook.Sheets[sheetName];
          const json: UserProps[] = XLSX.utils.sheet_to_json(
            workSheet
          ) as UserProps[];

          const plainProduct = JSON.parse(JSON.stringify(json));
          console.log(plainProduct);

          try {
            // if (plainProduct) mutate(plainProduct);
            setLoading(false);
          } catch (error) {
            console.log(error);
          }
        }
      };
      reader.readAsBinaryString(file);
    }
  }

  // if (isLoading) {
  //   return <div>Loading..</div>;
  // }

  return (
    <div className="py-8 space-y-8">
      {/* ButtonS */}
      {/* upload input, preview btn , save btn , clear Data */}
      <div className="flex items-center gap-8">
        <div className="">
          <label
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            htmlFor="file_input"
          >
            Upload file
          </label>
          <input
            className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
            id="file_input"
            type="file"
            accept=".xls,.xlsx"
            onChange={(e) => setFile(e.target.files ? e.target.files[0] : null)}
          />
        </div>
        <Button
          onClick={previewData}
          className="py-2 px-6 rounded bg-slate-300 text-slate-900 "
        >
          Preview Data
        </Button>
        <Button
          onClick={saveData}
          className="py-2 px-6 rounded bg-purple-600 text-slate-100 "
        >
          Save Data
        </Button>
        <Button
          onClick={() => {}}
          className="py-2 px-6 rounded bg-red-600 text-slate-100 "
        >
          Clear Data
        </Button>
      </div>
      <pre>{jsonData}</pre>
      {loading ? (
        <p>Saving Data please wait...</p>
      ) : (
        // <div className="relative overflow-x-auto">
        //   {users && users.length > 0 && (
        //     <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        //       <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
        //         <tr>
        //           <th scope="col" className="px-6 py-3">
        //             Name
        //           </th>
        //           <th scope="col" className="px-6 py-3">
        //             Age
        //           </th>
        //           <th scope="col" className="px-6 py-3">
        //             City
        //           </th>
        //         </tr>
        //       </thead>
        //       <tbody>
        //         {users.map((user) => {
        //           return (
        //             <tr
        //               key={user.id}
        //               className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
        //             >
        //               <th
        //                 scope="row"
        //                 className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
        //               >
        //                 {user.name}
        //               </th>
        //               <td className="px-6 py-4">{user.age}</td>
        //               <td className="px-6 py-4">{user.city}</td>
        //             </tr>
        //           );
        //         })}
        //       </tbody>
        //     </table>
        //   )}
        // </div>
        <div>Hello</div>
      )}

      {/* Table */}
    </div>
  );
}
