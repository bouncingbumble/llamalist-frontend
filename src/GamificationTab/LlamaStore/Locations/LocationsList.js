import Zen from '../../../animations/fields/LlamaLocations/Zen'
import Space from '../../../animations/fields/LlamaLocations/Space'
import Nature from '../../../animations/fields/LlamaLocations/Nature'

export const getLocations = (ownedLocations) => {
    const locationNames = ownedLocations?.map((location) => location.name)

    return [
        {
            price: 0,
            name: 'Winter',
            unlocked: true,
            component: Nature,
        },
        {
            price: 0,
            name: 'Spring',
            unlocked: true,
            component: Nature,
        },
        {
            price: 0,
            name: 'Summer',
            unlocked: true,
            component: Nature,
        },
        {
            price: 0,
            name: 'Autumn',
            unlocked: true,
            component: Nature,
        },
        {
            price: 0,
            name: 'All Seasons',
            unlocked: true,
            component: Nature,
        },
        {
            price: 0,
            name: 'Zen Mode',
            unlocked: true,
            component: Zen,
        },
        {
            price: 100,
            name: 'Space',
            component: Space,
            unlocked:
                ownedLocations &&
                ownedLocations[locationNames?.indexOf('Space')],
        },
    ]
}
