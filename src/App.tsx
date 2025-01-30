import './App.css'
import { Input } from '@heroui/react'
import { Icon } from '@iconify/react'

import jobs from './data/data'
import JobsList from './components/JobsList'

function App() {

  return (
    <div className='max-w-[600px] mx-auto'>
      <Input
        endContent={<Icon
          icon='material-symbols:search-rounded'
          className='text-2xl text-default-400 pointer-events-none flex-shrink-0'
        />}
        placeholder='Search'
        type='text'
      />
      <JobsList data={jobs} />
    </div>
  )
}

export default App
