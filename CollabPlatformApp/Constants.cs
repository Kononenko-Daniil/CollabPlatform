namespace CollabPlatformApp
{
    public static class Constants
    {
        //User validation messages
        public const string EmptyUsernameMessage = "Enter username";
        public const string UsernameInvalidLengthMessage = "Username must contain from 4 to 20 symbols";

        public const string EmptyEmailMessage = "Enter your email address";
        public const string DoubleEmailMessage = "This email is already used";

        public const string EmptyPasswordMessage = "Enter password";
        public const string PasswordInvalidLengthMessage = "Password must contain from 5 to 20 symbols";

        public const string AccountNotExistErrorMessage = "There is no such account";

        public const int MinUsernameLength = 4;
        public const int MaxUsernameLength = 20;
        public const int MinPasswordLength = 5;
        public const int MaxPasswordLength = 20;

        //Project validation messages
        public const string EmptyProjectName = "Enter project title";
        public const string ProjectNameInvalidLengthMessage = "Project title must contain from 2 to 23 symbols";

        public const int MinProjectNameLength = 2;
        public const int MaxProjectNameLength = 23;

        //Task validation messages
        public const string EmptyTaskText = "Enter text";

        //Link validation messages
        public const string EmptyLinkName = "Enter link name";
        public const string EmptyLinkUrl = "Enter link url";
        public const string LinkNameInvalidLengthMessage = "Link name must contain from 1 to 20 symbols";

        public const int MaxLinkNameLength = 20;

        //Contributor validation messages
        public const string ContributorIsExisted = "Contributor is already existed";
    }
}
