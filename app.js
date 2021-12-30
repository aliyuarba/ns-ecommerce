$(".btnmenu, .backlight-menu").click(function () {
  $(".btnmenu, .menu, .backlight-menu").toggleClass("active");
});

$(".cart-icon").click(function () {
  $(".cart, .cart-countainer").toggleClass("active");
});

$(".hero, .overlay").click(function () {
  if ($(".cart").hasClass("active")) {
    $(".cart, .cart-countainer").toggleClass("active");
  }
});

function pushToCart(par) {
  let usd = Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  $(".cart-list").prepend(
    `
    <li class="list">
      <img src="/images/image-product-1-thumbnail.jpg" alt="" />
      
      <div class="description">
         <h5>Fall Limited Edition Sneakers</h5>
         <h5>
           <span class="price">$125.00 x</span>
           <span class="multiply-by">${par}</span>
           <b class="total-price">${usd.format(par * 125)}</b>
         </h5>
      </div>
      
      <div class="delete-icon">
        <img src="/images/icon-delete.svg" alt="">
      </div>
    </li>
    `
  );
  countCart();
}

function countCart() {
  $(".cart-counter").html($(".list").length);
  if ($(".list").length == 0) {
    $(".cart-counter").css("display", "none");
    $(".cart-list, .checkout-button, .empty-cart").addClass("active");
  } else {
    $(".cart-counter").css("display", "flex");
    $(".cart-list, .checkout-button, .empty-cart").removeClass("active");
  }
}
countCart();

let userCount = 0;
function printUserCount(par) {
  $(".user-count strong").html(par);
  if (par == 0) {
    $(".substract, .add-to-cart").prop("disabled", true);
  } else {
    $(".substract, .add-to-cart").prop("disabled", false);
  }
}
printUserCount(0);

$(".add").click(function () {
  userCount++;
  printUserCount(userCount);
});
$(".substract").click(function () {
  userCount--;
  printUserCount(userCount);
});

$(".add-to-cart").click(function () {
  pushToCart(userCount);
  printUserCount(0);
  return (userCount = 0);
});

$(".cart-list").on("click", ".delete-icon", function () {
  $(this).parent().remove();
  countCart();
});


$(".main-image, .close-button").click(function () {
  $(".overlay").toggleClass("active");
});

function mainImage(index) {
  $(".main-image").attr("src", `/images/image-product-${index + 1}.jpg`);
  $(".thumbnail").eq(index).addClass("active");
  $(".thumbnail").eq(index).siblings().removeClass("active");
}

function overlay(index) {
  $(".overlay-main-image").attr(
    "src",
    `/images/image-product-${index + 1}.jpg`
  );
  $(".overlay-thumbnail").eq(index).addClass("active");
  $(".overlay-thumbnail").eq(index).siblings().removeClass("active");
}

let activeIndex = 0;
$(".thumbnail").click(function () {
  let index = $(this).index(".thumbnail");
  mainImage(index);
  overlay(index);
  return (activeIndex = index);
});

$(".overlay-thumbnail").click(function () {
  let index = $(this).index(".overlay-thumbnail");
  overlay(index);
  return (activeIndex = index);
});

$(".next").click(function () {
  if (activeIndex < $(".overlay-thumbnail").length - 1) {
    activeIndex++;
  } else {
    activeIndex = 0;
  }
  overlay(activeIndex);
});

$(".prev").click(function () {
  if (activeIndex > 0) {
    activeIndex--;
  } else {
    activeIndex = $(".overlay-thumbnail").length - 1;
  }
  overlay(activeIndex);
});