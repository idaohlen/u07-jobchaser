'use client';

import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Image, Card, CardHeader } from "@heroui/react";

import DOMPurify from 'dompurify';

import Job from "@/models/Job";

interface JobDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  job: Job;
}

export default function JobDetailsModal({isOpen, onClose, job}: JobDetailsModalProps) {
  const sanitizedDescription = DOMPurify.sanitize(job.description);

  return (
    <Modal isOpen={isOpen} onClose={onClose} scrollBehavior='inside' hideCloseButton>
      <ModalContent>
        <ModalHeader>
          <Card className='w-full'>
            <CardHeader className='flex gap-4 items-center'>
                <Image
                  src={job.company_logo}
                  height={60}
                  width={60}
                  radius='sm'
                  alt={`Company logo for ${job.company_name}`}
                />
                <div className='flex flex-col text-left mr-auto'>
                  <p className='text-md font-semibold'>{job.category}</p>
                  <p className='text-small text-default-00'>{job.company_name}</p>
                </div>
                
                <div className='text-xs text-slate-400 dark:text-slate-600'>
                <p>{job.job_type.replace('_', ' ')}</p>
                <p>{job.candidate_required_location}</p>
                </div>
            </CardHeader>

          </Card>
        </ModalHeader>
        <ModalBody>
          <div className='text-sm' dangerouslySetInnerHTML={{ __html: sanitizedDescription }} />
        </ModalBody>
        <ModalFooter>
          <Button onPress={onClose}>Close</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}