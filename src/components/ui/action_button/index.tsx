import { memo, FC } from 'react';
import { Link } from 'react-router-dom';
import styles from './index.styl';

const ActionButton: FC<{ path?: string; icon: string; label: string; disabled?: boolean }> = ({
	path,
	icon,
	label,
	disabled = false,
}) => {
	const Tag = disabled ? 'div' : Link;
	return (
		<Tag className={`${styles.wrapper} ${disabled ? styles.disabled : ''}`} to={path}>
			<img src={icon} alt={label} />
			<span>{label}</span>
		</Tag>
	);
};

export default memo(ActionButton);
