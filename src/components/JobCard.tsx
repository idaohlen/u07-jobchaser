import Job from '../models/Job'

import { Card, CardHeader, CardFooter, Divider, Image, Chip } from '@heroui/react'

export default function JobCard({data}: {data: Job}) {
  return (
    <Card key={data.id} className='w-full' radius='sm'>
    <CardHeader className='flex gap-3 items-start'>
      <Image
        src={data.logo}
        height={40}
        width={40}
        radius="sm"
      />
      <div className='flex flex-col text-left'>
        <p className='text-md font-semibold'>{data.position}</p>
        <p className='text-small text-default-00'>{data.company}</p>
      </div>
      <div className='ml-auto text-xs text-slate-800'>{data.location} ⋅ {data.contract}</div>
    </CardHeader>
    <Divider/>
    <CardFooter className='flex justify-between'>
      <div className='flex gap-2'>
        {data.languages.map(lang => <Chip key={data.id + lang} size="sm" variant="bordered">{lang}</Chip>)}
        {data.tools.map(tool => <Chip key={tool + data.id} size="sm">{tool}</Chip>)}
      </div>
      <div className='text-xs text-slate-400'>{data.postedAt}</div>
    </CardFooter>
  </Card>
  )
}