using CollabPlatformApp.Dtos;
using FluentValidation;

namespace CollabPlatformApp.Validators
{
    public class LinkValidator : AbstractValidator<LinkDto>
    {
        public LinkValidator()
        {
            RuleFor(x => x.Name).NotEmpty().WithMessage(Constants.EmptyLinkName)
                .MaximumLength(Constants.MaxLinkNameLength).WithMessage(Constants.LinkNameInvalidLengthMessage);
            RuleFor(x => x.Url).NotEmpty().WithMessage(Constants.EmptyLinkUrl);
        }
    }
}
