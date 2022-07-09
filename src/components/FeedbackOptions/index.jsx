import PropTypes from 'prop-types';

export const FeedbackOptions = ({ options, onLeaveFeedback }) =>
  options.map(option => (
    <button type="button" key={option} onClick={() => onLeaveFeedback(option)}>
      {option}
    </button>
  ));

FeedbackOptions.propTypes = {
  options: PropTypes.array.isRequired,
  onLeaveFeedback: PropTypes.func.isRequired,
};
