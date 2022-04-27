using CollabPlatformApp.Dtos;
using FluentValidation;

namespace CollabPlatformApp.Validators
{
    public class TaskValidator : AbstractValidator<TaskDto>
    {
        public TaskValidator()
        {
            RuleFor(x => x.Text).NotEmpty().WithMessage(Constants.EmptyTaskText);
        }
    }
}
