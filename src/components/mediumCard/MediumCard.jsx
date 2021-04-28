import React from 'react'
import { connect } from 'react-redux'

const MediumCard = (props) => {
    const { title, description, author, link, readInfo, tags } = props;
    return (
            <div className="card mb-3" style={{ width: "100%" }}>
                    <div className="card-body">
                            {
                                title && (
                                    <a href={link}>
                                        <h5 className="card-title">{title}</h5>
                                    </a>
                                )
                            }
                            {
                                description && (
                                    <a href={link}>
                                        <p className="card-text">{description}</p>
                                    </a>
                                )
                            }
                            {
                                readInfo && (
                                    <h6 className="card-subtitle mb-2 text-muted mt-2">{readInfo}</h6>
                                )
                            }
                            {
                                author && (
                                    <h6 className="card-subtitle mb-2 text-success author">{author}</h6>
                                )
                            }
                            {
                                tags.map((item) => {
                                    return (
                                        <a href={item.tagLink}>
                                            <span className="badge badge-primary mr-2 mb-2" style={{
                                                height: '30px',
                                                paddingTop: '8px'
                                            }}>#{item.tagName}</span>
                                        </a>
                                    )
                                })
                            }
                    </div>
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
