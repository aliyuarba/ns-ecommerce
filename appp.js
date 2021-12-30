$(".btnmenu, .backlight-menu").click(function () {
  $(".btnmenu, .menu, .backlight-menu").toggleClass("active");
});

$(".cart-icon").click(function () {
  $(".cart, .cart-countainer").toggleClass("active");
});

$("main").click(function () {
  if ($(".cart-info").hasClass("active")) {
    $(".cart-info").removeClass("active");
  }
});

let myArr = []; //define new arr
/* show empty if no product in cart */
function emptyShow() {
  if ($(".desc").length === 0) {
    $(".cart-counter, .checkout, .empty").addClass("active");
  } else {
    $(".cart-counter, .checkout, .empty").removeClass("active");
  }
}
/* add product to cart */
function addToCart(amount) {
  let usd = Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  $(".content").prepend(`
  <div class="desc">
    <img
      src="/images/image-product-1-thumbnail.jpg"
      alt=""
    />
    <div class="text">
      <p>Fall limited edition</p>
      <p>
        $125.00 x <span class="amount">${amount}</span>
        <b><span class="price">${usd.format(amount * 125)}</span></b>
      </p>
    </div>
    <img src="/images/icon-delete.svg" alt="" class="delete" />
  </div>
  `);

  myArr.unshift(amount);
  $(".cart-counter").html(
    [...myArr].reduce((partial_sum, a) => partial_sum + a, 0)
  );
}

// function to count product added from user
function count(x) {
  $(".num b").html(x);
  if (x === 0) {
    $(".add-to-cart").prop("disabled", true);
    $(".minus").addClass("disabled");
  } else {
    $(".add-to-cart").prop("disabled", false);
    $(".minus").removeClass("disabled");
  }
  emptyShow();
}

let a = 0;
count(a);

//function to add count() by 1, called in html
function add() {
  a += 1;
  count(a);
}
//function to substract count() by 1, called in html
function remove() {
  if (a > 0) {
    a -= 1;
    count(a);
  }
}

// click function with event delegation to delete item from cart
$(".content").on("click", ".delete", function () {
  let ind = $(this).index(".delete");
  myArr.splice(ind, 1);
  $(".cart-counter").html(
    [...myArr].reduce((partial_sum, a) => partial_sum + a, 0)
  );
  $(this).parent().remove();
  emptyShow();
});

// return counter value a to 0 when item succeed added to cart
$(".add-to-cart").click(function () {
  if (a === 0) {
    a = 0;
  } else {
    addToCart(a);
    count(0);
    return (a = 0);
  }
});


/* image slider on main image */
$(".thumbnails div").click(function () {
  if ($(this).hasClass("active") === false) {
    $(this).toggleClass("active");
    $(this).siblings().removeClass("active");
    let index = $(this).index(".thumbnails div");
    $(".main-image img").attr('src',`/images/image-product-${index+1}.jpg`);
  }
});




/* lighbox attraction */
function show(action) {
  $(".lightbox-main-image img").attr('src',`/images/image-product-${action+1}.jpg`);
  $(".thumbnail").eq(action).addClass("active");
  $(".thumbnail").eq(action).siblings().removeClass("active");
}
let act = 0;
let imgLength = $(".thumbnail").length;

$(".icon-next").click(function () {
  if (act < imgLength - 1) {
    act += 1;
  } else {
    act = 0;
  }
  show(act);
});
$(".icon-prev").click(function () {
  if (act > 0) {
    act -= 1;
  } else {
    act = imgLength - 1;
  }
  console.log(act);
  show(act);
});
$(".thumbnail").click(function () {
  act = $(this).index();
  show(act);
});

$(".main-image img, .close").click(function () {
  $(".lightbox").toggleClass("active");
});