import Job from "@/models/Job";

export async function fetchJobs() {
  try {
    const response = await fetch('/data/jobs.json');
    // const response = await fetch('https://api.example.com/jobs');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching jobs:', error);
    throw error;
  }
}

export async function fetchBookmarkedJobs(bookmarkedIds: string[]) {
  try {
    const jobs = await fetchJobs();
    return jobs.filter((job: Job) => bookmarkedIds.includes(job.id.toString()));
  } catch (error) {
    console.error('Error fetching bookmarked jobs:', error);
    throw error;
  }
}