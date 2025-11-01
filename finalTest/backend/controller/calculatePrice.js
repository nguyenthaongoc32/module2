export const calculatePrice = (
  car,
  pickup_date,
  return_date,
  pickup_time,
  return_time,
  paymentOption
) => {
  const start = new Date(`${pickup_date}T${pickup_time}`);
  const end = new Date(`${return_date}T${return_time}`);
  const diffMs = end - start;

  if (diffMs < 24 * 60 * 60 * 1000) {
    throw new Error("Minimum rental period is 1 day!");
  }

  const diffHours = Math.ceil(diffMs / (1000 * 60 * 60));
  const days = Math.floor(diffHours / 24);
  const hours = diffHours % 24;

  // Đơn giá
  const pricePerDay = car.price_per_day.amount;

  // Tính tiền thuê
  const basePrice = days * pricePerDay + (hours * pricePerDay) / 24;

  // VAT 8%
  const vat = Math.round(basePrice * 0.08);

  // Giảm giá nếu trả trước
  let discount = 0;
  let total_price = basePrice + vat;
  if (paymentOption === "traTruoc") {
    discount = Math.round(total_price * 0.05);
    total_price -= discount;
  }

  // Đặt cọc nếu trả sau
  let deposit = 0;
  if (paymentOption === "traSau") {
    deposit = Math.round(total_price * 0.3);
  }

  return {
    days,
    hours,
    pricePerDay,
    basePrice,
    vat,
    discount,
    deposit,
    total_price,
  };
};
