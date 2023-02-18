import classnames from 'classnames';
import PropTypes from 'prop-types';

const baseClasses = 'mx-auto max-w-5xl';

function Container({ className, children }: { className: string; children: React.ReactNode }) {
  return <div className={classnames(baseClasses, className)}>{children}</div>;
}
Container.propTypes = { className: PropTypes.string };
Container.defaultProps = { className: '' };

export default Container;
