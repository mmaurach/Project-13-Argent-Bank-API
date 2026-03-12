import "./user.scss";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import ApiService from "../../services/apiServices";
import { setUser } from "../../store/userSlice";

import UserHeader from "../../components/userHeader/userHeader";

function User() {
  const dispatch = useDispatch();

  const token =
    useSelector((state) => state.user.token) ||
    localStorage.getItem("token") ||
    sessionStorage.getItem("token");
  const user = useSelector((state) => state.user.user);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      if (!token) {
        console.log("No token found");
        setLoading(false);
        return;
      }

      try {
        const profile = await ApiService.getProfile(token);

        // stockage dans Redux
        dispatch(setUser(profile));
      } catch (error) {
        console.error("Profile error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [token, dispatch]);

  if (loading) {
    return (
      <main className="main bg-dark">
        <h1 style={{ color: "white", textAlign: "center" }}>Loading...</h1>
      </main>
    );
  }

  return (
    <main className="main bg-dark">
      <UserHeader firstName={user?.firstName} lastName={user?.lastName} />

      <h2 className="sr-only">Accounts</h2>

      <section className="account">
        <div className="account-content-wrapper">
          <h3 className="account-title">Argent Bank Checking (x8349)</h3>
          <p className="account-amount">$2,082.79</p>
          <p className="account-amount-description">Available Balance</p>
        </div>
        <div className="account-content-wrapper cta">
          <button className="transaction-button">View transactions</button>
        </div>
      </section>

      <section className="account">
        <div className="account-content-wrapper">
          <h3 className="account-title">Argent Bank Savings (x6712)</h3>
          <p className="account-amount">$10,928.42</p>
          <p className="account-amount-description">Available Balance</p>
        </div>
        <div className="account-content-wrapper cta">
          <button className="transaction-button">View transactions</button>
        </div>
      </section>

      <section className="account">
        <div className="account-content-wrapper">
          <h3 className="account-title">Argent Bank Credit Card (x8349)</h3>
          <p className="account-amount">$184.30</p>
          <p className="account-amount-description">Current Balance</p>
        </div>
        <div className="account-content-wrapper cta">
          <button className="transaction-button">View transactions</button>
        </div>
      </section>
    </main>
  );
}

export default User;
