import { Divider, Modal, ModalContent, ModalHeader } from "@heroui/react";

const StyledModal = ({
  isOpen,
  onOpenChange,
  size = "md",
  title,
  children,
}: any) => {
  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      size={size}
      scrollBehavior="inside"
      isDismissable={false}
    >
      <ModalContent>
        <ModalHeader>
          <h2 className={`text-lg text-black`}>{title}</h2>
        </ModalHeader>
        <Divider />
        {children}
      </ModalContent>
    </Modal>
  );
};

export { StyledModal };
