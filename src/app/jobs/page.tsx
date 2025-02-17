'use client';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { RootState } from '@/store/rootReducer';
import { setSearchQuery } from '@/store/slices/searchSlice';

import { Input, Button } from '@heroui/react';
import { Icon } from '@iconify/react';

import Job from '@/models/Job';
import jobs from '@/data/jobs';
import JobsList from '@/components/JobsList';
import Pagination from '@/components/JobsPagination';

export default function Page() {
  const query = useSelector((state: RootState) => state.search.query);
  const dispatch = useDispatch();

  const [filteredJobs, setFilteredJobs] = useState(jobs);
  const [currentPage, setCurrentPage] = useState(1);

  const JOBS_PER_PAGE = 8;
  const totalPages = Math.ceil(filteredJobs.length / JOBS_PER_PAGE);

  function handleQueryChange(e: React.ChangeEvent<HTMLInputElement>) {
    dispatch(setSearchQuery(e.target.value));
  }

  useEffect(() => {
    handleSearch(query);
  }, []);

  function handleSearch(searchQuery: string) {
    const term = searchQuery.toLowerCase();
    const filtered = jobs.filter((job: Job) => {
      return (
        job.position.toLowerCase().includes(term) ||
        job.company.toLowerCase().includes(term) ||
        job.role.toLowerCase().includes(term) ||
        job.contract.toLowerCase().includes(term) ||
        job.location.toLowerCase().includes(term) ||
        job.languages.some(language => language.toLowerCase().includes(term)) ||
        job.tools.some(tool => tool.toLowerCase().includes(term))
      );
    });
    setFilteredJobs(filtered);
    setCurrentPage(1);
  }

  function handleChangePage(page: number) {
    setCurrentPage(page);
    console.log(page);
  }

  const startIndex = (currentPage - 1) * JOBS_PER_PAGE;
  const endIndex = startIndex + JOBS_PER_PAGE;
  const currentJobs = filteredJobs.slice(startIndex, endIndex);

  return (
    <div className='page max-w-[600px] mx-auto mt-12 pb-20'>
      <form className='mb-8 flex gap-2' onSubmit={(e) => {
        e.preventDefault();
        handleSearch(query);
      }}>
        <Input
          placeholder='Search'
          value={query}
          onChange={handleQueryChange}
          type='text'
        />
        <Button onPress={() => handleSearch(query)}>
          <Icon
            icon='material-symbols:search-rounded'
            className='text-2xl text-default-400 pointer-events-none flex-shrink-0'
          />
        </Button>
      </form>

      <Pagination totalPages={totalPages} onChange={handleChangePage} />
      {currentJobs.length > 0 && <p className="mb-3 text-sm text-gray-600">{currentJobs.length} jobs found</p> }
      <JobsList data={currentJobs} />
      <Pagination totalPages={totalPages} onChange={handleChangePage} />
    </div>
  )
}