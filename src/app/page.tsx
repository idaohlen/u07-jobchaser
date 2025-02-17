

export default function Home() {
  return (
    <div className='page min-h-screen bg-primary-600 dark:bg-gray-900 text-white flex flex-col justify-center items-center'>
      <section className='text-center mb-12'>
        <h1 className='text-4xl font-bold mb-4'>Welcome to JobChaser</h1>
        <p className='text-lg text-gray-200 mb-8'>Your ultimate destination for finding your dream job. Search, apply, and get hired!</p>
        <div className='w-full max-w-md mx-auto'>
          <input
            type='text'
            placeholder='Search for jobs...'
            className='w-full p-3 border border-gray-300 rounded-md text-black'
          />
          <button className='mt-4 w-full py-3 bg-primary-400 text-white rounded-md'>Search</button>
        </div>
      </section>
    </div>
  );
}
