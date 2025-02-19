'use client';

import { useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';
import { setSearchQuery } from '@/store/slices/searchSlice';

import { Button, Input } from '@heroui/react';
import { Icon } from '@iconify/react';

export default function Home() {
  const dispatch = useDispatch();
  const router = useRouter();

  // Apply search query to store and redirect to /jobs page
  function handleSearch(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const query = e.currentTarget.search.value;
    dispatch(setSearchQuery(query));
    router.push('/jobs');
  }

  return (
    <div className='page min-h-screen bg-primary-600 dark:bg-gray-900 text-white flex flex-col justify-center items-center'>
      <section className='text-center mb-12'>
        <h1 className='text-4xl font-bold mb-4'>Welcome to JobChaser</h1>
        <p className='text-lg text-gray-200 mb-8'>Your ultimate destination for finding your dream job. Search, apply, and get hired!</p>
          <form onSubmit={handleSearch} className='flex gap-2 w-full max-w-md mx-auto'>
            <Input
              type='text'
              name='search'
              placeholder='Search for jobs...'
              className='w-full'
            />
            <Button type='submit'>
              <Icon
                icon='material-symbols:search-rounded'
                className='text-2xl pointer-events-none flex-shrink-0'
              />
            </Button>
          </form>
      </section>
    </div>
  );
}
