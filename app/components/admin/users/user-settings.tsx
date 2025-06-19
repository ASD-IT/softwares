"use client";
import { useEffect, useState } from "react";

// Constants
import { USER_COLUMNS } from "@/app/lib/constants";

// Contexts / Hooks
import { useUsers } from "@/app/context/users-context";
import useUserSessionHook from "@/app/hooks/useUserSessionHook";

// Components
import { ModalBody, useDisclosure } from "@heroui/react";
import { DualRingLoader } from "@/app/ui/loaders";
import { StyledButton } from "@/app/ui/buttons";
import { TableList } from "@/app/ui/tables";
import { StyledModal } from "@/app/ui/modals";
import UserForm from "./user-form";
import DeleteUser from "./delete-user";

export default function UserSettings() {
  const { users, loading, error, fetchUsers } = useUsers();
  const { userId } = useUserSessionHook();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [action, setAction] = useState("");
  const [selectedRow, setSelectedRow] = useState<any>();

  useEffect(() => {
    fetchUsers();
  }, []);

  if (loading || !users) {
    return (
      <div className="w-full h-96 flex items-center justify-center">
        <DualRingLoader />
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full h-96 flex items-center justify-center">
        <p className="text-danger">
          Error Fetching Categories, Please try again!
        </p>
      </div>
    );
  }
  0;
  const handleAction = (action: string, id?: string) => {
    setSelectedRow(undefined);
    setAction(action);
    if (id) {
      const selected = users.find((item: any) => item.id === id);
      setSelectedRow(selected);
    }
    onOpen();
  };

  const renderCell = (item: any, key: string) => {
    switch (key) {
      case "actions":
        return (
          <div className="relative flex items-center gap-2">
            <StyledButton
              label="Edit"
              padding="py-1"
              bgColor="bg-green-600"
              onClick={() => {
                handleAction("edit", item.id);
              }}
            />
            {item.id !== userId && (
              <StyledButton
                label="Delete"
                padding="py-1"
                bgColor="bg-red-500"
                onClick={() => {
                  handleAction("delete", item.id);
                }}
              />
            )}
          </div>
        );

      default:
        return item?.[key as keyof typeof item] || "-";
    }
  };

  return (
    <div className="mt-2 bg-white rounded-md w-full h-[84vh] flex flex-col overflow-hidden space-y-2">
      {/* Header */}
      <div className="py-1 px-2 bg-pink-800 rounded-md shadow z-10 space-x-4">
        <div className="flex flex-row items-center justify-between">
          {/* Add */}
          <StyledButton
            label="Add New User"
            type="button"
            bgColor="bg-white hover:bg-cyan-500"
            textColor="text-black hover:text-white"
            onClick={() => handleAction("add")}
          />
          {/* Total */}
          <div className="text-white">Total: {users.length || 0}</div>
        </div>
      </div>

      {/* Scrollable Table Content */}
      <div className="flex-1 flex flex-col overflow-hidden bg-violet-100 rounded-md">
        <TableList
          columns={USER_COLUMNS}
          data={users ?? []}
          loading={loading}
          error={error}
          renderCell={renderCell}
        />
      </div>

      {/* Dialog */}
      {isOpen && (
        <StyledModal
          {...{ isOpen }}
          onOpenChange={() => onClose()}
          size={action === "delete" ? "xl" : "4xl"}
          title={`${
            action === "add" ? "Add" : action === "edit" ? "Edit" : "Delete"
          } User`}
        >
          <ModalBody className="py-4">
            {action === "delete" ? (
              <DeleteUser
                onClose={onClose}
                refetchData={fetchUsers}
                selectedUser={selectedRow}
              />
            ) : (
              <UserForm
                onClose={onClose}
                refetchData={fetchUsers}
                selectedUser={selectedRow}
                action={action}
              />
            )}
          </ModalBody>
        </StyledModal>
      )}
    </div>
  );
}
