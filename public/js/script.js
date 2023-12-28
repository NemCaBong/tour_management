// Slider Tour Detail
var imagesThumb = new Swiper(".imagesThumb", {
  spaceBetween: 10,
  slidesPerView: 4,
  freeMode: true,
});
var imagesMain = new Swiper(".imagesMain", {
  spaceBetween: 10,
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  thumbs: {
    swiper: imagesThumb,
  },
});
// End Slider Tour Detail

// Carts

// Kiểm tra trong localStorage có cart hay chưa
const cart = localStorage.getItem("cart");
// Chưa có thì tạo 1 cái cart mới
if (!cart) {
  // đổi thành JSON để có thể up lên
  localStorage.setItem("cart", JSON.stringify([]));
}

// Alert Cart Success
const alertAddToCartSuccess = () => {
  const alertToast = document.querySelector("[alert-add-cart-success]");
  // hiển thị
  alertToast.classList.remove("alert-hidden");

  // đóng vào
  setTimeout(() => {
    alertToast.classList.add("alert-hidden");
  }, 3000);

  const closeSpan = alertToast.querySelector("[close-alert]");
  closeSpan.addEventListener("click", () => {
    alertToast.classList.add("alert-hidden");
  });
};
// END Alert Add Cart success

// Thêm tour vào cart
const formAddToCart = document.querySelector("[form-add-to-cart]");
if (formAddToCart) {
  formAddToCart.addEventListener("submit", (e) => {
    // tránh load lại trang
    e.preventDefault();

    const quantity = parseInt(e.target.elements.quantity.value);
    const tourId = parseInt(formAddToCart.getAttribute("tour-id"));
    if (tourId && quantity > 0) {
      const cart = JSON.parse(localStorage.getItem("cart"));

      const indexOfTourId = cart.findIndex((item) => item.tourId == tourId);

      if (indexOfTourId === -1) {
        cart.push({
          tourId: tourId,
          quantity: quantity,
        });
      } else {
        cart[indexOfTourId].quantity += quantity;
      }

      localStorage.setItem("cart", JSON.stringify(cart));
      // Khi thêm vào giỏ thành công thì in thông báo
      alertAddToCartSuccess();
      // và thêm vào giỏ hàng
      showMiniCart();
    }
  });
}
// END Carts

// Mini-cart update quantity
const showMiniCart = () => {
  const cart = JSON.parse(localStorage.getItem("cart"));
  const totalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);

  const miniCart = document.querySelector("[mini-cart]");
  miniCart.innerHTML = totalQuantity;
};

// gọi khi mới load trang
showMiniCart();

// END minicart
