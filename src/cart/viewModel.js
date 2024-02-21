
const cartViewModel = {}

cartViewModel.createViewModel = (req) => {
    const { body } = req;
    const viewModel = {}
    viewModel.productId = body.productId;
    viewModel.productName = body.productName;
    viewModel.price = body.price;
    viewModel.description = body.description;
    viewModel.photo = body.photo;
    viewModel.userId = body.userId;
    return viewModel
}
cartViewModel.updateViewModel = (req) => {
    const { body } = req;
    const viewModel = {}

    if (body.name) {
        viewModel.name = body.name;

    }
    if (body.price)
        viewModel.price = body.price;
    if (body.description)
        viewModel.description = body.description;
    if (body.quantity)
        viewModel.quantity = body.quantity;
    if (body.photo)
        viewModel.photo = body.photo;
    if (body.categoryId)
        viewModel.categoryId = body.categoryId
    if (body.categoryName)
        viewModel.categoryName = body.categoryName
    if (body.shipping)
        viewModel.shipping = body.shipping
    return viewModel
}
module.exports = cartViewModel;