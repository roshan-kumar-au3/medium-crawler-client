import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import authActions from '../../actions/authAction';
import crawlActions from '../../actions/crawlAction';
import errorActions from '../../actions/errorAction';
import searchActions from '../../actions/searchAction';
import MediumCard from '../mediumCard/MediumCard';

const Crawler = (props) => {
    const [searchTag, setSearchTag] = useState('');
    const { crawlMedium, search, resetError, getSearchHistoryById, logout, error } = props;
    const { searchDataByTagStatus, searchHistoryStatus } = search;

    useEffect(() => {
        getSearchHistoryById();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleSearch = (e) => {
        e.preventDefault();
        resetError();
        console.log(searchTag);
        if (searchTag.length > 0) {
            const newSearchTag = searchTag.replace(/\s+/g, '-').toLowerCase();
            console.log({ newSearchTag });
            crawlMedium(searchTag);           
        }
    }

    const handleLogout = () => {
        logout();
    }

    const getSimilarWords = () => {
        return error?.similarWordsData?.[0]?.meanings[0]?.definitions[0]?.synonyms ?? false;
    }

    const noSimilarWordsAvailabel = () => {
        return error?.similarWordsData?.[0]?.meanings[0]?.definitions?.[0] && !error.similarWordsData[0].meanings[0].definitions[0].synonyms ? true : false
    }
    
    return (
        <>
        <div onClick={handleLogout} style={{ cursor: 'pointer' }}>
            <span className="badge badge-danger m-2" 
            style={{ 
                height: '30px', alignItems: 'center', display: 'flex', width: '120px'
            }}>Logout</span>
        </div>
        <div className="row">
            <div className="col-10 col-sm-10 col-md-10 col-lg-10 col-xl-10 mx-auto mt-2">
                <h3 className="text-right mt-5 mb-5">Welcome to Medium Crawler</h3>
                <form>
                    <div className="form-group">
                        <label htmlFor="exampleInputEmail1">Enter topics</label>
                        <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" 
                        onChange={(e) => { setSearchTag(e.target.value); resetError(); } } 
                        required/>
                    </div>
                    <button type="submit" disabled={searchDataByTagStatus.isLoading || searchTag.length === 0} className="btn btn-primary btn-lg" onClick={handleSearch}>Submit</button>
                </form>
            </div>
        </div>
        {  
            getSimilarWords() &&
                    <div className="row">
                        <div className="col-10 col-sm-10 col-md-10 col-lg-10 col-xl-10 mx-auto mt-3">
                        <h4>Similar Words suggestion</h4>
                            {
                                getSimilarWords().map(words => {
                                    return (
                                        <span key={words} className="badge badge-primary mr-2">{words}</span>
                                    )
                                })
                            }
                        </div>
                    </div>
        }
        {  
            noSimilarWordsAvailabel() &&
                    <div className="row">
                        <div className="col-10 col-sm-10 col-md-10 col-lg-10 col-xl-10 mx-auto mt-3">
                        <h4>Similar Words suggestion</h4>
                            <span className="badge badge-danger mr-2"> Oops! No similar word Suggestion</span>
                        </div>
                    </div>
        }
        <div className="row">
            <div className="col-10 col-sm-10 col-md-10 col-lg-10 col-xl-10 mx-auto mt-3">
                <h4>Search History</h4>
                {
                    !searchHistoryStatus.isLoading
                    && searchHistoryStatus.searchHistoryData
                    && searchHistoryStatus.searchHistoryData.map(topics => {
                        return (
                            <span key={topics} className="badge badge-success mr-2">{topics}</span>
                        )
                    })
                }
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
    const { auth, search, error } = state;
    return {
        auth,
        search,
        error,
    }
};

const mapDispatchToProps = (dispatch) => ({
    crawlMedium: (searchTag) => { dispatch(crawlActions.crawlMedium(searchTag)); },
    resetError: () => { dispatch(errorActions.resetError()); },
    getSearchHistoryById: () => { dispatch(searchActions.getSearchHistoryById()); },
    logout: () => { dispatch(authActions.logout()); },
});

export default connect(mapStateToProps, mapDispatchToProps)(Crawler)
