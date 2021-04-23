import React, { useState } from 'react'
import { connect } from 'react-redux'
import crawlActions from '../../actions/crawlAction';
import errorActions from '../../actions/errorAction';
import MediumCard from '../mediumCard/MediumCard';

const Crawler = (props) => {
    const [searchTag, setSearchTag] = useState('');
    const { crawlMedium, search, resetError } = props;
    const { searchDataByTagStatus } = search
// search.searchDataByTagStatus.isLoading
    const handleSearch = (e) => {
        e.preventDefault();
        resetError();
        console.log(searchTag);
        const newSearchTag = searchTag.toLowerCase().replace(/\s+/g, '-').toLowerCase();
        console.log({ newSearchTag });
        crawlMedium(searchTag)
    }
    
    return (
        <>
        <div className="row">
            <div className="col-10 col-sm-10 col-md-10 col-lg-10 col-xl-10 mx-auto mt-5">
                <h3 className="text-right mt-5 mb-5">Welcome to Medium Crawler</h3>
                <form>
                    <div className="form-group">
                        <label htmlFor="exampleInputEmail1">Enter topics</label>
                        <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" 
                        onChange={(e) => { setSearchTag(e.target.value); } } 
                        required/>
                    </div>
                    <button type="submit" disabled={searchDataByTagStatus.isLoading} className="btn btn-primary btn-lg" onClick={handleSearch}>Submit</button>
                </form>
            </div>
        </div>
        <div className="row">
                {
                    searchDataByTagStatus.isLoading && (
                        <div className="col-3 mx-auto mt-5">
                            <div className="spinner-border" role="status">
                                <span className="sr-only">Loading...</span>
                            </div>
                        </div>
                    )
                }
            <div className="col-10 col-sm-10 col-md-10 col-lg-10 col-xl-10 mx-auto mt-5">
                {
                    !searchDataByTagStatus.isLoading
                    && searchDataByTagStatus.searchData
                    && searchDataByTagStatus.searchData.crawlData 
                    && searchDataByTagStatus.searchData.crawlData.map(item => {
                        return (
                            <MediumCard key={item.title} title={item.title} description={item.description} author={item.author}
                            link={item.link} readInfo={item.readInfo} />
                        )
                    })
                }
            </div>
        </div>
        </>
    )
}

const mapStateToProps = (state) => {
    const { auth, search } = state;
    return {
        auth,
        search
    }
};

const mapDispatchToProps = (dispatch) => ({
    crawlMedium: (searchTag) => { dispatch(crawlActions.crawlMedium(searchTag)); },
    resetError: () => { dispatch(errorActions.resetError()); }
});

export default connect(mapStateToProps, mapDispatchToProps)(Crawler)
