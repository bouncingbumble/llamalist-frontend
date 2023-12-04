import BowTie from './BowTie'
import Sunglasses from './Sunglasses'

export const getAccessories = (ownedItems) => {
    const itemNames = ownedItems.map((item) => item.name)
    if (ownedItems) {
        return [
            {
                price: 5,
                name: 'Sunnies',
                component: Sunglasses,
                unlocked: itemNames.includes('Sunnies'),
                wearing: ownedItems[itemNames.indexOf('Sunnies')]?.wearing,
            },
            {
                price: 10,
                name: 'Bow Tie',
                component: BowTie,
                unlocked: itemNames.includes('Bow Tie'),
                wearing: ownedItems[itemNames.indexOf('Bow Tie')]?.wearing,
            },
        ]
    } else {
        return []
    }
}
