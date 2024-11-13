import image1 from '../../assets/images/about-process-1.svg';
import image2 from '../../assets/images/about-process-2.svg';
import image3 from '../../assets/images/about-process-3.svg';


const items = [{
    title: 'Step 1',
    description: 'Visit the nearest bottle collection system.',
    image: image1
}, {
    title: 'Step 2',
    description: 'Visit the nearest bottle collection system.',
    image: image2
}, {
    title: 'Step 3',
    description: 'Visit the nearest bottle collection system.',
    image: image3
}]


export default function About() {
    return (
        <>
            <section id='about' className="container d-flex flex-column align-items-center ps-3 pe-3 pb-4 pt-4" style={{ height: '100vh' }}>
                <h1 className="text-success mb-5 align-self-start fw-bold">About</h1>

                <div className="container-fluid d-flex flex-grow-1 justify-content-evenly">
                    {
                        items && items.map((item, index) => (
                            <>
                                <div className=" mb-4 card shadow-lg d-flex flex-column p-0 overflow-hidden hoverable_card">
                                    <div className="d-flex justify-content-center mb-3">
                                        <img src={item.image} alt="process 1 image" className="img rounded" />
                                    </div>
                                    <div className="bg-success text-white p-3 d-flex flex-column justify-content-center flex-grow-1 rounded-bottom-2" >
                                        <h2 className="card-title">{item.title}</h2>
                                        <p className="lead card-text">{item.description}</p>
                                    </div>
                                </div>
                            </>
                        ))
                    }


                </div>
            </section>
        </>
    );
}