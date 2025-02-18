'use client';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { RootState } from '@/store/rootReducer';
import { setSearchQuery, setFilters, clearFilters } from '@/store/slices/searchSlice';

import { Input, Button, Chip, Select, SelectItem, SelectSection } from '@heroui/react';
import { Icon } from '@iconify/react';

import Job from '@/models/Job';
import FilterPresets from '@/models/FilterPresets';
import jobs from '@/data/jobs';
import JobsList from '@/components/JobsList';
import Pagination from '@/components/JobsPagination';

export default function Page() {
  // Redux state
  const query = useSelector((state: RootState) => state.search.query);
  const activeFilters = useSelector((state: RootState) => state.search.filters);
  const dispatch = useDispatch();

  // State
  const [filteredJobs, setFilteredJobs] = useState(jobs);
  const [currentPage, setCurrentPage] = useState(1);

  // Pagination variables
  const JOBS_PER_PAGE = 8;
  const totalPages = Math.ceil(filteredJobs.length / JOBS_PER_PAGE);
  const startIndex = (currentPage - 1) * JOBS_PER_PAGE;
  const endIndex = startIndex + JOBS_PER_PAGE;

  // Jobs for current page
  const currentJobs = filteredJobs.slice(startIndex, endIndex);

  function handleQueryChange(e: React.ChangeEvent<HTMLInputElement>) {
    dispatch(setSearchQuery(e.target.value));
  }

  // Apply search query on mount
  useEffect(() => handleSearch(query), []);

  // Apply search query when the contents of activeFilters change
  useEffect(() => handleSearch(query), [activeFilters]);

  // Check if a term matches any of the searchable items
  function matchesTerm(job: Job, term: string) {
    term = term.toLowerCase();
    return (
      job.position.toLowerCase().includes(term) ||
      job.company.toLowerCase().includes(term) ||
      job.role.toLowerCase().includes(term) ||
      job.contract.toLowerCase().includes(term) ||
      job.location.toLowerCase().includes(term) ||
      job.languages.some(language => language.toLowerCase().includes(term)) ||
      job.tools.some(tool => tool.toLowerCase().includes(term))
    );
  }

  // Execute search
  function handleSearch(searchQuery: string) {
    const term = searchQuery.toLowerCase();
    const filtered = jobs.filter((job: Job) => {
      const matchesSearchTerm = matchesTerm(job, term);
      const matchesFilters = activeFilters.length === 0 || activeFilters.some(filter => matchesTerm(job, filter));
      
      return matchesSearchTerm && matchesFilters;
    });
    setFilteredJobs(filtered);
    setCurrentPage(1);
  }

  const handleChangeFilter = (keys: Set<React.Key>) => {
    const filters = Array.from(keys).map(key => key.toString().split(':')[1]);
    dispatch(setFilters(filters));
  };

  const handleClearFilters = () => dispatch(clearFilters());

  const handleChangePage = (page: number) => setCurrentPage(page);

  const filterPresets: FilterPresets = {
    roles: ["Frontend", "Backend", "Fullstack"],
    level: ["Junior", "Midweight", "Senior"],
    contract: ["Full Time", "Part Time"],
    location: ["Remote", "Worldwide", "USA"],
    languages: ["Python", "Javascript", "CSS", "Ruby"],
    tools: ["React","Vue", "Sass", "Django"]
  }

  return (
    <div className='page max-w-[600px] mx-auto mt-12 px-10 pb-20'>
      <form className='flex gap-2 flex-grow' onSubmit={(e) => {
        e.preventDefault();
        handleSearch(query);
      }}>
        <Input
          placeholder='Search'
          value={query}
          onChange={handleQueryChange}
          type='text'
        />
        <Button onPress={() => handleSearch(query)} color='primary'>
          <Icon
            icon='material-symbols:search-rounded'
            className='text-2xl pointer-events-none flex-shrink-0'
          />
        </Button>
      </form>


      <div className='flex items-center gap-2 mt-2'>
        <Select
          placeholder='Filters'
          selectionMode='multiple'
          selectedKeys={new Set(activeFilters.map(filter => `filter:${filter}`))}
          onSelectionChange={handleChangeFilter}
        >
          {Object.entries(filterPresets).map(([key, values]) => (
            <SelectSection showDivider title={key} key={key}>
              {values.map((query: string) => <SelectItem key={`filter:${query}`}>{query}</SelectItem>)}
            </SelectSection>
          ))}
        </Select>
        <Button onPress={handleClearFilters} variant='light'>
          Clear filters
        </Button>
      </div>


      <Pagination totalPages={totalPages} onChange={handleChangePage} />

      {currentJobs.length > 0 && <p className='mb-3 text-sm text-gray-600 dark:text-gray-400'>{filteredJobs.length} jobs found</p> }
      <JobsList data={currentJobs} />

      <Pagination totalPages={totalPages} onChange={handleChangePage} />
    </div>
  )
}