"use client";
import React, { useEffect, useMemo, useState } from "react";

// Contexts
import { useSoftwares } from "@/app/context/softwares-context";

// Components
import { DualRingLoader } from "@/app/ui/loaders";
import { ModalBody, useDisclosure } from "@heroui/react";
import { StyledModal } from "@/app/ui/modals";
import Instructions from "./instructions";
import SoftwareDetail from "./software-detail";

interface SoftwaresProps {
  categoryId: string;
  userCategory: string;
}

const Softwares: React.FC<SoftwaresProps> = ({ categoryId, userCategory }) => {
  const { softwares, fetchSoftwares, loading, error } = useSoftwares();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedInstructions, setSelectedInstructions] = useState("");

  const fetchSoftwaresList = async () => {
    await fetchSoftwares(categoryId);
  };

  useEffect(() => {
    if (categoryId) {
      fetchSoftwaresList();
    }
  }, [categoryId]);

  const filteredSoftwares = useMemo(() => {
    if (!softwares || !softwares.length) return;

    let filtered = [...softwares];

    // Search by user category
    if (userCategory && userCategory !== "") {
      filtered = filtered.filter((item) =>
        item.software_user_categories.some(
          (item: any) => item.user_categories.id === userCategory
        )
      );
    }

    return filtered;
  }, [softwares, userCategory]);

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

  const handleInstructions = (instructions: string) => {
    setSelectedInstructions(instructions);
    onOpen();
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-4 p-4">
      {filteredSoftwares && filteredSoftwares?.length > 0 ? (
        filteredSoftwares?.map((item: any) => (
          <SoftwareDetail
            key={item.id}
            software={item}
            handleInstructions={handleInstructions}
          />
        ))
      ) : (
        <div>No available Softwares</div>
      )}

      {/* Dialog */}
      {isOpen && (
        <StyledModal
          {...{ isOpen }}
          onOpenChange={() => onClose()}
          size="xl"
          title="Instructions"
        >
          <ModalBody className="py-4">
            <Instructions instructions={selectedInstructions} />
          </ModalBody>
        </StyledModal>
      )}
    </div>
  );
};

export default Softwares;
