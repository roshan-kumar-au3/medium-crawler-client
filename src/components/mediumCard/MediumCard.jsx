import React from 'react'
import { connect } from 'react-redux'

const MediumCard = (props) => {
    const { title, description, author, link, readInfo } = props;
    return (
            <div className="card mb-3" style={{ width: "100%" }}>
                <a href={link} className="card-link">
                    <div className="card-body">
                            {
                                title && (
                                    <h5 className="card-title">{title}</h5>
                                )
                            }
                            {
                                description && (
                                    <p className="card-text">{description}</p>
                                )
                            }
                            {
                                readInfo && (
                                    <h6 className="card-subtitle mb-2 text-muted">{readInfo}</h6>
                                )
                            }
                            {
                                author && (
                                    <h6 className="card-subtitle mb-2 text-success">{readInfo}</h6>
                                )
                            }
                    </div>
                </a>
            </div>
    )
}

const mapStateToProps = (state) => {
    const { auth, search } = state;
    return {
        auth,
        search
    }
}

const mapDispatchToProps = () => ({
    
})

export default connect(mapStateToProps, mapDispatchToProps)(MediumCard)
