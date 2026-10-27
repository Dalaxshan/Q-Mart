"use client";

import Link from "next/link";
import { customerApi } from "@/app/api/customers/routes";
import { useEffect, useState } from "react";
import { orderApi } from "@/app/api/orders/client";
import { Customer } from "@/type";
import { formatPrice } from "@/app/lib/price-format";

// Change this to the key you used when saving the user in localStorage
const STORAGE_KEY = "customer";

const emptyForm = {
  fullName: "",
  email: "",
  phoneNo: "",
  country: "",
  province: "",
  city: "",
  streetAddress: "",
  postalcode: "",
};

const AccountTabs = () => {
  const [activeTab, setActiveTab] = useState("order");
  const [user, setUser] = useState<Customer | null>(null);
  const [orders, setOrders] = useState<any[]>([]);
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [message, setMessage] = useState("");

  console.log("Orders:", orders);

  // Load the logged-in user from localStorage
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return;

      const parsed = JSON.parse(raw);
      const data = parsed.user || parsed;
      setUser(data);
      setForm((prev) => ({
        ...prev,
        fullName: data.fullName || "",
        email: data.email || "",
        phoneNo: data.phoneNo || "",
        country: data.country || "",
        province: data.province || "",
        city: data.city || "",
        postalcode: data.postalcode || "",
        streetAddress: data.streetAddress || "",
      }));
    } catch (err) {
      console.error("Could not read user from localStorage", err);
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setMessage("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");
    try {
      const {
        fullName,
        phoneNo,
        country,
        province,
        city,
        streetAddress,
        postalcode,
      } = form;

      const updated = await customerApi.updateProfile(user!._id, {
        fullName,
        phoneNo,
        country,
        province,
        city,
        streetAddress,
        postalcode,
      });
      const updatedUser = { ...user, ...updated };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedUser));
      setUser(updatedUser);
      setMessage("Account details updated successfully.");
    } catch (err: any) {
      setMessage(err.response?.data?.message || "Update failed.");
    }
  };

  //getAll orders for the logged-in user
  useEffect(() => {
    if (!user) return;

    const fetchOrders = async () => {
      try {
        const orders = await orderApi.getAllOrders({ user: user._id });
        setOrders(orders);
      } catch (err) {
        console.error("Could not fetch orders", err);
      }
    };

    fetchOrders();
  }, [user]);

  const handleLogout = () => {
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem("authToken");
  };

  return (
    <div className="account-tab-area-start rts-section-gap">
      <div className="container-2">
        <div className="flex flex-wrap -mx-3">
          <div className="w-full max-w-full shrink-0 px-[0.75rem] lg:w-1/4">
            <div
              className="nav accout-dashborard-nav flex-col! nav-pills mr-4!"
              role="tablist"
            >
              <button
                className={`nav-link ${activeTab === "order" ? "active" : ""}`}
                onClick={() => setActiveTab("order")}
              >
                <i className="fa-regular fa-bag-shopping"></i> Order
              </button>
              <button
                className={`nav-link ${activeTab === "account" ? "active" : ""}`}
                onClick={() => setActiveTab("account")}
              >
                <i className="fa-regular fa-user"></i> Account Details
              </button>
              <Link href="/login" className="nav-link" onClick={handleLogout}>
                <i className="fa-light fa-right-from-bracket"></i> Log Out
              </Link>
            </div>
          </div>

          <div className="w-full max-w-full shrink-0 px-[0.75rem] lg:w-3/4 pl--50 pl_md--10 pl_sm--10 pt_md--30 pt_sm--30">
            <div className="tab-content">
              {activeTab === "order" && (
                <div className="order-table-account">
                  <div className="h2 title">Your Orders</div>
                  <div className="table-responsive">
                    <table className="table">
                      <thead>
                        <tr>
                          <th>Order Number</th>
                          <th>Order Date</th>
                          <th>Sub Total</th>
                          <th>Delivery fees</th>
                          <th>Total</th>
                          <th>Order Status</th>
                          <th></th>
                        </tr>
                      </thead>
                      <tbody>
                        {orders.map((order) => (
                          <>
                            <tr key={order._id}>
                              <td>{order.orderNumber}</td>
                              <td>
                                {new Date(order.createdAt).toLocaleDateString(
                                  "en-GB",
                                  {
                                    day: "2-digit",
                                    month: "short",
                                    year: "numeric",
                                  },
                                )}
                              </td>
                              <td>{formatPrice(order.subtotal)}</td>
                              <td>{formatPrice(order.deliveryFee)}</td>
                              <td>{formatPrice(order.total)}</td>
                              <td>{order.orderStatus?.toUpperCase()}</td>
                              <td>
                                <button
                                  className="rts-btn btn-primary"
                                  style={{
                                    padding: "4px 12px",
                                    fontSize: "12px",
                                  }}
                                  onClick={() =>
                                    setExpandedOrder(
                                      expandedOrder === order._id
                                        ? null
                                        : order._id,
                                    )
                                  }
                                >
                                  {expandedOrder === order._id
                                    ? "Hide"
                                    : "View Items"}
                                </button>
                              </td>
                            </tr>
                            {expandedOrder === order._id && (
                              <tr key={`${order._id}-items`}>
                                <td
                                  colSpan={7}
                                  style={{
                                    background: "#f9f9f9",
                                    padding: "12px 20px",
                                  }}
                                >
                                  <table
                                    className="table"
                                    style={{ marginBottom: 0 }}
                                  >
                                    <thead>
                                      <tr>
                                        <th>Image</th>
                                        <th>Product</th>
                                        <th>SKU</th>
                                        <th>Qty</th>
                                        <th>Unit Price</th>
                                        <th>Line Total</th>
                                      </tr>
                                    </thead>
                                    <tbody>
                                      {order.items.map((item: any) => (
                                        <tr key={item.product}>
                                          <td>
                                            <img
                                              src={item.image}
                                              alt={item.name}
                                              style={{
                                                width: 48,
                                                height: 48,
                                                objectFit: "cover",
                                              }}
                                            />
                                          </td>
                                          <td>{item.name}</td>
                                          <td>{item.sku}</td>
                                          <td>{item.quantity}</td>
                                          <td>{formatPrice(item.price)}</td>
                                          <td>
                                            {formatPrice(
                                              item.price * item.quantity,
                                            )}
                                          </td>
                                        </tr>
                                      ))}
                                    </tbody>
                                  </table>
                                </td>
                              </tr>
                            )}
                          </>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {activeTab === "account" && (
                <form className="account-details-area" onSubmit={handleSubmit}>
                  <h2 className="title">Account Details</h2>

                  <div className="input-half-area">
                    <div className="single-input">
                      <label htmlFor="fullName">Full Name *</label>
                      <input
                        type="text"
                        id="fullName"
                        name="fullName"
                        value={form.fullName}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="single-input">
                      <label htmlFor="email">Email Address *</label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        disabled
                      />
                    </div>
                  </div>

                  <div className="input-half-area">
                    <div className="single-input">
                      <label htmlFor="phoneNo">Phone No *</label>
                      <input
                        type="text"
                        id="phoneNo"
                        name="phoneNo"
                        value={form.phoneNo}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="single-input">
                      <label htmlFor="country">Country *</label>
                      <input
                        type="text"
                        id="country"
                        name="country"
                        value={form.country}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                  <div className="input-half-area">
                    <div className="single-input">
                      <label htmlFor="streetAddress">Street Address</label>
                      <input
                        type="text"
                        id="streetAddress"
                        name="streetAddress"
                        value={form.streetAddress}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="single-input">
                      <label htmlFor="postalcode">Postal Code</label>
                      <input
                        type="text"
                        id="postalcode"
                        name="postalcode"
                        value={form.postalcode}
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  <div className="input-half-area">
                    <div className="single-input">
                      <label htmlFor="province">Province</label>
                      <input
                        type="text"
                        id="province"
                        name="province"
                        value={form.province}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="single-input">
                      <label htmlFor="city">City</label>
                      <input
                        type="text"
                        id="city"
                        name="city"
                        value={form.city}
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  {message && <p className="mt--10">{message}</p>}

                  <button type="submit" className="rts-btn btn-primary">
                    Save Change
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountTabs;
