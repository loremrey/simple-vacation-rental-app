import { createCategoryHome } from '@/app/actions';
import { CreationButtonBar } from '@/components/custom/CreationButtonBar';
import { SelectCategory } from '@/components/custom/SelectCategory';

export default function StructureRoute({ params }: { params: { id: string } }) {
	return (
		<>
			<div className="w-3/5 mx-auto">
				<h2 className="text-3xl font-semibold tracking-tight transition-colors">Which of these best describe your Home?</h2>
			</div>
			<form action={createCategoryHome}>
				<input type="hidden" name="homeId" value={params.id} />

				<SelectCategory />
				<CreationButtonBar />
			</form>
		</>
	);
}
