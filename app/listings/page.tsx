import { ListingCard } from '@/components/custom/ListingCard';
import { NoItem } from '@/components/custom/NoItem';
import prisma from '@/lib/db';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import { redirect } from 'next/navigation';
import { unstable_noStore as noStore } from 'next/cache';


async function getData(userId: string) {
	noStore();

	const data = await prisma.home.findMany({
		where: {
			userId: userId,
			addedCategory: true,
			addedDescription: true,
			addedLocation: true,
		},
		select: {
			id: true,
			country: true,
			description: true,
			price: true,
			photo: true,
			Favorite: {
				where: {
					userId: userId,
				},
			},
		},
		orderBy: {
			createdAt: 'desc',
		},
	});

	return data;
}

export default async function MyHomes() {
	const { getUser } = getKindeServerSession();
	const user = await getUser();

	if (!user) return redirect('/');

	const data = await getData(user.id);

	return (
		<section className="container mx-auto px-5 lg:px-10 mt-10">
      <h2 className="text-3xl font-semibold tracking-tight">Your Homes</h2>
      
      {data.length === 0 ? (
        <NoItem description='Create your first home' title='You dont have any Homes yet'/>
      ): (
          <div className='grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-8 mt-8'>
            {data.map((item) => (
              <ListingCard
                key={item.id}
                description={item.description as string}
                imagePath={item.photo as string}
                location={item.country as string}
                price={item.price as number}
                userId={user.id}
                favoriteId={item.Favorite[0]?.id as string}
                isInFavoriteList={(item.Favorite.length as number) > 0 ? true : false}
                homeId={item.id}
                pathName="/"
              />
            ))}
          </div>
      )}
		</section>
	);
}
