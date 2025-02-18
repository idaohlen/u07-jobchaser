'use client';

import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { RootState } from '@/store/rootReducer';
import { setSearchQuery, setFilters, clearFilters } from '@/store/slices/searchSlice';

// UI Components
import { Input, Button, Select, SelectItem, SelectSection } from '@heroui/react';
import { Icon } from '@iconify/react';

// Models
import Job from '@/models/Job';
import FilterPresets from '@/models/FilterPresets';

// Components
import JobsList from '@/components/JobsList';
import Pagination from '@/components/JobsPagination';

export default function Page() {
  // Redux state
  const query = useSelector((state: RootState) => state.search.query);
  const activeFilters = useSelector((state: RootState) => state.search.filters);
  const dispatch = useDispatch();

  // State
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [filteredJobs, setFilteredJobs] = useState(jobs);
  const [currentPage, setCurrentPage] = useState(1);

  // Pagination variables
  const JOBS_PER_PAGE = 8;
  const totalPages = Math.ceil(filteredJobs.length / JOBS_PER_PAGE);
  const startIndex = (currentPage - 1) * JOBS_PER_PAGE;
  const endIndex = startIndex + JOBS_PER_PAGE;

  // Jobs for current page
  const currentJobs = filteredJobs.slice(startIndex, endIndex);

  // Update state with the current search query
  function handleQueryChange(e: React.ChangeEvent<HTMLInputElement>) {
    dispatch(setSearchQuery(e.target.value));
  }

  // Apply search query on mount
  useEffect(() => {
    async function fetchJobs() {
      setLoading(true);
      try {
        // const response = await fetch('https://jsonfakery.com/jobs');
        const response = await fetch('/data/jobs.json');
        const data = await response.json();
        setJobs(data);
        setFilteredJobs(data);
      } catch (error) {
        console.error('Error fetching jobs:', error);
      } finally {
        setLoading(false);
      }
    }
  
    fetchJobs();
    handleSearch(query);
  }, []);

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

  function handleChangeFilter(keys: Set<React.Key>) {
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

      {/* Search jobs form */}
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

      {/* Job filter presets */}
      <div className='flex items-center gap-2 mt-2'>
        <Select
          placeholder='Filters'
          aria-label='Filter jobs'
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

      {/* Display jobs and pagination */}
      {loading ? (<p>Loading jobs...</p>) : (
        <>
          {currentJobs.length > 0 &&
            <div className='flex justify-between items-end mt-8 mb-6'>
              <p className='text-sm text-gray-600 dark:text-gray-400'>{filteredJobs.length} jobs found</p>
              <Pagination
                totalPages={totalPages}
                onPageChange={handleChangePage}
              />
            </div>
          }

          <JobsList data={currentJobs} />

          {currentJobs.length > 0 &&
            <Pagination
              className='flex my-8 justify-end'
              totalPages={totalPages}
              onPageChange={handleChangePage}
            />
          }
        </>
      )}
    </div>
  )
}