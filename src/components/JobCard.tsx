'use client';

import { useState } from 'react';
import { formatDistanceToNow } from 'date-fns';

import Job from '@/models/Job';

import { Card, CardHeader, CardFooter, Divider, Image, Button } from '@heroui/react';
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
        <CardHeader className='flex gap-1 items-center'>
          <Image
            src={data.company_logo}
            height={40}
            width={40}
            radius='sm'
            alt={`Company logo for ${data.company_name}`}
          />
          <div className='flex flex-col text-left mr-auto'>
            <p className='text-md font-semibold'>{data.category}</p>
            <p className='text-small text-default-00'>{data.company_name}</p>
          </div>
          <div className='text-xs text-slate-400 dark:text-slate-600'>
            { formatDistanceToNow(new Date(data.publication_date), { addSuffix: true }) }
          </div>
          <BookmarkButton jobId={data.id.toString()} />
        </CardHeader>
        <Divider/>
        <CardFooter className='flex justify-between gap-4'>
        <div className='text-xs text-slate-800 dark:text-slate-400'>{data.candidate_required_location} ⋅ {data.job_type.replace('_', ' ')}</div>
          <Button variant='ghost' size='sm' onPress={handleOpenModal}>Read more</Button>
        </CardFooter>
      </Card>

      <JobDetailsModal isOpen={isModalOpen} onClose={handleCloseModal} job={data} />
    </>
  )
}