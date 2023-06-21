import { useEffect, useState } from 'react';
import './Navbar.css';
import { AboutModal } from './AboutModal';

type ThemeMode = 'dark' | 'light' | 'system';

export const Navbar = () => {
	const [theme, setTheme] = useState(() => {
		const storageTheme = localStorage.getItem('theme');
		return storageTheme == null ? 'system' : storageTheme;
	});

	const themeHandler = (value: ThemeMode) => {
		setTheme(value);
	};

	const [showAbout, setShowAbout] = useState(false);

	const closeAboutHandler = () => {
		setShowAbout(false);
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
			className="navbar navbar-no-boxShadow px-5 pb-12 pt-5"
			style={{ margin: '0 auto' }}
		>
			<div className="navbar-start gap-4 items-center">
				<a className="navbar-item text-4xl font-bold">
					<span>Tick</span>
					<span>-</span>
					<span className="text-error border-dotted border-error border-b-4">
						Typo
					</span>
				</a>
			</div>
			<div className="navbar-end gap-4">
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

				<button
					className="btn btn-circle btn-ghost"
					onClick={() => setShowAbout(true)}
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						className="icon icon-tabler icon-tabler-info-circle-filled"
						width="44"
						height="44"
						viewBox="0 0 24 24"
						strokeWidth="1.5"
						stroke="currentColor"
						fill="none"
						strokeLinecap="round"
						strokeLinejoin="round"
					>
						<path stroke="none" d="M0 0h24v24H0z" fill="none" />
						<path
							d="M12 2c5.523 0 10 4.477 10 10a10 10 0 0 1 -19.995 .324l-.005 -.324l.004 -.28c.148 -5.393 4.566 -9.72 9.996 -9.72zm0 9h-1l-.117 .007a1 1 0 0 0 0 1.986l.117 .007v3l.007 .117a1 1 0 0 0 .876 .876l.117 .007h1l.117 -.007a1 1 0 0 0 .876 -.876l.007 -.117l-.007 -.117a1 1 0 0 0 -.764 -.857l-.112 -.02l-.117 -.006v-3l-.007 -.117a1 1 0 0 0 -.876 -.876l-.117 -.007zm.01 -3l-.127 .007a1 1 0 0 0 0 1.986l.117 .007l.127 -.007a1 1 0 0 0 0 -1.986l-.117 -.007z"
							strokeWidth="0"
							fill="currentColor"
						/>
					</svg>
				</button>
			</div>
			<AboutModal open={showAbout} onClose={closeAboutHandler} />
		</nav>
	);
};
