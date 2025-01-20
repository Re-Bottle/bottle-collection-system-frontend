import hero_image from "../assets/images/hero-recycle-image.png";

export default function Hero() {
  return (
    <>
      <section
        id="hero"
        className="container-fluid bg-success py-5 shadow-lg d-flex align-items-center"
        style={{ minHeight: "100vh" }}
      >
        <div className="container">
          <div className="card shadow-lg p-4">
            <div className="row align-items-center">
              <div className="col-md-7">
                <h1 className="display-4 fw-bold text-success mb-4">
                  Revolutionizing the waste management system
                </h1>
                <p className="lead mb-4">
                  This is an AI-based smart waste bin, designed for public
                  places, enabling them to simplify recycling. It sorts and
                  compresses the waste automatically, controls the fill level
                  and processes data for convenient waste management.
                </p>
                <button className="btn btn-success btn-lg">Contact us</button>
              </div>

              <div className="col-md-5">
                <img
                  src={hero_image}
                  alt="Hero"
                  className="img-fluid rounded"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
