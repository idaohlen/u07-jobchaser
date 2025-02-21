'use client';

import DOMPurify from 'dompurify';
import { format as formatDate, formatDistanceToNow } from 'date-fns';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Image, Card, CardHeader, Divider } from "@heroui/react";
import Job from "@/models/Job";
import BookmarkButton from './BookmarkButton';

interface JobDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  job: Job | null;
}

export default function JobDetailsModal({isOpen, onClose, job}: JobDetailsModalProps) {
  let sanitizedDescription = '';
  if (job) sanitizedDescription = DOMPurify.sanitize(job.description);

  return (
    <Modal isOpen={isOpen} onClose={onClose} scrollBehavior='inside' hideCloseButton>
      {job &&
        <ModalContent>
          <ModalHeader>
            <Card className='w-full'>
              <CardHeader className='flex gap-4 items-center'>
                <Image
                  src={job?.company_logo}
                  height={60}
                  width={60}
                  radius='sm'
                  alt={`Company logo for ${job?.company_name}`}
                />
                <div className='flex flex-col text-left mr-auto'>
                  <p className='text-md font-semibold'>{job?.category}</p>
                  <p className='text-small text-default-00'>{job?.company_name}</p>
                </div>
                <BookmarkButton jobId={job.id.toString()} />
              </CardHeader>
            </Card>
          </ModalHeader>
          <ModalBody>
            <ul className='list-disc text-sm ml-6'>
              <li><p><b>Position:</b> {job?.category}</p></li>
              <li><p><b>Type:</b> {job?.job_type.replace('_', ' ')}</p></li>
              <li><p><b>Required location:</b> {job?.candidate_required_location}</p></li>
              <li><p><b>Publication date:</b>&nbsp;
              { formatDate(new Date(job?.publication_date), 'MMM do y') }&nbsp;
              ({ formatDistanceToNow(new Date(job?.publication_date), { addSuffix: true }) })
              </p></li>
            </ul>
            <Divider className="my-4" />
            <div className='prose dark:prose-invert text-sm' dangerouslySetInnerHTML={{ __html: sanitizedDescription }} />
          </ModalBody>
          <ModalFooter>
            <Button onPress={onClose}>Close</Button>
          </ModalFooter>
        </ModalContent>
      }
    </Modal>
  )
}