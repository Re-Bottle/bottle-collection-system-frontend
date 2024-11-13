import hero_image from '../../assets/images/hero-recycle-image.png';

export default function Hero() {
    return (
        <>
            <section id='hero' className="container-fluid bg-success py-5 shadow-lg" style={{ height: '100vh' }}>
                <div className="container card shadow-lg p-4">
                    <div className="row align-items-center">
                        <div className="col-12 col-md-8 mb-4 mb-md-0">
                            <h1 className="display-4 fw-bold text-success">Revolutionizing the waste management system</h1>
                            <p className="lead">
                                This is an AI-based smart waste bin, designed for public places, enabling them to simplify recycling. It sorts and compresses the waste automatically, controls the fill level and processes data for convenient waste management.
                            </p>
                            <button className="btn btn-success btn-lg">Contact us</button>
                        </div>

                        <div className="col-12 col-md-4">
                            <img src={hero_image} alt="Hero image" className="img-fluid rounded" />
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
