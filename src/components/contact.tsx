import ContactImage from "../assets/svg/Contact.svg";

export default function Contact() {
  return (
    <section id="contact" className="container py-5">
      <div className="row align-items-center">
        <div className="col-md-6">
          <h2 className="text-success fw-bold">Contact Us</h2>
          <p className="lead mb-4">
            Need to connect with us? Either fill out the form with us or the
            email you'd like to contact.
          </p>
          <img
            src={ContactImage}
            alt="Contact Illustration"
            className="img-fluid"
          />
        </div>

        <div className="col-md-6 d-flex justify-content-end">
          <div className="bg-light p-5 rounded w-100 shadow-lg">
            <h4 className="text-dark fw-bold mb-4">Get in Touch</h4>

            <div className="d-flex align-items-center mb-3 p-3 bg-secondary-subtle rounded">
              <i className="bi bi-telephone-fill text-success fs-3 me-3"></i>
              <span className="fs-5 text-dark">+91 7619254678</span>
            </div>

            <div className="d-flex align-items-center p-3 bg-secondary-subtle rounded">
              <i className="bi bi-envelope-fill text-success fs-3 me-3"></i>
              <span className="fs-5 text-dark text-break">
                cynthia.tchristuniversity.in
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
