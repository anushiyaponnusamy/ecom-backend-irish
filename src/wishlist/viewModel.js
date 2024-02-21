const whishlistViewModel = {}

whishlistViewModel.createViwModel = (req) => {
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
module.exports = whishlistViewModel;