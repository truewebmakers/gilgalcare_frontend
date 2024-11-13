import React, { useEffect, useState } from "react";
import Footer from "../home/footer/Footer";
import UserHeader from "./Userheader";
import { useSelector } from "react-redux";
import UseApi from "../../hooks/useApi";
import { apiMethods, apiUrls } from "../../constants/constant";
import { toast } from "react-toastify";
import Loader from "../common/Loader";
import { CapitalizeFirstLetter } from "../../utils/commonFunctions";
import Swal from "sweetalert2";

const GetUserSubscription = () => {
  const [subscriptionData, setSubscriptionData] = useState(null);
  const { user } = useSelector((state) => state.auth);
  const [isLoading, setIsLoading] = useState(false);

  // Fetch Subscription Details
  const getSubscriptionDetails = async () => {
    try {
      const headers = {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${user?.token}`,
      };

      const bodyData = {
        stripe_customer_id: user?.userInfo?.stripe_customer_id,
      };

      const response = await UseApi(
        apiUrls.getSubscriptionDetail,
        apiMethods.POST,
        bodyData,
        headers
      );

      if (response?.status === 200 || response?.status === 201) {
        setSubscriptionData(response?.data);
        toast.success(response?.data?.message);
      } else {
        toast.error(response?.data?.message);
      }
    } catch (err) {
      toast.error(
        err?.message || "An error occurred while fetching subscription details."
      );
    }
  };

  // Unsubscribe
  const handleUnsubscribe = async () => {
    setIsLoading(true);

    try {
      const headers = {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${user?.token}`,
      };

      const bodyData = {
        stripe_customer_id: user?.userInfo?.stripe_customer_id,
        subscription_id: subscriptionData?.subscription_id,
      };

      const response = await UseApi(
        apiUrls.cancelSubscription,
        apiMethods.POST,
        bodyData,
        headers
      );

      if (response?.status === 200 || response?.status === 201) {
        toast.success(response?.data?.message);
        getSubscriptionDetails(); // Refresh subscription details
      } else {
        toast.error(response?.data?.message);
      }
    } catch (err) {
      toast.error(
        err?.message || "An error occurred while canceling the subscription."
      );
    } finally {
      setIsLoading(false);
    }
  };

  // Confirm Unsubscribe with SweetAlert
  const confirmUnsubscribe = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You will not be able to perform any action after the expiration of your current plan.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, unsubscribe!",
      cancelButtonText: "No, keep it",
      reverseButtons: true,
      dangerMode: true,
    }).then((result) => {
      if (result.isConfirmed) {
        handleUnsubscribe();
      } else {
        Swal.fire("Cool!!", "Your subscription remains active.", "info");
      }
    });
  };

  // Fetch subscription data when the component mounts or when the customer ID changes
  useEffect(() => {
    if (user?.userInfo?.stripe_customer_id) {
      getSubscriptionDetails();
    }
  }, [user?.userInfo?.stripe_customer_id]);

  return (
    <>
      <UserHeader />

      <div className="dashboard-content">
        <div className="container">
          <div className="col-lg-9">
            <div className="card dash-cards">
              <div className="card-header">
                <h4>Manage Subscription</h4>
              </div>
              <div className="card-body">
                <div className="profile-form">
                  <form>
                    <div className="row">
                      <div className="col-lg-6 col-md-6">
                        <div className="form-group">
                          <div className="pass-group group-img">
                            <span className="lock-icon">Plan Name</span>
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-6 col-md-6">
                        <div className="form-group">
                          <div className="pass-group group-img">
                            <span className="lock-icon">
                              <h6>{subscriptionData?.current_plan || "-"}</h6>
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-lg-6 col-md-6">
                        <div className="form-group">
                          <div className="pass-group group-img">
                            <span className="lock-icon">Status</span>
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-6 col-md-6">
                        <div className="form-group">
                          <div className="pass-group group-img">
                            <span className="lock-icon">
                              <h6>
                                {subscriptionData?.plan_status
                                  ? CapitalizeFirstLetter(
                                      subscriptionData?.plan_status
                                    )
                                  : "-"}
                              </h6>
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-lg-6 col-md-6">
                        <div className="form-group">
                          <div className="pass-group group-img">
                            <span className="lock-icon">Subscribed On</span>
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-6 col-md-6">
                        <div className="form-group">
                          <div className="pass-group group-img">
                            <span className="lock-icon">
                              <h6>
                                {subscriptionData?.plan_started_at || "-"}
                              </h6>
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-lg-6 col-md-6">
                        <div className="form-group">
                          <div className="pass-group group-img">
                            <span className="lock-icon">Plan Renewal Date</span>
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-6 col-md-6">
                        <div className="form-group">
                          <div className="pass-group group-img">
                            <span className="lock-icon">
                              <h6>{subscriptionData?.plan_ends_at || "-"}</h6>
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <button
                      className="btn btn-primary updateProfileButton"
                      onClick={(e) => {
                        e.preventDefault();
                        confirmUnsubscribe();
                      }}
                    >
                      {isLoading ? (
                        <>
                          <Loader /> Processing...
                        </>
                      ) : (
                        "Cancel Subscription"
                      )}
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default GetUserSubscription;
