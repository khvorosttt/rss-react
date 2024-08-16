import { NavLink } from 'react-router-dom';

export function Header() {
    return (
        <div className="header">
            <NavLink className={'header-link'} to={'/main'}>
                Main
            </NavLink>
            <NavLink className={'header-link'} to={'/controlled'}>
                Controlled
            </NavLink>
            <NavLink className={'header-link'} to={'/uncontrolled'}>
                Uncontrolled
            </NavLink>
        </div>
    );
}
