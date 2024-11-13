/* eslint-disable @next/next/no-img-element */
import { MenuIcon } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '../ui/dropdown-menu';
import { RegisterLink, LoginLink, LogoutLink } from '@kinde-oss/kinde-auth-nextjs/components';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import Link from 'next/link';
import { createHome } from '@/app/actions';
import Image from 'next/image';

export async function UserNav() {
	const { getUser } = getKindeServerSession();
	const user = await getUser();

	const createHomeWithId = createHome.bind(null, { userId: user?.id as string });

	return (
		<DropdownMenu>
			<DropdownMenuTrigger>
				<div className="rounded-full border px-2 py-2 lg:px-4 lg:py-2 flex items-center gap-x-2">
					<MenuIcon className="w-6 h-6 lg:w-5 lg:h-5" />
					<Image
						src={user?.picture ?? 'https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg'}
						alt="Image of the user"
						className="rounded-full h-8 w-8 hidden lg:block"
						height={32}
						width={32}
						priority
					/>
				</div>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="end" className="w-[200px]">
				{user ? (
					<>
						<DropdownMenuItem>
							<form className="w-full" action={createHomeWithId}>
								<button type="submit" className="w-full text-start">
									RentDo your Home
								</button>
							</form>
						</DropdownMenuItem>
						<DropdownMenuItem>
							<Link href="/listings">My Listings</Link>
						</DropdownMenuItem>
						<DropdownMenuItem>
							<Link href="/favorites">My Favorites</Link>
						</DropdownMenuItem>
						<DropdownMenuItem>
							<Link href="/reservations">My Reservations</Link>
						</DropdownMenuItem>
						<DropdownMenuSeparator />
						<DropdownMenuItem>
							<LogoutLink className="w-full">Logout</LogoutLink>
						</DropdownMenuItem>
					</>
				) : (
					<>
						<DropdownMenuItem>
							<RegisterLink className="w-full">Register</RegisterLink>
						</DropdownMenuItem>
						<DropdownMenuItem>
							<LoginLink className="w-full">Login</LoginLink>
						</DropdownMenuItem>
					</>
				)}
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
