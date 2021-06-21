import PropTypes from 'prop-types';

const userPropType = PropTypes.shape({
  id: PropTypes.number,
  isAdmin: PropTypes.bool,
  firstName: PropTypes.string,
  lastName: PropTypes.string,
  userName: PropTypes.string,
  date: PropTypes.number,
  languageCode: PropTypes.string,
});

export default userPropType;
