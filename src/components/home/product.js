import Picture1 from '../../assets/images/target.svg'
import Picture2 from '../../assets/images/motivation.svg'
import Picture3 from '../../assets/images/happy_face.svg'

const Product = () => {
    return (
        <div id="product" className="container-fluid pt-5">
            <div className="row">
                <div className="col-md-1"></div>
                <div className="col-md-10">
                    <p>Our Product</p>
                    <p><strong>At <i>Khronos</i>, we provide a secure and reliable digital wallet designed to help communities overcome financial and infrastructural challenges.</strong></p>
                    <p>By streamlining transactions, offering robust financial tools, and ensuring transparency, we empower communities to successfully complete and enjoy accomplished projects. Trusted by local governments and non-profits, Khronos is your partner in driving community success.</p>
                </div>
                <div className="col-md-1"></div>
            </div>
            <div className="row text-center justify-content-center procedure">
                <div className="col-md-3 procedure-item">
                    <img src={Picture1} alt="Project target" />
                    <p>create</p>
                </div>
                <div className="col-md-3 procedure-item">
                    <img src={Picture2} alt="Raise funds" />
                    <p>connect</p>
                </div>
                <div className="col-md-3 procedure-item">
                    <img src={Picture3} alt="Deliver project" />
                    <p>grow</p>
                </div>
            </div>
        </div>
    )
};

export default Product;
