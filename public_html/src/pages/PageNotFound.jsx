import { Link } from 'react-router-dom';
import './PageNotFound.css'

const PageNotFound = () => {


    return (
        <section className="page_404">
            <div className="container">
                <div className="row">
                    <div className="col-sm-12 ">
                        <div className="col-sm-10 col-sm-offset-1  text-center">
                            <div className="four_zero_four_bg"></div>
                            <div className="contant_box_404">
                                <h2 className="h2">Look like you're lost</h2>
                                <p>The page you are looking for not available!</p>
                                <Link to="/" className="link_404">Go to Home</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default PageNotFound;