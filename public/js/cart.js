console.log("Đoạn code trong trang giỏ hàng");

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
  });

// END lấy ra data và in ra giao diện
