'use client';

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store/rootReducer';
import { removeBookmark } from '@/store/slices/dataSlice';

import Job from '@/models/Job';

import { fetchBookmarkedJobs } from '@/utils/fetchJobs';

import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, DropdownSection, Tooltip, Button } from '@heroui/react';
import { Icon } from '@iconify/react';

export default function BookmarkedJobs() {
  const bookmarks = useSelector((state: RootState) => state.data.bookmarks);
  const [loading, setLoading] = useState(true);
  const [bookmarkedJobs, setBookmarkedJobs] = useState<Job[]>([]);

  const dispatch = useDispatch();

  // Fetch bookmarked jobs when bookmarks in the store changes
  useEffect(() => {
    async function loadBookmarkedJobs() {
      setLoading(true);
      try {
        const jobs = await fetchBookmarkedJobs(bookmarks);
        setBookmarkedJobs(jobs);
      } catch (error) {
        console.error('Error loading bookmarked jobs:', error);
      } finally {
        setLoading(false);
      }
    }

    loadBookmarkedJobs();
  }, [bookmarks]);

  // Remove the bookmark from the store
  function handleRemoveBookmark(id: string) {
    dispatch(removeBookmark(id));
  }

  return (
    <Dropdown>
      <DropdownTrigger>
          <Button isIconOnly variant='flat' aria-label='Bookmarked Jobs'>
            <Tooltip content='Bookmarked Jobs' offset={14} showArrow={true}>
              <Icon
                icon='material-symbols:bookmark'
                className='text-xl flex-shrink-0 text-primary'
              />
            </Tooltip>
          </Button>
      </DropdownTrigger>
      <DropdownMenu
        aria-label='Bookmarked Jobs'
        closeOnSelect={false}
        style={{ maxHeight: '200px', overflowY: 'auto' }} 
      >
      {/* Display loading text while bookmarks are being fetched */}
      {loading ? (
          <DropdownItem key='loading' textValue='Loading...'>Loading...</DropdownItem>
        ) : (
          <>
            {/* If no bookmarks, display "no bookmarks" text */}
            {bookmarkedJobs.length === 0 ? (
              <DropdownItem key='no-bookmarks' textValue='No bookmarks'>No bookmarks.</DropdownItem>
            ) : (
              <DropdownSection title='Bookmarked Jobs'>
                {bookmarkedJobs.map((job) => (
                  <DropdownItem
                    key={job.id}
                    textValue={`${job.position} at ${job.company}`}
                    endContent={
                      <Button
                        isIconOnly
                        aria-label='Remove from bookmarks'
                        variant='light'
                        size='sm'
                        onPress={() => handleRemoveBookmark(job.id.toString())}
                      >
                        <Icon
                          icon='material-symbols:bookmark'
                          className='text-xl flex-shrink-0 text-primary'
                        />
                      </Button>
                    }
                  >
                    {job.position} at {job.company}
                  </DropdownItem>
                ))}
              </DropdownSection>
            )}
          </>
        )}
      </DropdownMenu>
    </Dropdown>
  );
}