import React from 'react';
import { Link } from 'react-router-dom';

class ClassLists extends React.Component {
    constructor(props){
        super(props);
    }
    render() {
        const error = this.props.error;
        const search = this.props.search;
        const handleChange = this.props.handleChange;
        const isPending = this.props.isPending;
        const classes = this.props.classes;
        const getSingle = this.props.getSingle;
        return (
            <div className="container-fluid" style={{ backgroundColor: "white" }}>
                {error && <div class="alert alert-warning alert-dismissible fade show" role="alert">
                    {error}
                    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                </div>}
                <div className="row-6">
                    <div className="d-flex justify-content-center">
                        <input className="input-group" style={{ width: "75%", padding: "5px" }} value={search} onChange={handleChange} placeholder="Input to search" />
                    </div>
                    <div className="row row-cols-1 row-cols-md-3 g-4 container-fluid" >

                        {isPending && <p>Loading...</p>}
                        {classes && classes.map((ele,index) => (
                            <div  className="col">
                                <div className="card" style={{ width: "18rem" }}>
                                    <Link to={ `/class/${ele._id}` }>
                                    <img src={ele.image} className="card-img-top img-thumbnail" alt="..." style={{ height: "170px" }} />
                                    <div className="card-body">
                                        <p>Class:<strong>{ele.class}</strong></p>
                                        <p>Subject:<strong>{ele.subject}</strong></p>
                                    </div>
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        )
    }
}

export default ClassLists;