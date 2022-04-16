namespace CollabPlatformApp
{
    public static class Constants
    {
        public const string EmptyUsernameMessage = "Enter username";
        public const string UsernameInvalidLengthMessage = "Username must contain from 4 to 20 symbols";

        public const string EmptyEmailMessage = "Enter your email address";
        public const string DoubleEmailMessage = "This email is already used";

        public const string EmptyPasswordMessage = "Enter password";
        public const string PasswordInvalidLengthMessage = "Password must contain from 5 to 20 symbols";

        public const int MinUsernameLength = 4;
        public const int MaxUsernameLength = 20;
        public const int MinPasswordLength = 5;
        public const int MaxPasswordLength = 20;
    }
}
