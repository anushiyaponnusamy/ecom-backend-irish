
const cartViewModel = {}

cartViewModel.createViewModel = (req) => {
    const { body, decoded } = req;
    const viewModel = {}

    viewModel.userId = decoded._id.toString();
    viewModel.productId = body.productId;
    viewModel.productName = body.productName;
    viewModel.price = body.price;
    viewModel.description = body.description;
    viewModel.photo = body.photo;
    viewModel.transactionDetails = body.transactionDetails;
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
        viewModel.shipped = body.shipped
    return viewModel
}
module.exports = cartViewModel;