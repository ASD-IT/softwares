"use client";
import { useEffect, useState } from "react";

// Constants / Helpers
import { SOFTWARES_COLUMNS } from "@/app/lib/constants";
import { firstLetterCapital } from "@/app/lib/utils";

// Contexts / Hooks
import { useSoftwares } from "@/app/context/softwares-context";
import { useCategories } from "@/app/context/categories-context";
import { useSettingsState } from "@/app/hooks/useSettingsState";

// Components
import { DualRingLoader } from "@/app/ui/loaders";
import { TableList } from "@/app/ui/tables";
import { StyledModal } from "@/app/ui/modals";
import SoftwareForm from "./software-form";
import SoftwaresActions from "./softwares-actions";
import Instructions from "../../softwares/instructions";
import RenderCells from "./render-cells";
import DeleteSoftware from "./delete-software";
import { ModalBody, useDisclosure } from "@heroui/react";

interface SoftwareSettingsProps {
  type: string;
}

export default function SoftwareSettings({ type }: SoftwareSettingsProps) {
  const { softwares, fetchSoftwares, loading, error } = useSoftwares();
  const { fetchSoftwareCategoryId } = useCategories();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [categoryId, setCategoryId] = useState("");
  const [action, setAction] = useState("");
  const [selectedRow, setSelectedRow] = useState<any>();

  const fetchSoftwaresList = async () => {
    const id = await fetchSoftwareCategoryId(type);
    if (id !== undefined && id !== null && id !== "") {
      setCategoryId(id);
      await fetchSoftwares(id);
    }
  };

  useEffect(() => {
    if (type) {
      fetchSoftwaresList();
    }
  }, [type]);

  const { filteredData, filterValue, handleFilters } = useSettingsState({
    data: softwares,
  });

  if (loading || !softwares) {
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

  const handleAction = (action: string, id?: string) => {
    setSelectedRow(undefined);
    setAction(action);
    if (action === "view" && id) {
      setSelectedRow(id);
    } else if (id) {
      const selected = softwares.find((item: any) => item.id === id);
      setSelectedRow(selected);
    }
    onOpen();
  };

  const renderCell = (item: any, key: string) => (
    <RenderCells item={item} keyName={key} handleAction={handleAction} />
  );

  return (
    <div className="mt-2 bg-white rounded-md w-full h-[84vh] flex flex-col overflow-hidden space-y-2">
      {/* Header */}
      <div className="py-1 px-2 bg-pink-800 rounded-md shadow z-10 space-x-4">
        <SoftwaresActions
          total={softwares?.length || 0}
          filterValue={filterValue}
          handleAction={handleAction}
          handleFilters={handleFilters}
        />
      </div>

      {/* Scrollable Table Content */}
      <div className="flex-1 flex flex-col overflow-hidden bg-violet-100 rounded-md">
        <TableList
          columns={SOFTWARES_COLUMNS}
          data={filteredData ?? []}
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
          size={action === "view" || action === "delete" ? "xl" : "5xl"}
          title={
            action === "view"
              ? "Instructions"
              : `${
                  action === "add"
                    ? "Add"
                    : action === "edit"
                    ? "Edit"
                    : "Delete"
                } ${firstLetterCapital(type)} Software`
          }
        >
          <ModalBody className="py-4">
            {action === "view" ? (
              <Instructions instructions={selectedRow} />
            ) : action === "delete" ? (
              <DeleteSoftware
                selectedSoftware={selectedRow}
                categoryId={categoryId}
                onClose={onClose}
                refetchdata={fetchSoftwares}
              />
            ) : (
              <SoftwareForm
                selectedSoftware={selectedRow}
                categoryId={categoryId}
                onClose={onClose}
                refetchdata={fetchSoftwares}
                action={action}
              />
            )}
          </ModalBody>
        </StyledModal>
      )}
    </div>
  );
}
