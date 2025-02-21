'use client';

import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';

import { RootState } from '@/store/rootReducer';
import { setSearchQuery } from '@/store/slices/searchSlice';

import { Button, Input, Tooltip } from '@heroui/react';
import { Icon } from '@iconify/react';

export default function SearchBar({ onSubmit, ...props }: { onSubmit?: () => void }) {
  const query = useSelector((state: RootState) => state.search.query);
  const [localQuery, setLocalQuery] = useState(query);
  const dispatch = useDispatch();
  const router = useRouter();

  // Update state with the current search query
  function handleQueryChange(e: React.ChangeEvent<HTMLInputElement>) {
    setLocalQuery(e.target.value);
  }

  function handleFormSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    dispatch(setSearchQuery(localQuery));
    router.push('/jobs');
    if (onSubmit) onSubmit();
  }

  return (
    <>
      <form className='w-full flex gap-2' onSubmit={handleFormSubmit} {...props}>
        <Input
          className=' flex-grow'
          placeholder='Search'
          value={localQuery}
          onChange={handleQueryChange}
          type='text'
        />
        <Tooltip content='Search jobs'>
          <Button isIconOnly variant='flat' type='submit'>
            <Icon
              icon='material-symbols:search-rounded'
              className='text-2xl'
            />
          </Button>
        </Tooltip>
      </form>
    </>
  )
}