import { useEffect, useState } from 'react';
import './Navbar.css';

type ThemeMode = 'dark' | 'light' | 'system';

export const Navbar = () => {
	const [theme, setTheme] = useState(() => {
		const storageTheme = localStorage.getItem('theme');
		return storageTheme == null ? 'system' : storageTheme;
	});

	const themeHandler = (value: ThemeMode) => {
		setTheme(value);
	};

	useEffect(() => {
		localStorage.setItem('theme', theme);

		if (theme === 'system') {
			const systemPreference = window.matchMedia(
				'(prefers-color-scheme: dark)'
			).matches
				? 'dark'
				: '';
			document.documentElement.dataset.theme = systemPreference;
		}

		document.documentElement.dataset.theme = theme;
	}, [theme]);

	return (
		<nav
			className="navbar navbar-no-boxShadow px-5"
			style={{ margin: '0 auto' }}
		>
			<div className="navbar-start">
				<a className="navbar-item text-4xl font-bold">
					<span>Tick</span>
					<span>-</span>
					<span className="text-error border-dotted border-error border-b-4">
						Typo
					</span>
				</a>
			</div>
			<div className="navbar-end">
				<div className="dropdown">
					<button className="btn btn-ghost btn-circle ">
						{/* Light */}
						<svg
							className={`theme-icon ${
								theme === 'light' ? 'inline' : 'hidden'
							}`}
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 24 24"
							strokeWidth="1.5"
							stroke="currentColor"
							fill="none"
							strokeLinecap="round"
							strokeLinejoin="round"
						>
							<path stroke="none" d="M0 0h24v24H0z" fill="none" />
							<path d="M12 12m-4 0a4 4 0 1 0 8 0a4 4 0 1 0 -8 0" />
							<path d="M3 12h1m8 -9v1m8 8h1m-9 8v1m-6.4 -15.4l.7 .7m12.1 -.7l-.7 .7m0 11.4l.7 .7m-12.1 -.7l-.7 .7" />
						</svg>

						{/* Dark */}
						<svg
							className={`theme-icon ${
								theme === 'dark' ? 'inline' : 'hidden'
							}`}
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 24 24"
							strokeWidth="1.5"
							stroke="currentColor"
							fill="none"
							strokeLinecap="round"
							strokeLinejoin="round"
						>
							<path stroke="none" d="M0 0h24v24H0z" fill="none" />
							<path d="M12 3c.132 0 .263 0 .393 0a7.5 7.5 0 0 0 7.92 12.446a9 9 0 1 1 -8.313 -12.454z" />
						</svg>

						{/* System */}
						<svg
							className={`theme-icon ${
								theme === 'system' ? 'inline' : 'hidden'
							}`}
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 24 24"
							strokeWidth="1.5"
							stroke="currentColor"
							fill="none"
							strokeLinecap="round"
							strokeLinejoin="round"
						>
							<path stroke="none" d="M0 0h24v24H0z" fill="none" />
							<path d="M3 5a1 1 0 0 1 1 -1h16a1 1 0 0 1 1 1v10a1 1 0 0 1 -1 1h-16a1 1 0 0 1 -1 -1v-10z" />
							<path d="M7 20h10" />
							<path d="M9 16v4" />
							<path d="M15 16v4" />
						</svg>
					</button>
					<div className="dropdown-menu dropdown-menu-bottom-left">
						<button
							className={`btn btn-ghost ${
								theme === 'light' ? 'dropdown-active' : ''
							}`}
							onClick={() => themeHandler('light')}
						>
							Light
						</button>

						<button
							className={`btn btn-ghost ${
								theme === 'dark' ? 'dropdown-active' : ''
							}`}
							onClick={() => themeHandler('dark')}
						>
							Dark
						</button>

						<button
							className={`btn btn-ghost ${
								theme === 'system' ? 'dropdown-active' : ''
							}`}
							onClick={() => themeHandler('system')}
						>
							System
						</button>
					</div>
				</div>
			</div>
		</nav>
	);
};
