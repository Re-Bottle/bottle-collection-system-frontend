import phone_image from '../../assets/images/app-download-morph.svg';
import google_play_image from '../../assets/images/google-play.png';

export default function AppDownload() {
    return (
        <>
            <section id='appDownload' className="bg-success py-5 shadow-lg container-fluid " style={{ height: '100vh' }}>

                <div className="container">
                    <h1 className="text-light mb-5 fw-bold">Download Our App</h1>
                    <div className="row d-flex align-items-center">
                        <div className="col-12 col-md-8 mb-4 mb-md-0">
                            <p className="lead fw-bold text-light ">
                                Download the app and register yourself!
                            </p>
                            <div className='d-flex '>
                                <button className='btn btn-light btn-lg fw-bold'>Download apk</button>
                                <a href='https://www.google.com' className="btn d-flex p-0 ms-3">
                                    <img src={google_play_image} alt="Google play store" className="img-fluid rounded" style={{ maxHeight: '100%' }} />
                                </a>
                            </div>
                        </div>

                        <div className="col-12 col-md-4 d-flex justify-content-center">
                            <img src={phone_image} alt="App morph image" className="img-fluid rounded" />
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
