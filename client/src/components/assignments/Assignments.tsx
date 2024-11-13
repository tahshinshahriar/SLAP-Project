import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import './Assignments.scss'

interface Assignment {
    _id: string;
    title: string;
    description: string;
    dueDate: string;
}

const Assignments: React.FC = () => {
    const { courseId } = useParams<{ courseId: string }>();
    const [assignments, setAssignments] = useState<Assignment[]>([]);

    useEffect(() => {
        const fetchAssignments = async () => {
            try {
                const response = await axios.get(`/api/courses/${courseId}/assignments`);
                setAssignments(response.data);
            } catch (error) {
                console.error("Error fetching assignments:", error);
            }
        };

        fetchAssignments();
    }, [courseId]);

    return (
        <div className="assignments__container">
            <h1>Assignments for Course</h1>
            {assignments.length > 0 ? (
                assignments.map((assignment) => (
                    <div key={assignment._id} className="assignment">
                        <h2>{assignment.title}</h2>
                        <p>{assignment.description}</p>
                        <p>Due Date: {new Date(assignment.dueDate).toLocaleDateString()}</p>
                    </div>
                ))
            ) : (
                <p>No assignments yet for this course.</p>
            )}
        </div>
    );
};

export default Assignments;
