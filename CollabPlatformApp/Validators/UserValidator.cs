using CollabPlatformApp.Dtos;
using FluentValidation;

namespace CollabPlatformApp.Validators
{
    public class UserValidator : AbstractValidator<UserDto>
    {
        public UserValidator()
        {
            RuleFor(x => x.Username).NotEmpty().WithMessage(Constants.EmptyUsernameMessage)
                .MinimumLength(Constants.MinUsernameLength).WithMessage(Constants.UsernameInvalidLengthMessage)
                .MaximumLength(Constants.MaxUsernameLength).WithMessage(Constants.UsernameInvalidLengthMessage);
            RuleFor(x => x.Email).NotEmpty().WithMessage(Constants.EmptyEmailMessage);
            RuleFor(x => x.Password).NotEmpty().WithMessage(Constants.EmptyPasswordMessage)
                .MinimumLength(Constants.MinPasswordLength).WithMessage(Constants.PasswordInvalidLengthMessage)
                .MaximumLength(Constants.MaxPasswordLength).WithMessage(Constants.PasswordInvalidLengthMessage);
        }
    }
}