import { useModalStore } from '@/store/create-modal';
import React from 'react'
import { z } from 'zod';

const CreateWorkspaceModal = () => {
  const { isOpen, closeModal, type } = useModalStore();

  const formSchema = z.object({
    name: z.string().min(2, {
      message: "Name should contain minimum of 2 characters",
    }),
  })
  return (
    <div>CreateWorkspaceModal</div>
  )
}

export default CreateWorkspaceModal