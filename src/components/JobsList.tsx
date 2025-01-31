import Job from '@/models/Job'
import JobCard from '@/components/JobCard'

export default function JobsList({data}: {data: Job[] | []}) {
  return (
    <>
    <div className='flex flex-col items-center gap-4 mt-6'>
      { data.map((job: Job) => <JobCard data={job} key={job.id} />) }
    </div>
    {data.length === 0 && 'No jobs available'}
    </>
  )
}