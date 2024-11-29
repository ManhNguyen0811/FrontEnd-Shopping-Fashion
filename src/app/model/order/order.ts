export interface Order {
  id: number;
  shippingAddress: string;
  phoneNumber: string;
  totalMoney: number;
  status: string;
  shippingMethod: string;
  paymentMethod: string;
  orderDetails: any[];
}
