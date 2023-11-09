namespace ReactLeaning.Api.Constants
{
    public static class ActivityLogEntityConstants
    {
        public const string Customer = "Customer";
        public const string Merchant = "Merchant";
        public const string Branch = "Branch";
        public const string MerchantPost = "MerchantPost";
        public const string TopUp = "TopUp";
        public const string Payment = "Payment";
        public const string MerchantUser = "MerchantUser";
        public const string UserWallet = "UserWallet";
        public const string Package = "Package";
        public const string Voucher = "Voucher";
        public const string CustomerVoucher = "CustomerVoucher";
        public const string CustomerPackage = "CustomerPackage";
        public const string CustomerPackageItem = "CustomerPackageItem";
        public const string MerchantPassword = "MerchantPassword";
        public const string ManagerPassword = "ManagerPassword";
        public const string File = "File";
    }

    public static class ActivityLogAction
    {
        public const string Create = "Create";
        public const string Update = "Update";
        public const string Delete = "Delete";
        public const string Void = "Void";
        public const string Consume = "Consume";
        public const string Upload = "Upload";
    }

    public static class LanguageConstant
    {
        public const string English = "en-US";
        public const string Chinese = "zh";
        public const string Malay = "ms-MY";
    }

    public static class FcmTopics
    {
        public const string Promotion = "promotion";
    }
}