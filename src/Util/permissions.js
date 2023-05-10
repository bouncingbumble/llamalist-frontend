export const isPaidUser = (user) => {
    if (
        process.env.REACT_APP_PERSONAL_SUBSCRIPTION_IDs.split(' ').includes(
            user.stripeProductId
        ) ||
        process.env.REACT_APP_PROFESSIONAL_SUBSCRIPTION_IDs.split(' ').includes(
            user.stripeProductId
        )
    ) {
        return true
    } else {
        return false
    }
}
