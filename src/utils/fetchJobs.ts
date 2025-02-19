import Job from "@/models/Job";
import { removeBookmark } from "@/store/slices/dataSlice";
import store from "@/store";

export async function fetchJobs() {
  try {
    // const response = await fetch('/data/jobs.json');
    const response = await fetch('https://remotive.com/api/remote-jobs');
    const data = await response.json();
    // return data;
    return data.jobs;
  } catch (error) {
    console.error('Error fetching jobs:', error);
    throw error;
  }
}

export async function fetchBookmarkedJobs(bookmarkedIds: string[]) {
  try {
    const jobs = await fetchJobs();
    const bookmarkedJobs = jobs.filter((job: Job) => bookmarkedIds.includes(job.id.toString()));

    // Remove invalid bookmarks
    const validBookmarkedIds = bookmarkedJobs.map((job: Job) => job.id.toString());
    
    bookmarkedIds.forEach(id => {
      if (!validBookmarkedIds.includes(id)) {
        store.dispatch(removeBookmark(id));
      }
    });

    return bookmarkedJobs;
  } catch (error) {
    console.error('Error fetching bookmarked jobs:', error);
    throw error;
  }
}