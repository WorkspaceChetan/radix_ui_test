import { AlertDialog, Button, Flex } from "@radix-ui/themes";
import React from "react";

export type AlertDialogModalProps = {
  name: string;
  handleDelete: () => void;
};
export const AlertDialogModal = ({
  name,
  handleDelete,
}: AlertDialogModalProps) => {
  return (
    <AlertDialog.Root>
      <AlertDialog.Trigger>
        <Button variant="ghost" size="3" color="gray">
          {name}
        </Button>
      </AlertDialog.Trigger>
      <AlertDialog.Content maxWidth="450px">
        <AlertDialog.Title>Delete Event</AlertDialog.Title>
        <AlertDialog.Description size="2">
          You are about to permanently delete this event. This action can&apos;t
          be undone.
        </AlertDialog.Description>

        <Flex gap="3" mt="4" justify="end">
          <AlertDialog.Cancel>
            <Button variant="soft" color="gray">
              Cancel
            </Button>
          </AlertDialog.Cancel>
          <AlertDialog.Action>
            <Button variant="solid" color="red" onClick={handleDelete}>
              Delete
            </Button>
          </AlertDialog.Action>
        </Flex>
      </AlertDialog.Content>
    </AlertDialog.Root>
  );
};
