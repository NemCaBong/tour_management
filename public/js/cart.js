/**
 * Vẽ ra danh sách tour
 */

const drawCartTour = () => {
  // lấy data và in ra giao diện
  // bởi vì trong localStorage chỉ có quantiy và id thôi

  // options cho fetch
  const options = {
    headers: {
      "Content-Type": "application/json",
    },
    // thêm method để gửi localStorage cart về.
    method: "POST",
    // phải để nó ở dạng JSON như thế này mới gửi tư FE qua BE
    body: localStorage.getItem("cart"),
  };

  fetch("http://localhost:3005/cart/list-cart-data", options)
    .then((res) => res.json())
    .then((data) => {
      const htmlArray = data.tours.map((item, index) => {
        return `
      <tr>
        <td>${index + 1}</td>
        <td>
          <img src="${item.image}" alt="${item.info.title}" width="80px" />
        </td>
        <td>
          <a href="/tours/detail/${item.info.slug}">${item.info.title}</a>
        </td>
        <td>${item.price_special.toLocaleString()}đ</td>
        <td>
          <input
            type="number"
            name="quantity"
            value="${item.quantity}"
            min="1"
            item-id="${item.tourId}"
            style="width: 60px;"
          />
        </td>
        <td>${item.total.toLocaleString()}đ</td>
        <td>
          <button class="btn btn-sm btn-danger" btn-delete="${
            item.tourId
          }">Xóa</button>
        </td>
      </tr>
    `;
      });
      const listTour = document.querySelector("[list-tour]");
      // biến mảng thành chuỗi
      listTour.innerHTML = htmlArray.join("");

      // tính tổng đơn hàng
      const totalPrice = data.tours.reduce(
        (total, item) => total + item.total,
        0
      );
      const totalPriceSpan = document.querySelector("[total-price]");
      totalPriceSpan.innerHTML = totalPrice.toLocaleString();

      // In ra giao diện xong thì có thể xóa tour
      deleteItemInCart();
      // Update quantity
      updateQuantityCart();
    });
  // END lấy ra data và in ra giao diện
};

// Xóa tour trong giỏ hàng
const deleteItemInCart = () => {
  const listBtnDelete = document.querySelectorAll("[btn-delete]");
  listBtnDelete.forEach((btn) => {
    btn.addEventListener("click", () => {
      const tourId = btn.getAttribute("btn-delete");
      let cart = JSON.parse(localStorage.getItem("cart"));

      cart = cart.filter((tour) => tour.tourId != tourId);
      localStorage.setItem("cart", JSON.stringify(cart));
      drawCartTour();
    });
  });
};
// END xóa tour trong giỏ hàng

const updateQuantityCart = () => {
  const listQuantityInput = document.querySelectorAll(
    "[list-tour] input[item-id]"
  );
  listQuantityInput.forEach((input) => {
    input.addEventListener("change", () => {
      const tourId = input.getAttribute("item-id");
      const quantity = parseInt(input.value);

      const cart = JSON.parse(localStorage.getItem("cart"));
      const tourNeedUpdated = cart.find((item) => item.tourId == tourId);
      // vì tourNeedUpdated là reference của cart => thay đổi nó
      // chính là thay đổi cart
      tourNeedUpdated.quantity = quantity;

      localStorage.setItem("cart", JSON.stringify(cart));
      // thay đổi xong thì vẽ lại giao diện
      drawCartTour();
    });
  });
};
drawCartTour();
