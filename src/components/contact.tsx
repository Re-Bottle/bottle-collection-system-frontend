import Contactsvg from "../assets/svg/Contact.svg"

export default function Contact() {
  return (
    <section id="contact" className="container ps-3 pe-3 pb-4 pt-4">
      <h1 className="text-success mb-5 fw-bold">Contact</h1>

      <div className="row">
        {/* Left Side - Text + Image */}
        <div className="col-md-6 d-flex flex-column justify-content-center">
          <p className="text-dark">
            Need to connect with us? Either fill out the form with us or email
            the contact you’d like to reach.
          </p>
          <img
            src={Contactsvg}
            alt="Contact Illustration"
            className="img-fluid mt-3"
            style={{ maxWidth: "80%" }}
          />
        </div>

        <div className="col-md-6">
          <div
            className="p-4 rounded shadow"
            style={{ backgroundColor: "#1E5631", color: "white" }}
          >
            <form>
              <div className="row mb-3">
                <div className="col">
                  <label className="form-label">First Name</label>
                  <input
                    type="text"
                    className="form-control bg-white text-dark"
                    placeholder="First Name"
                  />
                </div>
                <div className="col">
                  <label className="form-label">Last Name</label>
                  <input
                    type="text"
                    className="form-control bg-white text-dark"
                    placeholder="Last Name"
                  />
                </div>
              </div>

              <div className="mb-3">
                <label className="form-label">Email</label>
                <input
                  type="email"
                  className="form-control bg-white text-dark"
                  placeholder="Email"
                />
              </div>

              <div className="mb-3">
                <label className="form-label">What can we help you with?</label>
                <textarea
                  className="form-control bg-white text-white"
                  placeholder="Your message"
                  rows={4}
                ></textarea>
              </div>

              <div className="d-flex justify-content-start mt-3">
                <button type="submit" className="btn btn-light btn-sm text-dark border-white">
                    Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
