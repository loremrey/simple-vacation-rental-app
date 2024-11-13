import { SkeletonCard } from '@/components/custom/SkeletonCard';

export default function ListingsLoading() {
	return (
		<section className="container mx-auto px-5 lg:px-10 mt-10">
			<h2 className="text-3xl font-semibold tracking-tight">Your Homes</h2>
			<div className="grid lg:grid-cols-4 sm:grid-col-2 md:grid-cols-3 grid-cols-1 gap-8 mt-8">
				<SkeletonCard />
				<SkeletonCard />
				<SkeletonCard />
				<SkeletonCard />
				<SkeletonCard />
				<SkeletonCard />
				<SkeletonCard />
				<SkeletonCard />
			</div>
		</section>
	);
}
