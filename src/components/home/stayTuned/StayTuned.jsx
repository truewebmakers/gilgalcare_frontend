import React from "react"

export const StayTuned = () => {

    return (
        <section className="stay-tuned stay-turn-five">
            <div className="container">
                <div className="stay-with-us">
                    <h3>Stay Tuned With Us</h3>
                    <p>
                        Subcribe to our newletter and never miss our latest news and
                        promotions. Our newsletter is sent once a week, every thursday.
                    </p>
                    <form>
                        <div className="form-group">
                            <div className="group-img">
                                <i className="feather-mail"></i>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Enter Email Address"
                                />
                            </div>
                        </div>
                        <button className="btn btn-primary" type="submit">
                            {" "}
                            Subscribe
                        </button>
                    </form>
                </div>
            </div>
        </section>
    )
}