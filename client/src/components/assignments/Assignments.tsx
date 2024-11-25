import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import './Assignments.scss';

interface Assignment {
  _id: string;
  title: string;
  description: string;
  dueDate: string;
  instructions: {
    fileName: string;
    filePath: string;
  };
}

const Assignments: React.FC = () => {
  const { courseId } = useParams<{ courseId: string }>(); // Get course ID from route params
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAssignments = async () => {
      try {
        const response = await axios.get(`/courses/${courseId}/assignments`, { withCredentials: true });
        setAssignments(response.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching assignments:', err);
        // setError('Failed to load assignments.');
        setLoading(false);
      }
    };

    fetchAssignments();
  }, [courseId]);

  if (loading) return <div>Loading assignments...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="assignments__container">
      <h1>Assignments</h1>
      {assignments.length > 0 ? (
        <ul className="assignments__list">
          {assignments.map((assignment) => (
            <li key={assignment._id} className="assignment__item">
              <h3>{assignment.title}</h3>
              <p><strong>Description:</strong> {assignment.description}</p>
              <p><strong>Due Date:</strong> {new Date(assignment.dueDate).toLocaleDateString('en-CA', { timeZone: 'UTC' })}</p>
              {assignment.instructions?.filePath && (
                <a href={assignment.instructions.filePath} target="_blank" rel="noopener noreferrer">
                  {assignment.instructions.fileName}
                </a>
              )}
            </li>
          ))}
        </ul>
      ) : (
        <p>No assignments available for this course.</p>
      )}
      <Link to="/home/courses" className="back__link">Back to Courses</Link>
    </div>
  );
};

export default Assignments;
