import PropTypes from 'prop-types';

const phonePropType = PropTypes.shape({
  id: PropTypes.string,
  phone: PropTypes.string,
  name: PropTypes.string,
  department: PropTypes.string,
});

export default phonePropType;
