import TrackerTable from '../components/TrackerTable.jsx'
import Image from 'next/image'

export default function Track() {
  return (
    <div className='w-screen h-screen'>
      <div className='container px-20 py-10'>
        <TrackerTable />   
      </div>
    </div>
  )
}

