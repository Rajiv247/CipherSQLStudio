 
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import '../styles/AssignmentListPage.scss';

AssignmentCard.propTypes = {
  assignment: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    title: PropTypes.string.isRequired,
    difficulty: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    fullQuestion: PropTypes.string,
  }).isRequired,
};

export default function AssignmentCard({ assignment }) {
  const id = assignment.id;
  const title = assignment.title;
  const difficulty = assignment.difficulty;
  const description = assignment.description;

  return (
    <div className="assignment-card">
      <h2 className="assignment-card__title">{title}</h2>

      <p className="assignment-card__difficulty">
        <span className="assignment-card__difficulty-label">Difficulty:</span>{" "}
        <span className="assignment-card__difficulty-value">{difficulty}</span>
      </p>

      <p className="assignment-card__description">{description}</p>

      <Link to={"/attempt/" + id} className="assignment-card__button">
        Start Assignment
      </Link>
    </div>
  );
}