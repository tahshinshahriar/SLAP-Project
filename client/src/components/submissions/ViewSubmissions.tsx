import { useEffect, useState } from "react";
import axios from "axios";

interface Submission {
  _id: string;
  student: {
    name: string;
    email: string;
  };
  fileUrl: string;
}

const ViewSubmissions: React.FC<{ assignmentId: string }> = ({ assignmentId }) => {
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
        const fetchSubmissions = async () => {
        try {
            const response = await axios.get(`/assignments/${assignmentId}/submissions`, { withCredentials: true });
            setSubmissions(response.data);
            setLoading(false);
        } catch (err) {
            console.error(err);
            setError('No submissions yet');
            setLoading(false);
        }
        };

        fetchSubmissions();
    }, [assignmentId]);

  if (loading) return <div>Loading submissions...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <h1>Submissions</h1>
      <ul>
        {submissions.map((submission) => (
          <li key={submission._id}>
            <p>
              <strong>Student:</strong> {submission.student.name} ({submission.student.email})
            </p>
            <a href={submission.fileUrl} target="_blank" rel="noopener noreferrer">
              View Submission
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ViewSubmissions;
