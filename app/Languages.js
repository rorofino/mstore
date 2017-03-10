/**
 * Created by Luan on 10/26/2016.
 */
import LocalizedStrings from 'react-native-localization'

/* API
 setLanguage(languageCode) - to force manually a particular language
 getLanguage() - to get the current displayed language
 getInterfaceLanguage() - to get the current device interface language
 formatString() - to format the passed string replacing its placeholders with the other arguments strings
 */

const Languages = new LocalizedStrings({
    English: {
        //Exit Confirm Dialog
        Exit: 'Exit',
        ExitConfirm: 'Are you sure you want to exit this app',
        YES: 'YES',
        OK: 'OK',
        CANCEL: 'CANCEL',
        Confirm: 'Confirm',

        //Scene's Titles
        Home: 'Home',
        Intro: 'Intro',
        Product: 'Product',
        Cart: 'Cart',
        WishList: 'WishList',

        //Home
        products: 'products',

        //TopBar
        ShowFilter: 'Sub Categories',
        HideFilter: 'Hide',
        Sort: 'Sort',

        //Category
        ThereIsNoMore: 'There is no more product to show',

        //Product
        AddtoCart: 'Add to Cart',
        AddtoWishlist: 'Add to Wishlist',
        ProductVariations: 'Variations',
        NoVariation: 'This product don\'t have any variation',
        AdditionalInformation: 'Description',
        NoProductDescription: 'No Product Description',
        ProductReviews: 'Reviews',
        NoReview: 'This product don\'t have any reviews ...yet',
        BUYNOW: 'BUY NOW',
        ProductLimitWaring: 'You can\'t add more than 5 product',

        //Cart
        NoCartItem: 'There is no product in cart',
        Total: 'Total',
        EmptyCheckout: 'Sorry, you can\'t check out an empty cart',
        RemoveCartItemConfirm: 'Remove this product from cart?',

        //Wishlist
        NoWishListItem: 'There is no item in wishlist',
        MoveAllToCart: 'Add all to cart',
        EmptyWishList: 'Empty wishlist',
        EmptyAddToCart: 'Sorry, the wishlist is empty',
        RemoveWishListItemConfirm: 'Remove this product from wishlist?',

        //Sidemenu
        SignIn: 'Log In',
        SignOut: 'Log Out',
        GuestAccount: 'Guest Account',
        CantReactEmailError: 'We can\'t reach your email address, please try other login method',
        NoEmailError: 'Your account don\'t have valid email address',
        EmailIsNotVerifiedError: 'Your email address is not verified, we can\' trust you',

        //Checkout
        Checkout: 'Checkout',
        ProceedPayment: 'Proceed Payment',
        Purchase: 'Purchase',
        CashOnDelivery: 'Cash on Delivery',
        CreditCard: 'Credit Card',
        PaymentMethod: 'Payment Method - Not select',
        PaymentMethodError: 'Please select your payment method',
        PayWithCoD: 'Your purchase will be pay when goods were delivered',
        PayWithPayPal: 'Your purchase will be pay with PayPal',
        PayWithStripe: 'Your purchase will be pay with Stripe',
        ApplyCoupon: 'Apply Coupon',
        CouponPlaceholder: 'COUPON CODE',
        APPLY: 'APPLY',
        CardNamePlaceholder: 'Name written on card',
        BackToHome: 'Back to Home',
        OrderCompleted: 'Your order was completed',
        OrderCanceled: 'Your order was canceled',
        OrderFailed: 'Something went wrong...',
        OrderCompletedDesc: 'Your order id is ',
        OrderCanceledDesc: 'You have canceled the order. The transaction has not been completed',
        OrderFailedDesc: 'We have encountered an error while processing your order. The transaction has not been completed. Please try again',
        OrderTip: 'Tip: You could track your order status in "My Orders" section from side menu',
        Delivery: 'Delivery',
        Payment: 'Payment',
        Complete: 'Complete',

        //myorder
        MyOrder: 'My Order',
        NoOrder: 'You don\'t have any orders',
        OrderDate: 'Order Date: ',
        OrderStatus: 'Status: ',
        OrderPayment: 'Payment method: ',
        OrderTotal: 'Total: ',
        OrderDetails: 'Order details...',

        News: 'News',
        PostDetails: 'Post Details',
        FeatureArticles: 'Feature articles',
        MostViews: 'Most views',
        EditorChoice: 'Editor choice',

        //settings
        Settings: 'Settings',
        BASICSETTINGS: 'BASIC SETTINGS',
        Language: 'Language',
        INFO: 'INFO',
        About: 'About us',

        //language
        AvailableLanguages: 'Available Languages',
        SwitchLanguage: 'Switch Language',
        SwitchLanguageConfirm: 'Switch language require an app reload, continue?',

        //about us
        AppName: 'MSTORE',
        AppDescription: 'React Native template for mCommerce',
        AppContact: ' Contact us at: mstore.io',
        AppEmail: ' Email: support@mstore.io',
        AppCopyRights: '© MSTORE 2016',

        //form
        NotSelected: 'Not selected',
        EmptyError: 'This field is empty',
        DeliveryInfo: 'Delivery Info',
        FirstName: 'First Name',
        LastName: 'Last Name',
        Address: 'Address',
        State: 'State/City',
        NotSelectedError: 'Please choose one',
        Postcode: 'Postcode',
        Country: 'Country',
        Email: 'Email',
        Phone: 'Phone Number',
        Note: 'Note',

        //search
        Search: 'Search',
        SearchPlaceHolder: 'Search product by name',
        NoResultError: 'Your search keyword did not match any products.',
        Details: 'Details',

        //filter panel
        Categories: 'Categories',
    },
    Vietnamese: {
        //Exit Confirm Dialog
        Exit: 'Thoát',
        ExitConfirm: 'Thoát ứng dụng?',
        YES: 'Có',
        OK: 'Đồng Ý',
        CANCEL: 'Hủy',
        Confirm: 'Xác nhận',

        //Scene's Titles
        Home: 'Trang chủ',
        Intro: 'Intro',
        Product: 'Sản phẩm',
        Cart: 'Giỏ hàng',
        WishList: 'Yêu thích',

        //Home
        products: 'sản phẩm',

        //TopBar
        ShowFilter: 'Danh mục con',
        HideFilter: 'Ẩn đi',
        Sort: 'Sắp xếp',

        //Category
        ThereIsNoMore: 'Không còn sản phẩm để hiển thị',

        //Product
        AddtoCart: 'Thêm vào giỏ',
        AddtoWishlist: 'Thêm vào yêu thích',
        ProductVariations: 'Thuộc tính',
        NoVariation: 'Sản phẩm này không có thuộc tính',
        AdditionalInformation: 'Mô tả',
        NoProductDescription: 'Sản phẩm này không có mô tả',
        ProductReviews: 'Đánh giá',
        NoReview: 'Sản phẩm này chưa có đánh giá',
        BUYNOW: 'MUA NGAY',
        ProductLimitWaring: 'Bạn không thể mua hơn 5 món',

        //Cart
        NoCartItem: 'Chưa có sản phẩm nào trong giỏ',
        Total: 'Tổng cộng',
        Checkout: 'Thanh toán',
        EmptyCheckout: 'Bạn không thể thanh toán với giỏ hàng trống',
        RemoveCartItemConfirm: 'Xóa sản phẩm này ra khỏi giỏ hàng?',

        //Wishlist
        NoWishListItem: 'Chưa có sản phẩm',
        MoveAllToCart: 'Thêm tất cả vào giỏ',
        EmptyWishList: 'Xóa tất cả',
        EmptyAddToCart: 'Không có sản phẩm để thêm',
        RemoveWishListItemConfirm: 'Xóa sản phẩm ra khỏi yêu thích?',

        //Sidemenu
        SignIn: 'Đăng nhập',
        SignOut: 'Đăng xuất',
        GuestAccount: 'Tài khoản khách',
        CantReactEmailError: 'Chúng tôi không thể xin quyền truy cập email của bạn.',
        NoEmailError: 'Tài khoản của bạn không có email',
        EmailIsNotVerifiedError: 'Email của bạn chưa được xác nhận',

        //Checkout
        ProceedPayment: 'Thanh toán',
        Purchase: 'Giao dịch',
        CashOnDelivery: 'Lấy tiền khi giao',
        CreditCard: 'Thẻ tín dụng',
        PaymentMethod: 'Cách thanh toán - Chưa chọn',
        PaymentMethodError: 'Vui lòng chọn cách thanh toán',
        PayWithCoD: 'Giao dịch sẽ được thanh toán khi hàng được giao',
        PayWithPayPal: 'Giao dịch sẽ được trả bằng PayPal',
        PayWithStripe: 'Giao dịch sẽ được trả bằng Stripe',
        ApplyCoupon: 'Áp dụng phiếu giảm giá',
        CouponPlaceholder: 'MÃ PHIẾU GIẢM GIÁ',
        APPLY: 'ÁP DỤNG',
        CardNamePlaceholder: 'Tên chủ thẻ',
        BackToHome: 'Trở về trang chủ',
        OrderCompleted: 'Đặt đơn hàng thành công',
        OrderCanceled: 'Đơn hàng bị hủy',
        OrderFailed: 'Có sự cố xảy ra...',
        OrderCompletedDesc: 'Mã đơn hàng của bạn là  ',
        OrderCanceledDesc: 'Bạn đã hủy việc thanh toán đơn hàng. Giao dịch không thành công',
        OrderFailedDesc: 'Có sự cố xảy ra khi xử lý đơn hàng của bạn. Giao dịch không thành công, vui lòng thử lại sau',
        OrderTip: 'Mẹo: Bạn có thể theo dõi tình trạng đơn hàng trong mục "Đơn hàng của tôi" ở side menu',
        Delivery: 'Thông Tin',
        Payment: 'Thanh Toán',
        Complete: 'Hoàn Tất',

        //myorder
        MyOrder: 'Đơn hàng của tôi',
        NoOrder: 'Bạn chưa có đơn hàng nào',
        OrderDate: 'Ngày tạo: ',
        OrderStatus: 'Trạng thái: ',
        OrderPayment: 'Cách thanh toán: ',
        OrderTotal: 'Tổng cộng: ',
        OrderDetails: 'Chi tiết đơn hàng...',

        News: 'Tin tức',
        PostDetails: 'Chi tiết bài viết',
        FeatureArticles: 'Bài viết nổi bật',
        MostViews: 'Được xem nhiều nhất',
        EditorChoice: 'Yêu thích',

        //settings
        Settings: 'Tùy chỉnh',
        BASICSETTINGS: 'TÙY CHỈNH CƠ BẢN',
        Language: 'Ngôn ngữ',
        INFO: 'THÔNG TIN',
        About: 'Về chúng tôi',

        //language
        AvailableLanguages: 'Thay Đổi Ngôn Ngữ',
        SwitchLanguage: 'Đổi ngôn ngữ',
        SwitchLanguageConfirm: 'Để thay đổi ngôn ngữ, chương trình cần phải khỏi động lại, tiếp tục?',

        //about us
        AppName: 'MSTORE',
        AppDescription: 'Bản mẫu React Native cho thương mại di động',
        AppContact: ' Liên lạc tại: mstore.io',
        AppEmail: ' Email: support@mstore.io',
        AppCopyRights: '© MSTORE 2016',

        //form
        NotSelected: 'Chưa chọn',
        EmptyError: 'Bạn chưa điền mục này',
        DeliveryInfo: 'Thông Tin Giao Hàng',
        FirstName: 'Họ',
        LastName: 'Tên',
        Address: 'Địa chỉ',
        State: 'Tỉnh/Thành Phố',
        NotSelectedError: 'Vui lòng chọn',
        Postcode: 'Mã bưu thiếp',
        Country: 'Nước',
        Email: 'Email',
        Phone: 'Số điện thoại',
        Note: 'Ghi chú',

        //search
        Search: 'Tìm kiếm',
        SearchPlaceHolder: 'Tìm kiếm sản phẩm theo tên',
        NoResultError: 'Không có sản phẩm nào trùng với từ khóa tìm kiếm.',
        Details: 'Chi tiết',

        //filter panel
        Categories: 'Chuyên Mục',

    },
    ///Put other languages here
})

export default Languages