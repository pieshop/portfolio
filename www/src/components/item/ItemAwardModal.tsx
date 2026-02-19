import React from 'react';
import { Cross2Icon } from '@radix-ui/react-icons';
import { Dialog, Flex, Heading, IconButton } from '@radix-ui/themes';

interface ItemAwardModalProps {
  open: boolean;
  pdf: string;
  award_name: string;
  award_result: string;
  onClose: () => void;
}

const ItemAwardModal: React.FC<ItemAwardModalProps> = ({ open, pdf, award_name, award_result, onClose }) => {
  return (
    <Dialog.Root open={open} onOpenChange={(nextOpen) => !nextOpen && onClose()}>
      <Dialog.Content maxWidth="800px">
        <Flex justify="between" align="center" mb="3">
          <Dialog.Title>{award_name}</Dialog.Title>
          <Dialog.Close>
            <IconButton variant="ghost" aria-label="Close">
              <Cross2Icon />
            </IconButton>
          </Dialog.Close>
        </Flex>
        <Heading size="4" mb="3">
          {award_result}
        </Heading>
        <div id="pdf">
          <embed
            id="pdf_content"
            src={pdf + '#view=FitH&scrollbar=1&toolbar=1&navpanes=0'}
            width="100%"
            height="600"
            type="application/pdf"
          />
        </div>
      </Dialog.Content>
    </Dialog.Root>
  );
};

export default ItemAwardModal;
