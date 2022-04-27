using CollabPlatformApp.Dtos;
using FluentValidation;

namespace CollabPlatformApp.Validators
{
    public class ProjectValidator : AbstractValidator<ProjectDto>
    {
        public ProjectValidator()
        {
            RuleFor(x => x.Name).NotEmpty().WithMessage(Constants.EmptyProjectName)
                .MinimumLength(Constants.MinProjectNameLength).WithMessage(Constants.ProjectNameInvalidLengthMessage)
                .MaximumLength(Constants.MaxProjectNameLength).WithMessage(Constants.ProjectNameInvalidLengthMessage);
        }
    }
}
