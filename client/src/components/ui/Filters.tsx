import { createListCollection, Portal, Select, Input, } from '@chakra-ui/react'
interface FilterProps {
    filter: {
        search: string;
        sortItem: string;
        sortOrder: string;
    };
    setFilter: (filter: {
        search: string;
        sortItem: string;
        sortOrder: string;
    }) => void;
}

export default function Filters({ filter, setFilter }: FilterProps) {
    return (
        <div>
            <Input
                placeholder='Поиск'
                onChange={(e) => setFilter({ ...filter, search: e.target.value })}
            />

            <Select.Root collection={sortItems} size="sm" width="320px" onChange={(e) => {
                const val = (e.target as HTMLSelectElement).value;
                setFilter({ ...filter, sortOrder: val });
            }}>
                <Select.HiddenSelect />
                {/* <Select.Label>Сортировка</Select.Label> */}
                <Select.Control>
                    <Select.Trigger>
                        <Select.ValueText placeholder="Сортировка" />
                    </Select.Trigger>
                    <Select.IndicatorGroup>
                        <Select.Indicator />
                    </Select.IndicatorGroup>
                </Select.Control>
                <Portal>
                    <Select.Positioner>
                        <Select.Content>
                            {sortItems.items.map((sortItems) => (
                                <Select.Item item={sortItems} key={sortItems.value}>
                                    {sortItems.label}
                                    <Select.ItemIndicator />
                                </Select.Item>
                            ))}
                        </Select.Content>
                    </Select.Positioner>
                </Portal>
            </Select.Root>
        </div>
    )
}

const sortItems = createListCollection({
    items: [
        { label: 'Сначала новые', value: 'desc' },
        { label: 'Сначала старые', value: 'asc' },
    ],
})
