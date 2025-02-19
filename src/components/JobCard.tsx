'use client';

import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store/rootReducer';
import { addBookmark, removeBookmark } from '@/store/slices/dataSlice';

import { formatDistanceToNow } from 'date-fns';

import Job from '@/models/Job';

import { Card, CardHeader, CardFooter, Divider, Image, Chip, Button } from '@heroui/react';
import { Icon } from '@iconify/react';
import JobDetailsModal from '@/components/JobDetailsModal';

export default function JobCard({data}: {data: Job}) {
  const dispatch = useDispatch();
  const bookmarks = useSelector((state: RootState) => state.data.bookmarks);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Add/remove job to bookmarks
  function handleToggleBookmark (id: string) {
    if (isBookmark(id)) dispatch(removeBookmark(id));
    else dispatch(addBookmark(id));
  }

  // true/false check if job has been bookmarked
  const isBookmark = (id: string) => bookmarks.includes(id);

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
          <Button isIconOnly aria-label='Add to bookmarks' variant='light' size='sm'
            onPress={() => handleToggleBookmark(data.id.toString())}
          >
            <Icon
              icon={isBookmark(data.id.toString()) ? 'material-symbols:bookmark' : 'material-symbols:bookmark-outline'}
              className='text-xl flex-shrink-0 text-primary'
            />
          </Button>

        </CardHeader>
        <Divider/>
        <CardFooter className='flex justify-between gap-4'>
        <div className='text-xs text-slate-800 dark:text-slate-400'>{data.candidate_required_location} ⋅ {data.job_type.replace('_', ' ')}</div>
          {/* <div className='flex gap-2'>
            {data.tags.map(tag => <Chip key={data.id + tag} size='sm' variant='bordered'>{tag}</Chip>)}
          </div> */}
            <Button variant='ghost' size='sm' onPress={handleOpenModal}>Read more</Button>
        </CardFooter>
      </Card>

      <JobDetailsModal isOpen={isModalOpen} onClose={handleCloseModal} job={data} />
    </>
  )
}