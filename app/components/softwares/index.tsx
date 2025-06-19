"use client";
import React, { useState } from "react";

// Components
import { ModalBody, useDisclosure } from "@heroui/react";
import { StyledModal } from "@/app/ui/modals";
import Instructions from "./instructions";
import SoftwareDetail from "./software-detail";

interface SoftwaresProps {
  softwares: any;
}

const Softwares: React.FC<SoftwaresProps> = ({ softwares }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedInstructions, setSelectedInstructions] = useState("");

  const handleInstructions = (instructions: string) => {
    setSelectedInstructions(instructions);
    onOpen();
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-4 p-4">
      {softwares && softwares?.length > 0 ? (
        softwares?.map((item: any) => (
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
