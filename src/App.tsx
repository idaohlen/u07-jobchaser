import './App.css'
import {Input} from '@heroui/react'
import { Button, Card, CardHeader, Divider, Link, Image } from '@heroui/react'
import { Icon } from '@iconify/react'

function App() {

  return (
    <>
      <Input
        endContent={
          <Icon icon="material-symbols:search-rounded" className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
        }
        placeholder="Search"
        type="text"
      />
      <Card className="max-w-[400px]" radius="sm">
        <CardHeader className="flex gap-3">
          <p className="text-md">HeroUI</p>
        </CardHeader>
      </Card>
      <Button color="primary">Button</Button>
    </>
  )
}

export default App
