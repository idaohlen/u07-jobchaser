'use client';

import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store/rootReducer';
import { setFilter, clearFilters } from '@/store/slices/searchSlice';
import { motion, AnimatePresence } from 'framer-motion';

// Models
import Job from '@/models/Job';

// Components
import { Button, Tooltip, Autocomplete, AutocompleteItem } from '@heroui/react';
import { Icon } from '@iconify/react';

import JobsList from '@/components/JobsList';
import Pagination from '@/components/JobsPagination';

// Utils
import { fetchJobs } from '@/utils/fetchJobs';

export default function Page() {
  // Redux state
  const query = useSelector((state: RootState) => state.search.query);
  const filters = useSelector((state: RootState) => state.search.filters);
  const dispatch = useDispatch();

  // State
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [filteredJobs, setFilteredJobs] = useState(jobs);
  const [currentPage, setCurrentPage] = useState(1);

  const [uniqueFilterOptions, setuniqueFilterOptions] = useState({
    locations: [] as { label: string }[],
    jobTypes: [] as { label: string }[],
    categories: [] as { label: string }[],
  });

  // Pagination variables
  const JOBS_PER_PAGE = 10;
  const totalPages = Math.ceil(filteredJobs.length / JOBS_PER_PAGE);
  const startIndex = (currentPage - 1) * JOBS_PER_PAGE;
  const endIndex = startIndex + JOBS_PER_PAGE;

  const filterConfig = [
    { 
      key: 'category', 
      label: 'Position', 
      items: uniqueFilterOptions.categories, 
      selectedKey: filters.category, 
      set: (items: { label: string }[]) => setuniqueFilterOptions(prev => ({ ...prev, categories: items })) 
    },
    { 
      key: 'candidate_required_location', 
      label: 'Location requirements', 
      items: uniqueFilterOptions.locations, 
      selectedKey: filters.candidate_required_location, 
      set: (items: { label: string }[]) => setuniqueFilterOptions(prev => ({ ...prev, locations: items })) 
    },
    { 
      key: 'job_type', 
      label: 'Type', 
      items: uniqueFilterOptions.jobTypes, 
      selectedKey: filters.job_type, 
      set: (items: { label: string }[]) => setuniqueFilterOptions(prev => ({ ...prev, jobTypes: items })), 
      className: 'sm:max-w-[160px]'
    }
  ];

  // Jobs for current page
  const currentJobs = filteredJobs.slice(startIndex, endIndex);

  // Fetch jobs, generate dynamic filter options and apply search query on mount
  useEffect(() => {
    async function loadJobs() {
      setLoading(true);
      try {
        const data = await fetchJobs();
        setJobs(data);
        
        filterConfig.forEach(filter => {
          const items = Array
            .from(new Set(data
              .flatMap((job: Job) => (job[filter.key as keyof Job] as string).split(', '))
            ))
            .sort()
            .map(item => ({ label: item as string }));
          
          filter.set(items);
        });

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
  useEffect(() => handleSearch(query), [query, jobs, filters]);

  // Check if a term matches any of the searchable items
  function matchesTerm(job: Job, term: string) {
    const words = term.toLowerCase().split(' ');
    return words.every(word =>
      job.title.toLowerCase().includes(word) ||
      job.description.toLowerCase().includes(word) ||
      job.category.toLowerCase().includes(word) ||
      job.company_name.toLowerCase().includes(word) ||
      job.candidate_required_location.toLowerCase().includes(word) ||
      job.job_type.toLowerCase().includes(word) ||
      job.tags.some(language => language.toLowerCase().includes(word))
    );
  }

  // Execute search
  function handleSearch(searchQuery: string) {
    const term = searchQuery.toLowerCase();

    const filtered = jobs.filter((job: Job) => {
      const matchesSearchTerm = matchesTerm(job, term);
      const matchesFilters = Object.keys(filters).every(filterType => {
        const filterValue = filters[filterType as keyof typeof filters];
        if (!filterValue) return true;
        const jobValue = job[filterType as keyof Job];
        return typeof jobValue === 'string' && jobValue.toLowerCase().includes(filterValue.toLowerCase());
      });

      return matchesSearchTerm && matchesFilters;
    });
    setFilteredJobs(filtered);
    setCurrentPage(1);
  }

  // Update active filters
  function handleChangeFilter(type: keyof typeof filters, value: string) {
    dispatch(setFilter({ type, value }));
  }

  // Clear filters
  function handleClearFilters() {
    dispatch(clearFilters());
  }

  // Set new current page
  const handleChangePage = (page: number) => setCurrentPage(page);

  return (
    <div className='page max-w-[800px] mx-auto mt-6 px-10 pb-20'>

      {/* Job filters */}
      <div className='flex flex-col sm:flex-row w-full gap-2 items-center justify-center'>
        {filterConfig.map(filter => (
          <Autocomplete
            key={filter.key}
            size='sm'
            defaultItems={filter.items}
            selectedKey={filter.selectedKey}
            label={filter.label}
            className={filter.className}
            onSelectionChange={(value) => {
              handleChangeFilter(filter.key as keyof typeof filters, value ? value.toString() : '');
            }}
          >
            {(item) => <AutocompleteItem key={item.label}>{item.label.replace('_', ' ')}</AutocompleteItem>}
          </Autocomplete>
        ))}

        <Tooltip content='Clear all filters' placement='bottom' showArrow={true}>
          <Button isIconOnly onPress={handleClearFilters} variant='flat' size='lg' className='max-sm:w-full'>
            <Icon icon="material-symbols:cancel-outline-rounded" className='text-2xl' />
          </Button>
        </Tooltip>

      </div>

      <div className=' max-w-[600px] m-auto'>
        {/* Display jobs and pagination */}
        {loading ? (<p className='mt-4'>Loading jobs...</p>) : (
          <>
            {currentJobs.length > 0 &&
              <div className='flex justify-between items-end mt-8 mb-6'>
                <p className='text-sm text-gray-600 dark:text-gray-400'>{filteredJobs.length} jobs found</p>
                <Pagination
                  totalPages={totalPages}
                  currentPage={currentPage}
                  onPageChange={handleChangePage}
                />
              </div>
            }
            <AnimatePresence mode='wait'>
              <motion.div
                key={`${currentPage}-${JSON.stringify(filters)}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                <JobsList data={currentJobs} />
              </motion.div>
            </AnimatePresence>

            {currentJobs.length > 0 &&
              <Pagination
                className='flex my-8 justify-end'
                totalPages={totalPages}
                currentPage={currentPage}
                onPageChange={handleChangePage}
              />
            }
          </>
        )}
      </div>
    </div>
  )
}