import { motion, AnimatePresence } from 'framer-motion';
import Job from '@/models/Job';
import JobCard from '@/components/JobCard';

export default function JobsList({data}: {data: Job[] | []}) {
  return (
    <>
      <div className='flex flex-col items-center gap-4'>
        <AnimatePresence>
          { data.map((job: Job, index: number) => (
            <motion.div
            key={job.id}
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 50 }}
            transition={{ delay: index * 0.1 }}
            className="w-full"
          >
            <JobCard data={job} key={job.id} />
          </motion.div>
        )) }
        </AnimatePresence>
      </div>
      {data.length === 0 && <p className='text-center text-lg p-12'>Could not find any jobs.</p>}
    </>
  )
}