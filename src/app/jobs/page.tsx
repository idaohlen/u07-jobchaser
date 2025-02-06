'use client';
import { useState } from 'react';

import { Input, Button } from '@heroui/react';
import { Icon } from '@iconify/react';

import Job from '@/models/Job';
import jobs from '@/data/jobs';
import JobsList from '@/components/JobsList';

export default function Page() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredJobs, setFilteredJobs] = useState(jobs);

  function handleSearchTermChange(e: React.ChangeEvent<HTMLInputElement>) {
    setSearchTerm(e.target.value);
  }

  function handleSearch() {
    const term = searchTerm.toLowerCase();
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
  }

  return (
    <div className='max-w-[600px] mx-auto mt-12 pb-20'>
      <form className='mb-12 flex gap-2' onSubmit={(e) => {
        e.preventDefault();
        handleSearch();
      }}>
        <Input
          placeholder='Search'
          value={searchTerm}
          onChange={handleSearchTermChange}
          type='text'
        />
        <Button onPress={handleSearch}>
          <Icon
            icon='material-symbols:search-rounded'
            className='text-2xl text-default-400 pointer-events-none flex-shrink-0'
          />
        </Button>
      </form>

      <JobsList data={filteredJobs} />
    </div>
  )
}