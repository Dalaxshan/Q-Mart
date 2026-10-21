"use client";

import Link from "next/link";
import { customerApi } from "@/app/api/customers/routes";
import { useEffect, useState } from "react";

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
  const [activeTab, setActiveTab] = useState("account");
  const [user, setUser] = useState<Record<string, any> | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [message, setMessage] = useState("");

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
      const { fullName, phoneNo, country, province, city, streetAddress,postalcode } =
        form;
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

  const handleLogout = () => {
    localStorage.removeItem(STORAGE_KEY);
  };

  return (
    <div className="account-tab-area-start rts-section-gap">
      <div className="container-2">
        <div className="row">
          <div className="col-lg-3">
            <div
              className="nav accout-dashborard-nav flex-column nav-pills me-3"
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

          <div className="col-lg-9 pl--50 pl_md--10 pl_sm--10 pt_md--30 pt_sm--30">
            <div className="tab-content">
              {activeTab === "order" && (
                <div className="order-table-account">
                  <div className="h2 title">Your Orders</div>
                  <div className="table-responsive">
                    <table className="table">
                      <thead>
                        <tr>
                          <th>Order</th>
                          <th>Date</th>
                          <th>Status</th>
                          <th>Total</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {/* Replace with real orders from your API */}
                        <tr>
                          <td>#1357</td>
                          <td>March 05, 2020</td>
                          <td>Processing</td>
                          <td>$125.00 for 2 item</td>
                          <td>
                            <a href="#" className="btn-small d-block">
                              View
                            </a>
                          </td>
                        </tr>
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
