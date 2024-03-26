"use client";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";
import logo from "@public/images/logo.jpg";

const Nav = () => {
	const isUserLoggedIn = true;
	const [providers, setProviders] = useState(null);
	const [toggleDropdown, setToggleDropdown] = useState(false);

	useEffect(() => {
		const setProviders = async () => {
			const response = await getProviders();
			setProviders(response);
		};
		setProviders();
	}, []);

	return (
		<nav className="flex-between w-full mb-16 pt-3">
			<Link href={"/"} className="flex gap-2 flex-center">
				<Image
					src={logo}
					alt="Promptus Logo"
					width={50}
					height={50}
					className="object-contain"
				/>
				<p className="logo_text">Promptus</p>
			</Link>

			{/* Desktop navigation*/}
			<div className="sm:flex hidden">
				{/* Navigation links */}
				{isUserLoggedIn ? (
					<div className="flex gap-3 md:gap-5">
						<Link href={"/create-prompt"} className="black_btn">
							Create Post
						</Link>
						<button
							className="outline_btn"
							onClick={signOut}
							type="button"
						>
							Sign Out
						</button>

						<Link href={"/profile"}>
							<Image
								src={logo}
								width={37}
								height={37}
								className="rounded-full"
								alt="profile"
							></Image>
						</Link>
					</div>
				) : (
					<>
						{providers &&
							Object.values(providers).map((provider) => (
								<button
									type="button"
									key={provider.name}
									onClick={() => signIn(provider.id)}
								>
									Sign In
								</button>
							))}
					</>
				)}
			</div>

			{/* Mobile navigation */}

			<div className="sm:hidden flex relative">
				{isUserLoggedIn ? (
					<div className="flex">
						<Image
							src={logo}
							width={37}
							height={37}
							className="rounded-full"
							alt="profile"
							onClick={() => setToggleDropdown((prev) => !prev)}
						/>
						{toggleDropdown && (
							<div className="dropdown">
								<Link
									href={"/profile"}
									className="dropdown_link"
									onClick={() => setToggleDropdown(false)}
								>
									Profile
								</Link>
								<Link
									href={"/create-prompt"}
									className="dropdown_link"
									onClick={() => setToggleDropdown(false)}
								>
									Create Post
								</Link>
								<button
									type="button"
									className="mt-5 w-full black_btn"
									onClick={() => {
										setToggleDropdown(false);
										signOut();
									}}
								>
									Sign Out
								</button>
							</div>
						)}
					</div>
				) : (
					<>
						{providers &&
							Object.values(providers).map((provider) => (
								<button
									type="button"
									key={provider.name}
									onClick={() => signIn(provider.id)}
								>
									Sign In
								</button>
							))}
					</>
				)}
			</div>
		</nav>
	);
};

export default Nav;
