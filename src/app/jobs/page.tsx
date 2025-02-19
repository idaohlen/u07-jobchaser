'use client';

import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store/rootReducer';
import { setFilters, clearFilters } from '@/store/slices/searchSlice';

// Models
import Job from '@/models/Job';
import FilterPresets from '@/models/FilterPresets';

// Components
import { Button, Select, SelectItem, SelectSection } from '@heroui/react';

import JobsList from '@/components/JobsList';
import Pagination from '@/components/JobsPagination';

// Utils
import { fetchJobs } from '@/utils/fetchJobs';

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

  // Apply search query on mount
  useEffect(() => {
    async function loadJobs() {
      setLoading(true);
      try {
        const data = await fetchJobs();
        setJobs(data);
        setFilteredJobs(data);
      } catch (error) {
        console.error('Error loading jobs:', error);
      } finally {
        setLoading(false);
      }
    }
    
    loadJobs();
  }, []);

  // Apply search query when the contents of activeFilters change or query/jobs change
  useEffect(() => handleSearch(query), [query, jobs, activeFilters]);

  // Check if a term matches any of the searchable items
  function matchesTerm(job: Job, term: string) {
    const words = term.toLowerCase().split(' ');
    return words.every(word =>
      job.position.toLowerCase().includes(word) ||
      job.company.toLowerCase().includes(word) ||
      job.role.toLowerCase().includes(word) ||
      job.contract.toLowerCase().includes(word) ||
      job.location.toLowerCase().includes(word) ||
      job.languages.some(language => language.toLowerCase().includes(word)) ||
      job.tools.some(tool => tool.toLowerCase().includes(word))
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

  // Update active filters
  function handleChangeFilter(keys: 'all' | Set<React.Key>) {
    const filters = Array.from(keys).map(key => key.toString().split(':')[1]);
    dispatch(setFilters(filters));
  };

  // Clear filters
  const handleClearFilters = () => dispatch(clearFilters());

  // Set new current page
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
    <div className='page max-w-[600px] mx-auto mt-4 px-10 pb-20'>
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