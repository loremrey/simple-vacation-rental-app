'use client';

import { categoryItems } from '@/lib/custom/categoryItems';
import { Card, CardHeader } from '../ui/card';
import Image from 'next/image';
import { useState } from 'react';

export function SelectCategory() {
	const [selectCategory, setSelectCategory] = useState<string | undefined>(undefined);

	return (
		<div className="grid grid-cols-4 gap-8 mt-10 w-3/5 mx-auto mb-36">
			<input type="hidden" name="categoryName" value={selectCategory as string} />

			{categoryItems.map((item) => (
				<div key={item.id} className="cursor-pointer">
					<Card className={selectCategory === item.name ? 'border-primary' : ''} onClick={() => setSelectCategory(item.name)}>
						<CardHeader>
							<Image src={item.imageUrl} alt={item.name} width={32} height={32} className="w-8 h-8" />
							<p className="font-medium">{item.title}</p>
						</CardHeader>
					</Card>
				</div>
			))}
		</div>
	);
}
