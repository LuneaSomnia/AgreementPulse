import moment from 'moment';

export { getDaysUntilExpiration, formatDate, isExpiringSoon, getExpirationStatus };

function getDaysUntilExpiration(expirationDate) {
  const today = moment();
  const expiration = moment(expirationDate);
  return expiration.diff(today, 'days');
}

function formatDate(date) {
  return moment(date).format('MM/DD/YYYY');
}

function isExpiringSoon(expirationDate) {
  const daysUntilExpiration = getDaysUntilExpiration(expirationDate);
  return daysUntilExpiration <= 30;
}

function getExpirationStatus(expirationDate) {
  const daysUntilExpiration = getDaysUntilExpiration(expirationDate);
  if (daysUntilExpiration < 0) return 'expired';
  if (daysUntilExpiration <= 30) return 'expiring-soon';
  return 'active';
}

const dateUtils = {
  getDaysUntilExpiration,
  formatDate,
  isExpiringSoon,
  getExpirationStatus
};

export default dateUtils;
