import dynamic from 'next/dynamic';
import { Skeleton } from '../ui/skeleton';

export function MapShowcase({ locationValue }: { locationValue: string }) {
	const LazyMap = dynamic(() => import('@/components/custom/Map'), { ssr: false, loading: () => <Skeleton className="h-[50vh] w-full" /> });

	return <LazyMap locationValue={locationValue} />;
}
