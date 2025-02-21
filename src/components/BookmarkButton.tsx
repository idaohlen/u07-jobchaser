'use client';

import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store/rootReducer';
import { addBookmark, removeBookmark } from '@/store/slices/dataSlice';
import { Button } from '@heroui/react';
import { Icon } from '@iconify/react';

export default function BookmarkButton({ jobId }: { jobId: string }) {
  const dispatch = useDispatch();
  const bookmarks = useSelector((state: RootState) => state.data.bookmarks);

  // Add/remove job to bookmarks
  function handleToggleBookmark() {
    if (isBookmark(jobId)) dispatch(removeBookmark(jobId));
    else dispatch(addBookmark(jobId));
  }

  // true/false check if job has been bookmarked
  const isBookmark = (id: string) => bookmarks.includes(id);

  return (
    <Button isIconOnly aria-label='Add to bookmarks' variant='light' size='sm' onPress={handleToggleBookmark}>
      <Icon
        icon={isBookmark(jobId) ? 'material-symbols:bookmark' : 'material-symbols:bookmark-outline'}
        className='text-xl flex-shrink-0 text-primary'
      />
    </Button>
  );
}