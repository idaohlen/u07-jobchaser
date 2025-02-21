'use client';

import { useState } from 'react';
import { formatDistanceToNow } from 'date-fns';

import Job from '@/models/Job';

import { Card, CardBody, Image, Button, Chip } from '@heroui/react';
import JobDetailsModal from '@/components/JobDetailsModal';
import BookmarkButton from '@/components/BookmarkButton';

export default function JobCard({data}: {data: Job}) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Handle job details modal
  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);
  
  return (
    <>
      <Card key={data.id} className='w-full' radius='sm'>
        <CardBody>
          <div className='flex gap-1 items-center mb-2'>
            <Image
              src={data.company_logo}
              height={40}
              width={40}
              radius='sm'
              alt={`Company logo for ${data.company_name}`}
            />
            <div className='flex flex-col text-left ml-2 mr-auto'>
              <p className='text-md font-semibold'>{data.title}</p>
              <p className='text-small text-default-00'>{data.company_name}</p>
            </div>
            <div className='text-xs text-slate-400 dark:text-slate-600'>
              { formatDistanceToNow(new Date(data.publication_date), { addSuffix: true }) }
            </div>
            <BookmarkButton jobId={data.id.toString()} />
          </div>
          <div className='flex justify-between gap-4'>
            <div className='flex items-center gap-2 text-xs text-slate-800 dark:text-slate-400'>
              <Chip variant='dot' size='sm' color='primary'>{data.category}</Chip>
              <Chip variant='dot' size='sm' color='warning'>{data.job_type.replace('_', ' ')}</Chip>
              <p className='truncate'>{data.candidate_required_location}</p>
            </div>
            <Button variant='ghost' size='sm' onPress={handleOpenModal}>Read more</Button>
          </div>
        </CardBody>
      </Card>

      <JobDetailsModal isOpen={isModalOpen} onClose={handleCloseModal} job={data} />
    </>
  )
}