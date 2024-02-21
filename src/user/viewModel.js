const userViewModel = {}

userViewModel.signUpViewModel = (req, hashedPassword) => {
    const { body } = req;
    const viewModel = {}
    viewModel.userName = body.userName;
    viewModel.email = body.email;
    viewModel.password = hashedPassword;
    viewModel.mobile = body.mobile;
    viewModel.question = body.question;
    return viewModel
}

userViewModel.updateUserDetails = (req) => {
    const { body } = req;

    const viewModel = {}
    if (body.userName)
        viewModel.userName = body.userName;
    if (body.profilePhoto)
        viewModel.profilePhoto = body.profilePhoto;
    if (body.mobile)
        viewModel.mobile = body.mobile;
    if (body.address)
        viewModel.address = body.address
    return { _id: req.decoded._id, ...viewModel }
}

userViewModel.updateViewModel = (req) => {
    const { body } = req;
    const viewModel = {}
    if (body.userName) {
        viewModel.userName = body.userName;
    }
    if (body.email) {
        viewModel.email = body.email;
    }
    if (body.password) {
        viewModel.password = body.password;
    }
    return viewModel
}
module.exports = userViewModel;