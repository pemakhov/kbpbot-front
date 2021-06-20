import PropTypes from 'prop-types';

const phonePropType = PropTypes.shape({
  id: PropTypes.string,
  name: PropTypes.string,
  date: PropTypes.string,
  day: PropTypes.number,
  month: PropTypes.number,
  year: PropTypes.number,
});

export default phonePropType;
