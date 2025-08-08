import React from "react";

interface TableProps {
  columns: Array<{ key: string; label: string }>;
  data: Array<{ [key: string]: any }>;
  loading?: boolean;
  error?: string | null;
  handleAction?: (id?: string) => void;
  renderCell: (row: any, key: string) => React.ReactNode;
  highlightFirstRecord?: boolean;
  classname?: string;
}

const TableList: React.FC<TableProps> = ({
  columns,
  data,
  loading,
  error,
  handleAction,
  renderCell,
  classname = "",
}) => {
  return (
    <div className={`overflow-x-auto ${classname}`}>
      <table className="min-w-full border-collapse h-full">
        <thead>
          <tr>
            {columns.map((column, index) => (
              <th
                key={index}
                className={`px-4 py-2 bg-blue-500 text-left font-medium uppercase text-white whitespace-nowrap ${
                  index === 0
                    ? "rounded-l-lg"
                    : index === columns.length - 1
                    ? "rounded-r-lg"
                    : ""
                }`}
              >
                {column.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr className="border-t">
              <td
                className="p-3 text-center text-black"
                colSpan={columns.length}
              >
                Loading...
              </td>
            </tr>
          ) : error ? (
            <tr className="border-t">
              <td
                className="p-3 text-center text-red-500"
                colSpan={columns.length}
              >
                {error}
              </td>
            </tr>
          ) : !loading && !data.length ? (
            <tr className="border-t">
              <td
                className="p-3 text-center text-black"
                colSpan={columns.length}
              >
                No Records!
              </td>
            </tr>
          ) : (
            data.map((row, rowIndex) => (
              <tr
                key={rowIndex}
                className="group hover:bg-pink-800 cursor-pointer"
                onClick={() => handleAction?.(row.id) || null}
              >
                {columns.map((column, colIndex) => (
                  <td
                    key={colIndex}
                    className={`px-4 py-2 border-b border-b-white text-black group-hover:text-white text-sm whitespace-nowrap ${
                      colIndex === 0 ? "rounded-l-lg" : ""
                    } ${colIndex === columns.length - 1 ? "rounded-r-lg" : ""}`}
                  >
                    {renderCell(row, column.key)}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

// General Table
interface GeneralTableProps {
  columns: Array<{ key: string; label: string }>;
  data: Array<{ [key: string]: any }>;
  bgColor?: string;
  headerBg?: string;
  handleAction?: (id: string) => void;
  classname?: string;
  message?: string;
  selectedId?: string;
  error?: string | null;
  loading?: boolean;
}

const GeneralTable: React.FC<GeneralTableProps> = ({
  columns,
  data,
  bgColor,
  headerBg,
  handleAction,
  classname,
  message,
  selectedId = "",
  error,
  loading,
}) => {
  return (
    <div
      className={`overflow-x-auto shadow-md rounded-lg p-4 ${
        bgColor || "bg-transparent"
      } ${classname}`}
    >
      <table className="min-w-full border-collapse">
        <thead>
          <tr>
            {columns.map((column, index) => {
              return (
                <th
                  key={index}
                  className={`px-4 py-2 border border-white ${
                    headerBg || "bg-blue-400"
                  } text-left font-medium uppercase text-white whitespace-nowrap`}
                >
                  {column.label}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {error && (
            <tr className="border-t">
              <td
                className="p-3 text-center text-red-500"
                colSpan={columns.length}
              >
                {error}
              </td>
            </tr>
          )}
          {loading ? (
            <tr className="border-t">
              <td
                className="p-3 text-center text-black"
                colSpan={columns.length}
              >
                Loading...
              </td>
            </tr>
          ) : !data.length ? (
            <tr className="border-t">
              <td
                className="p-3 text-center text-black"
                colSpan={columns.length}
              >
                {message || "No Records!"}
              </td>
            </tr>
          ) : (
            data.map((row, rowIndex) => {
              const isSelected = row.id === selectedId;
              return (
                <tr key={rowIndex} className="">
                  {columns.map((column, colIndex) => {
                    return (
                      <td
                        key={colIndex}
                        className={`px-4 py-2 border-b border-b-gray-200 text-gray-600 text-sm whitespace-nowrap ${
                          isSelected
                            ? "bg-teal-400 hover:bg-none"
                            : handleAction
                            ? "hover:bg-blue-200 cursor-pointer"
                            : ""
                        }`}
                        onClick={() => handleAction?.(row.id) || null}
                      >
                        {row[column.key] || "-"}
                      </td>
                    );
                  })}
                </tr>
              );
            })
          )}
        </tbody>
      </table>
    </div>
  );
};

export { TableList, GeneralTable };
