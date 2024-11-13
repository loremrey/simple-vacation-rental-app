import { createReservation } from '@/app/actions';
import { CategoryShowcase } from '@/components/custom/CategoryShowcase';
import { MapShowcase } from '@/components/custom/MapShowcase';
import { SelectCalendar } from '@/components/custom/SelectCalendar';
import { ReservationSubmitButton } from '@/components/custom/SubmitButton';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { useCountries } from '@/lib/custom/getCountries';
import prisma from '@/lib/db';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import Image from 'next/image';
import Link from 'next/link';
import { unstable_noStore as noStore } from 'next/cache';

async function getData(homeId: string) {
	noStore();

	const data = await prisma.home.findUnique({
		where: {
			id: homeId,
		},
		select: {
			photo: true,
			description: true,
			guests: true,
			bedrooms: true,
			bathrooms: true,
			title: true,
			categoryName: true,
			price: true,
			country: true,
			Reservation: {
				where: {
					homeId: homeId,
				},
			},
			User: {
				select: {
					profileImage: true,
					firstName: true,
					lastName: true,
				},
			},
		},
	});

	return data;
}

export default async function HomeRoute({ params }: { params: { id: string } }) {
	const data = await getData(params.id);
	const { getCountryByValue } = useCountries();
	const country = getCountryByValue(data?.country as string);
	const { getUser } = getKindeServerSession();
	const user = await getUser();
	return (
		<div className="w-[75%] mx-auto mt-10 mb-12">
			<h1 className="font-medium text-2xl mb-5">{data?.title}</h1>
			<div className="relative h-[550px]">
				<Image alt="Image of Home" src={`https://xqekhjcrimdiruxzjnea.supabase.co/storage/v1/object/public/images/${data?.photo}`} fill className="rounded-lg h-full object-cover w-full" />
			</div>
			<div className="flex justify-between gap-x-24 mt-8">
				<div className="w-2/3">
					<h3 className="text-xl font-medium">
						{country?.flag} {country?.label} / {country?.region}
					</h3>
					<div className="flex gap-x-2 text-muted-foreground">
						<p>{data?.guests} Guests</p> * <p>{data?.bedrooms} Bedrooms</p> * <p>{data?.bathrooms} Bathrooms</p>
					</div>
					<div className="flex gap-x-2 text-muted-foreground">
						<p>
							<span className="text-black font-medium">${data?.price}</span> Night
						</p>
					</div>

					<div className="flex items-center mt-6">
						<Image
							src={data?.User?.profileImage ?? 'https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg'}
							alt="User Profile"
							height={44}
							width={44}
							className="w-11 h-11 rounded-full"
						/>
						<div className="flex flex-col ml-4 ">
							<h3 className="font-medium">
								Hosted by {data?.User?.firstName} {data?.User?.lastName}
							</h3>
							<p className="text-sm text-muted-foreground">Host since 0000</p>
						</div>
					</div>
					<Separator className="my-7" />
					<CategoryShowcase categoryName={data?.categoryName as string} />
					<Separator className="my-7" />
					<p className="text-muted-foreground">{data?.description}</p>
					<Separator className="my-7" />

					<MapShowcase locationValue={data?.country as string} />
				</div>

				<form action={createReservation}>
					<input type="hidden" name="homeId" value={params.id} />
					<input type="hidden" name="userId" value={user?.id} />
					<SelectCalendar reservation={data?.Reservation} />
					{user?.id ? (
						<ReservationSubmitButton />
					) : (
						<Button className="w-full" asChild>
							<Link href="/api/auth/login">Make a Reservation</Link>
						</Button>
					)}
				</form>
			</div>
		</div>
	);
}
