'use client';

import { useDispatch, useSelector } from 'react-redux';

import { RootState } from '@/store/rootReducer';
import { addBookmark, removeBookmark } from '@/store/slices/dataSlice';

import Job from '../models/Job';

import { Card, CardHeader, CardFooter, Divider, Image, Chip, Button } from '@heroui/react';
import { Icon } from '@iconify/react';

export default function JobCard({data}: {data: Job}) {
  const bookmarks = useSelector((state: RootState) => state.data.bookmarks);
  const dispatch = useDispatch();

  // Add/remove job to bookmarks
  function handleToggleBookmark (id: string) {
    if (isBookmark(id)) dispatch(removeBookmark(id));
    else dispatch(addBookmark(id));
  }

  // true/false check if job has been bookmarked
  const isBookmark = (id: string) => bookmarks.includes(id);

  return (
    <Card key={data.id} className='w-full' radius='sm'>
    <CardHeader className='flex gap-3 items-center'>
      <Image
        src={data.company_logo}
        height={40}
        width={40}
        radius='sm'
        alt={`Company logo for ${data.company_name}`}
      />
      <div className='flex flex-col text-left'>
        <p className='text-md font-semibold'>{data.category}</p>
        <p className='text-small text-default-00'>{data.company_name}</p>
      </div>
      <div className='ml-auto text-xs text-slate-800 dark:text-slate-400'>{data.candidate_required_location} ⋅ {data.job_type.replace('_', ' ')}</div>
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
    <CardFooter className='flex justify-between'>
      {/* <div className='flex gap-2'>
        {data.tags.map(tag => <Chip key={data.id + tag} size='sm' variant='bordered'>{tag}</Chip>)}
      </div> */}
      <div className='text-xs text-slate-400 dark:text-slate-600'>{data.publication_date}</div>
    </CardFooter>
  </Card>
  )
}