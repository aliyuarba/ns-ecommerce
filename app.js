$(".btnmenu").click(function () {
  $(".btnmenu").toggleClass("active");
});

$(".cart").click(function () {
  $(".cart-info").toggleClass("active");
});

$("main").click(function () {
  if ($(".cart-info").hasClass("active")) {
    $(".cart-info").removeClass("active");
  }
});

let myArr = [];

function emptyShow(){
  if($('.desc').length === 0) {
    $('.cart-counter, .checkout, .empty').addClass('active');
  } else {
    $('.cart-counter, .checkout, .empty').removeClass('active');
  }
}
function pushToContent(amount) {
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
  $('.cart-counter').html([...myArr].reduce((partial_sum, a) => partial_sum + a, 0));
}

function addToCart(y) {
  pushToContent(y);
}

function as(x) {
  $(".num b").html(x);
  if (x === 0) {
    $(".add-to-cart").prop("disabled", true);
    $('.minus').addClass('disabled');
  } else {
    $(".add-to-cart").prop("disabled", false);
    $('.minus').removeClass('disabled');
  }
  emptyShow();
}

let a = 0;
as(a);
function add() {
  a += 1;
  as(a);
}
function remove() {
  if (a > 0) {
    a -= 1;
    as(a);
  }
}
$(".content").on("click", ".delete", function () {
  let ind = $(this).index('.delete');
  myArr.splice(ind, 1);
  $('.cart-counter').html([...myArr].reduce((partial_sum, a) => partial_sum + a, 0));
  $(this).parent().remove();
  emptyShow();
});

$(".add-to-cart").click(function () {
  if (a === 0) {
    a = 0;
  } else {
    addToCart(a);
    as(0);
    return (a = 0);
  }
});

$(".thumbnails div").click(function () {
  if ($(this).hasClass("active") === false) {
    $(this).toggleClass("active");
    $(this).siblings().removeClass("active");
    let index = $(this).index(".thumbnails div");
    $(".main-image img").eq(index).toggleClass("active");
    $(".main-image img").eq(index).siblings().removeClass("active");
  }
});

