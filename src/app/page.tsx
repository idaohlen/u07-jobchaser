'use client'
import { useState } from 'react'

import { Input } from '@heroui/react'
import { Icon } from '@iconify/react'

import jobs from '@/data/data'
import JobsList from '@/components/JobsList'

export default function Home() {
  const [searchTerm, setSearchTerm] = useState('');

  function handleSearchTermChange(e: React.ChangeEvent<HTMLInputElement>) {
    setSearchTerm(e.target.value);
  }

  const filteredJobs = jobs.filter(job => {
    const term = searchTerm.toLowerCase();
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

  return (
    <>
    <div className='max-w-[600px] mx-auto mt-12'>
      <div className='mb-12'>
        <Input
          endContent={<Icon
            icon='material-symbols:search-rounded'
            className='text-2xl text-default-400 pointer-events-none flex-shrink-0'
          />}
          placeholder='Search'
          value={searchTerm}
          onChange={handleSearchTermChange}
          type='text'
        />
      </div>
      <JobsList data={filteredJobs} />
    </div>
    </>
  );
}
