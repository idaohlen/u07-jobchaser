export default interface Job {
  id: number;
  title: string;
  description: string;
  category: string;
  company_name: string;
  company_logo: string;
  candidate_required_location: string;
  job_type: string;
  tags: string[];
  url: string;
  publication_date: string;
  salary: string;
}